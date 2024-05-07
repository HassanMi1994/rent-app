namespace application.Models.User
{
    public class UserInfoDto
    {
        public string JwtKey { get; set; }
        public string StoreName { get; set; }
        public string FullName { get; set; }
        public long UserID { get; set; }
        public long StoreID { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
    }
}
