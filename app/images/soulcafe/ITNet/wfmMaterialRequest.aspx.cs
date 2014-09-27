using System;
using System.Data;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

public partial class wfmMaterialRequest : System.Web.UI.Page
{
    String strDocType;
    String strDocNo;
    String strAddEditDeleteStatus;
    DocProperties objDocProperties = new DocProperties();

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["UserLogin"] != null)
        {
            Session.LCID = 2057;
            if (!this.IsPostBack)
            {
                if (Request.QueryString.Count > 0)
                {
                    strDocType = Request.QueryString["DT"].ToString();
                    strDocNo = Request.QueryString["DN"].ToString();
                    strAddEditDeleteStatus = Request.QueryString["AED"].ToString();
                    ViewState["strDocNo"] = strDocNo;
                    ViewState["strAddEditDeleteStatus"] = strAddEditDeleteStatus;
                    ViewState["strDocType"] = strDocType;
                    ActualFormLoad();
                }
            }
            else
            {
                strDocNo = ViewState["strDocNo"].ToString();
                strAddEditDeleteStatus = ViewState["strAddEditDeleteStatus"].ToString();
                strDocType = ViewState["strDocType"].ToString();
                objDocProperties.DocType = strDocType;
                objDocProperties.Description = "Service Request";
            }
        }
        else
        {
            Response.Redirect(PublicVariables.HomePage);
        }
    }

    private void ActualFormLoad()
    {
        // Initialise Grid Columns to Array for further use 
        objDocProperties.DocType = strDocType;
        objDocProperties.Description = "Service Request";
        this.Title = objDocProperties.Description;

        DisplayData();
        DocumentalisedForm();

        //***
        //this.ToolBarPopulate(this, tbNavigator, objDocProperties, txtDocNo.Text);

        if (strAddEditDeleteStatus == "E")
        {
            tsbEdit_Click();
        }
        else if (strAddEditDeleteStatus == "SH")
        {
            DisplayControls();
        }
        else if (strAddEditDeleteStatus == "A")
        {
            tsbAdd_Click();
        }
    }

    private void DisplayData()
    {
        if (strAddEditDeleteStatus != "A")
        {
            DataSet dsDataset = new DataSet();
            DataTable dtTable = new DataTable();

            DataLayer dlDataLayer = new DataLayer();
            dlDataLayer.StartConnections();

            StoreProcedure stProc = new StoreProcedure("usp_ITNET_MRQ_DisplayData", dlDataLayer.conn);
            stProc.AddParameters("@strDocType", objDocProperties.DocType);
            stProc.AddParameters("@strDocNo", strDocNo);
            stProc.AddParameters("@strUserCode", Session["UserLogin"].ToString());
            stProc.AddParameters("@intIsList", 0);

            dsDataset = stProc.GetUspDataSet();
            dlDataLayer.CloseConnections();

            if (dsDataset.Tables.Count > 0)
            {
                dtTable = dsDataset.Tables[0];
                PopulateHeaderInformation(dtTable);

                dtTable = dsDataset.Tables[1];
                ValidateUserInformation(dtTable);
            }
        }
    }


    private void ValidateUserInformation(DataTable dtTable)
    {
        if (dtTable.Rows.Count > 0)
        {
            DataRow dtRow = dtTable.Rows[0];
            int ValidUser = PublicMethods.ToInt16(dtRow["VALIDUSER"]);
            switch (ValidUser)
            {
                case 1:  // Edit and Save
                    cmdSave.Visible = true;
                    cmdDelete.Visible = strAddEditDeleteStatus == "E" ? true : false;

                    break;
                case 2:  // Allow Approve
                    cmdSave.Visible = false;
                    cmdDelete.Visible = false;
                    break;
                case 3: // Allow Cancel Approve
                    cmdSave.Visible = false;
                    cmdDelete.Visible = false;
                    break;
                case 4:  // Allow View
                    cmdSave.Visible = false;
                    cmdDelete.Visible = false;
                    break;
            }

        }
    }

    private void PopulateHeaderInformation(DataTable dtTable)
    {
        if (dtTable.Rows.Count > 0)
        {
            DataRow dtRow = dtTable.Rows[0];
            txtDocNo.Text = dtRow["DOCNO"].ToString();
            lblDocDate.Text = dtRow["DOCDATE"].ToString();
            ddLStatus.Text = dtRow["REQ_STATUS"].ToString();
            ddLMaterialDocNo.Text = dtRow["MAT_DOCNO"].ToString();
            txtDescription.Text = dtRow["MAT_DESC"].ToString();
            ddLUnitDocNo.Text = dtRow["UNIT_DOCNO"].ToString();
            txtQty.Text = dtRow["QTY"].ToString();
            ddLLocationDocNo.Text = dtRow["LOCATION_DOCNO"].ToString();
            txtExpectedDate.Text = dtRow["EXPECTED_DATE"].ToString();
            ddlSeverity.Text = dtRow["SEVERITY"].ToString();
            ddlPriority.Text = dtRow["PRIORITY"].ToString();
            ddlAllocatedTo.Text = dtRow["ALLOCATEDTO"].ToString();
            txtRemarks.Text = dtRow["REMARKS"].ToString();
        }
    }

    private void tsbAdd_Click()
    {
        strAddEditDeleteStatus = "A";
        //        base.ClearControls(this.Controls);
        //        EditModeActive();
        lblDocDate.Text = DateTime.Today.ToString("dd/MM/yyyy");
        txtDocNo.Text = PublicMethods.GetLastDocNo(strDocType, Session["UserLogin"].ToString());
        //        base.AssignTextToTag(this.Controls);

        txtDocNo.Focus();
    }

    public void tsbEdit_Click()
    {
        strAddEditDeleteStatus = "E";
        //        EditModeActive();
        txtDocNo.ReadOnly = true;

        //        this.AssignTextToTag(this.Controls);
        //        dtpDocDate.Focus();
    }

    void EditModeActive()
    {
        //        this.LockControls(this.Controls, false);
        //        GridAddDelete(true);
        //        cmdCancelApprove.Enabled = true;
        //        tsbAdd.Enabled = false;
        //        tsbEdit.Enabled = false;
        //        tsbDelete.Enabled = false;
    }
    void DisplayControls()
    {
        //        base.LockControls(this.Controls, true);
        //        cmdCancelApprove.Enabled = false;
        cmdSave.Visible = false;
        cmdDelete.Visible = false;
        //        GridAddDelete(false); ;
    }

    private void DocumentalisedForm()
    {
        //        this.Text = objDocProperties.Description;
        //      this.lblDocDate.Text = objDocProperties.DocType + " Date";
        //        this.lblDocNo.Text = objDocProperties.DocType + " No";
    }

    private void TransactionSave()
    {
        if (Session["UserLogin"] != null)
        {

            bool SaveSuccessFully = false;
            if (CheckData() == true)
            {
                String dtCurrentDateTime = PublicMethods.QueryDateTime(PublicMethods.GetServerDateTime());

                DataLayer dlDataLayer = new DataLayer();
                try
                {
                    dlDataLayer.StartConnections();
                    dlDataLayer.BeginTrans();

                    if (strAddEditDeleteStatus == "E")
                    {
                        DeleteAll(dlDataLayer, dtCurrentDateTime);
                    }
                    SaveAll(dlDataLayer, dtCurrentDateTime);
                    PublicMethods.SaveAddEditDeleteStatus(txtDocNo.Text, strDocType,
                        PublicMethods.GetAddEditDeleteDisplayEnum(strAddEditDeleteStatus),
                        dlDataLayer, dtCurrentDateTime, Session["UserLogin"].ToString(),
                        Session["SystemName"].ToString(), Session["OSID"].ToString());
                    if (strAddEditDeleteStatus == "A")
                    {
                        PublicMethods.UpdateLastDocNo(strDocType, txtDocNo.Text, dlDataLayer, Session["UserLogin"].ToString());
                    }
                    dlDataLayer.CommitTrans();
                    SaveSuccessFully = true;
                    PublicMethods.MessageDisplay(cvValidator, "Document has Saved Successfully ", true);
                }
                catch (SqlException ex)
                {
                    dlDataLayer.RollBackTrans();
                    if (ex.Message.Contains("PRIMARY KEY constraint 'PK_" + "MATERIAL_REQUISITION" + "'") == true)
                    {
                        PublicMethods.MessageDisplay(cvValidator, objDocProperties.DocType + " " + this.txtDocNo.Text + " has already saved, do want you save as new document", false);
                    }
                    else
                        PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
                }
                catch (Exception ex)
                {
                    dlDataLayer.RollBackTrans();
                    PublicMethods.MessageDisplay(cvValidator, ex.Message, false);

                }
                if (SaveSuccessFully)
                {
                    //*
                    cmdSave.Visible = false;
                    cmdDelete.Visible = false;
                    lblSaveStatus.Text = "Document has saved successfully";
                    //                    "wfmProcessDocument.aspx?DT=" + strDocType + "&DN=" + txtDocNo.Text +
                    //                                            "&DSN=" + strDesignation);
                    //if (objDocProperties.AutoAddNewDocument == true && strAddEditDeleteStatus == "A")
                    //{
                    //    //ClearControls();    
                    //    tsbAdd_Click();
                    //    txtDocNo.Focus();
                    //}
                    //else
                    //{
                    //    strAddEditDeleteStatus = "SH";
                    //    //***
                    //    //                    this.ToolBarPopulate(this, tbNavigator, objDocProperties, txtDocNo.Text);
                    //    DisplayControls();
                    //}
                }
            }
        }
        else
        {
            Response.Redirect(PublicVariables.HomePage);
        }
    }


    private bool CheckData()
    {

        if (String.IsNullOrEmpty(txtDocNo.Text.Trim()))
        {
            PublicMethods.MessageDisplay(cvValidator, "Doc No should not be empty", false);

            if (txtDocNo.Enabled || txtDocNo.Visible)
                txtDocNo.Focus();
            return false;
        }
        return true;
    }

    private void SaveAll(DataLayer dlDataLayer, String dtCurrentDateTime)
    {
        String strSqlString = "";
        SqlObject sqlObj = new SqlObject();

        sqlObj.TableName = "MATERIAL_REQUISITION";
        if (strAddEditDeleteStatus == "A")
        {
            sqlObj.QueryType = PublicVariables.QueryType.Insert;
            PublicMethods.AddCreatedBYandTS(sqlObj, dtCurrentDateTime, Session["UserLogin"].ToString());
        }
        else
        {
            sqlObj.QueryType = PublicVariables.QueryType.Update;
            sqlObj.WhereCondition = " DOCTYPE = '" + objDocProperties.DocType + "' AND DOCNO = '" + txtDocNo.Text + "'";
        }

        sqlObj.AddColumns("DOCTYPE", objDocProperties.DocType, PublicVariables.DataType.Text);
        sqlObj.AddColumns("DOCNO", txtDocNo.Text.Trim(), PublicVariables.DataType.Text);
        sqlObj.AddColumns("DOCDATE", PublicMethods.QueryDateTime(lblDocDate.Text), PublicVariables.DataType.Date);
        sqlObj.AddColumns("REQ_STATUS", ddLStatus.Text, PublicVariables.DataType.Text);
        sqlObj.AddColumns("MAT_DOCNO", ddLMaterialDocNo.Text, PublicVariables.DataType.Text);
        sqlObj.AddColumns("MAT_DESC", txtDescription.Text, PublicVariables.DataType.Text);
        sqlObj.AddColumns("UNIT_DOCNO", ddLUnitDocNo.Text, PublicVariables.DataType.Text);
        sqlObj.AddColumns("QTY", PublicMethods.ToInt16(txtQty.Text), PublicVariables.DataType.Number);
        sqlObj.AddColumns("LOCATION_DOCNO", ddLLocationDocNo.Text, PublicVariables.DataType.Text);
        sqlObj.AddColumns("EXPECTED_DATE", PublicMethods.QueryDate(txtExpectedDate.Text), PublicVariables.DataType.Date);
        sqlObj.AddColumns("SEVERITY", ddlSeverity.Text, PublicVariables.DataType.Text);
        sqlObj.AddColumns("PRIORITY", ddlPriority.Text, PublicVariables.DataType.Text);
        sqlObj.AddColumns("ALLOCATEDTO", ddlAllocatedTo.Text, PublicVariables.DataType.Text);
        sqlObj.AddColumns("REMARKS", txtRemarks.Text, PublicVariables.DataType.Text);

        strSqlString = sqlObj.getSQlString();
        dlDataLayer.InsertDataTrans(strSqlString);
    }

    private void DeleteAll(DataLayer dlDataLayer, String dtCurrentDateTime)
    {
        SqlObject sqlObj = new SqlObject();
        String strHeaderSQLString = "";

        if (strAddEditDeleteStatus == "DEL")
        {
            PublicMethods.SaveAddEditDeleteStatus(txtDocNo.Text, objDocProperties.DocType,
                PublicMethods.GetAddEditDeleteDisplayEnum(strAddEditDeleteStatus), dlDataLayer,
                    dtCurrentDateTime, Session["UserLogin"].ToString(), Session["SystemName"].ToString(),
                    Session["OSID"].ToString());
            sqlObj.TableName = "MATERIAL_REQUISITION";
            sqlObj.QueryType = PublicVariables.QueryType.Delete;
            sqlObj.WhereCondition = " DOCTYPE = '" + objDocProperties.DocType + "' AND  DOCNO = '" + txtDocNo.Text + "'";
            strHeaderSQLString = sqlObj.getSQlString();
            dlDataLayer.DeleteDataTrans(strHeaderSQLString);

            PublicMethods.ApprovedDocumentNotDelete(strDocType, strDocNo, Session["UserLogin"].ToString(), dlDataLayer);
        }
    }

    private void DeleteData()
    {
        strAddEditDeleteStatus = "DEL";
        String dtCurrentDateTime = PublicMethods.QueryDateTime(PublicMethods.GetServerDateTime());
        bool DeleteSuccessFully = false;

        DataLayer dlDataLayer = new DataLayer();
        try
        {
            dlDataLayer.StartConnections();
            dlDataLayer.BeginTrans();
            DeleteAll(dlDataLayer, dtCurrentDateTime);
            PublicMethods.DeleteAttachmentsTableEntryAndFiles(strDocType, strDocNo, dlDataLayer);
            dlDataLayer.CommitTrans();
            PublicMethods.MessageDisplay(cvValidator, "Document has successfully deleted", true);
            PublicMethods.DeletePhysicalFile(strDocType, strDocNo, Server.MapPath(""));

            DeleteSuccessFully = true;
        }
        catch (Exception ex)
        {
            dlDataLayer.RollBackTrans();
            PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
        }
        finally
        {
            dlDataLayer.CloseConnections();

        }
        dlDataLayer.Dispose();
        strAddEditDeleteStatus = "SH";

        if (DeleteSuccessFully)
            CloseForm();
    }

    private void CloseForm()
    {
        //this.Dispose();
    }

    protected void cmdSave_Click(object sender, EventArgs e)
    {
        TransactionSave();
    }

    protected void cmdDelete_Click(object sender, EventArgs e)
    {
        DeleteData();
    }

    protected void gvAttachments_SelectedIndexChanged(object sender, EventArgs e)
    {
        GridView gvView = (GridView)sender;
        if (gvView.SelectedRow != null)
        {
            String strOriginalFile = gvView.SelectedRow.Cells[1].Text;
            String strStoredFileName = gvView.SelectedRow.Cells[2].Text;
            if (!String.IsNullOrEmpty(strDocNo))
            {
                Response.Redirect(PublicMethods.DownLoadFileFormLink(strOriginalFile, strStoredFileName));
            }
        }
    }

    protected void cmdAttachments_Click(object sender, EventArgs e)
    {
        Response.Redirect(PublicMethods.AttachmentFormLink(strDocType, strDocNo));
    }
}
