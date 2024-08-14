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

        //who created/updated
        public long? CreatedByID { get; set; }
        public long? UpdatedByID { get; set; }
        public User? CreatedBy { get; set; }
        public User? UpdatedBy { get; set; }
    }
}

