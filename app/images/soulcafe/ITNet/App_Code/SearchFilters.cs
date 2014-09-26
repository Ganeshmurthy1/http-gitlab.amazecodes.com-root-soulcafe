using System;
public class SearchFilters
{
    String m_OperatorExpression = "";
    String m_WildCards = "";
    public String OperatorExpression
    {
        get
        {
            return m_OperatorExpression;
        }
        set
        {
            m_OperatorExpression = value;
        }
    }


    public String WildCards
    {
        get
        {
            return m_WildCards;
        }
        set
        {
            m_WildCards = value;
        }
    }

}