using System;
using System.Data;
using Microsoft.Win32;
using System.Management;

/// <summary>
/// Summary description for WMIClass
/// </summary>
public static class WMICustomClass
{
    public static DataTable GetWMIDetails(DataTable dtTable, String strComputerName)
    {
        DataTable dtDisplayTable = new DataTable();
        dtDisplayTable.Columns.Add(new DataColumn("DisplayName"));

        ConnectionOptions connection = new ConnectionOptions();
        connection.Username = "adminsj";
        connection.Password = "";
        connection.Authority = "ntlmdomain:UTSCARRIER.AE";
//        connection.Impersonation = ImpersonationLevel.Default;
//        connection.Authentication = AuthenticationLevel.Default;
//        connection.Impersonation = ImpersonationLevel.Impersonate ; 
        ManagementScope scope = new ManagementScope(
            "\\\\" + strComputerName + "\\root\\CIMV2", connection);
        scope.Connect();

        ObjectQuery query = new ObjectQuery("SELECT * FROM  " + dtTable.Rows[0]["CMDNAME"].ToString());
        ManagementObjectSearcher searcher = new ManagementObjectSearcher(scope, query);
        ManagementObjectCollection queryCollection = searcher.Get();
     
        if (queryCollection.Count > 0)
        {
            foreach (ManagementObject moQryCol in queryCollection)
            {
                foreach (DataRow dtRow in dtTable.Rows)
                {
                    String strRemarks = dtRow["REMARKS"] + String.Empty;
                    String strProperty = dtRow["PROPERTYNAME"].ToString();
                    if (!strProperty.Contains("["))
                        if (IsFoundCollection(moQryCol, strProperty))
                        {
                            dtDisplayTable.Rows.Add(strRemarks + " : " + moQryCol[strProperty] + string.Empty);
                        }
                }
            }
        }
        return dtDisplayTable;
    }

    public static  bool IsFoundCollection(ManagementObject moQryCol, string strProperty)
    {
        bool blRetValue = true;
        Object objValue;
        try
        {
            objValue = moQryCol[strProperty];
        }
        catch (Exception)
        {
            blRetValue = false;
        }
        return blRetValue;
    }

    public static DataTable ConnectToRegistry(string computername, string strDispType)
    {
        DataTable dtTable = new DataTable();

        dtTable.Columns.Add(new DataColumn("DisplayName"));

        Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.RegistryKey.OpenRemoteBaseKey(
        RegistryHive.LocalMachine, computername);
        string SoftwareKey = @"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall";
        regKey = regKey.OpenSubKey(SoftwareKey);
        string[] names = regKey.GetSubKeyNames();
        foreach (string entry in names)
        {
            RegistryKey sk = regKey.OpenSubKey(entry);
            String strProgram = (sk.GetValue("DisplayName") + String.Empty);
            if (!String.IsNullOrEmpty(strProgram))
            {
                if (strDispType == "Installed Softwares")
                {
                    if (!strProgram.Contains("Update for Windows") && !strProgram.Contains("Hotfix for") &&
                        !strProgram.Contains("(KB"))
                        dtTable.Rows.Add(sk.GetValue("DisplayName").ToString());
                }
                else if (strDispType == "Updates")
                {
                    if (strProgram.Contains("Update for Windows") || strProgram.Contains("(KB"))
                        dtTable.Rows.Add(sk.GetValue("DisplayName").ToString());
                }
                else if (strDispType == "Hot Fixes")
                {
                    if (strProgram.Contains("Hotfix for"))
                        dtTable.Rows.Add(sk.GetValue("DisplayName").ToString());
                }
            }
        }

        return dtTable;
    }

}
