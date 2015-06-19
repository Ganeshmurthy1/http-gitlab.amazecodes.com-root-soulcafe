using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Data;

namespace Talent.Objects
{
    public class SearchObject
    {
        ArrayList m_ColumnNames; 
        ArrayList m_ColumnHeadings;
        ArrayList m_ColumnWidths;
        public Dictionary<String, Object> ReturnColumns;
        public Dictionary<String, Object> ApplyValueFields; 

        String m_TableName = "";
        String m_WhereCondition = "";
        String m_OrderBy = "";
        String m_CodeField = "";
        bool m_MandatoryValidation = false;
        bool m_ForceValidation = true;
        String m_PrimaryControlName = "";
        public String FirstSearchValue = "";
        public int WildCardOccurrences;
        public String FoundedWildCard;
        public String FirstSearchTextBoxValue;
        public bool ItemSelected = false;

        public SearchObject()
        {   
            ReturnColumns = new Dictionary<String, Object>();
            ApplyValueFields = new Dictionary<string, object>();

            m_ColumnNames = new ArrayList();
            m_ColumnHeadings = new ArrayList();
            m_ColumnWidths = new ArrayList();
            WildCardOccurrences = 0;
            FoundedWildCard = "";
            FirstSearchTextBoxValue = "";
            ItemSelected = false;
        }

        public String PrimaryControlName
        {
            get
            {
                return m_PrimaryControlName;
            }
            set
            {
                m_PrimaryControlName = value;
            }
        }

        public String CodeField
        {
            get
            {
                return m_CodeField;
            }
            set
            {
                m_CodeField = value;
            }
        }

        public bool ForceValidation
        {
            get
            {
                return m_ForceValidation;
            }
            set
            {
                m_ForceValidation = value;
            }
        }

        public bool MandatoryValidation
        {
            get
            {
                return m_MandatoryValidation;
            }
            set
            {
                m_MandatoryValidation = value;
            }
        }

        public String TableName
        {
            get
            {
                return m_TableName;
            }
            set
            {
                m_TableName = value;
            }
        }

        public String WhereCondition
        {
            get
            {
                return m_WhereCondition;
            }
            set
            {
                m_WhereCondition = value;
            }
        }

        public String OrderBy
        {
            get
            {
                return m_OrderBy;
            }
            set
            {
                m_OrderBy = value;
            }
        }


        public ArrayList ColumnNames
        {
            get
            {
                return m_ColumnNames;
            }
            set
            {
                m_ColumnNames = value;
            }
        }

        public ArrayList ColumnHeadings
        {
            get
            {
                return m_ColumnHeadings;
            }
            set
            {
                m_ColumnHeadings = value;
            }
        }

        public ArrayList ColumnWidths
        {
            get
            {
                return m_ColumnWidths;
            }
            set
            {
                m_ColumnWidths = value;
            }
        }

        private String GetWhereCondition()
        {
            String strRetValue = "";
            if (String.IsNullOrEmpty(m_WhereCondition))
                strRetValue = "";
            else
                strRetValue = " WHERE " + m_WhereCondition;

            return strRetValue;
        }

        private String GetOrderBy()
        {
            String strRetValue = "";
            if (String.IsNullOrEmpty(m_OrderBy))
                strRetValue = " ORDER BY 1";
            else
                strRetValue = " ORDER BY " + m_OrderBy;

            return strRetValue;
               
        }

        public String GetQuery(String AdditionalWhereCondition)
        {
            String strRetValue = " SELECT " ;
            String strComma = "";
            String strAdditionalWhereCondition = "";
            String strWhereCondition = GetWhereCondition();
            if (!String.IsNullOrEmpty(AdditionalWhereCondition))
                strAdditionalWhereCondition = " WHERE " + AdditionalWhereCondition;

            if (String.IsNullOrEmpty(strWhereCondition.Trim()))
            {
                if (String.IsNullOrEmpty(AdditionalWhereCondition))
                    strWhereCondition = "";
                else
                    strWhereCondition = " WHERE " + AdditionalWhereCondition;

            }
            else
            {
                if (!String.IsNullOrEmpty(AdditionalWhereCondition))
                    strWhereCondition = strWhereCondition + " AND " + AdditionalWhereCondition;
            }

            int intColumnsCount = m_ColumnNames.Count;
            for (int intCounter = 0; intCounter < intColumnsCount; intCounter++)
            {
                strRetValue = strRetValue + strComma + m_ColumnNames[intCounter].ToString() ;
                strComma = ",";
            }
            strRetValue = strRetValue + " FROM " + m_TableName + strWhereCondition + GetOrderBy();
            return strRetValue;
        }

        public DataTable GetTable()
        {
            DataTable SearchTable = new DataTable();

            DataLayer dlDataLater = new DataLayer();
            dlDataLater.StartConnections();
            SearchTable = dlDataLater.GetDataTable(GetQuery(""));
            dlDataLater.CloseConnections();
            dlDataLater.Dispose();
            return SearchTable;
        }

        public void SetFilterFromWildCards(string strFirstValue)
        {
            int intStrLen = strFirstValue.Length;
            int intWildCardsOccurance = 0;
            String strFoundWildCard = "";
            foreach (String strWildCards in SessionProperties.SearchWildCardOptions.Keys)
            {
                if (strFirstValue.EndsWith(strWildCards.ToString()))
                {
                    strFoundWildCard = strWildCards.ToString();
                    for (int intCounter = intStrLen - 1; intCounter >= 0; intCounter--)
                    {
                        if (strFirstValue.Substring(intCounter, 1) == strWildCards.ToString())
                        {
                            intWildCardsOccurance++;
                        }
                        else
                            break;
                    }
                    break;
                }
            }
            if (intWildCardsOccurance > 0)
            {
                WildCardOccurrences = intWildCardsOccurance;
                FoundedWildCard = strFoundWildCard;

                FirstSearchTextBoxValue = strFirstValue.Substring(0, strFirstValue.Length - (intWildCardsOccurance));
            }
            else
                FirstSearchTextBoxValue = FirstSearchValue;
        }

        public bool ValidateData(String strValidateData)
        {
            DataLayer dlDataLayer = new DataLayer();
            String strWhereConditon = "";
            String strQuery = "";
            bool blRetValue = false;
            strWhereConditon = m_CodeField + " = '" + strValidateData + "' ";
            List<string> Keylist = new List<string>(ReturnColumns.Keys);
            ReturnColumns.Clear();

            foreach (String strKeys in Keylist)
            {
                ReturnColumns[strKeys]  = "";
            }
            
            bool ValidateIfNullAlso =true ;
            if(String.IsNullOrEmpty( strValidateData.Trim()))
            {
                ValidateIfNullAlso = false;
                blRetValue = true;
                if (m_MandatoryValidation)
                    ValidateIfNullAlso = true;
            }

            if (ValidateIfNullAlso)
            {
                blRetValue = false;
                strQuery = GetQuery(strWhereConditon);
                dlDataLayer.StartConnections();
                DataTable dtTable = dlDataLayer.GetDataTable(strQuery);
                if (dtTable.Rows.Count > 0)
                {
                    blRetValue = true;
                    ReturnColumns.Clear();
                    foreach (String strKeys in Keylist)
                    {
                        ReturnColumns.Add(strKeys.ToString(), dtTable.Rows[0][strKeys].ToString());
                    }
                }
                dtTable = null;
                dlDataLayer.CloseConnections();
            }
            dlDataLayer.Dispose();

            if (m_ForceValidation == false)
            {
                blRetValue = true;
            }
            return blRetValue;
        }
    }
}
