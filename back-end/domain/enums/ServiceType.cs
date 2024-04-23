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
        ReturnedOk = 2,
        ReurnedNotOk = 3,
        Sold = 4,
    }

    public enum RentCalculationType
    {
        Hourly,
        DailyRoundToUp,
        DailyRoundToDown
    }
}
