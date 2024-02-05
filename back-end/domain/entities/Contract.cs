namespace domain.entities
{
    public class Contract : IBaseEntity
    {
        public int ID { get; set; }
        public int CustomerID { get; set; }
        public int? HowManyDaysClaim { get; set; }
        public decimal PrePaidMoney { get; set; }
        public decimal TotalPricePerDay { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public ICollection<RentedStuff> ContractStuffs { get; set; }
    }
}
