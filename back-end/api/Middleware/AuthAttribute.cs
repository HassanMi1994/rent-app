using domain.enums;

namespace api.Middleware
{
    public class AuthAttribute : Attribute
    {
        public RoleType RoleType { get; set; }

        public AuthAttribute(RoleType role = RoleType.Normal)
        {
            this.RoleType = role;
        }
    }
}
