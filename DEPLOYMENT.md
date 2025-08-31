# Deployment Guide for Cloudflare Pages

This guide will help you deploy your portfolio website to `harigovindvalsakumar.com` using Cloudflare Pages.

## Prerequisites
- A Cloudflare account
- Domain `harigovindvalsakumar.com` added to Cloudflare
- Your website files ready (index.html, main.css, main.js)

## Step-by-Step Deployment

### 1. Access Cloudflare Dashboard
- Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
- Sign in to your Cloudflare account

### 2. Navigate to Pages
- In the left sidebar, click on **"Pages"**
- Click **"Create a project"**

### 3. Choose Deployment Method
- Select **"Direct Upload"** (easiest for static sites)
- Give your project a name (e.g., "portfolio-website")

### 4. Upload Your Files
- Drag and drop or select your website files:
  - `index.html`
  - `main.css`
  - `main.js`
- Click **"Deploy site"**

### 5. Configure Custom Domain
- After deployment, go to your project settings
- Click on **"Custom domains"**
- Add your domain: `harigovindvalsakumar.com`
- Cloudflare will automatically configure DNS

### 6. Verify Deployment
- Your site will be available at: `https://harigovindvalsakumar.com`
- Test all sections and functionality

## Alternative: Git Integration

If you prefer using Git:
1. Push your code to GitHub/GitLab
2. Choose "Connect to Git" instead of "Direct Upload"
3. Connect your repository
4. Set build settings (not needed for static sites)
5. Deploy

## Troubleshooting

- **DNS Issues**: Ensure your domain is properly configured in Cloudflare
- **HTTPS**: Cloudflare automatically provides SSL certificates
- **Performance**: Enable Cloudflare's CDN and optimization features

## Support
- Cloudflare Pages Documentation: [https://developers.cloudflare.com/pages/](https://developers.cloudflare.com/pages/)
- Cloudflare Support: [https://support.cloudflare.com/](https://support.cloudflare.com/)
