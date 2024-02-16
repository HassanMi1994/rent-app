namespace domain.entities
{
    public enum Currency
    {
        USDollar,
        Toman,
    }

    public class Setting
    {
        public int Id { get; set; }
        public int UserID { get; set; }
    }
}
