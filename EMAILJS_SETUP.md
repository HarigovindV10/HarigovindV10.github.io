# EmailJS Setup Guide for Automatic Email Sending

This guide will help you set up EmailJS to send emails automatically from your contact form without opening email clients.

## 🚀 **What is EmailJS?**

EmailJS allows you to send emails directly from your website using email service providers like Gmail, Outlook, or custom SMTP servers. It's free for up to 200 emails per month.

## 📋 **Step-by-Step Setup**

### **Step 1: Create EmailJS Account**
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### **Step 2: Add Email Service**
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Custom SMTP**
4. Follow the setup instructions for your chosen service
5. Note down your **Service ID** (you'll need this later)

### **Step 3: Create Email Template**
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```html
Subject: Portfolio Contact: {{subject}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio website contact form.
```

4. Save the template and note down your **Template ID**

### **Step 4: Get Your Public Key**
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

### **Step 5: Update Your Website Code**
Replace the placeholder values in `main.js`:

```javascript
// Replace YOUR_PUBLIC_KEY with your actual public key
emailjs.init("YOUR_PUBLIC_KEY");

// Replace YOUR_SERVICE_ID with your service ID
// Replace YOUR_TEMPLATE_ID with your template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

## 🔧 **Configuration Examples**

### **Gmail Setup**
- Service Type: Gmail
- Service ID: `service_xxxxxxx`
- Requires Gmail App Password (not regular password)

### **Outlook Setup**
- Service Type: Outlook
- Service ID: `service_xxxxxxx`
- Uses your Outlook credentials

### **Custom SMTP Setup**
- Service Type: Custom SMTP
- SMTP Server: Your server details
- Port: Usually 587 or 465
- Username/Password: Your credentials

## 📱 **Testing Your Setup**

1. **Local Testing**: Test with your local server
2. **Form Submission**: Fill out the contact form
3. **Check Email**: Verify emails are received
4. **Check Console**: Look for success/error messages

## 🆓 **Free Plan Limits**

- **200 emails per month** (free)
- **2 email templates** (free)
- **1 email service** (free)
- **Unlimited contacts** (free)

## 🚨 **Important Security Notes**

- **Public Key**: Safe to expose in frontend code
- **Service ID**: Safe to expose in frontend code
- **Template ID**: Safe to expose in frontend code
- **Never expose**: Private keys or service credentials

## 🔄 **Alternative Solutions**

If EmailJS doesn't work for you, consider:

1. **Formspree** - Another popular form service
2. **Netlify Forms** - If hosting on Netlify
3. **Backend API** - Custom server solution
4. **Google Forms** - Simple form integration

## 📞 **Support**

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Community: [https://community.emailjs.com/](https://community.emailjs.com/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

## 🎯 **Next Steps After Setup**

1. Test the contact form locally
2. Deploy to Cloudflare Pages
3. Test the live contact form
4. Monitor email delivery
5. Customize email templates as needed

Your contact form will now send emails automatically without opening email clients!
