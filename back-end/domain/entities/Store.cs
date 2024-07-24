using domain.enums;

namespace domain.entities
{
    public class Store
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public ServiceType ServiceType { get; set; }
        public bool IsDemoStore { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<Contract>? Contracts { get; set; }
    }
}
