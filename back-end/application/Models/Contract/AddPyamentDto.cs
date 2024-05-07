using domain.enums;

namespace application.Models.Contract
{
    public class AddPyamentDto
    {
        public long ContractID { get; set; }
        public decimal Amount { get; set; }
        public PaymentType PaymentType { get; set; }
    }
}
