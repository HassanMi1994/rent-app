namespace Rent.Entities
{
    public class Customer
    {
        #region props
        public int ID { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string Mobile { get; set; }
        public string RefereeName { get; set; }
        public string Address { get; set; }
        #endregion

        #region create
        public Customer Create(string name, string lastName, string mobile, string refereeName)
        {
            Name = name;
            LastName = lastName;
            Mobile = mobile;
            RefereeName = refereeName;
            return this;
        }
        #endregion

    }
}
