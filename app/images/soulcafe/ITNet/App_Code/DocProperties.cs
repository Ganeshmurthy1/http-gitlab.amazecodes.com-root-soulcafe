using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;


    public class DocProperties
    {
        public string DocType;
        public String Description;

        //public void Populate(String strDocType)
        //{
        //    DataSet dsDataset = new DataSet();
        //    DataTable dtTable = new DataTable();

        //    DataLayer dlDataLayer = new DataLayer();

        //    dlDataLayer.StartConnections();
        //    StoreProcedure stProc = new StoreProcedure("usp_DocMasterData", dlDataLayer.conn);
        //    stProc.AddParameters("@strDocType", strDocType);
        //    stProc.AddParameters("@strUserCode", Session["UserLogin"].ToString());
        //    dsDataset = stProc.GetUspDataSet();
        //    dlDataLayer.CloseConnections();

        //    dsDataset.Tables[0].TableName = "DOC_MASTER";
        //    dtTable = dsDataset.Tables["DOC_MASTER"];
        //    if (dtTable.Rows.Count > 0)
        //    {
        //        this.DocType = dtTable.Rows[0]["DOCNO"].ToString();
        //        this.Description = dtTable.Rows[0]["DOC_DESCRIPTION"].ToString();
        //        this.HeaderTableName = dtTable.Rows[0]["HEADER_TABLE_NAME"].ToString();
        //        this.DetailTableName = dtTable.Rows[0]["DETAIL_TABLE_NAME"].ToString();
        //        this.DetailScreen = dtTable.Rows[0]["DETAIL_SCREEN"].ToString();
        //        this.USPPrefix = dtTable.Rows[0]["USP_PREFIX"].ToString();
        //        this.FormName = dtTable.Rows[0]["FORMNAME"].ToString();
        //        this.Numbering = PublicVariables.Numbering.AutoNumber;
        //        this.DocNumberLowerLimit = dtTable.Rows[0]["DOC_NUMBER_LOWER_LIMIT"].ToString();
        //        this.DocNumberHigherLimit = dtTable.Rows[0]["DOC_NUMBER_HIGHER_LIMIT"].ToString();
        //        this.ActionsOnSave = PublicMethods.ToInt16(dtTable.Rows[0]["ACTIONS_ON_SAVE"].ToString()) == 1;
        //    }
        //}
    }
