using domain.enums;

namespace domain.entities
{
    public class UserConfig : IBaseEntity
    {
        public int Id { get; set; }
        public long UserID { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public long StoreID { get; set; }
        public long ContractNoSeed { get; set; }
        public long? LastContractNoSeed { get; set; }
        public int TaxPercent { get; set; }
        public ServiceType ServiceType { get; set; }
        public CalendarType CalendarType { get; set; }
        public RentCalculationType RentCalculationType { get; set; }
        public Currency Currency { get; set; }

        public bool CanChangeContractNo => LastContractNoSeed == null;

        private readonly static object __lock = new object();

        public long GetNextContractNo()
        {
            lock (__lock)
            {
                if (LastContractNoSeed == null)
                {
                    LastContractNoSeed = ContractNoSeed;
                }
                else
                {
                    LastContractNoSeed++;
                }
                return (long)LastContractNoSeed;
            }
        }

        public static UserConfig CreateDefaultConfig(long userID, long storeID)
        {
            return new UserConfig
            {
                StoreID = storeID,
                UserID = userID,
                CreatedAt = DateTime.Now,
                ContractNoSeed = 630823,
                TaxPercent = 9,
                CalendarType = CalendarType.Georgian,
                ServiceType = ServiceType.Rent,
                Currency = Currency.Toman,
                RentCalculationType = RentCalculationType.DailyRoundToDown,
            };
        }
    }
}
