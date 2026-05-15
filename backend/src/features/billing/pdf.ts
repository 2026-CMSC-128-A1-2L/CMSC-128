import PDFDocument from 'pdfkit';
import { AppError } from '../../error.js';

export const generateBillingPdfBuffer = async (data: any): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const chunks: Buffer[] = [];

      // Get Data
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // Make pdf

      doc.fontSize(20).text('BILLING STATEMENT', { align: 'center' });
      doc.moveDown();

      doc.fontSize(12).text(`Student Name: ${data.studentName}`);
      doc.text(`Billing Month: ${data.month}`);
      doc.text(`Date Generated: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Table
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('Description', 50, doc.y, { continued: true });
      doc.text('Amount', { align: 'right' });
      doc.font('Helvetica');
      doc.moveDown(0.5);

      // Breakdown Items
      data.breakdown.forEach((item: any) => {
        doc.text(item.name, 50, doc.y, { continued: true });
        doc.text(`PHP ${item.amount}`, { align: 'right' });
        doc.moveDown(0.5);
      });

      doc.moveDown();
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Total
      doc.fontSize(14).font('Helvetica-Bold');
      doc.text('TOTAL AMOUNT:', 50, doc.y, { continued: true });
      doc.text(`PHP ${data.totalAmount}`, { align: 'right' });

      // Finalize the PDF
      doc.end();
    } catch (error) {
      console.error('PDFKit Error:', error);
      reject(new AppError(500, 'Failed to generate PDF via PDFKit'));
    }
  });
};
