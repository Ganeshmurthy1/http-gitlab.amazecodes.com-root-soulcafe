
// God is great all the time
using System;
using System.Data;
using System.Web.UI.WebControls;

public partial class PageStart : System.Web.UI.Page
{
    Int16 intLoginCount = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["UserLogin"] == null)
        {
            Session.LCID = 2057;
            if (!this.IsPostBack)
            {
                LoginScreenShow();
                ActualFormLoad();
            }
        }
        else
        {
            if (Session["UserLogin"] != null && Session["UserPsd"] != null)
                LoginScreen(Session["UserLogin"].ToString(), Session["UserPsd"].ToString());
            LogoutScreenShow();
        }
    }

    private void ActualFormLoad()
    {
        PublicVariables.WebPathString = "http://" + Request.Url.Authority + Request.ApplicationPath.ToString() + "/";

    }

    private void ExecuteData()
    {
        this.Title = "ITNET Application";
        DataSet dtDataSet = new DataSet();
        DataLayer dlDataLayer = new DataLayer();
        dlDataLayer.StartConnections();
        StoreProcedure stProc = new StoreProcedure("usp_ITNET_PageStart", dlDataLayer.conn);
        stProc.AddParameters("@strUserCode", Session["UserLogin"].ToString());
        stProc.AddParameters("@strSystemName", Session["SystemName"].ToString());
        stProc.AddParameters("@strOSID", Session["OSID"].ToString());
        dtDataSet = stProc.GetUspDataSet();
        dlDataLayer.CloseConnections();
        dlDataLayer.Dispose();

        MenuShowing(dtDataSet.Tables[0]);
    }

    private void MenuShowing(DataTable dtTable)
    {
        buildtree(dtTable, treMenu);
    }

    private void buildtree(DataTable dtTable, TreeView treeViewCtrl)
    {
        treeViewCtrl.Nodes.Clear();    // Clear any existing items
        LoadBaseNodes(dtTable, treeViewCtrl);            // load all the lowest tree nodes
        treMenu.ExpandAll()  ;
    }

    private void LoadBaseNodes(DataTable dtTable, TreeView treeViewCtrl)
    {
        int baseParent = 0;                 // Find the lowest root category parent value
        TreeNode node;
        //foreach (DataRow dtRow in dtTable.Rows)
        //{
        //    if (Convert.ToInt32(dtRow["PARENT"].ToString()) < baseParent)
        //        baseParent = Convert.ToInt32(dtRow["PARENT"].ToString());
        //}
        foreach (DataRow dtRow in dtTable.Rows)         // iterate through the categories
        {
            if (Convert.ToInt32(dtRow["PARENT"]) == baseParent)     // found a matching root item
            {
                //                NodeTag ntNodeTag = new NodeTag();
                String strTagValue = PopulateData(dtRow);
                node = new TreeNode();
                node.Text = dtRow["TEXT"].ToString();
                treeViewCtrl.Nodes.Add(node); // add it to the tree
                node.Value = strTagValue;     // send the category into the tag for future processing
                getChildren(node, dtTable);   // load all the children of this node
            }
        }
    }

    // recursive tree loader. Passes back in a node to retireve its childre
    // until there are no more children for this node.
    private void getChildren(TreeNode treeNode, DataTable dtTable)
    {
        TreeNode Node = null;
        String strPntNodeTagValue = treeNode.Value;   // get the category for this node
        foreach (DataRow dtRow in dtTable.Rows)         // locate all children of this category
        {
            if (dtRow["PARENT"].ToString() == GetMenuProperty(strPntNodeTagValue, 0))     // found a child
            {
                //NodeTag ntNodeTag = new NodeTag();
                //ntNodeTag.PopulateData(dtRow);
                String strTagValue = PopulateData(dtRow);

                Node = new TreeNode();
                Node.Text = dtRow["TEXT"].ToString();
                treeNode.ChildNodes.Add(Node);    // add the child
                Node.Value = strTagValue;                               // set its tag to its category
                getChildren(Node, dtTable);                         // find this child's children
            }
        }
    }

    private string GetMenuProperty(string strPntNodeTagValue, int intIndex)
    {
        string strRetValue = "";
        char[] chrAstrick = { '*' };
        String[] strSplit = strPntNodeTagValue.Split(chrAstrick);

        if (strSplit.Length > 0)
            strRetValue = strSplit[intIndex].ToString();

        return strRetValue;
    }

    private string PopulateData(DataRow dtRow)
    {
        string strSlno;
        strSlno = dtRow["SLNO"].ToString();

        return (strSlno + "*" +
                        dtRow["PARENT"].ToString() + "*" +
                        dtRow["ID"].ToString() + "*" +
                        dtRow["MENUNAME"].ToString() + "*" +
                        dtRow["TEXT"].ToString() + "*" +
                        dtRow["SHORTCUTS"].ToString() + "*" +
                        dtRow["TOOLTIPS"].ToString() + "*" +
                        dtRow["ICONS"].ToString() + "*" +
                        dtRow["TOOLICONS"].ToString() + "*" +
                        dtRow["PARAMETERS"].ToString() + "*" +
                        dtRow["OPTIONTYPE"].ToString() + "*");
    }

    protected void treMenu_SelectedNodeChanged(object sender, EventArgs e)
    {
        DataTable dtTable = new DataTable();
        TreeView treeview = (TreeView)sender;
        TreeNode Node = treeview.SelectedNode;
        if (!String.IsNullOrEmpty(Node.Value))
        {
            if (Node.ChildNodes.Count <= 0)
            {
                Response.Redirect(GetMenuProperty(Node.Value, 3));
            }
        }
    }

    protected void cmdLogin_Click(object sender, EventArgs e)
    {
        String strEntryPass = UserProperties.encryptPassword(txtPassword.Text);
        Session["UserPsd"] = strEntryPass;
        LoginScreen(txtLogin.Text, strEntryPass);
    }


    private void LoginScreen(string strLoginUserId, string strLoginPassword)
    {
        intLoginCount++;
        int intValue = 0;
        {
            DataSet dtDataSet = new DataSet();
            DataLayer dlDataLayer = new DataLayer();
            dlDataLayer.StartConnections();
            StoreProcedure stProc = new StoreProcedure("usp_LoginData", dlDataLayer.conn);
            stProc.AddParameters("@strUserId", strLoginUserId);
            stProc.AddParameters("@strPassWord", strLoginPassword);
            stProc.AddParameters("@intRetValue", 0, ParameterDirection.Output);

            dtDataSet = stProc.GetUspDataSet();
            intValue = PublicMethods.ToInt16(stProc.GetParameterValue("@intRetValue"));
            dlDataLayer.CloseConnections();
            dlDataLayer.Dispose();

            if (intValue == 1)
            {
                if (!PopulateUserProperties(dtDataSet))
                {
                    PublicMethods.MessageDisplay(cvValidator, "User Table structure having some problem, contact the software administrator", false);
                }
                dtDataSet.Clear();
                dtDataSet = null;
            }
        }

        //PublicVariables.LoginSuccess = intValue == 1;


        if (intValue == 1)
        {
//            PopulateSessionProperties();
            lblLoggedInUser.Text = Session["UserName"].ToString();
            ExecuteData();
            divLogin.Visible = false;
            divLoggedIn.Visible = true;
//            ltrHRLogo.Visible = false;
        }
        else
        {
            String dtCurrentDateTime = PublicMethods.QueryDateTime(PublicMethods.GetServerDateTime());

            DataLayer dlSubLayer = new DataLayer();
            dlSubLayer.StartConnections();
            try
            {
                PublicMethods.FailedLoginAttempt(txtLogin.Text, dlSubLayer, dtCurrentDateTime,
                                    Session["SystemName"].ToString(), Session["OSID"].ToString());
                txtPassword.Text = "";
            }
            catch (Exception ex)
            {
                PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
            }
            finally
            {
                dlSubLayer.CloseConnections();
                dlSubLayer.Dispose();
            }
            PublicMethods.MessageDisplay(cvValidator, "Invalid Login or Password", false);

            if (intLoginCount >= PublicVariables.NoofGraceLogin)
            {
                PublicMethods.MessageDisplay(cvValidator, "Login Expired", false);
            }
        }
    }

    protected void cmdLogout_Click(object sender, EventArgs e)
    {
        Session["UserLogin"] = null;
        Session.Clear();
        Response.Redirect(PublicVariables.HomePage);
    }

    private void LogoutScreenShow()
    {
        divLogin.Visible = false;
        divLoggedIn.Visible = true;
    }

    private void LoginScreenShow()
    {
        Session["UserLogin"] = null;
        Session["UserPsd"] = null;
        divLogin.Visible = true;
        divLoggedIn.Visible = false;
    }

    public Boolean PopulateUserProperties(DataSet dtDataSet)
    {
        Boolean blRetValue = false;
        DataTable dtTable = new DataTable();
        if (dtDataSet.Tables.Count > 0)
        {
            dtTable = dtDataSet.Tables[0];
            if (dtTable.Rows.Count > 0)
            {
                Session["UserLogin"] = dtTable.Rows[0]["DOCNO"].ToString();
                Session["Email"] = dtTable.Rows[0]["EMAIL"].ToString();
                Session["UserName"] = dtTable.Rows[0]["NAME"].ToString();
                Session["SystemName"] = System.Net.Dns.GetHostEntry(Request.ServerVariables["remote_host"]).HostName; // Request.ServerVariables["REMOTE_HOST"].ToString();
                Session["OSID"] = Context.User.Identity.Name;
                blRetValue = true;
            }
        }
        return blRetValue;
    }

}
