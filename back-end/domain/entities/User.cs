using domain.enums;

namespace domain.entities
{
    public class User
    {
        public long ID { get; set; }
        public long StoreID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public bool IsAdmin { get; set; }
        public string Password { get; set; }
        public Store Store { get; set; }
    }
}
