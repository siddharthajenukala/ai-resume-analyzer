# ✨ AI Resume Analyzer – Sid Solutions

A fully serverless, AI-powered resume analyzer built with AWS. Users upload their resume via a professional career page and receive a personalized analysis report via email.

[🌐 Live Form (https://siddharthajenukala.github.io/ai-resume-analyzer/)  
[📂 GitHub Repository](https://github.com/siddharthajenukala/ai-resume-analyzer)

---

## 🧠 Features

- 📤 Upload resume via elegant web form
- 🪣 Stored securely in **Amazon S3**
- 🧠 NLP analysis using **Amazon Comprehend**
- 📬 Personalized email report sent via **Amazon SES**
- ⚡ Triggered by **AWS Lambda**
- 💡 Powered by **Node.js 18** with AWS SDK v3

---

## 🗂️ Project Structure

```plaintext
ai-resume-analyzer/
│
├── upload.html         # Front-end form (resume upload)
├── index.mjs           # Lambda backend (resume analyzer + email sender)
└── README.md           # Project overview
```

---

## 🔧 How It Works

1. User visits the career page and uploads their `.txt` resume
2. Resume is uploaded to **Amazon S3**
3. S3 triggers a **Lambda function**
4. Lambda sends the resume text to **Amazon Comprehend**
5. Lambda formats the results and emails them via **Amazon SES**

---

## 📬 Sample Email Output

```
Resume Analysis Report

Language: EN
Sentiment: POSITIVE

Top Key Phrases:
- Software Engineer
- AWS Lambda
- Cloud Computing
- Resume Analyzer
- Full Stack Developer

Detected Entities:
- PERSON: Jane Smith
- ORGANIZATION: Amazon
- DATE: 2023
- LOCATION: California
```

---

## 🚀 Technologies Used

- Amazon S3
- AWS Lambda
- Amazon SES
- Amazon Comprehend
- Node.js 18.x
- HTML/CSS/JavaScript
- GitHub Pages (optional for deployment)

---

## 🧪 Future Improvements

- PDF resume support using Textract
- Store application data in DynamoDB
- Add admin dashboard to track submissions
- Mobile-friendly responsive design

---

## 🧑‍💼 About

Built by [Siddhartha Jenukala](https://github.com/siddharthajenukala)  
End-to-end cloud engineer & developer ✨

---
