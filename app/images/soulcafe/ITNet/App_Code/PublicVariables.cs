using System;

public static class PublicVariables
    {
        public enum QueryType
        {
            Insert = 1,
            Update = 2,
            Delete = 3,
            Select = 4,
        };

        public enum DataType
        {
            Number = 1,
            Date = 2,
            Text = 3,
        };

        public enum AddEditDeleteDisplay
        {
            Add = 1,
            Edit = 2,
            Delete = 3,
            Display = 4
            //Approval = 5,
            //CancelApproval = 6
        };

        public enum ReadWrite
        {
            Read  = 1,
            Write = 2,
        };

        public enum Numbering
        {
            AutoNumber = 1,
            Manuel = 2,
        };


        public static Boolean LoginSuccess = false;
        public static Int16 NoofGraceLogin = 3;
        public static String YearMonthDateLongFormat = "yyyy-MM-dd HH:mm:ss";

        public static String YearMonthDateShortFormat = "yyyy-MM-dd";
        public static String HomePage = "PageStart.aspx";

        public static String WebPathString = "";//"http://caeadsql/";
    }

   
