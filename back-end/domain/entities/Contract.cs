using domain.enums;
using Rent.Entities;

namespace domain.entities
{
    public class Contract : IBaseEntity
    {
        public int ID { get; set; }
        public int ContractNumber { get; set; }
        public int CustomerID { get; set; }
        public DateTime Date { get; set; }
        public string RentLocation { get; set; }
        public int? HowManyDaysClaim { get; set; }
        public decimal PrePaidMoney { get; set; }
        public decimal TotalPricePerDay { get; set; }
        public ContractStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Customer Customer { get; set; }
        public required ICollection<ContractItem> Items { get; set; }
    }
}

