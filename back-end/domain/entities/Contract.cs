namespace domain.entities
{
    public class Contract : IBaseEntity
    {
        public int ID { get; set; }
        public int CustomerID { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
