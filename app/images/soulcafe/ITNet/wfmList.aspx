<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmList.aspx.cs" Inherits="wfmList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
    <style type="text/css">
        .style1
        {
            width: 219px;
        }
        .style2
        {
            width: 188px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server" >
    <div style="height: 285px; width: 733px">
    
        <table style="width:100%;" border="1">
            <tr>
                <td class="style1">
                    Status</td>
                <td class="style2">
                    <asp:DropDownList ID="ddlStatus" runat="server">
                        <asp:ListItem>Open</asp:ListItem>
                        <asp:ListItem>Closed</asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Allocated To</td>
                <td class="style2">
                    <asp:DropDownList ID="ddlAllocatedTo" runat="server">
                    </asp:DropDownList>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Ticket #.</td>
                <td class="style2">
                    <asp:TextBox ID="txtTicket" runat="server" Width="172px"></asp:TextBox>
                </td>
                <td>
                    <asp:Button ID="cmdExecute" runat="server" onclick="cmdExecute_Click" 
                        Text="Execute" />
                </td>
            </tr>
        </table>
    
    
    
        <br />
        <br />
        <asp:GridView ID="gvTicket" runat="server" 
            onselectedindexchanged="gvTicket_SelectedIndexChanged" 
            onrowdeleting="gvTicket_RowDeleting">
            <Columns>
                <asp:CommandField ShowSelectButton="True" />
                <asp:CommandField HeaderText="Delete" ShowDeleteButton="True" />
            </Columns>
        </asp:GridView>
        <br />
    
    
    
    </div>
    </form>
</body>
</html>
