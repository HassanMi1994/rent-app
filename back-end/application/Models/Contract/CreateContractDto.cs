using domain.entities;
using domain.enums;

namespace application.Models.Contract
{
    public class CreateContractDto
    {
        public int CustomerID { get; set; }
        public int? HowManyDaysClaim { get; set; }
        public string RentLocation { get; set; }
        public DateTime Date { get; set; }
        public ICollection<ContractItemDto> Items { get; set; }
        public ICollection<PaymentDto> Payments { get; set; }
    }

    public class ContractItemDto
    {
        public int StuffID { get; set; }
        public int Quantity { get; set; }
        public decimal PricePerDay { get; set; }
        public DateTime RentDate { get; set; }
        public string? Description { get; set; }
    }

    public class PaymentDto
    {
        public decimal Amount { get; set; }
        public PaymentType PaymentType { get; set; }
    }
}
