
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { ComprehendClient, DetectSentimentCommand, DetectKeyPhrasesCommand, DetectEntitiesCommand, DetectDominantLanguageCommand } from "@aws-sdk/client-comprehend";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Readable } from "stream";

const s3 = new S3Client({ region: "us-east-1" });
const comprehend = new ComprehendClient({ region: "us-east-1" });
const ses = new SESClient({ region: "us-east-1" });

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf-8");
}

export const handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

  try {
    const s3Data = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const text = await streamToString(s3Data.Body);

    const [sentiment, keyPhrases, entities, language] = await Promise.all([
      comprehend.send(new DetectSentimentCommand({ LanguageCode: "en", Text: text })),
      comprehend.send(new DetectKeyPhrasesCommand({ LanguageCode: "en", Text: text })),
      comprehend.send(new DetectEntitiesCommand({ LanguageCode: "en", Text: text })),
      comprehend.send(new DetectDominantLanguageCommand({ Text: text }))
    ]);

    const emailBody = `
Resume Analysis Report

Language: ${language.Languages[0].LanguageCode.toUpperCase()}
Sentiment: ${sentiment.Sentiment}

Top Key Phrases:
${keyPhrases.KeyPhrases.slice(0, 5).map(p => `- ${p.Text}`).join("\n")}

Detected Entities:
${entities.Entities.slice(0, 5).map(e => `- ${e.Type}: ${e.Text}`).join("\n")}

S3 File: ${bucket}/${key}
`;

    await ses.send(new SendEmailCommand({
      Source: "your_verified_email@example.com",
      Destination: {
        ToAddresses: ["your_verified_email@example.com"]
      },
      Message: {
        Subject: { Data: "New Resume Analyzed" },
        Body: {
          Text: { Data: emailBody }
        }
      }
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Resume analyzed and email sent!" })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed", error: err.message })
    };
  }
};
