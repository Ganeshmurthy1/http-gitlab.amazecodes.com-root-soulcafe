<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmFileUpload.aspx.cs" Inherits="wfmFileUpload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>File Upload</title>
    <style type="text/css">
        .style1
        {
            width: 125px;
        }
        .style2
        {
            width: 125px;
            height: 47px;
        }
        .style3
        {
            height: 47px;
        }
        .style4
        {
            width: 125px;
            height: 44px;
        }
        .style5
        {
            height: 44px;
        }
        .style6
        {
            width: 125px;
            height: 40px;
        }
        .style7
        {
            height: 40px;
        }
        .style8
        {
            height: 47px;
            width: 501px;
        }
        .style9
        {
            height: 44px;
            width: 501px;
        }
        .style10
        {
            height: 40px;
            width: 501px;
        }
        .style11
        {
            width: 501px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server" enctype="multipart/form-data">
    <div>
    
            <asp:Button ID="cmdHome" runat="server" BackColor="SteelBlue" 
                BorderStyle="Solid" ForeColor="White" Height="28px" onclick="cmdHome_Click" 
                Text="Home" Width="62px" />
    
        <br />
        <b>UPLOAD ATTACHMENTS</b><br />
        <br />
        <table style="width:100%;">
            <tr>
                <td class="style2">
                    Attachment 1</td>
                <td class="style8">
                    <asp:FileUpload ID="FileUpload1" runat="server" Width="498px" />
                </td>
                <td class="style3">
                </td>
            </tr>
            <tr>
                <td class="style4">
                    Attachment 2</td>
                <td class="style9">
                    <asp:FileUpload ID="FileUpload2" runat="server" Width="498px" />
                </td>
                <td class="style5">
                </td>
            </tr>
            <tr>
                <td class="style6">
                    Attachment 3</td>
                <td class="style10">
                    <asp:FileUpload ID="FileUpload3" runat="server" Width="498px" />
                </td>
                <td class="style7">
                </td>
            </tr>
            <tr>
                <td class="style1">
                    &nbsp;</td>
                <td class="style11">
                    &nbsp;</td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
        <asp:Button ID="cmdAttach" runat="server" onclick="cmdAttach_Click" 
            Text="Attach" BackColor="SteelBlue" />
                </td>
                <td class="style11">
        <asp:Button ID="cmdDeleteExistingAttach" runat="server" 
            onclick="cmdDeleteExistingAttach_Click" Text="Delete Existing Attachments" 
                        BackColor="SteelBlue" Width="197px" />
                </td>
                <td>
                    &nbsp;</td>
            </tr>
        </table>
        <br />
    
        <asp:CustomValidator ID="cvValidator" runat="server" 
            ErrorMessage="CustomValidator"></asp:CustomValidator>
        <br />
        <asp:Label ID="lblStatus" runat="server"></asp:Label>
    </div>
    <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </p>
    <p>
    
        &nbsp;</p>
    <p>
        &nbsp;</p>
    </form>
</body>
</html>
