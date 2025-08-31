#!/bin/bash

echo "🚀 Preparing website for deployment to Cloudflare Pages..."

# Check if all required files exist
if [ ! -f "index.html" ] || [ ! -f "main.css" ] || [ ! -f "main.js" ]; then
    echo "❌ Error: Missing required files (index.html, main.css, main.js)"
    exit 1
fi

echo "✅ All required files found"
echo "📁 Files ready for deployment:"
ls -la *.html *.css *.js

echo ""
echo "🌐 Next steps:"
echo "1. Go to https://dash.cloudflare.com"
echo "2. Navigate to 'Pages' in the left sidebar"
echo "3. Click 'Create a project'"
echo "4. Choose 'Direct Upload'"
echo "5. Upload your website files (index.html, main.css, main.js)"
echo "6. Set your custom domain: harigovindvalsakumar.com"
echo "7. Deploy!"
echo ""
echo "🎉 Your website will be live at https://harigovindvalsakumar.com"
