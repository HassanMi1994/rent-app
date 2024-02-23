namespace domain.enums
{
    public enum Currency
    {
        USDollar,
        Toman,
    }

    [Flags]
    public enum ServiceType
    {
        Rent = 1,//001
        Sell = 2,//010
        Both = 3 //011
    }

    public enum ItemStatus
    {
        Renting,
        Sold,
        ReturnedOk,
        ReurnedNotOk
    }

    public enum RentCalculationType
    {
        Hourly,
        DailyRoundToUp,
        DailyRoundToDown
    }
}
