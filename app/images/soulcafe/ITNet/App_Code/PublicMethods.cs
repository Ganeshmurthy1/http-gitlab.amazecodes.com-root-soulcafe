using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Reflection;
using System.Data;
using System.Configuration;
using System.Net;
using System.IO;
public static class PublicMethods
{

    public static Int32 ToInt32(Object objNumber)
    {
        Int32 intRetValue = 0;
        if (objNumber != null)
            try
            {
                intRetValue = Convert.ToInt32(objNumber);
            }
            catch (Exception ex)
            {
                intRetValue = 0;
            }
        return intRetValue;
    }
    /// <summary>
    ///  Convert object ot int 16
    /// </summary>
    public static Int16 ToInt16(Object objNumber)
    {
        Int16 intRetValue = 0;
        if (objNumber != null)
            try
            {
                intRetValue = Convert.ToInt16(objNumber);
            }
            catch (Exception ex)
            {
                intRetValue = 0;
            }
        return intRetValue;
    }

    /// <summary>
    ///  Convert object ot int 16
    /// </summary>
    public static Single ToSingle(Object objNumber)
    {
        Single slRetValue = 0;
        if (objNumber != null)
            try
            {
                slRetValue = Convert.ToSingle(objNumber);
            }
            catch (Exception ex)
            {
                slRetValue = 0;
            }
        return slRetValue;
    }

    /// <summary>
    /// Covert object to Double value
    /// </summary>
    public static double ToDouble(Object objNumber)
    {
        double dblRetValue = 0;
        if (objNumber != null)
            try
            {
                dblRetValue = Convert.ToDouble(objNumber);
            }
            catch (Exception ex)
            {
                dblRetValue = 0;
            }
        return dblRetValue;
    }
    // Add Edit Delete Save
    public static void SaveAddEditDeleteStatus(String DocNo, String DocType,
                            PublicVariables.AddEditDeleteDisplay Status,
                            DataLayer dlDataLayer,  
                            String dtCurrentDateTime, String strUserCode,
                            String strSystemName, String strOSID)
    {
        SqlObject objSQl = new SqlObject();
        String strSQLString = "";
        objSQl.TableName = "ADD_EDIT_DELETE_DOCUMENTS";
        objSQl.QueryType = PublicVariables.QueryType.Insert;

        objSQl.AddColumns("DOCNO", DocNo, PublicVariables.DataType.Text);
        objSQl.AddColumns("DOCTYPE", DocType, PublicVariables.DataType.Text);
        objSQl.AddColumns("TRANS_DATE", dtCurrentDateTime, PublicVariables.DataType.Date);
        objSQl.AddColumns("STATUS", PublicMethods.ToInt16(Status), PublicVariables.DataType.Number);
        objSQl.AddColumns("USER_CODE", strUserCode, PublicVariables.DataType.Text);
        objSQl.AddColumns("SYSTEM_NAME", strSystemName, PublicVariables.DataType.Text);
        objSQl.AddColumns("OS_USER_ID", strOSID, PublicVariables.DataType.Text);

        strSQLString = objSQl.getSQlString().ToString();

        dlDataLayer.InsertDataTrans(strSQLString);
    }

    public static DateTime GetServerDateTime()
    {
        DataLayer dlDataLayer = new DataLayer();

        DateTime dtDate;
        dlDataLayer.StartConnections();
        StoreProcedure stUsp = new StoreProcedure("usp_GetServerDateTime", dlDataLayer.conn);
        dtDate = (DateTime)stUsp.ExecuteScalar();
        dlDataLayer.CloseConnections();
        return dtDate;
    }

    public static String GetUniqueIDDateTime()
    {
        String strNewIdDateTime;
        DataLayer dlDataLayer = new DataLayer();
        dlDataLayer.StartConnections();
        StoreProcedure stUsp = new StoreProcedure("usp_GetUniqueIDDateTime", dlDataLayer.conn);
        strNewIdDateTime = (String)stUsp.ExecuteScalar();
        return strNewIdDateTime;
    }

    public static String GetUniqueID()
    {
        String strNewId;
        DataLayer dlDataLayer = new DataLayer();
        dlDataLayer.StartConnections();
        StoreProcedure stUsp = new StoreProcedure("usp_GetUniqueID", dlDataLayer.conn);
        strNewId = (String)stUsp.ExecuteScalar();
        return strNewId;
    }




    public static void FailedLoginAttempt(String strUserId, DataLayer dlDataLayer, 
                String dtCurrentDateTime, String strSystemName, String strOSUserId)
    {
        SqlObject objSQl = new SqlObject();
        String strSQLString = "";

        objSQl.TableName = "FAILED_LOGIN_ATTEMPT";
        objSQl.QueryType = PublicVariables.QueryType.Insert;

        objSQl.AddColumns("USER_CODE", strUserId, PublicVariables.DataType.Text);
        objSQl.AddColumns("ACTION_DATE", dtCurrentDateTime, PublicVariables.DataType.Date);
        objSQl.AddColumns("SYSTEM_NAME", strSystemName, PublicVariables.DataType.Text);
        objSQl.AddColumns("OS_USER_ID", strOSUserId, PublicVariables.DataType.Text);

        strSQLString = objSQl.getSQlString().ToString();
        dlDataLayer.InsertDataTrans(strSQLString);
        objSQl = null;
    }


    public static String QueryDateTime(DateTime dtDate)
    {
        String strDate = dtDate.ToString(PublicVariables.YearMonthDateLongFormat);
        return strDate;
    }

    public static String QueryDateTime(String strParamDate)
    {
        String strDate;
        if (!String.IsNullOrEmpty(strParamDate))
        {
            DateTime dtDate = Convert.ToDateTime(strParamDate);
            strDate = dtDate.ToString(PublicVariables.YearMonthDateLongFormat);
        }
        else
            strDate = strParamDate;
        return strDate;
    }

    public static String QueryDate(DateTime dtDate)
    {
        String strDate = dtDate.ToString(PublicVariables.YearMonthDateShortFormat);
        return strDate;
    }

    public static String QueryDate(String strParamDate)
    {
        String strDate;
        if (!String.IsNullOrEmpty(strParamDate))
        {
            DateTime dtDate = Convert.ToDateTime(strParamDate);
            strDate = dtDate.ToString(PublicVariables.YearMonthDateShortFormat);
        }
        else
            strDate = strParamDate;
        return strDate;
    }


    public static string GetLastDocNo(String strDocType, String strUserCode)
    {
        String strDocNo;
        DataLayer dlDataLayer = new DataLayer();
        DataSet dsDataSet = new DataSet();
        DataTable dtTable = new DataTable();
        dlDataLayer.StartConnections();
        StoreProcedure stUsp = new StoreProcedure("usp_GetLastDocNo", dlDataLayer.conn);
        stUsp.AddParameters("@strDocType", strDocType);
        stUsp.AddParameters("@strUserCode", strUserCode);
        stUsp.AddParameters("@strLastDocNo", "", System.Data.ParameterDirection.Output);

        strDocNo = (String)stUsp.ExecuteScalar();

        dlDataLayer.CloseConnections();
        dlDataLayer.Dispose();
        return strDocNo;
    }


    public static void UpdateLastDocNo(String strDocType, String strDocNo, DataLayer dlDataLayer, String strUserCode)
    {
        StoreProcedure stUsp = new StoreProcedure("usp_UpdateLastDocNo", dlDataLayer.conn, dlDataLayer.sqlTrans);
        stUsp.AddParameters("@strDocType", strDocType);
        stUsp.AddParameters("@strUserCode", strUserCode);
        stUsp.AddParameters("@strLastDocNo", strDocNo);
        stUsp.ExecuteNonQuery();
    }

    public static void AddCreatedBYandTS(SqlObject sqlObj, String dtCurrentDateTime, String strUserCode)
    {
        sqlObj.AddColumns("CREATED_BY", strUserCode, PublicVariables.DataType.Text);
        sqlObj.AddColumns("CREATED_TS", dtCurrentDateTime, PublicVariables.DataType.Date);
    }

    public static String CheckFields(Object objData, String strFieldName)
    {
        String strRetValue = "";
        if (String.IsNullOrEmpty(objData.ToString() + String.Empty) == true)
            strRetValue = strFieldName + " should not be empty; ";
        return strRetValue;
    }

    public static bool IsDate(string sdate)
    {
        DateTime dt;
        bool isDate = true;
        try
        {
            dt = DateTime.Parse(sdate);
        }
        catch
        {
            isDate = false;
        }
        return isDate;
    }



    public static bool PasswordValidating(String LoginId, String PassWord)
    {
        Boolean blRetValue = false;
        DataTable dtTable = new DataTable();
        DataLayer dlDataLayer = new DataLayer();
        String strEntryPass = UserProperties.encryptPassword(PassWord);
        dlDataLayer.StartConnections();
        String strSQL = "SELECT docno FROM user_master WHERE docno ='" + LoginId + "' ";
        dtTable = dlDataLayer.GetDataTable(strSQL);
        if (dtTable.Rows.Count > 0)
        {
            strSQL = "SELECT docno FROM user_master WHERE docno ='" +
                        LoginId + "' AND user_password ='" + strEntryPass + "'";
            dtTable = dlDataLayer.GetDataTable(strSQL);
            if (dtTable.Rows.Count > 0)
                blRetValue = true;
            else
                blRetValue = false;
        }
        else
            blRetValue = false;
        dlDataLayer.CloseConnections();
        return blRetValue;
    }

    public static String SendMail(String strFrom, String strTo, String strSubject, String strBody, String strAttachment)
    {
        String strRetValue = "";
        try
        {
            System.Net.Mail.MailMessage message = new System.Net.Mail.MailMessage("ITNET@carrier.ae", strTo);
            message.Subject = strSubject;
            message.Body = strBody;
            message.IsBodyHtml = true;
            System.Net.Mail.SmtpClient smClient = new System.Net.Mail.SmtpClient(ConfigurationManager.ConnectionStrings["MailServer"].ConnectionString);
            smClient.Send(message);
        }
        catch (Exception ex)
        {
            strRetValue = ex.Message;
        }
        return strRetValue;
    }

    public static PublicVariables.AddEditDeleteDisplay GetAddEditDeleteDisplayEnum(String strAedshow)
    {
        PublicVariables.AddEditDeleteDisplay RetValue = PublicVariables.AddEditDeleteDisplay.Display ;
        switch (strAedshow)
        {
            case "A":
                RetValue = PublicVariables.AddEditDeleteDisplay.Add;
                break;
            case "E":
                RetValue = PublicVariables.AddEditDeleteDisplay.Edit;
                break;
            case "DEL":
                RetValue = PublicVariables.AddEditDeleteDisplay.Delete;
                break;
            case "SHOW":
                RetValue = PublicVariables.AddEditDeleteDisplay.Display;
                break;
        }
        return RetValue;
    }

    public static String GetFormLink(String strDocType, String strDocNo, String AddorEditorDisplay,
                String strDestination, String strApproval)
    {
        String strRetString = "";

        switch (strDocType)
        {
            case "SVR":
                strRetString = "wfmServiceRequest.aspx?" + "DT=" + strDocType + "&DN=" +
                            strDocNo + "&AED=" + AddorEditorDisplay + "&DSN=" +
                            strDestination;
                break;
            case "APL":
                strRetString = "wfmApprovalRequests.aspx?" + "DT=" + strDocType + "&DN=" +
                            strDocNo + "&AED=" + AddorEditorDisplay ;
                break;
        }
        return strRetString;
    }

    public static String ApprovePage(String strDocType, String strDocNo,
                        String strUserCode, String strEmailOrPage, String strUniqueId)
    {
        return "wfmAppReqEmailApproval.aspx?DT="  + strDocType +
                                          "&DN="  + strDocNo +
                                          "&UR="  + strUserCode +
                                          "&EP="  + strEmailOrPage +
                                          "&UID=" + strUniqueId;
    }

    public static String AttachmentFormLink(string strDocType, string strDocNo)
    {
        return ("wfmFileUpload.aspx?" + "DT=" + strDocType + "&DN=" + strDocNo);
    }

    public static String ApprovalStatusFormLink(string strDocType, string strDocNo, string strHeading)
    {
        return ("wfmApprovalStatus.aspx?" + "DT=" + strDocType + "&DN=" + strDocNo + "&HD=" + strHeading);
    }

    public static String ProcessFormLink(string strDocType, string strDocNo, string strDesignation, string strAttach)
    {
        return  ("wfmProcessDocument.aspx?DT=" + strDocType + "&DN=" + strDocNo  +
                        "&DSN=" + strDesignation + "&ATT=" + strAttach );
    }

    public static String DownLoadFileFormLink(string strOriginalFile, string strStoredFile)
    {
        return ("wfmDownLoadFile.aspx?OF=" + strOriginalFile + "&SF=" + strStoredFile);
    }

    public static void MessageDisplay(System.Web.UI.WebControls.CustomValidator cvValidator, String strMessage, bool isValid)
    {
        cvValidator.Text = strMessage;
        cvValidator.IsValid = isValid;
    }

    public static String SendMailForNextApproval(System.Web.UI.WebControls.CustomValidator cvValidator, DataLayer dlDataLayer,
                String strDocType, String strDocNo,
                String strLoginUserCode, String strLoginUserEmail)
    {
        DataSet dsDataSet = new DataSet();
        DataTable dtTable = new DataTable();
        String strUniqueId = "";
        String strMailResult = "";
        StoreProcedure stUsp = new StoreProcedure("usp_ITNET_GetNextApproval", dlDataLayer.conn);
        stUsp.AddParameters("@strDocType", strDocType);
        stUsp.AddParameters("@strDocNo", strDocNo);
        stUsp.AddParameters("@strUserCode", strLoginUserCode);
        dsDataSet = stUsp.GetUspDataSet();

        if (dsDataSet.Tables.Count > 0)
        {
            dtTable = dsDataSet.Tables[0];
            if (dtTable.Rows.Count > 0)
            {
                DataRow dtRow = dtTable.Rows[0];
                String strToEmail = "Sebastian.john@carrier.utc.com"; // dtRow["EMAIL"].ToString();
                String strToUserCode = dtRow["APPROVED_BY"].ToString();
                strUniqueId = dtRow["UNIQUE_ID"].ToString();
                if (String.IsNullOrEmpty(strToEmail))
                    PublicMethods.MessageDisplay(cvValidator, strToEmail, false);
                else
                {
                    string strBody;
                    if (!String.IsNullOrEmpty(dtRow["REMARKS_FROM_NEXT"].ToString()))
                        strBody = "Your approval for " + strDocType + " " + strDocNo + "has been returned " +
                            "Message from sender : " + dtRow["REMARKS_FROM_NEXT"].ToString();
                    else
                        strBody = GetApprovalEmailPageLink(strDocType, strDocNo, strToUserCode, strUniqueId);
                    strMailResult = PublicMethods.SendMail(strLoginUserEmail, strToEmail, "", strBody, "");
                    if (!String.IsNullOrEmpty(strMailResult))
                        PublicMethods.MessageDisplay(cvValidator, strMailResult, false);
                }
            }
        }
        return strMailResult;
    }

    public static string GetApprovalEmailPageLink(string strDocType,
                string strDocNo, string strToUserCode, string strUniqueId)
    {

        Uri uriString = new Uri(PublicVariables.WebPathString + "wfmAppReqEmailApproval.aspx?DT=" + strDocType +
                                        "&DN=" + strDocNo + "&UR=" + strToUserCode + "&EP=EMAIL" +
                                        "&UID=" + strUniqueId);
        String strBody = ScreenScrapeHtml(uriString);

        return strBody;
    }

    public static string ScreenScrapeHtml(Uri  url)
    {
        WebRequest objRequest = System.Net.HttpWebRequest.Create(url);
        StreamReader sr = new StreamReader(objRequest.GetResponse().GetResponseStream());
        string result = sr.ReadToEnd();
        sr.Close();
        return result;
    }

    //public  static string GetString(string url)
    //{

    //    WebClient wc = new WebClient();
    //    Stream resStream = wc.OpenRead(url);
    //    StreamReader sr = new StreamReader(resStream, System.Text.Encoding.Default);
    //    string ContentHtml = sr.ReadToEnd();
    //    return ContentHtml;
    //}


    public static void ApprovedDocumentNotDelete(String strDocType, String strDocNo, String strUserCode, DataLayer dlDataLayer)
    {
        StoreProcedure stUsp = new StoreProcedure("usp_INTRA_ApprovedDocNotDelete", dlDataLayer.conn, dlDataLayer.sqlTrans );
        DataTable dtTable = new DataTable();
        stUsp.AddParameters("@strDocType", strDocType);
        stUsp.AddParameters("@strDocNo", strDocNo);
        stUsp.AddParameters("@strUserCode", strUserCode);
        stUsp.ExecuteNonQuery();
    }

    public static void DeletePhysicalFile(string strDocType, string strDocNo, string strServerMapPath)
    {
        DataLayer dlDataLayer = new DataLayer();

        String strSqlString = "SELECT  * FROM ITNET_ATTACHMENTS  WHERE DOCTYPE = '" + strDocType +
                        "' AND  DOCNO = '" + strDocNo + "'";
        dlDataLayer.StartConnections();
        DataTable dtTable = dlDataLayer.GetDataTable(strSqlString);
        dlDataLayer.CloseConnections();
        foreach (DataRow dtRow in dtTable.Rows)
        {
            String strStoredFile = dtRow["STORED_NAME"].ToString();
            String path = strServerMapPath + "\\Uploads\\" + strStoredFile; //get file object as FileInfo
            System.IO.FileInfo file = new System.IO.FileInfo(path); //-- if the file exists on the server
            if (file.Exists)
            {
                file.Delete();
            }
        }

        dtTable.Dispose();
    }

    public static void DeleteAttachmentsTableEntryAndFiles(String strDocType, String strDocNo, DataLayer dlDataLayer)
    {
        String strSqlString = "";
        SqlObject sqlObj = new SqlObject();

        sqlObj.TableName = "ITNET_ATTACHMENTS";
        sqlObj.QueryType = PublicVariables.QueryType.Delete;
        sqlObj.WhereCondition = " DOCTYPE = '" + strDocType + "' AND  DOCNO = '" + strDocNo + "'";
        strSqlString = sqlObj.getSQlString();
        // Physical File deleting
        dlDataLayer.DeleteDataTrans(strSqlString);
    }


    public static String GotoHomePage()
    {
        return "PageStart.aspx";
    }
}
