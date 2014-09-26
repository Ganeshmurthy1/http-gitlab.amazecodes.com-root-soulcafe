using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Data.SqlClient;
using System.Data;


    public class SqlObject
    {

        private String mvarTableName;
        private PublicVariables.QueryType mvarQueryType;
        private String mVarWhereCondition;

        private Dictionary<String, Object> htFieldList = new Dictionary<String, Object>();
        private Dictionary<String, Object> htFieldTypeList = new Dictionary<String, Object>();

        public string TableName
        {
            get
            {
                return mvarTableName; ;
            }
            set
            {
                mvarTableName = value;
                htFieldList.Clear();
                htFieldTypeList.Clear();
            }
        }


        public string WhereCondition
        {
            get
            {
                return mVarWhereCondition;
            }
            set
            {
                mVarWhereCondition = value;
            }
        }

        public PublicVariables.QueryType QueryType
        {
            get
            {
                return mvarQueryType;
            }
            set
            {
                mvarQueryType = value;
            }
        }

        public void AddColumns(string FieldName, Object Value, PublicVariables.DataType sqlType)
        {
            
            htFieldList.Add(FieldName, Value);
            htFieldTypeList.Add(FieldName, sqlType);
        }


        public string getSQlString()
        {
            string strRetValue = "";
            if (mvarQueryType ==  PublicVariables.QueryType.Insert )
                strRetValue = GenerateInsertQuery();
            else if (mvarQueryType == PublicVariables.QueryType.Update )
                strRetValue = GenerateUpdateQuery();
            else if (mvarQueryType == PublicVariables.QueryType.Delete )
                strRetValue = GenerateDeleteQuery();
            else if (mvarQueryType == PublicVariables.QueryType.Select)
                strRetValue = GenerateSelectQuery();

            return strRetValue;

        }

        private string GenerateSelectQuery()
        {
            throw new NotImplementedException();
        }

        private string GenerateDeleteQuery()
        {
            string strSqlString = " DELETE FROM  " + mvarTableName + " WHERE ";
            return strSqlString + mVarWhereCondition;
        }

        private string GenerateUpdateQuery()
        {
            String strTempWhereCondition ="";
            string strSqlString = " UPDATE  " + mvarTableName + " SET ";
            PublicVariables.DataType sdbType;
            object objValue = "";
            string strComma = "";
            List<string> Fldlist = new List<string>(htFieldList.Keys);

            foreach (string strKey in Fldlist)
            {
                sdbType = (PublicVariables.DataType)htFieldTypeList[strKey];
                if (sdbType == PublicVariables.DataType.Number)
                    objValue = htFieldList[strKey];
                else if (sdbType == PublicVariables.DataType.Text)
                {
                    objValue = "'" + htFieldList[strKey] + "'";
                    objValue = objValue.ToString() == "''" ? "NULL" : objValue; 
                }
                else if (sdbType == PublicVariables.DataType.Date)
                {
                    objValue = "'" + htFieldList[strKey] + "'";
                    objValue = objValue.ToString() == "''" ? "NULL" : objValue;
                }

                else
                {
                    objValue = "'" + htFieldList[strKey] + "'";
                    objValue = objValue.ToString() == "''" ? "NULL" : objValue;
                }

                strSqlString = strSqlString + strComma + strKey + " = " + objValue;
                strComma = ",";

            }

            if (!String.IsNullOrEmpty(mVarWhereCondition.Trim()))
                strTempWhereCondition = " WHERE " ;

            return strSqlString + strTempWhereCondition + mVarWhereCondition;
        }

        private string GenerateInsertQuery()
        {
            string strFieldString = " INSERT INTO  " + mvarTableName + " ( ";
            string strValueString = " VALUES  (";
            string strSqlString = "";
            PublicVariables.DataType sdbType;
            object objValue = "";
            string strComma = "";
            List<string> Fldlist = new List<string>(htFieldList.Keys);
            foreach (string strKey in Fldlist)
            {
                strFieldString = strFieldString + strComma + strKey ;
                sdbType = (PublicVariables.DataType)htFieldTypeList[strKey];

                if (sdbType == PublicVariables.DataType.Number)
                    objValue = htFieldList[strKey];
                else if (sdbType == PublicVariables.DataType.Text)
                {
                    objValue = "'" + htFieldList[strKey] + "'";
                    objValue = objValue.ToString() == "''" ? "NULL" : objValue;
                }
                else if (sdbType == PublicVariables.DataType.Date)
                {
                    objValue = "'" + htFieldList[strKey] + "'";
                    objValue = objValue.ToString() == "''" ? "NULL" : objValue;
                }
                else
                {
                    objValue = "'" + htFieldList[strKey] + "'";
                    objValue = objValue.ToString() == "''" ? "NULL" : objValue;
                }
                strValueString = strValueString + strComma + objValue;
                strComma = ",";
            }
            strSqlString = strSqlString + strFieldString + " ) " +
                           strValueString + " ) ";
            return strSqlString;
        }
    }
