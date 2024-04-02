namespace domain.entities
{
    public class UserConfig : IBaseEntity
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public string? Config { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public static Config CreateDefaultConfig()
        {
            return new Config
            {
                ContractNoSeed = 630823,
                Currency = enums.Currency.Toman,
                DefaultContractType = enums.ContractType.Rent,
                RentCalculationType = enums.RentCalculationType.DailyRoundToDown,
                TaxPercent = 9,

            };
        }
    }
}
