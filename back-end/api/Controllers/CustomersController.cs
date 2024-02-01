using domain.abstraction;
using Microsoft.AspNetCore.Mvc;
using Rent.Entities;

namespace api.Controllers
{
    [Route("api/[controller]")]
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
