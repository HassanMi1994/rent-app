using domain.enums;
using Rent.Entities;

namespace domain.entities
{
    public class Contract : IBaseEntity
    {
        public int ID { get; set; }
        public int ContractNumber { get; set; }
        public ServiceType ContractType { get; set; }
        public int CustomerID { get; set; }
        public DateTime Date { get; set; }
        public string RentLocation { get; set; }
        public int? HowManyDaysClaim { get; set; }
        public decimal TotalPricePerDay { get; set; }

        public decimal TotalPaidAmount
        {
            get
            {
                return GetPaidAmount();
            }
        }
        public decimal Remaining { get; set; }
        public ContractStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Customer Customer { get; set; }
        public required ICollection<ContractItem> Items { get; set; }
        public ICollection<Payment> Payments { get; set; }

        public decimal GetHowMuchMoneyShouldBePaid()
        {
            var allCost = Items.Sum(x => x.Quantity * x.PricePerDay);
            return allCost;
        }

        public decimal GetPaidAmount()
        {
            return Payments?.Sum(x => x.Amount) ?? 0;
        }

        public void AddPyament(Payment payment)
        {
            Payments.Add(payment);
        }
    }
}

