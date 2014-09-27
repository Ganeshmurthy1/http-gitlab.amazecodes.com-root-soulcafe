


namespace ClassDbOperations
{
public class ClassOperations : ClassConnection
{
DbProviderFactory provider;

public ClassOperations()
{
provider = DbProviderFactories.GetFactory("System.Data.SqlClient");
}

private void AttachParameters(DbCommand command, Hashtable hstParameters)
{
try
{
IEnumerator parameters = hstParameters.Keys.GetEnumerator();
while (parameters.MoveNext())
{
DbParameter param = provider.CreateParameter();
param.ParameterName = "@" + parameters.Current;
param.Value = hstParameters[parameters.Current];
command.Parameters.Add(param);
}

}
catch (Exception exception)
{
HttpContext.Current.Response.Write("Error : " + exception.Message + " </br> Source : " + exception.Source);
}
}

private DbCommand CreateDbCommand(String commandText, CommandType commandType)
{
DbCommand command = provider.CreateCommand();
try
{
command.Connection = ConnStr;
command.CommandText = commandText;
command.CommandType = commandType;
}
catch (Exception exception)
{
HttpContext.Current.Response.Write("Error : " + exception.Message + " </br> Source : " + exception.Source);
}
return command;
}

public DataSet GetDataSet(String commandText, CommandType commandType, Hashtable hstParameters, String tableName)
{
DbCommand command = (DbCommand)CreateDbCommand(commandText, commandType);

if (hstParameters != null)
if (hstParameters.Count > 0)
AttachParameters(command, hstParameters);

DataSet dataset = new DataSet();

DbDataAdapter adapter = provider.CreateDataAdapter();
adapter.SelectCommand = command;
if (tableName != "" && tableName != null)
adapter.Fill(dataset, tableName);
else
adapter.Fill(dataset);
return dataset;
}
public DataSet GetDataSet(String commandText, CommandType commandType, Hashtable hstParameters)
{
return GetDataSet(commandText, commandType, hstParameters, null);
}
public DataSet GetDataSet(String commandText, CommandType commandType, String tableName)
{
return GetDataSet(commandText, commandType, null, tableName);
}
public DataSet GetDataSet(String commandText, CommandType commandType)
{
return GetDataSet(commandText, commandType, null, null);
}
public DataSet GetDataSet(String commandText, String tableName)
{
return GetDataSet(commandText, CommandType.Text, null, tableName);
}
public DataSet GetDataSet(String commandText)
{
return GetDataSet(commandText, CommandType.Text, null, null);
}

public DbDataReader GetDataReader(String commandText, CommandType commandType, Hashtable hstParameters)
{
DbCommand command = (DbCommand)CreateDbCommand(commandText, commandType);
command.Connection = ConnStr;
command.CommandText = commandText;
command.CommandType = commandType;

if (hstParameters.Count != 0)
AttachParameters(command, hstParameters);

DbDataReader dr;
OpenConnection();
dr = command.ExecuteReader();
CloseConnection();
return dr;
}
public DbDataReader GetDataReader(String commandText, CommandType commandType)
{
return GetDataReader(commandText, commandType, null);
}
public DbDataReader GetDataReader(String commandText)
{
return GetDataReader(commandText, CommandType.Text, null);
}

public Int32 ExecuteNonQuery(String commandText, CommandType commandType, Hashtable hstParameters)
{
DbCommand command = (DbCommand)CreateDbCommand(commandText, commandType);
command.Connection = ConnStr;
command.CommandText = commandText;
command.CommandType = commandType;

if (hstParameters != null)
if (hstParameters.Count > 0)
AttachParameters(command, hstParameters);

Int32 iRowsAffected = 0;
try
{
OpenConnection();
iRowsAffected = command.ExecuteNonQuery();
}
catch (Exception ex)
{
HttpContext.Current.Response.Write("Error : " + ex.Message);
}
finally
{
CloseConnection();
}
return iRowsAffected;
}
public Int32 ExecuteNonQuery(String commandText, CommandType commandType)
{
return ExecuteNonQuery(commandText, commandType, null);
}
public Int32 ExecuteNonQuery(String commandText)
{
return ExecuteNonQuery(commandText, CommandType.Text, null);
}

public Object ExecuteScalar(String commandText, CommandType commandType, Hashtable hstParameters)
{
DbCommand command = (DbCommand)CreateDbCommand(commandText, commandType);
command.Connection = ConnStr;
command.CommandText = commandText;
command.CommandType = commandType;

if (hstParameters != null)
if (hstParameters.Count > 0)
AttachParameters(command, hstParameters);

Object result = null;
try
{
OpenConnection();
result = command.ExecuteScalar();
}
catch (Exception ex)
{
HttpContext.Current.Response.Write("Error : " + ex.Message);
}
finally
{
CloseConnection();
}
return result;
}
public Object ExecuteScalar(String commandText, CommandType commandType)
{
return ExecuteScalar(commandText, commandType, null);
}
public Object ExecuteScalar(String commandText)
{
return ExecuteScalar(commandText, CommandType.Text, null);
}

public DropDownList FillDropDownList(DropDownList DDL, string commandText, CommandType commandType, Hashtable hstParameters, string strFieldText, string strFieldValue)
{
DDL.Items.Clear();

DbCommand command = (DbCommand)CreateDbCommand(commandText, commandType);
command.Connection = ConnStr;
command.CommandText = commandText;
command.CommandType = commandType;

if (hstParameters != null)
if (hstParameters.Count > 0)
AttachParameters(command, hstParameters);

DataSet dataset = new DataSet();
try
{
DbDataAdapter adapter = provider.CreateDataAdapter();
adapter.SelectCommand = command;
adapter.Fill(dataset);

DDL.DataSource = dataset;
DDL.DataTextField = strFieldText;
DDL.DataValueField = strFieldValue;
DDL.DataBind();
DDL.Items.Insert(0, new ListItem("Select One", "-1"));
}
catch (Exception ex)
{
HttpContext.Current.Response.Write("Error : " + ex.Message);
}
dataset.Dispose();

return DDL;
}
public DropDownList FillDropDownList(DropDownList DDL, string commandText, CommandType commandType, string strFieldText, string strFieldValue)
{
return FillDropDownList(DDL, commandText, commandType, null, strFieldText, strFieldValue);
}
public DropDownList FillDropDownList(DropDownList DDL, string commandText, string strFieldText, string strFieldValue)
{
return FillDropDownList(DDL, commandText, CommandType.Text, null, strFieldText, strFieldValue);
}

public ListBox FillListBox(ListBox LBX, string commandText, CommandType commandType, Hashtable hstParameters, string strFieldText, string strFieldValue)
{
LBX.Items.Clear();

DbCommand command = (DbCommand)CreateDbCommand(commandText, commandType);
command.Connection = ConnStr;
command.CommandText = commandText;
command.CommandType = commandType;

if (hstParameters != null)
if (hstParameters.Count > 0)
AttachParameters(command, hstParameters);

DataSet dataset = new DataSet();
try
{
DbDataAdapter adapter = provider.CreateDataAdapter();
adapter.SelectCommand = command;
adapter.Fill(dataset);

LBX.DataSource = dataset;
LBX.DataTextField = strFieldText;
LBX.DataValueField = strFieldValue;
LBX.DataBind();
}
catch (Exception ex)
{
HttpContext.Current.Response.Write("Error : " + ex.Message);
}
dataset.Dispose();

return LBX;
}
public ListBox FillListBox(ListBox LBX, string commandText, CommandType commandType, string strFieldText, string strFieldValue)
{
return FillListBox(LBX, commandText, commandType, null, strFieldText, strFieldValue);
}
public ListBox FillListBox(ListBox LBX, string commandText, string strFieldText, string strFieldValue)
{
return FillListBox(LBX, commandText, CommandType.Text, null, strFieldText, strFieldValue);
}

}
}

