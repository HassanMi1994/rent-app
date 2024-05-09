using domain.enums;

namespace domain.entities
{
    public class Stuff : IBaseEntity
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ServiceType ServiceType { get; set; }
        public decimal PricePerDay { get; set; }
        public decimal? BuyPrice { get; set; }
        public decimal? SellPrice { get; set; }
        public int Quantity { get; set; }
        public int Remaining { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
