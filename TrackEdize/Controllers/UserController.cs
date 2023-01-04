using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TrackEdize.Identity.Models;

namespace TrackEdize.Controllers
{
    [Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;
        private RoleManager<ApplicationRole> _roleManager;
        public UserController(UserManager<ApplicationUser> userManager, ILogger<UserController> logger, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = _userManager;
            _logger = logger;
            _roleManager = roleManager;
        }

        [HttpPost("User")]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            ApplicationUser appUser = new ApplicationUser()
            {
                UserName = user.UserName,
                Email = user.Email
            };

            var res = await _userManager.CreateAsync(appUser, user.Password);

            if (res.Succeeded)
            {
                _logger.LogInformation("User was created", user);
            } 
            else
            {
                _logger.LogError("User creation fail", user, res.Errors);
                return BadRequest("User creation fail");
            }

            return Ok(user);
        }


        [HttpPost("Role")]
        public async Task<IActionResult> AddRole(string name)
        {
            return Ok();
        }
    }
}
