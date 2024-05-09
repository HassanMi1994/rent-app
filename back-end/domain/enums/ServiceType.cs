namespace domain.enums
{
    public enum Currency
    {
        USDollar,
        Toman,
    }

    public enum ServiceType
    {
        Rent = 1,
        Sell = 2,
    }

    public enum ItemStatus
    {
        Renting = 1,
        PartialReturned = 2,
        ReturnedOk = 3,
        ReurnedNotOk = 4,
        Sold = 5,
    }

    public enum ReturnStatus
    {
        OK = 1,
        NotOk = 2
    }

    public enum RentCalculationType
    {
        Hourly,
        DailyRoundToUp,
        DailyRoundToDown
    }
}
