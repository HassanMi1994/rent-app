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
        public async Task<List<Customer>> GetAll()
        {
            var custs = await _customerService.GetAll();
            return custs;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Customer customer)
        {
            await _customerService.Create(customer);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(Customer customer)
        {
            await _customerService.Update(customer);
            return Ok();
        }
    }
}
