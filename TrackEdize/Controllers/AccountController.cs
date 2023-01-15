using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using Common.Entities.Identity;
using Database.Entities.Identity;
using Humanizer;
using Identity.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Common.Entities;
using BusinessLogic.Services;

namespace TrackEdize.Controllers
{
    [Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly AccountService _accountService;
        private JwtTokenService _tokenService;

        public AccountController(UserManager<ApplicationUser> userManager, JwtTokenService tokenService, 
            ILogger<AccountController> logger, RoleManager<ApplicationRole> roleManager, AccountService accountService)
        {
            _userManager = userManager;
            _logger = logger;
            _tokenService = tokenService;
            _roleManager = roleManager;
            _accountService = accountService;
        }

        [HttpPost("User")]
        [AllowAnonymous]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                await _accountService.CreateNewUser(user);
            }
            catch
            {
                return BadRequest("User creation fail");
            }

            return Ok(user);
        }

        [HttpPost("Token")]
        [AllowAnonymous]
        public async Task<IActionResult> Token([Required, FromBody] LoginRequest request)
        {
            var token = await _tokenService.GetTokenAsync(request);
            if(token == null) {
                return Unauthorized();
            }
            
            return Ok(new {
                user = request.UserName,
                token = token
            });
        }


        [HttpGet("AccountInfo")]
        [Authorize]
        public async Task<IActionResult> GetAccountInfo()
        {
            return Ok(await _accountService.GetAccountInfo());
        }

        [HttpPut("AccountInfo")]
        [Authorize]
        public async Task<IActionResult> UpdateAccountInfo(AccountInfo accountInfo)
        {
            return Ok(await _accountService.UpdateAccountInfo(accountInfo));
        }


        [HttpPost("Role")]
        [Authorize("Admin")]
        public async Task<IActionResult> AddRole(string name)
        {
            var result = await _roleManager.CreateAsync(new ApplicationRole { Name = name });
            if(!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok(result.Succeeded);
        }

        [HttpGet("GetByRole")]
        [Authorize]
        public async Task<IActionResult> GetByRole(string role)
        {
            return Ok(await _accountService.UsersByRole(role));
        }
    }
}
