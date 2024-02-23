namespace domain.entities
{
    public class History
    {
        public int Id { get; set; }
        public Guid Aggregate { get; set; }
        public string Object { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}