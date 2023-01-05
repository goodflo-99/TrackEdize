using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using Database.Entities.Identity;
using Humanizer;
using Identity.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace TrackEdize.Controllers
{
    [Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;
        private RoleManager<ApplicationRole> _roleManager;
        private SignInManager<ApplicationUser> _signInManager;

        private JwtTokenService _tokenService;

        public AccountController(UserManager<ApplicationUser> userManager, JwtTokenService tokenService,
             ILogger<AccountController> logger, RoleManager<ApplicationRole> roleManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = _userManager;
            _logger = logger;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("User")]
        [AllowAnonymous]
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

        [HttpPost("Token")]
        [AllowAnonymous]
        public async Task<IActionResult> Token([Required] string userName, string password)
        {
            
            var token = await _tokenService.GetTokenAsync(userName, password);
            if(token == null) {
                return Unauthorized();
            }
            
            return Ok(new {
                user = userName,
                token = token
            });
        }


        [HttpPost("Role")]
        [Authorize("Admin")]
        public async Task<IActionResult> AddRole(string name)
        {
            return Ok();
        }
    }
}
