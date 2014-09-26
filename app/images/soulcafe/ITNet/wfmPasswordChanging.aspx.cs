using System;

public partial class wfmPasswordChanging : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void cmdChange_Click(object sender, EventArgs e)
    {
        String strOldPass = UserProperties.encryptPassword(txtOldPassword.Text);
        String strNewPass = UserProperties.encryptPassword(txtNewPassword.Text);
        String strConfirmPass = UserProperties.encryptPassword(txtConfirmNewPassword.Text);
       if(txtNewPassword.Text != txtConfirmNewPassword.Text)
       {
           PublicMethods.MessageDisplay(cvValidator,"New Passwords are not matching",false);
       }
       else
       {
           ChangePassword(strOldPass,strNewPass,strConfirmPass  );
       }
    }

    private void ChangePassword(String strOldPassword, String strNewPassword, String strConfirmNewPassword)
    {
        if (Session["UserLogin"] != null)
        {
            DataLayer dlDataLayer = new DataLayer();
            try
            {
                dlDataLayer.StartConnections();
                dlDataLayer.BeginTrans();
                StoreProcedure stUsp = new StoreProcedure("usp_ChangePassWord", dlDataLayer.conn, dlDataLayer.sqlTrans);
                stUsp.AddParameters("@strUserCode", Session["UserLogin"].ToString());
                stUsp.AddParameters("@strOldPassword", strOldPassword);
                stUsp.AddParameters("@strNewPassword", strNewPassword);
                stUsp.AddParameters("@strConfirmNewPassword", strConfirmNewPassword);
                stUsp.ExecuteNonQuery();
                dlDataLayer.CommitTrans();
                lblPassChanged.Text = "Password has successfully changed";
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
        }
        else
        {
            Response.Redirect(PublicVariables.HomePage);
        }
    }
}
