using domain.enums;
using System.Text.Json;

namespace domain.entities
{
    public class UserSetting : IBaseEntity
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public string Data { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public static UserSetting Create(int userID, Setting setting)
        {
            return new UserSetting
            {
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Data = JsonSerializer.Serialize(setting),
                UserID = userID
            };
        }
    }

    public class Setting
    {
        public long ContractNoSeed { get; set; }
        public string Locale { get; set; }
        public int TaxPercent { get; set; }
        public ContractType DefaultItemType { get; set; }
        public RentCalculationType RentCalculationType { get; set; }
        public Currency Currency { get; set; }
    }
}
