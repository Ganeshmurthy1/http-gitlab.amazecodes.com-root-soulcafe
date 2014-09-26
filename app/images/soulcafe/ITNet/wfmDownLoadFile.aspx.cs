using System;

public partial class wfmDownLoadFile : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        DownloadFile();
    }
    private void DownloadFile()
    {
        String strFilePath = Server.MapPath("") + "\\Uploads\\";
        String strOriginalFile = Request.QueryString["OF"]; //-- if something was passed to the file querystring
        String strStoredFile = Request.QueryString["SF"]; //-- if something was passed to the file querystring
        if (!String.IsNullOrEmpty(strOriginalFile)) ////get absolute path of the file
        {

            String path = strFilePath + strStoredFile ; //get file object as FileInfo
            System.IO.FileInfo file = new System.IO.FileInfo(path); //-- if the file exists on the server
            if (file.Exists) //set appropriate headers
            {
                Response.Clear();
                Response.AddHeader("Content-Disposition", "attachment; filename=" + strOriginalFile);
                Response.AddHeader("Content-Length", file.Length.ToString());
                Response.ContentType = "application/octet-stream";
                Response.WriteFile(file.FullName);
                Response.End();//if file does not exist
            }
            else
                Response.Write("This file does not exist.");

        }
        else
            Response.Write("Please provide a file to download.");
    }
}
