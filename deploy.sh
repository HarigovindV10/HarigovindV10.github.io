#!/bin/bash

echo "🚀 Preparing website for deployment to Cloudflare Pages..."

# Check if all required files exist
for f in index.html main.css main.js portrait.webp functions/api/contact.js; do
    if [ ! -f "$f" ]; then
        echo "❌ Error: missing required file: $f"
        exit 1
    fi
done

echo "✅ All required files found"
echo "📁 Files ready for deployment:"
ls -la *.html *.css *.js *.webp
ls -la functions/api

echo ""
echo "🌐 Next steps:"
echo "The contact form runs as a Pages Function (functions/api/contact.js),"
echo "so this project must be deployed from Git — Direct Upload will not run it."
echo ""
echo "1. Commit and push this repo"
echo "2. Cloudflare Pages picks the push up and redeploys automatically"
echo "3. Confirm RESEND_API_KEY is set in the Pages environment variables"
echo "4. Custom domain: harigovindvalsakumar.com"
echo ""
echo "🎉 Your website will be live at https://harigovindvalsakumar.com"
