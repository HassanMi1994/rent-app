using domain.enums;

namespace domain.entities
{
    public class UserConfig : IBaseEntity
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int UserConfigID { get; set; }
        public long ContractNoSeed { get; set; }
        public int TaxPercent { get; set; }
        public ServiceType ServiceType { get; set; }
        public RentCalculationType RentCalculationType { get; set; }
        public Currency Currency { get; set; }

        public static UserConfig Default => new UserConfig
        {
            ServiceType = ServiceType.Rent,
            ContractNoSeed = 630823,
            Currency = Currency.Toman,
            TaxPercent = 9,
            RentCalculationType = RentCalculationType.Hourly,
        };

        public static UserConfig CreateDefaultConfig(int userID)
        {
            return new UserConfig
            {
                UserID = userID,
                CreatedAt = DateTime.Now,
                ContractNoSeed = 630823,
                TaxPercent = 9,
                ServiceType = ServiceType.Rent,
                Currency = Currency.Toman,
                RentCalculationType = RentCalculationType.DailyRoundToDown,
            };
        }
    }
}
