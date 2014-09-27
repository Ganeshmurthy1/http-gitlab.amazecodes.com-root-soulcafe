<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmApproval.aspx.cs" Inherits="wfmApproval" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="cssleave.css" type="text/css" rel="stylesheet" /> 

    <title>Approval Session</title>
    <style type="text/css">
        .style1
        {
            width: 87px;
        }
        .style2
        {
            width: 578px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <p>
            <asp:Button ID="cmdHome" runat="server" BackColor="SteelBlue" 
                BorderStyle="Solid" ForeColor="White" Height="28px" onclick="cmdHome_Click" 
                Text="Home" Width="62px" />
        <br />
    </p>
    <div>
    
        <asp:CustomValidator ID="cvValidator" runat="server" 
            ErrorMessage="CustomValidator"></asp:CustomValidator>
        <br />
        <table style="width: 100%; height: 266px;">
            <tr>
                <td class="style1">
                    Remarks</td>
                <td class="style2">
                    <asp:TextBox ID="txtApproveRemarks" runat="server" Width="576px" 
                        style="margin-left: 0px; padding-left: 0px" Height="65px" 
                        TextMode="MultiLine"></asp:TextBox>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    &nbsp;</td>
                <td class="style2">
        <asp:CheckBox ID="chkFinalApproval" runat="server" Text="Final Approval" />
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
        Next Approval&nbsp;         
                </td>
                <td class="style2">
                    <asp:DropDownList ID="ddlNextApproval" runat="server" Width="574px" 
                        Height="26px">
        </asp:DropDownList>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    &nbsp;</td>
                <td class="style2">
        <asp:Button ID="cmdApprove" runat="server" onclick="cmdApprove_Click" 
            Text="Approve" BackColor="SteelBlue" Width="122px" />
                &nbsp;
        <asp:Button ID="cmdReturnToSender" runat="server" onclick="cmdReturnToSender_Click" 
            Text="Return to Sender" BackColor="SteelBlue" Width="122px" />
                &nbsp;
                &nbsp;
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    &nbsp;</td>
                <td class="style2">
        <asp:Label ID="lblApprovalStatus" runat="server"></asp:Label>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
        </table>
        <br />
        <br />
&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <br />
        <br />
        <br />
        <br />
        <br />
&nbsp;<br />
                 &nbsp;<br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    
    </div>
    </form>
</body>
</html>
