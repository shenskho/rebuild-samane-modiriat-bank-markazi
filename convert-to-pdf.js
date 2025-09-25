const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertHTMLToPDF() {
  console.log('Starting HTML to PDF conversion...');
  
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Read HTML file
    const htmlPath = path.join(__dirname, 'styling-documentation.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Set content and wait for load
    await page.setContent(htmlContent, { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Generate PDF with Persian/RTL support
    const pdfBuffer = await page.pdf({
      path: path.join(__dirname, 'راهنمای-استایل-دهی-پروژه.pdf'),
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666; margin-top: 10px;">
          <span style="font-family: 'Vazirmatn', Arial, sans-serif;">راهنمای استایل‌دهی پروژه Vuexy React Admin</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666; margin-bottom: 10px;">
          <span style="font-family: 'Vazirmatn', Arial, sans-serif;">صفحه <span class="pageNumber"></span> از <span class="totalPages"></span></span>
        </div>
      `
    });
    
    await browser.close();
    
    console.log('✅ PDF successfully created: راهنمای-استایل-دهی-پروژه.pdf');
    console.log(`📄 File size: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('❌ Error converting HTML to PDF:', error);
    process.exit(1);
  }
}

// Run the conversion
convertHTMLToPDF();