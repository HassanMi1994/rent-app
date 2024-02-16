namespace domain.entities
{
    public class ContractItem : IBaseEntity
    {
        public int Id { get; set; }
        public int ContractID { get; set; }
        public int StuffID { get; set; }
        public int Quantity { get; set; }
        public DateTime RentDate { get; set; }
        public bool IsReturned { get; set; }
        public bool IsReturnedOkay { get; set; }
        public decimal PricePerDay { get; set; }
        public string? Description { get; set; }
        public Stuff Stuff { get; set; }
        public Contract Contract { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
