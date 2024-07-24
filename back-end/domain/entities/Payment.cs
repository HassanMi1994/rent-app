using domain.enums;

namespace domain.entities
{
    public class Payment
    {
        public int ID { get; set; }
        public int ContractID { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateTime { get; set; }
        public PaymentType PaymentType { get; set; }
    }
}

