<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmProcessDocument.aspx.cs" Inherits="wfmProcessDocument" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Process Document</title>
</head>
<body>
    <form id="form1" runat="server">
    <p>
            <asp:Button ID="cmdBack" runat="server" BackColor="SteelBlue" 
                BorderStyle="Solid" ForeColor="White" Height="28px" onclick="cmdBack_Click" 
                Text="Home" Width="62px" />
        </p>
    <p>
        <asp:CustomValidator ID="cvValidator" runat="server" 
            ErrorMessage="CustomValidator"></asp:CustomValidator>
        </p>
    <asp:Panel ID="Panel2" runat="server" Height="37px" Width="666px">
        <p style="margin-left: 520px">
            &nbsp;</p>
    </asp:Panel>
    <asp:Panel ID="Panel1" runat="server" BorderStyle="Dotted" Height="319px" 
        Width="723px">
        <br />
        &nbsp;&nbsp;&nbsp;
        <asp:Button ID="cmdAttachments" runat="server" onclick="cmdAttachments_Click" 
            Text="Attachments" BackColor="SteelBlue" />
        <br />
        <br />
        <br />
        <br />
        <asp:Label ID="Label1" runat="server" 
            
            Text="If you required to send this documents for approval, click on Process Document button, After process the document you can not make any changes, also select the name from next approval list"></asp:Label>
        <br />
        <br />
        <br />
        Next Approval
        <asp:DropDownList ID="ddlNextApproval" runat="server" Width="610px" 
            Height="70px" style="margin-left: 18px">
        </asp:DropDownList>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<br />
        &nbsp;&nbsp;&nbsp;<asp:Button ID="cmdProcess" runat="server" onclick="cmdProcess_Click" 
            Text="Process Document" BackColor="SteelBlue" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </asp:Panel>
    <p>
        <asp:Label ID="lblProcessStatus" runat="server"></asp:Label>
    </p>
    <p>
        &nbsp;</p>
    <div>
    
    </div>
    </form>
</body>
</html>
