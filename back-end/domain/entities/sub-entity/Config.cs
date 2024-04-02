using domain.enums;

namespace domain.entities
{
    public class Config
    {
        public long ContractNoSeed { get; set; }
        public int TaxPercent { get; set; }
        public ContractType DefaultContractType { get; set; }
        public RentCalculationType RentCalculationType { get; set; }
        public Currency Currency { get; set; }

        public static Config Default => new Config
        {
            DefaultContractType = ContractType.Rent,
            ContractNoSeed = 630823,
            Currency = Currency.USDollar,
            TaxPercent = 0,
            RentCalculationType = RentCalculationType.Hourly,
        };
    }
}
