using application.Services;
using domain.abstraction;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class RentAppServices
    {
        public static IServiceCollection AddRentAppServices(this IServiceCollection services)
        {
            services.AddTransient(typeof(ICustomerService), typeof(CustomerService));
            return services;
        }
    }
}
