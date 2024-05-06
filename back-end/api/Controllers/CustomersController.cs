using api.Middleware;
using domain.abstraction;
using Microsoft.AspNetCore.Mvc;
using Rent.Entities;

namespace api.Controllers
{
    [Auth(domain.enums.RoleType.Normal)]
    [Route("api/customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public IAsyncEnumerable<Customer> GetAll()
        {
            return _customerService.GetAll();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Customer customer)
        {
            await _customerService.Create(customer);
            return Ok();
        }
    }
}
