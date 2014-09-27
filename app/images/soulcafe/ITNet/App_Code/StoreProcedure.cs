using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Collections;
using System.Data;

public class StoreProcedure
{
    SqlConnection Conn;
    Hashtable hstParameters;
    SqlCommand sqlCmd;
    public StoreProcedure(String UspName, SqlConnection Conn)
    {
        this.Conn = Conn;
        hstParameters = new Hashtable();
        sqlCmd = new SqlCommand(UspName, Conn);
        sqlCmd.CommandType = System.Data.CommandType.StoredProcedure;
    }

    public StoreProcedure(String UspName, SqlConnection Conn, SqlTransaction sqlTrans)
    {
        this.Conn = Conn;
        hstParameters = new Hashtable();
        sqlCmd = new SqlCommand(UspName, Conn, sqlTrans);
        sqlCmd.CommandType = System.Data.CommandType.StoredProcedure;
    }

    public void AddParameters(String ParamName, Object ParaValue)
    {
        SqlParameter param = new SqlParameter();
        param.ParameterName = ParamName;
        param.Value = ParaValue;
        sqlCmd.Parameters.Add(param);
    }

    public void AddParameters(String ParamName, Object ParaValue, ParameterDirection pDirection)
    {
        SqlParameter param = new SqlParameter();
        param.ParameterName = ParamName;
        param.Direction = pDirection;
        param.Value = ParaValue;
        sqlCmd.Parameters.Add(param);
    }

    public Int32 ExecuteNonQuery()
    {
        Int32 intRetValue = 0;
        intRetValue = sqlCmd.ExecuteNonQuery();
        return intRetValue;
    }

    public DataSet GetUspDataSet()
    {
        DataSet dataset = new DataSet();
        SqlDataAdapter sqlAdapter = new SqlDataAdapter(sqlCmd);
        sqlAdapter.Fill(dataset);
        return dataset;
    }

    public Object GetParameterValue(String ParaName)
    {
        SqlParameter param = new SqlParameter();

        param = sqlCmd.Parameters[ParaName];
        return param.Value;
    }

    // This Method will give us First Column of the first Row int 
    public Object ExecuteScalar()
    {
        Object objRetValue = null;
        objRetValue = sqlCmd.ExecuteScalar();
        return objRetValue;
    }
}

