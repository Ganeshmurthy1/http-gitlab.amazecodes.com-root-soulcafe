<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PageStart.aspx.cs" Inherits="PageStart" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
<link href="cssleave.css" type="text/css" rel="stylesheet"/> 
    <title>UTS Carrier Information Technology Home Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="divTopimage" style="z-index: 103; left: 0px; background-image: url(images/home_images/sky_top.jpg);
            width: 990px; position: absolute; top: 0px; height: 104px">
            <div id="divLogo" style="z-index: 101; left: 23px; background-image: url(images/home_images/carrier_logo.gif);
                width: 124px; background-repeat: no-repeat; position: absolute; top: 29px; height: 51px;
                background-color: transparent; text-align: center">
            </div>
            <div style="z-index: 102; left: 278px; width: 431px; position: absolute; top: 40px;
                height: 34px; text-align: center">
                <strong><span style="font-size: 11pt; color: Navy">Information Technology - To bring you closer</span></strong></div>
        </div>
        <div id="divTopbar" style="z-index: 104; left: 15px; background-image: url(images/home_images/top_bar.gif);
            width: 960px; position: absolute; top: 103px; height: 29px; background-color: #335299;
            text-align: center">
            <span style="font-size: 14pt; color: white"><strong>MIS NET</strong></span></div>
        <div id="divLeftPanel" 
            style="border: thin solid lightgrey; z-index: 102; left: 0px; width: 220px; position: absolute; top: 138px; height: 560px">
            <div style="z-index: 102; left: 5px; background-image: url(images/home_images/menu_title.gif); 
                width: 210px; background-repeat: no-repeat; position: absolute; top: 22px; height: 28px">
            </div>
            <div style="text-align: center">
                &nbsp;
                <br />
                <br />
                <br />
                <br />
                <br />
                <asp:TreeView ID="treMenu" runat="server" Height="492px" 
                    style="margin-left: 0px" Width="206px" 
                    onselectednodechanged="treMenu_SelectedNodeChanged" ExpandDepth="1" 
                    ShowLines="True" >
                </asp:TreeView>
                <br />
                <br />
            </div>
        </div>
        <div id="divBottomBar" 
            
            
            style="z-index: 105; left: 0px; width: 990px; position: absolute;
            top: 710px; height: 47px; text-align: center; color: #0099CC; font-family: Arial, Helvetica, sans-serif; font-size: small;">
            <br />
            Site designed and developed by : Sebastian John (Analyst Programmer)
            <br />
            &nbsp;</div>
        <div id="divContentText" runat="server" style="z-index: 104; left: 229px; visibility: visible;
            vertical-align: top; overflow: auto; width: 488px; position: absolute; top: 160px;
            height: 538px; text-align: justify">
            <strong>&nbsp;&nbsp;&nbsp;
            <br />
            </strong></div>
        <div id="divLogin" runat="server"  style="z-index: 101; left: 726px; background-image: url(images/home_images/img_login.jpg);
            width: 285px; position: absolute; top: 138px; height: 156px">
            <asp:TextBox ID="txtLogin" runat="server" BorderColor="Black" BorderStyle="Solid"
                BorderWidth="1pt" Font-Size="Small" Style="z-index: 100; left: 125px; position: absolute;
                top: 52px" Width="113px" Wrap="False"></asp:TextBox>
            <asp:TextBox ID="txtPassword" runat="server" BorderColor="Black" BorderStyle="Solid"
                BorderWidth="1pt" Font-Size="Small" Style="z-index: 101; left: 125px; position: absolute;
                top: 75px" TextMode="Password" Width="113px" Wrap="False">xxxx</asp:TextBox>
            <asp:LinkButton ID="lnkForgotPassword" runat="server" Font-Italic="False" Font-Size="Small"
                Style="z-index: 102; left: 78px; position: absolute; top: 115px">Forgot password</asp:LinkButton>
            <asp:Button ID="cmdLogin" runat="server" BackColor="SteelBlue" BorderStyle="Solid"
                ForeColor="White" Height="28px" Style="z-index: 104; left: 180px; position: absolute;
                top: 107px; " Text="Login" Width="62px" 
                onclick="cmdLogin_Click" />
            <asp:CustomValidator ID="cvValidator" runat="server" 
                ErrorMessage="CustomValidator"></asp:CustomValidator>
        </div>
        <div id="divBirthDays" 
            
            style="z-index: 103; left: 729px; 
            width: 280px; position: absolute; top: 299px; height: 402px; overflow: auto;">
            <strong><br />
            </strong>
        </div>
        <div id="divLoggedIn" runat="server" style="z-index: 101; left: 726px; background-image: url('images/home_images/logged_in_image.jpg');
            width: 285px; position: absolute; top: 137px; height: 156px">
            &nbsp; &nbsp;
            <asp:Label ID="lblLoggedInUser" runat="server" Font-Bold="True" Font-Size="X-Small"
                Style="z-index: 100; left: 113px; position: absolute; top: 16px; height: 20px;"
                Width="153px"></asp:Label>
            <asp:Label ID="Label1" runat="server" Height="62px" Style="z-index: 101; left: 25px;
                position: absolute; top: 49px" Text="You are now logged in. Before leaving the browser, please logout. "
                Width="237px"></asp:Label>
            <asp:Button ID="cmdLogout" runat="server" BackColor="SteelBlue" BorderStyle="Solid"
                ForeColor="White" Height="28px" Style="z-index: 104; left: 180px; position: absolute;
                top: 107px; " Text="Logout" Width="62px" 
                onclick="cmdLogout_Click" />    
        </div>
    
    </div>
    </form>
</body>
</html>
