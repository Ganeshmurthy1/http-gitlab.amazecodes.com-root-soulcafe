<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmApprovalTrackingDisplay.aspx.cs" Inherits="wfmApprovalTrackingDisplay" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
    </head>
<body>
    <form id="form1" runat="server">
    <p>
            <asp:Button ID="cmdHome" runat="server" BackColor="SteelBlue" 
                BorderStyle="Solid" ForeColor="White" Height="28px" onclick="cmdHome_Click" 
                Text="Home" Width="62px" />
        <br />
        </p>
    <asp:Label ID="lblStatus" runat="server" Font-Bold="True" Text="Label"></asp:Label>
    <br />
    <div>
    
        <asp:GridView ID="gvList" runat="server" AutoGenerateColumns="False" 
            CellPadding="4" ForeColor="#333333" Height="111px" 
             Width="970px">
            <RowStyle BackColor="#EFF3FB" />
            <Columns>
                <asp:BoundField HeaderText="From User" DataField="FM_NAME" >
<ItemStyle Width="300px"></ItemStyle>
                </asp:BoundField>
                <asp:BoundField HeaderText="To Name" DataField="TO_NAME" >
                </asp:BoundField>
                <asp:BoundField DataField="ACTION_DATE" HeaderText="Action Date" />
                <asp:BoundField DataField="REMARKS" HeaderText="Remarks" />
                <asp:BoundField DataField="STATUS_DESC" HeaderText="Description" />
            </Columns>
            <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
            <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
            <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
            <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
            <EditRowStyle BackColor="#2461BF" />
            <AlternatingRowStyle BackColor="White" />
        </asp:GridView>
    
    </div>
    </form>
</body>
</html>
