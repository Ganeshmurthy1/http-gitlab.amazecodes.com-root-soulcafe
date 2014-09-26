using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Data.SqlClient;

/// <summary>
/// Summary description for DataLayer
/// </summary>
public class DataLayer : IDisposable
{
    public SqlConnection conn;
    // Connections Open and closes
    public void StartConnections()
    {
        conn = new SqlConnection();
        try
        {
            if (conn.State != ConnectionState.Open)
            {
                conn.ConnectionString = ConfigurationManager.ConnectionStrings["LocalSqlServer"].ConnectionString;
                conn.Open();
            }
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void CloseConnections()
    {
        if (conn.State != ConnectionState.Closed)
            conn.Close();
        sqlTrans = null;
    }

    public void Dispose()
    {
        // make sure connection is closed
        if (conn != null)
        {
            conn.Dispose();
            conn = null;
        }
    }

    #region IDisposable Members

    void IDisposable.Dispose()
    {
        throw new NotImplementedException();
    }

    #endregion
    // Finsih Connections Open and closes


    public DataTable GetDataTable(string Sql)
    {
        DataTable dtTable = new DataTable();
        try
        {
            SqlDataAdapter sqlDa = new SqlDataAdapter(Sql, conn);
            int rows = sqlDa.Fill(dtTable);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        return dtTable;
    }
    // 
    public DataSet GetDataSet(string Sql)
    {
        DataSet dataset = new DataSet();
        try
        {
            SqlCommand sqlCommand = new SqlCommand(Sql, conn);
            SqlDataAdapter sqlAdapter = new SqlDataAdapter(sqlCommand);
            sqlAdapter.Fill(dataset);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        return dataset;
    }

    public int InsertDataTrans(string sqlString)
    {
        int intRetValue = 0;

        if (sqlTrans == null)
            throw new Exception("Transaction not created");
        {
            SqlCommand sqlCommand = new SqlCommand(sqlString, conn, sqlTrans);
            intRetValue = sqlCommand.ExecuteNonQuery();
        }
        return intRetValue;
    }

    public int UpdateDataTrans(string sqlString)
    {
        int intRetValue = 0;

        if (sqlTrans == null)
            throw new Exception("Transaction not created");
        else
        {
            SqlCommand sqlCommand = new SqlCommand(sqlString, conn, sqlTrans);
            intRetValue = sqlCommand.ExecuteNonQuery();
        }
        return intRetValue;
    }
    ///
    public int DeleteDataTrans(string sqlString)
    {
        int intRetValue = 0;

        if (sqlTrans == null)
            throw new Exception("Transaction not created");
        {
            SqlCommand sqlCommand = new SqlCommand(sqlString, conn, sqlTrans);
            intRetValue = sqlCommand.ExecuteNonQuery();
        }
        return intRetValue;
    }

    public SqlTransaction sqlTrans;
    public void BeginTrans()
    {
        sqlTrans = conn.BeginTransaction();
    }

    public void CommitTrans()
    {
        if (sqlTrans != null)
            sqlTrans.Commit();
        sqlTrans.Dispose();
        sqlTrans = null;
        CloseConnections();
    }

    public void RollBackTrans()
    {
        if (sqlTrans != null)
        {
            sqlTrans.Rollback();
            sqlTrans.Dispose();
        }
        sqlTrans = null;
        CloseConnections();

    }


}
