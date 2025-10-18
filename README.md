# Lakhra Fabrics Management System

A comprehensive fabric management system for tracking yarn purchases, knitting operations, dying processes, and fabric receipts.

## Features

- **Yarn Purchase Management**: Track yarn purchases with automatic weight calculations
- **Knitting Challan**: Issue yarn to knitters with automatic wastage calculations
- **Grey Fabric Receipt**: Record incoming grey fabric with balance tracking
- **Dying Challan**: Issue grey fabric for dying operations
- **Dyed Fabric Receipt**: Record finished dyed fabric with wastage tracking
- **Document History**: Search and filter all documents
- **PDF Generation**: Create and share professional PDF documents
- **Print Support**: Optimized printing with watermarks

## Deployment Instructions

### GitHub Setup

1. Create a new repository on GitHub
2. Initialize your local repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lakhra-fabrics.git
git push -u origin main
Vercel Deployment
Go to vercel.com
Click "Import Project"
Select your GitHub repository
Vercel will auto-detect the configuration
Click "Deploy"
Your app will be live at: https://your-project-name.vercel.app
Firebase Configuration
IMPORTANT: Before deploying, update your Firebase credentials in js/config.js:
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
Local Development
Clone the repository
Open index.html in a web browser
No build process required - pure HTML, CSS, and JavaScript
Browser Compatibility
Chrome (recommended)
Firefox
Safari
Edge
License
MIT License