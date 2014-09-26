using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Windows.Forms;
using System.Drawing.Printing;

namespace Talent.Objects
{
    class DataGridPrint
    {

        private DataGridView[] TheDataGridViews; // The DataGridView Control which will be printed
        private DataGridView currentGrid;
        private DataGridView lastGrid;
        int intCurrentGridNo = 1;
        private bool boolDidCalculationsForCurrentGrid = false;
        private PrintDocument ThePrintDocument; // The PrintDocument to be used for printing
        private bool IsCenterOnPage; // Determine if the report will be printed in the Top-Center of the page
        private bool IsWithPageHeader; // Determine if the page contain title text
        private string ThePageHeaderText; // The title text to be printed in each page (if IsWithPageHeader is set to true)
        private Font ThePageHeaderFont; // The font to be used with the title text (if IsWithPageHeader is set to true)
        private Color ThePageHeaderColor; // The color to be used with the title text (if IsWithPageHeader is set to true)
        private bool IsWithPaging; // Determine if paging is used. If false, only the first page prints. 
        private Font tableHeaderFont;
        private bool boolDrewHeaderForThisPage = false;
        private int intWhiteSpaceBetweenTables;
        static int CurrentRow; // A static parameter that keep track on which Row (in the DataGridView control) that should be printed
        static int PageNumber;
        private int PageWidth;
        private int PageHeight;
        private int LeftMargin;
        private int TopMargin;
        private int RightMargin;
        private int BottomMargin;
        private float CurrentY; // A parameter that keep track on the y coordinate of the page, so the next object to be printed will start from this y coordinate
        private float RowHeaderHeight;
        private List<float> RowsHeight;
        private List<float> ColumnsWidth;
        private float TheDataGridViewWidth;
        private List<string> TheTableHeaderTexts = new List<string>();
        // Maintain a generic list to hold start/stop points for the column printing

        // This will be used for wrapping in situations where the DataGridView will not fit on a single page

        public List<int[]> mColumnPoints;
        public List<float> mColumnPointsWidth;
        public int mColumnPoint;

        // The class constructor

        public DataGridPrint(DataGridView[] DataGridViews, PrintDocument aPrintDocument, bool CenterOnPage, bool WithPageHeader, string PageHeader, Font PageHeaderFont, Color PageHeaderColor, bool WithPaging, Font ThetableHeaderFont, List<string> tableHeaderTexts, int WhiteSpaceBetweenTables)
        {

            TheTableHeaderTexts = tableHeaderTexts;
            intWhiteSpaceBetweenTables = WhiteSpaceBetweenTables;
            tableHeaderFont = ThetableHeaderFont;
            TheDataGridViews = DataGridViews;
            currentGrid = TheDataGridViews[0];
            lastGrid = TheDataGridViews[TheDataGridViews.Length - 1];
            ThePrintDocument = aPrintDocument;
            IsCenterOnPage = CenterOnPage;
            IsWithPageHeader = WithPageHeader;
            ThePageHeaderText = PageHeader;
            ThePageHeaderFont = PageHeaderFont;
            ThePageHeaderColor = PageHeaderColor;
            IsWithPaging = WithPaging;
            PageNumber = 0;
            RowsHeight = new List<float>();
            ColumnsWidth = new List<float>();
            mColumnPoints = new List<int[]>();
            mColumnPointsWidth = new List<float>();
            // Claculating the PageWidth and the PageHeight

            if (!ThePrintDocument.DefaultPageSettings.Landscape)
            {
                PageWidth = ThePrintDocument.DefaultPageSettings.PaperSize.Width;
                PageHeight = ThePrintDocument.DefaultPageSettings.PaperSize.Height;
            }

            else
            {
                PageHeight = ThePrintDocument.DefaultPageSettings.PaperSize.Width;
                PageWidth = ThePrintDocument.DefaultPageSettings.PaperSize.Height;
            }

            // Claculating the page margins

            LeftMargin = ThePrintDocument.DefaultPageSettings.Margins.Left;
            TopMargin = ThePrintDocument.DefaultPageSettings.Margins.Top;
            RightMargin = ThePrintDocument.DefaultPageSettings.Margins.Right;
            BottomMargin = ThePrintDocument.DefaultPageSettings.Margins.Bottom;
            CurrentY = (float)TopMargin;
            // First, the current row to be printed is the first row in the DataGridView control
            CurrentRow = 0;

        }

        // The function that calculate the height of each row (including the header row), the width of each column (according to the longest text in all its cells including the header cell), and the whole DataGridView width

        private void Calculate(Graphics g)
        {
            if (boolDidCalculationsForCurrentGrid) return;
            SizeF tmpSize = new SizeF();
            Font tmpFont;
            float tmpWidth;
            TheDataGridViewWidth = 0;
            RowsHeight = new List<float>();
            ColumnsWidth = new List<float>();
            mColumnPoints = new List<int[]>();
            mColumnPointsWidth = new List<float>();
            for (int i = 0; i < currentGrid.Columns.Count; i++)
            {
                tmpFont = currentGrid.ColumnHeadersDefaultCellStyle.Font;
                if (tmpFont == null) // If there is no special HeaderFont style, then use the default DataGridView font style
                    tmpFont = currentGrid.DefaultCellStyle.Font;

                tmpSize = g.MeasureString(currentGrid.Columns[i].HeaderText, tmpFont);
                tmpWidth = tmpSize.Width;
                RowHeaderHeight = tmpSize.Height;
                for (int j = 0; j < currentGrid.Rows.Count; j++)
                {
                    tmpFont = currentGrid.Rows[j].DefaultCellStyle.Font;
                    if (tmpFont == null) // If the there is no special font style of the CurrentRow, then use the default one associated with the DataGridView control
                        tmpFont = currentGrid.DefaultCellStyle.Font;
                    tmpSize = g.MeasureString("Anything", tmpFont);
                    RowsHeight.Add(tmpSize.Height);
                    tmpSize = g.MeasureString(currentGrid.Rows[j].Cells[i].EditedFormattedValue.ToString(), tmpFont);
                    if (tmpSize.Width > tmpWidth)
                        tmpWidth = tmpSize.Width;
                }

                if (currentGrid.Columns[i].Visible)
                    TheDataGridViewWidth += tmpWidth;

                ColumnsWidth.Add(tmpWidth);
            }

            // Define the start/stop column points based on the page width and the DataGridView Width

            // We will use this to determine the columns which are drawn on each page and how wrapping will be handled

            // By default, the wrapping will occurr such that the maximum number of columns for a page will be determine

            int k;
            int mStartPoint = 0;
            for (k = 0; k < currentGrid.Columns.Count; k++)
                if (currentGrid.Columns[k].Visible)
                {
                    mStartPoint = k;
                    break;
                }

            int mEndPoint = currentGrid.Columns.Count;
            for (k = currentGrid.Columns.Count - 1; k >= 0; k--)
                if (currentGrid.Columns[k].Visible)
                {
                    mEndPoint = k + 1;
                    break;
                }

            float mTempWidth = TheDataGridViewWidth;
            float mTempPrintArea = (float)PageWidth - (float)LeftMargin - (float)RightMargin;

            // We only care about handling where the total datagridview width is bigger then the print area

            if (TheDataGridViewWidth > mTempPrintArea)
            {

                mTempWidth = 0.0F;
                for (k = 0; k < currentGrid.Columns.Count; k++)
                {
                    if (currentGrid.Columns[k].Visible)
                    {
                        mTempWidth += ColumnsWidth[k];
                        // If the width is bigger than the page area, then define a new column print range

                        if (mTempWidth > mTempPrintArea)
                        {
                            mTempWidth -= ColumnsWidth[k];
                            mColumnPoints.Add(new int[] { mStartPoint, mEndPoint });
                            mColumnPointsWidth.Add(mTempWidth);
                            mStartPoint = k;
                            mTempWidth = ColumnsWidth[k];
                        }
                    }

                    // Our end point is actually one index above the current index

                    mEndPoint = k + 1;
                }
            }

            // Add the last set of columns

            mColumnPoints.Add(new int[] { mStartPoint, mEndPoint });
            mColumnPointsWidth.Add(mTempWidth);
            mColumnPoint = 0;
            boolDidCalculationsForCurrentGrid = true;

        }

        private void DrawTableHeader(Graphics g, string Text, Font tableHeaderFont)
        {

            StringFormat TitleFormat = new StringFormat();
            TitleFormat.Trimming = StringTrimming.Word;
            TitleFormat.FormatFlags = StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip;
            if (IsCenterOnPage)
                TitleFormat.Alignment = StringAlignment.Center;
            else
                TitleFormat.Alignment = StringAlignment.Near;
            RectangleF TitleRectangle = new RectangleF((float)LeftMargin, CurrentY, (float)PageWidth - (float)RightMargin - (float)LeftMargin, g.MeasureString(ThePageHeaderText, tableHeaderFont).Height);
            g.DrawString(Text, tableHeaderFont, new SolidBrush(Color.Black), TitleRectangle, TitleFormat);
            CurrentY += g.MeasureString(Text, tableHeaderFont).Height;
        }

        // The funtion that print the title, page number, and the header row

        private void DrawPageHeader(Graphics g)
        {
            // Printing the page number (if isWithPaging is set to true)

            if (IsWithPaging)
            {
                PageNumber++;
                string PageString = "Page " + PageNumber.ToString();
                StringFormat PageStringFormat = new StringFormat();
                PageStringFormat.Trimming = StringTrimming.Word;
                PageStringFormat.FormatFlags = StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip;
                PageStringFormat.Alignment = StringAlignment.Far;
                //bk

                Font PageStringFont = new Font("Tahoma", 8, FontStyle.Regular, GraphicsUnit.Point);
                float yCoord = (float)TopMargin;
                RectangleF PageStringRectangle = new RectangleF((float)LeftMargin, yCoord, (float)PageWidth - (float)RightMargin - (float)LeftMargin, g.MeasureString(PageString, PageStringFont).Height);
                g.DrawString(PageString, PageStringFont, new SolidBrush(Color.Black), PageStringRectangle, PageStringFormat);
                CurrentY += g.MeasureString(PageString, PageStringFont).Height;
            }

            // Printing the title (if IsWithPageHeader is set to true)

            if (IsWithPageHeader)
            {
                StringFormat TitleFormat = new StringFormat();
                TitleFormat.Trimming = StringTrimming.Word;
                TitleFormat.FormatFlags = StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip;
                if (IsCenterOnPage)
                    TitleFormat.Alignment = StringAlignment.Center;
                else
                    TitleFormat.Alignment = StringAlignment.Near;
                RectangleF TitleRectangle = new RectangleF((float)LeftMargin, CurrentY, (float)PageWidth - (float)RightMargin - (float)LeftMargin, g.MeasureString(ThePageHeaderText, ThePageHeaderFont).Height);
                g.DrawString(ThePageHeaderText, ThePageHeaderFont, new SolidBrush(ThePageHeaderColor), TitleRectangle, TitleFormat);
                CurrentY += g.MeasureString(ThePageHeaderText, ThePageHeaderFont).Height;
            }
        }
    }
}
