using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Excel = Microsoft.Office.Interop.Excel;
using Word = Microsoft.Office.Interop.Word;

using System.Reflection;

using System.Windows.Forms;
using Talent.Custom_Controls;
using System.Collections;
using System.Diagnostics;
using System.IO;
using Microsoft.Office.Interop.Word;

namespace Talent.Objects
{
    class ExportOptions
    {

        public string ConvertToHtmlFile(tlDataGrid dgvDataGrid, String HTMLFileName)
        {

            
            //Get a worker object.
            StringBuilder myStringBuilder = new StringBuilder();


            //Open tags and write the top portion.
            myStringBuilder.Append("<html xmlns='http://www.w3.org/1999/xhtml'>");
            myStringBuilder.Append("<head>");
            myStringBuilder.Append("<title>");
            myStringBuilder.Append("Page-");
            myStringBuilder.Append(Guid.NewGuid().ToString());
            myStringBuilder.Append("</title>");
            myStringBuilder.Append("</head>");
            myStringBuilder.Append("<body>");
            myStringBuilder.Append("<table border='1px' cellpadding='5' cellspacing='0' ");
            myStringBuilder.Append("style='border: solid 1px Silver; font-size: x-small;'>");
            //Add the headings row.

            myStringBuilder.Append("<tr align='left' valign='top'>");

            foreach (DataGridViewColumn myColumn in dgvDataGrid.Columns)
            {
                myStringBuilder.Append("<td align='left' valign='top'>");
                myStringBuilder.Append(myColumn.HeaderText);
                myStringBuilder.Append("</td>");
            }

            myStringBuilder.Append("</tr>");

            //Add the data rows.
            foreach (DataGridViewRow myRow in dgvDataGrid.Rows)
            {
                myStringBuilder.Append("<tr align='left' valign='top'>");

                foreach (DataGridViewColumn myColumn in dgvDataGrid.Columns)
                {
                    myStringBuilder.Append("<td align='left' valign='top'>");
                    myStringBuilder.Append(myRow.Cells[myColumn.Name].Value.ToString());
                    myStringBuilder.Append("</td>");
                }

                myStringBuilder.Append("</tr>");
            }

            //Close tags.
            myStringBuilder.Append("</table>");
            myStringBuilder.Append("</body>");
            myStringBuilder.Append("</html>");
            
            return myStringBuilder.ToString();
        }


        public void ConverttoExcelFile(tlDataGrid  dgvDataGrid, String SaveFileName)
        {

            Excel.Application oXL;
            Excel.Workbook oWB;
            Excel.Worksheet oSheet;
            Excel.Range oRange;

            // Start Excel and get Application object. 
            oXL = new Excel.Application();

//

            // Get a new workbook. 
            oWB = oXL.Workbooks.Add(Missing.Value);

            // Get the active sheet 
            oSheet = (Excel.Worksheet)oWB.ActiveSheet;
            oSheet.Name = "ExportData";

            // Set some properties 

//            oXL.Visible = true;
//            oXL.DisplayAlerts = false;
            
            // Process the DataTable 
            // BE SURE TO CHANGE THIS LINE TO USE *YOUR* DATATABLE 

            foreach (DataGridViewRow dgvRow in dgvDataGrid.Rows)
            {
                foreach (DataGridViewColumn dgvCol in dgvDataGrid.Columns)
                {
                    // Add the header the first time through 
                    if (dgvRow.Cells[dgvCol.Name].RowIndex == 0)
                    {
                        oSheet.Cells[1, dgvRow.Cells[dgvCol.Name].ColumnIndex + 1] = dgvCol.HeaderText;
                    }
                    oSheet.Cells[dgvRow.Cells[dgvCol.Name].RowIndex + 2, dgvRow.Cells[dgvCol.Name].ColumnIndex + 1] =
                            dgvRow.Cells[dgvCol.Name].Value.ToString();
                }
            }

            // Resize the columns 
            oRange = oSheet.get_Range(oSheet.Cells[1, 1],
                          oSheet.Cells[dgvDataGrid.Rows.Count, dgvDataGrid.Columns.Count]);
            oRange.EntireColumn.AutoFit();

            // Save the sheet and close 
            oSheet = null;
            oRange = null;
            oWB.SaveAs(SaveFileName, Excel.XlFileFormat.xlWorkbookNormal,
                Missing.Value, Missing.Value, Missing.Value, Missing.Value,
                Excel.XlSaveAsAccessMode.xlExclusive,
                Missing.Value, Missing.Value, Missing.Value,
                Missing.Value, Missing.Value);
            oWB.Close(Missing.Value, Missing.Value, Missing.Value);
            oWB = null;
            oXL.Quit();

            // Clean up 
            // NOTE: When in release mode, this does the trick 
            GC.WaitForPendingFinalizers();
            GC.Collect();
            GC.WaitForPendingFinalizers();
            GC.Collect();

        }

        public DataTable DataTableFromDataView(DataView obDataView)
        {
            return obDataView.Table;
            //if (null == obDataView)
            //{
            //    throw new ArgumentNullException
            //    ("DataView", "Invalid DataView object specified");
            //}

            //DataTable obNewDt = obDataView.Table.Clone();
            //int idx = 0;
            //string[] strColNames = new string[obNewDt.Columns.Count];
            //foreach (DataColumn col in obNewDt.Columns)
            //{
            //    strColNames[idx++] = col.ColumnName;
            //}

            //IEnumerator viewEnumerator = obDataView.GetEnumerator();
            //while (viewEnumerator.MoveNext())
            //{
            //    DataRowView drv = (DataRowView)viewEnumerator.Current;
            //    DataRow dr = obNewDt.NewRow();
            //    try
            //    {
            //        foreach (string strName in strColNames)
            //        {
            //            dr[strName] = drv[strName];
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //        Trace.WriteLine(ex.Message);
            //    }
            //    obNewDt.Rows.Add(dr);
            //}

            //return obNewDt;
        }


        public void ConvertToWord(tlDataGrid dgvDataGrid, String FileName)
        {

            object missing = System.Reflection.Missing.Value;
            object Visible = true;
            object start1 = 0;
            object end1 = 0;
            ApplicationClass WordApp = new ApplicationClass();
            Document adoc = WordApp.Documents.Add(ref missing, ref missing, ref missing, ref missing);
            Range rng = adoc.Range(ref start1, ref missing);
            try
            {
                rng.Font.Name = "Georgia";
                foreach (DataGridViewColumn dgvCol in dgvDataGrid.Columns)
                {
                    if (dgvCol.Visible)
                        rng.InsertAfter(dgvCol.HeaderText + '\t');
                }
                rng.InsertAfter("" + '\n');
                foreach (DataGridViewRow dgvRow in dgvDataGrid.Rows  )
                {
                    foreach (DataGridViewColumn dgvCol in dgvDataGrid.Columns)
                    {
                        if (dgvCol.Visible)
                            rng.InsertAfter(dgvRow.Cells[dgvCol.Name].Value.ToString() + '\t');
                    }
                    rng.InsertAfter("" + '\n');
                } 
                object filename = FileName; 
                adoc.SaveAs(ref filename, ref missing, ref missing, 
                    ref missing, ref missing, ref missing, 
                    ref missing, ref missing, ref missing, 
                    ref missing, ref missing, ref missing, 
                    ref missing, ref missing, ref missing, ref missing); 
                WordApp.Visible = true;
            }
            catch (Exception ex) { MessageBox.Show(ex.Message); }
        }
    
        public String SaveFileDialogShowing()
        {
            SaveFileDialog saveFile = new SaveFileDialog();
            String strRetValue = "";
            try
            {

                saveFile.ShowDialog();
                strRetValue = saveFile.FileName;
            }
            catch (Exception ex)
            {
                strRetValue = "";
            }

            return strRetValue;
        }
    }
}
