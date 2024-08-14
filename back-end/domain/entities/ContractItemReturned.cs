using domain.enums;

namespace domain.entities
{
    /// <summary>
    /// This class is only used for renting businesses
    /// </summary>
    public class ReturnedItem
    {
        public int ID { get; set; }
        public int ContractItemID { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }//calculated price or entered price.
        public decimal CalculatedPrice { get; set; }
        public DateTime ReturnDateTime { get; set; }
        public ReturnStatus ItemStatus { get; set; }

        public long? CreatedByID { get; set; }
        public long? UpdatedByID { get; set; }
        public User? CreatedBy { get; set; }
        public User? UpdatedBy { get; set; }
    }
}
