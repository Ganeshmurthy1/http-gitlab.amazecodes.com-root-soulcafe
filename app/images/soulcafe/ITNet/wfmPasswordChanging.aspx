<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmPasswordChanging.aspx.cs" Inherits="wfmPasswordChanging" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="cssleave.css" type="text/css" rel="stylesheet"/> 
    <title>Change Password</title>
    <style type="text/css">
        .style1
        {
            width: 260px;
        }
        #Password3
        {
            width: 175px;
        }
        #Password2
        {
            width: 173px;
        }
        #Password1
        {
            width: 174px;
        }
        #txtConfirmNewPassword
        {
            width: 196px;
        }
        #txtOldPassword
        {
            width: 196px;
        }
        #txtNewPassword
        {
            width: 196px;
        }
        .style2
        {
            width: 190px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <br />
        <br />
        <asp:CustomValidator ID="cvValidator" runat="server" 
            ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:Panel ID="Panel1" runat="server" BorderStyle="Ridge" Height="196px" 
            Width="500px">
            <table style="width:100%; height: 189px;">
                <tr>
                    <td class="style1">
                        Old Password</td>
                    <td class="style2">
                        <asp:TextBox ID="txtOldPassword" runat="server" type="password" 
                            TextMode="Password" ></asp:TextBox>
                        <td>
                            &nbsp;</td>
                </tr>
                <tr>
                    <td class="style1">
                        New Password</td>
                    <td class="style2">
                        <asp:TextBox ID="txtNewPassword" runat="server" type="password" 
                            TextMode="Password" ></asp:TextBox>
                    </td>
                    <td>
                        &nbsp;</td>
                </tr>
                <tr>
                    <td class="style1">
                        Confirm New Password</td>
                    <td class="style2">
                        <asp:TextBox ID="txtConfirmNewPassword" runat="server" type="password" 
                            TextMode="Password" ></asp:TextBox>
                        <td>
                            &nbsp;</td>
                </tr>
                <tr>
                    <td class="style1">
                        &nbsp;</td>
                    <td class="style2">
                        <asp:Button ID="cmdChange" runat="server" Text="Change" Width="110px" 
                    onclick="cmdChange_Click" BackColor="SteelBlue" />
                    </td>
                    <td>
                        &nbsp;</td>
                </tr>
                <tr>
                    <td class="style1">
                        <asp:Label ID="lblPassChanged" runat="server"></asp:Label>
                    </td>
                    <td class="style2">
                        &nbsp;</td>
                    <td>
                        &nbsp;</td>
                </tr>
            </table>
        </asp:Panel>
    
    </div>
    </form>
</body>
</html>
