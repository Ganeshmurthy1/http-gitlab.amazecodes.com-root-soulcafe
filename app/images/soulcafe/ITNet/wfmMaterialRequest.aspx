<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmMaterialRequest.aspx.cs" Inherits="wfmMaterialRequest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Ticket Dashboard</title>
    <style type="text/css">
        .style1
        {
            width: 118px;
        }
        .style2
        {
            width: 249px;
        }
        .style3
        {
            width: 14px;
        }
        .style4
        {
            width: 118px;
            height: 25px;
        }
        .style5
        {
            width: 249px;
            height: 25px;
        }
        .style6
        {
            height: 25px;
        }
    </style>
    
    <link href="cssleave.css" type="text/css" rel="stylesheet" /> 

    <link href="Calendar/zpcal/themes/win2k.css" rel="stylesheet" type="text/css" />
    <script src='Calendar/utils/zapatec.js' type='text/javascript'></script>
    <script src="Calendar/zpcal/src/calendar.js" type="text/javascript"></script>
    <script src="Calendar/zpcal/src/calendar-en.js" type="text/javascript"></script>

    
</head>
<body>
    <form id="form1" runat="server">
    <div style="height: 74px">
    
        <asp:CustomValidator ID="cvValidator" runat="server" 
            ErrorMessage="CustomValidator"></asp:CustomValidator>
        <br />
        <br />
        <br />
        <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Label ID="Label11" runat="server" Font-Bold="True" Font-Names="Arial" 
            Font-Size="24pt" ForeColor="#3366CC" 
            Style="z-indexx: : 111; left: 181px; position: absolute; top: 25px; width: 433px;" 
            Text="MATERIAL REQUEST"></asp:Label>
        <br />
    
        <table style="width:100%;">
            <tr>
                <td class="style1">
                    Doc #</td>
                <td class="style2" colspan="3">
                    <asp:TextBox ID="txtDocNo" runat="server" TabIndex="1" Width="136px"></asp:TextBox>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style4">
                    Date</td>
                <td class="style5" colspan="3">
                    <asp:Label ID="lblDocDate" runat="server"></asp:Label>
                </td>
                <td class="style6">
                    </td>
            </tr>
            <tr>
                <td class="style1">
                    Status</td>
                <td class="style2" colspan="3">
                    <asp:DropDownList ID="ddLStatus" runat="server">
                        <asp:ListItem Selected="True">Open</asp:ListItem>
                        <asp:ListItem>Closed</asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Material Code</td>
                <td class="style2" colspan="3">
                    <asp:DropDownList ID="ddLMaterialDocNo" runat="server">
                    </asp:DropDownList>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Material Description</td>
                <td class="style2" colspan="3">
                    <asp:TextBox ID="txtDescription" runat="server" TabIndex="1" Width="610px"></asp:TextBox>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Unit Code</td>
                <td class="style2" colspan="3">
                    <asp:DropDownList ID="ddLUnitDocNo" runat="server">
                    </asp:DropDownList>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Qty</td>
                <td class="style2" colspan="3">
                    <asp:TextBox ID="txtQty" runat="server" TabIndex="1" Width="136px"></asp:TextBox>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Location Code</td>
                <td class="style2" colspan="3">
                    <asp:DropDownList ID="ddLLocationDocNo" runat="server">
                    </asp:DropDownList>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Expected Date</td>
                <td class="style2" colspan="3">
                    <asp:TextBox ID="txtExpectedDate" runat="server" TabIndex="1" Width="136px"></asp:TextBox>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Severity</td>
                <td class="style2" colspan="3">
                    <asp:DropDownList ID="ddlSeverity" runat="server">
                        <asp:ListItem Selected="True">High</asp:ListItem>
                        <asp:ListItem>Medium</asp:ListItem>
                        <asp:ListItem>Low</asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Priority</td>
                <td class="style2" colspan="3">
                    <asp:DropDownList ID="ddlPriority" runat="server">
                        <asp:ListItem Selected="True">High</asp:ListItem>
                        <asp:ListItem>Medium</asp:ListItem>
                        <asp:ListItem>Low</asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Allocated to</td>
                <td class="style2">
                    <asp:DropDownList ID="ddlAllocatedTo" runat="server">
                    </asp:DropDownList>
                </td>
                <td class="style2">
                    &nbsp;</td>
                <td class="style3">
                    &nbsp;</td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Details</td>
                <td class="style2" colspan="3">
                    <asp:TextBox ID="txtRemarks" runat="server" Height="61px" TextMode="MultiLine" 
                        Width="605px"></asp:TextBox>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    &nbsp;</td>
                <td class="style2" colspan="2">
                    <asp:Button ID="cmdDelete" runat="server" BackColor="SteelBlue" 
                        onclick="cmdDelete_Click" Text="Delete" Visible="False" Width="110px" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:Label ID="lblSaveStatus" runat="server"></asp:Label>
                </td>
                <td class="style3">
                    <asp:Button ID="cmdSave" runat="server" BackColor="SteelBlue" 
                        onclick="cmdSave_Click" style="margin-left: 0px" Text="Save" Width="110px" />
                </td>
                <td>
                    &nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
