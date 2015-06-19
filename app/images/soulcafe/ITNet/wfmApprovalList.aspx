<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmApprovalList.aspx.cs" Inherits="wfmApprovalList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<link href="cssleave.css" type="text/css" rel="stylesheet"/> 
    <title>Approval Details</title>
</head>
<body>
    <form id="form1" runat="server">
    
    <div>
                    <div id="divTopimage" style="z-index: 103; left: 0px; background-image: url(images/home_images/sky_top.jpg);
            width: 990px; position: absolute; top: 0px; height: 104px">
            <asp:Button ID="cmdHome" runat="server" BackColor="SteelBlue" 
                BorderStyle="Solid" ForeColor="White" Height="28px" onclick="cmdHome_Click" 
                Text="Home" Width="62px" />
            <div id="divLogo" style="z-index: 101; left: 23px; background-image: url(images/home_images/carrier_logo.gif);
                width: 124px; background-repeat: no-repeat; position: absolute; top: 29px; height: 51px;
                background-color: transparent; text-align: center">
            </div>
            <div style="z-index: 102; left: 322px; width: 350px; position: absolute; top: 40px;
                height: 34px; text-align: center">
                <strong><span style="font-size: 11pt; color: Navy">Information Technology - To bring you closer</span></strong></div>
        </div>
        <div id="divTopbar" style="z-index: 104; left: 15px; background-image: url(images/home_images/top_bar.gif);
            width: 960px; position: absolute; top: 103px; height: 29px; background-color: #335299;
            text-align: center">
            <span style="font-size: 14pt; color: white"><strong>IT NET</strong></span></div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
    
        <br />
        <asp:DropDownList ID="cmbFilter" runat="server">
            <asp:ListItem>Not Approved</asp:ListItem>
            <asp:ListItem>Approved</asp:ListItem>
            <asp:ListItem>All</asp:ListItem>
        </asp:DropDownList>
        &nbsp;
        <asp:Button ID="cmdExecute" runat="server" onclick="cmdExecute_Click" 
            Text="Execute" BackColor="SteelBlue" />
        &nbsp;&nbsp;
        <asp:CustomValidator ID="cvValidator" runat="server" 
            ErrorMessage="CustomValidator"></asp:CustomValidator>
        <br />
    
        <asp:GridView ID="gvList" runat="server" AutoGenerateColumns="False" 
            CellPadding="4" ForeColor="#333333" Height="111px" 
            onselectedindexchanged="gvList_SelectedIndexChanged" Width="982px">
            <RowStyle BackColor="#EFF3FB" Height="15px" />
            <Columns>
                <asp:HyperLinkField DataNavigateUrlFields="PAGELINK" DataTextField="DOCNO" 
                    HeaderText="Select" />
                <asp:BoundField DataField="DOCTYPE" HeaderText="Doc Type" />
                <asp:BoundField HeaderText="Doc No" DataField="DOCNO" >
                    <ItemStyle Width="100px" />
                </asp:BoundField>
                <asp:BoundField HeaderText="Emp Id" DataField="REQUESTOR" >
                    <ItemStyle Width="100px" />
                </asp:BoundField>
                <asp:BoundField HeaderText="Name" DataField="NAME" >
                    <ItemStyle Width="300px" />
                </asp:BoundField>
                <asp:BoundField HeaderText="Request Date" DataField="REQUEST_DATE" />
            </Columns>
            <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
            <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
            <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
            <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
            <EditRowStyle BackColor="#2461BF" />
            <AlternatingRowStyle BackColor="White" />
        </asp:GridView>
    
        <br />
        <br />
    
    </div>
    </form>
</body>
</html>
