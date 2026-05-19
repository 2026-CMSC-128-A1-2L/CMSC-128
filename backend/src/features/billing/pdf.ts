import PDFDocument from 'pdfkit';
import { AppError } from '../../error.js';

type BillingPdfBreakdownItem = {
  name: string;
  amount: number;
};

type BillingPdfData = {
  statementNo?: string;
  statementDate?: string;
  billingPeriod?: string;
  dueDate?: string;
  studentName?: string;
  studentNumber?: string;
  degreeProgram?: string;
  upMail?: string;
  dormitory?: string;
  roomSpace?: string;
  month?: string;
  breakdown: BillingPdfBreakdownItem[];
  totalAmount?: number;
  totalDue?: number;
};

const teal = '#0B3C45';
const tealHeader = '#145C68';
const paleBlue = '#D7E8ED';
const black = '#111111';
const border = '#222222';

const formatCurrency = (amount?: number) =>
  (amount ?? 0).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const valueOrLine = (value?: string) =>
  value && value.trim().length > 0 ? value : '____________________';

const drawText = (
  doc: PDFKit.PDFDocument,
  text: string,
  x: number,
  y: number,
  options?: PDFKit.Mixins.TextOptions,
) => {
  doc.text(text, x, y, options);
};

const drawInfoRow = (
  doc: PDFKit.PDFDocument,
  label: string,
  value: string | undefined,
  x: number,
  y: number,
  labelWidth = 95,
) => {
  doc.font('Helvetica-Bold').fontSize(10).fillColor(black).text(label, x, y);
  doc.font('Helvetica').text(valueOrLine(value), x + labelWidth, y, { width: 130 });
};

const drawSectionTitle = (
  doc: PDFKit.PDFDocument,
  title: string,
  x: number,
  y: number,
  width: number,
) => {
  doc.rect(x, y, width, 24).fillAndStroke(tealHeader, border);
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor('#FFFFFF')
    .text(title, x + 7, y + 7);
};

const drawTableHeader = (
  doc: PDFKit.PDFDocument,
  y: number,
  columns: { label: string; x: number; width: number; align?: 'left' | 'right' }[],
  tableX: number,
  tableWidth: number,
  rowHeight = 21,
) => {
  doc.rect(tableX, y, tableWidth, rowHeight).fillAndStroke(teal, border);
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#FFFFFF');
  columns.forEach((column) => {
    drawText(doc, column.label, column.x + 6, y + 7, {
      width: column.width - 12,
      align: column.align ?? 'left',
    });
  });
};

const drawTableRow = (
  doc: PDFKit.PDFDocument,
  y: number,
  columns: { text: string; x: number; width: number; align?: 'left' | 'right'; bold?: boolean }[],
  tableX: number,
  tableWidth: number,
  rowHeight = 21,
) => {
  doc.rect(tableX, y, tableWidth, rowHeight).stroke(border);
  columns.forEach((column) => {
    doc
      .font(column.bold ? 'Helvetica-Bold' : 'Helvetica')
      .fontSize(8)
      .fillColor(black);
    drawText(doc, column.text, column.x + 6, y + 7, {
      width: column.width - 12,
      align: column.align ?? 'left',
    });
  });
};

const drawVerticalLines = (doc: PDFKit.PDFDocument, y: number, height: number, lines: number[]) => {
  lines.forEach((x) => {
    doc
      .moveTo(x, y)
      .lineTo(x, y + height)
      .stroke(border);
  });
};

export const generateBillingPdfBuffer = async (data: BillingPdfData): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 0, size: 'A4' });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err: Error) => reject(err));

      const pageWidth = doc.page.width;
      const contentX = 74;
      const contentWidth = pageWidth - contentX * 2;
      const rightX = contentX + contentWidth / 2;
      const tableX = contentX;
      const tableWidth = contentWidth;

      doc.fillColor(black);
      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .text('University of the Philippines Los Banos', contentX, 46);
      doc
        .font('Helvetica')
        .fontSize(11)
        .text(data.dormitory ?? 'Office of Student Housing and Residential Services');
      doc.font('Helvetica-Oblique').text('Student Occupancy Contract');

      doc
        .moveTo(contentX, 98)
        .lineTo(contentX + contentWidth, 98)
        .lineWidth(0.8)
        .stroke(border);

      const panelY = 114;
      const panelHeight = 162;
      doc.rect(contentX, panelY, contentWidth / 2, panelHeight).fillAndStroke(paleBlue, border);
      doc.rect(rightX, panelY, contentWidth / 2, panelHeight).stroke(border);
      doc
        .moveTo(rightX, panelY)
        .lineTo(rightX, panelY + panelHeight)
        .stroke(border);

      doc
        .font('Helvetica-Bold')
        .fontSize(15)
        .fillColor(tealHeader)
        .text('BILLING STATEMENT', contentX + 6, panelY + 10);
      doc
        .font('Helvetica')
        .fontSize(7)
        .fillColor(black)
        .text('University Student Accommodation Tracker', contentX + 6, panelY + 29);

      drawInfoRow(doc, 'Statement No.:', data.statementNo, contentX + 6, panelY + 50, 92);
      drawInfoRow(doc, 'Statement Date:', data.statementDate, contentX + 6, panelY + 72, 92);
      drawInfoRow(
        doc,
        'Billing Period:',
        data.billingPeriod ?? data.month,
        contentX + 6,
        panelY + 94,
        92,
      );
      drawInfoRow(doc, 'Due Date:', data.dueDate, contentX + 6, panelY + 116, 92);

      doc
        .font('Helvetica-Bold')
        .fontSize(7)
        .fillColor(black)
        .text('BILLED TO', rightX + 6, panelY + 10);
      drawInfoRow(doc, 'Student Name:', data.studentName, rightX + 6, panelY + 32, 104);
      drawInfoRow(doc, 'Student Number:', data.studentNumber, rightX + 6, panelY + 54, 104);
      drawInfoRow(doc, 'Degree Program:', data.degreeProgram, rightX + 6, panelY + 76, 104);
      drawInfoRow(doc, 'UP Mail Address:', data.upMail, rightX + 6, panelY + 98, 104);
      drawInfoRow(doc, 'Dormitory:', data.dormitory, rightX + 6, panelY + 120, 104);
      drawInfoRow(doc, 'Room / Bed Space:', data.roomSpace, rightX + 6, panelY + 142, 104);

      const chargeSectionY = 305;
      drawSectionTitle(doc, 'CHARGES AND FEES', tableX, chargeSectionY, tableWidth);

      const colWidth = tableWidth / 3;
      const col1 = tableX;
      const col2 = tableX + colWidth;
      const col3 = tableX + colWidth * 2;
      const chargesHeaderY = chargeSectionY + 35;
      drawTableHeader(
        doc,
        chargesHeaderY,
        [
          { label: 'DESCRIPTION', x: col1, width: colWidth },
          { label: 'PERIOD / REFERENCE', x: col2, width: colWidth },
          { label: 'AMOUNT (PHP)', x: col3, width: colWidth, align: 'right' },
        ],
        tableX,
        tableWidth,
      );

      const chargeRows =
        data.breakdown.length > 0
          ? data.breakdown
          : [{ name: 'Monthly Accommodation Fee', amount: data.totalAmount ?? data.totalDue ?? 0 }];
      const normalizedChargeRows = [
        ...chargeRows,
        ...Array(Math.max(0, 6 - chargeRows.length)).fill(null),
      ];

      let y = chargesHeaderY + 21;
      normalizedChargeRows.forEach((item) => {
        drawTableRow(
          doc,
          y,
          [
            { text: item?.name ?? 'Other Charges (specify)', x: col1, width: colWidth },
            {
              text: item ? (data.billingPeriod ?? data.month ?? 'Current Month') : '',
              x: col2,
              width: colWidth,
            },
            {
              text: item ? formatCurrency(item.amount) : '',
              x: col3,
              width: colWidth,
              align: 'right',
            },
          ],
          tableX,
          tableWidth,
        );
        y += 21;
      });
      drawVerticalLines(doc, chargesHeaderY, 21 * (normalizedChargeRows.length + 1), [col2, col3]);

      const adjustmentsSectionY = y + 26;
      drawSectionTitle(
        doc,
        'ADJUSTMENTS / PREVIOUS BALANCE',
        tableX,
        adjustmentsSectionY,
        tableWidth,
      );

      const adjustmentsHeaderY = adjustmentsSectionY + 35;
      drawTableHeader(
        doc,
        adjustmentsHeaderY,
        [
          { label: 'DESCRIPTION', x: col1, width: colWidth },
          { label: 'REFERENCE', x: col2, width: colWidth },
          { label: 'AMOUNT (PHP)', x: col3, width: colWidth, align: 'right' },
        ],
        tableX,
        tableWidth,
      );

      const adjustmentRows = [
        ['Previous Balance (if any)', '', '0.00'],
        ['Advance Payment', '', '0.00'],
        ['Discount / Scholarship Subsidy', '', '0.00'],
        ['Late Payment Penalty', '', '0.00'],
      ];

      y = adjustmentsHeaderY + 21;
      adjustmentRows.forEach(([description, reference, amount]) => {
        drawTableRow(
          doc,
          y,
          [
            { text: description, x: col1, width: colWidth },
            { text: reference, x: col2, width: colWidth },
            { text: amount, x: col3, width: colWidth, align: 'right' },
          ],
          tableX,
          tableWidth,
        );
        y += 21;
      });
      drawVerticalLines(doc, adjustmentsHeaderY, 21 * (adjustmentRows.length + 1), [col2, col3]);

      const totalBoxWidth = 266;
      const totalBoxX = tableX + tableWidth - totalBoxWidth;
      const totalBoxY = y + 24;
      const labelWidth = 114;
      const amountWidth = totalBoxWidth - labelWidth;
      const subtotal = data.totalAmount ?? data.totalDue ?? 0;
      const totalDue = data.totalDue ?? subtotal;

      const totalRows = [
        ['Subtotal:', formatCurrency(subtotal), false],
        ['Total Adjustments:', '0.00', false],
        ['TOTAL DUE:', formatCurrency(totalDue), true],
      ] as const;

      y = totalBoxY;
      totalRows.forEach(([label, amount, isTotal]) => {
        doc.rect(totalBoxX, y, totalBoxWidth, 22).fillAndStroke(isTotal ? teal : '#FFFFFF', border);
        doc
          .font('Helvetica-Bold')
          .fontSize(10)
          .fillColor(isTotal ? '#FFFFFF' : black);
        doc.text(label, totalBoxX + 8, y + 7, { width: labelWidth - 16, align: 'right' });
        doc.text(amount, totalBoxX + labelWidth + 8, y + 7, {
          width: amountWidth - 16,
          align: 'right',
        });
        doc
          .moveTo(totalBoxX + labelWidth, y)
          .lineTo(totalBoxX + labelWidth, y + 22)
          .stroke(border);
        y += 22;
      });

      const paymentNote = 'Please settle by due date.';
      doc.font('Helvetica-Oblique').fontSize(9);
      const noteWidth = doc.widthOfString(paymentNote) + 4;
      const noteX = totalBoxX + labelWidth + (amountWidth - noteWidth) / 2;
      doc
        .rect(noteX, y + 1, Math.min(noteWidth, amountWidth - 4), 11)
        .fillOpacity(0.55)
        .fill('#FFF200')
        .fillOpacity(1);
      doc.fillColor(black).text(paymentNote, totalBoxX + labelWidth, y + 2, {
        width: amountWidth,
        align: 'center',
      });

      doc.end();
    } catch (error) {
      console.error('PDFKit Error:', error);
      reject(new AppError(500, 'Failed to generate PDF via PDFKit'));
    }
  });
};
