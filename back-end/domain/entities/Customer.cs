using domain.entities;

namespace Rent.Entities
{
    public class Customer : IBaseEntity
    {
        #region props
        public int ID { get; set; }
        public long StoreID { get; set; }
        public string FullName { get; set; }
        public string NationalityCode { get; set; }
        public string FatherName { get; set; }
        public string Mobile { get; set; }
        public string RefereeName { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        #endregion

        #region create
        public Customer Create(string fullName, string mobile, string refereeName)
        {
            FullName = fullName;
            Mobile = mobile;
            RefereeName = refereeName;
            return this;
        }
        #endregion
    }
}
