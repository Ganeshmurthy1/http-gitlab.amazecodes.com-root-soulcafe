<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wfmAppReqEmailApproval.aspx.cs" Inherits="wfmAppReqEmailApproval" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Approval Request</title>
    <link href="cssleave.css" type="text/css" rel="stylesheet" /> 
    <style type="text/css">

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
        .style27
        {
            width: 135px;
            height: 10px;
        }
        .style28
        {
            width: 570px;
            height: 10px;
        }
        .style30
        {
            width: 135px;
            height: 16px;
        }
        .style31
        {
            width: 570px;
            height: 16px;
        }
        .style32
        {
            width: 498px;
        }
        .style33
        {
            width: 135px;
            height: 13px;
        }
        .style34
        {
            width: 570px;
            height: 13px;
        }
        .style36
        {
            width: 135px;
            height: 14px;
        }
        .style37
        {
            width: 570px;
            height: 14px;
        }
        </style>
    
    <link href="Calendar/zpcal/themes/win2k.css" rel="stylesheet" type="text/css" />
    <script src='Calendar/utils/zapatec.js' type='text/javascript'></script>
    <script src="Calendar/zpcal/src/calendar.js" type="text/javascript"></script>
    <script src="Calendar/zpcal/src/calendar-en.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
    <div id="divTopimage" 
        style="z-index: 103; left: 0px; background-image: url(images/home_images/sky_top.jpg); width: 990px; position: absolute; top: 0px; height: 104px">
        <div id="divLogo" 
            style="z-index: 101; left: 23px; background-image: url(images/home_images/carrier_logo.gif); width: 124px; background-repeat: no-repeat; position: absolute; top: 29px; height: 51px; background-color: transparent; text-align: center">
        </div>
        <div style="z-index: 102; left: 278px; width: 431px; position: absolute; top: 40px;
                height: 34px; text-align: center">
            <strong><span style="font-size: 11pt; color: Navy">Information Technology - To 
            bring you closer</span></strong></div>
    </div>
    <p>
            &nbsp;</p>
    <p>
            &nbsp;</p>
    <p>
            &nbsp;</p>
    <p>
            &nbsp;</p>
    <p>
            &nbsp;</p>
    <p class="style16" 
        style="mso-fareast-font-family: &quot;Times New Roman&quot;; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA">
    
        <asp:CustomValidator ID="cvValidator" runat="server" 
            ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:HiddenField ID="CancelApproveCheck" runat="server" />
    
            <asp:Label ID="Label11" runat="server" Style="z-indexx:: 111; left: 254px; position: absolute;
                top: 118px; width: 333px;" Text="Approval Requests" Font-Bold=True 
                    Font-Names=Arial Font-Size=24pt ForeColor="#3366CC"></asp:Label>
                </p>
    
    <div>
    
        <table style="border: thin dotted #000000; width:96%; height: 249px;">
            <tr>
                <td class="style30">
                    APL Doc #</td>
                <td class="style31">
                    <asp:Label ID="lblDocNo" runat="server"></asp:Label>
                </td>
                <td class="style32" rowspan="6">
    
        <asp:GridView ID="gvApprovalMatrix" runat="server" AutoGenerateColumns="False" 
            Height="92px" Width="498px" 
            onselectedindexchanged="gvAttachments_SelectedIndexChanged">
            <Columns>
                <asp:BoundField HeaderText="Approved by" DataField="APPROVED_NAME" />
                <asp:BoundField DataField="APPROVED_DATE" HeaderText="Approved Date">
                    <ItemStyle Width="100px" />
                </asp:BoundField>
                <asp:BoundField DataField="STATUS_MESSAGE" HeaderText="Status" />
            </Columns>
        </asp:GridView>
    
                    </td>
            </tr>
            <tr>
                <td class="style33">
                    Date</td>
                <td class="style34">
                    <asp:Label ID="lblDocDate" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="style27">
                    Subject</td>
                <td class="style28">
                    <asp:Label ID="lblSubject" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="style36" rowspan="1">
                    Details</td>
                <td class="style37">
                    <asp:Literal ID="ltlDetails" runat="server"></asp:Literal>
                </td>
            </tr>
            <tr>
                <td class="style36">
                    Sender</td>
                <td class="style37">
                    <asp:Label ID="lbSenderName" runat="server"></asp:Label>
                                        </td>
            </tr>
            <tr>
                <td class="style27">
                    </td>
                <td class="style28">
                                        <asp:HyperLink ID="hlClickhereforApproval" runat="server" 
                                            ToolTip="Approve" Visible="False">Click here for Approval</asp:HyperLink>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <asp:Button ID="cmdApprove" runat="server" Text="Approve" Visible="False" 
                                            Width="138px" onclick="cmdApprove_Click" />
                                        </td>
            </tr>
        </table>
    
    </div>
    
        <asp:GridView ID="gvAttachments" runat="server" AutoGenerateColumns="False" 
            Height="62px" Width="507px" 
            onselectedindexchanged="gvAttachments_SelectedIndexChanged">
            <Columns>
                <asp:HyperLinkField DataNavigateUrlFields="DOWNLOAD_FILE" 
                    DataTextField="ORIGINAL_FILENAME" HeaderText="Download File" />
            </Columns>
        </asp:GridView>
    
                                        <asp:Button ID="cmdApprovalTracking" 
        runat="server" Text="Approval Tracking Details" Visible="False" 
                                            Width="175px" 
        onclick="cmdApprovalTracking_Click" />
    
    </form>
</body>
</html>
