<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmApprovalRequests.aspx.cs" Inherits="wfmApprovalRequests" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Salary Transfer Letter Requisition</title>
    <link href="cssleave.css" type="text/css" rel="stylesheet" /> 
    <style type="text/css">

        .style4
        {
            width: 96px;
            height: 6px;
        }
        .style5
        {
            height: 6px;
        }
        .style1
        {
            width: 96px;
        }
        #txtAddressTo
        {
            height: 94px;
            width: 326px;
        }
        #txtRemarks
        {
            width: 481px;
            height: 67px;
        }
        #txtAddressTo0
        {
            height: 94px;
            width: 326px;
        }
        .style9
        {
            height: 6px;
            width: 714px;
        }
        .style11
        {
            width: 714px;
        }
        #txtAddressTo1
        {
            height: 94px;
            width: 326px;
        }
        #txtAddressTo2
        {
            height: 94px;
            width: 326px;
        }
        .style16
        {
            font-size: 12.0pt;
            font-family: "Times New Roman";
            font-weight: bold;
        }
        .style17
        {
            width: 96px;
            height: 16px;
        }
        .style18
        {
            height: 16px;
            width: 714px;
        }
        .style19
        {
            height: 16px;
        }
    </style>
    
    <link href="Calendar/zpcal/themes/win2k.css" rel="stylesheet" type="text/css" />
    <script src='Calendar/utils/zapatec.js' type='text/javascript'></script>
    <script src="Calendar/zpcal/src/calendar.js" type="text/javascript"></script>
    <script src="Calendar/zpcal/src/calendar-en.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
    <p>
            <asp:Button ID="cmdDelete" runat="server" Style="z-indexx: 133; left: 253px; position: absolute;
                top: 526px; width: 124px; " Text="Delete" TabIndex=107 
                onclick="cmdDelete_Click" Visible="False" BackColor="SteelBlue" />
            <asp:Button ID="cmdHome" runat="server" BackColor="SteelBlue" 
                BorderStyle="Solid" ForeColor="White" Height="28px" onclick="cmdHome_Click" 
                Text="Home" Width="62px" />
            </p>
    <p class="style16" 
        style="mso-fareast-font-family: &quot;Times New Roman&quot;; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA">
            <asp:Button ID="cmdApprovalStatus" runat="server" Style="z-indexx: 133; left: 8px; position: absolute;
                top: 525px; width: 119px;" Text="Approval Status" TabIndex=107 
                onclick="cmdApprovalStatus_Click" Visible="False" BackColor="SteelBlue" />
            <asp:Button ID="cmdSave" runat="server" Style="z-indexx: 133; left: 496px; position: absolute;
                top: 526px; height: 26px; width: 120px;" Text="Next" TabIndex=107 
                onclick="cmdSave_Click" BackColor="SteelBlue" />
    
        <asp:CustomValidator ID="cvValidator" runat="server" 
            ErrorMessage="CustomValidator"></asp:CustomValidator>
    
            <asp:Label ID="Label11" runat="server" Style="z-indexx:: 111; left: 246px; position: absolute;
                top: 39px; width: 333px;" Text="Approval Requests" Font-Bold=True 
                    Font-Names=Arial Font-Size=24pt ForeColor="#3366CC"></asp:Label>
                </p>
    
    <div>
    
        <table style="width:100%;">
            <tr>
                <td class="style17">
                    APL Doc #</td>
                <td class="style18">
                    <asp:TextBox ID="txtDocNo" runat="server"></asp:TextBox>
                </td>
                <td class="style19">
                    </td>
            </tr>
            <tr>
                <td class="style4">
                    Date</td>
                <td class="style9">
                    <asp:Label ID="lblDocDate" runat="server"></asp:Label>
                </td>
                <td class="style5">
                    </td>
            </tr>
            <tr>
                <td class="style4">
                    Category</td>
                <td class="style9">
                    <asp:DropDownList ID="ddlNextApproval" runat="server" Width="264px" 
                        Height="26px">
                        <asp:ListItem Value="WHQ"></asp:ListItem>
                        <asp:ListItem Value="BIS EMEA HQ"></asp:ListItem>
                        <asp:ListItem Value="BIS ME&amp;T HQ"></asp:ListItem>
                        <asp:ListItem>Saudi (AAC)</asp:ListItem>
                        <asp:ListItem Value="Saudi (Otis) "></asp:ListItem>
                        <asp:ListItem Value="Turkey "></asp:ListItem>
                        <asp:ListItem Value="UAE (Otis)"></asp:ListItem>
                        <asp:ListItem Value="UTS Carrier) "></asp:ListItem>
                        <asp:ListItem Value="F&amp;S"></asp:ListItem>
                        <asp:ListItem Value="OTHERS"></asp:ListItem>
        </asp:DropDownList>
                </td>
                <td class="style5">
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style4">
                    Sub Category</td>
                <td class="style9">
                    <asp:DropDownList ID="ddlNextApproval0" runat="server" Width="574px" 
                        Height="26px">
        </asp:DropDownList>
                </td>
                <td class="style5">
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Subject</td>
                <td class="style11">
                    <asp:TextBox ID="txtSubject" runat="server" Width="719px"></asp:TextBox>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="style1">
                    Details</td>
                <td class="style11">
                                        <asp:TextBox ID="txtDetails" runat="server" Height="191px" 
                        TextMode="MultiLine" Width="723px"></asp:TextBox>
                                        </td>
                <td>
                    &nbsp;</td>
            </tr>
        </table>
    
        <asp:GridView ID="gvAttachments" runat="server" AutoGenerateColumns="False" 
            Height="62px" Width="507px" 
            onselectedindexchanged="gvAttachments_SelectedIndexChanged">
            <Columns>
                <asp:CommandField HeaderText="Download" ShowSelectButton="True" />
                <asp:BoundField HeaderText="File Name" DataField="ORIGINAL_FILENAME" />
                <asp:BoundField DataField="STORED_NAME" HeaderText="Stored Name" 
                    ShowHeader="False">
                </asp:BoundField>
            </Columns>
        </asp:GridView>
    
    </div>
    </form>
</body>
</html>
