using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Data;

namespace Talent.Objects
{
    public interface RWFieldInterface
    {

        String GetFieldName();

        PublicVariables.DataType GetFieldType();

        bool GetReadStatus();

        bool GetWriteStatus();

        void AssignDataToTag();

        void DataRowToControl(DataRow dtRow);
        
        bool IsValidData();

        String GetCheckDataMsg();

        Object GetValue();


        void LockControl(bool LockValue);

        void ClearControl();
    }
}
