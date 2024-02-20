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
        public string ContractNoSeed { get; set; }
        public string Locale { get; set; }
        public Currency Currency { get; set; }//todo: this should be enum!
    }
}
