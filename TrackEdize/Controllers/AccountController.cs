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

namespace TrackEdize.Controllers
{
    [Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;

        private JwtTokenService _tokenService;

        private IMapper _mapper;

        public AccountController(UserManager<ApplicationUser> userManager, JwtTokenService tokenService, ILogger<AccountController> logger, IMapper mapper)
        {
            _userManager = userManager;
            _logger = logger;
            _tokenService = tokenService;
            _mapper = mapper;
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
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
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
            var user = await _userManager.GetUserAsync(User);
            var mappedUser = _mapper.Map<AccountInfo>(user);

            return Ok(mappedUser);
        }

        [HttpPut("AccountInfo")]
        [Authorize]
        public async Task<IActionResult> UpdateAccountInfo(AccountInfo accountInfo)
        {
            var user = await _userManager.GetUserAsync(User);
            _mapper.Map(accountInfo, user);
            await _userManager.UpdateAsync(user);

            return Ok(accountInfo);
        }


        [HttpPost("Role")]
        [Authorize("Admin")]
        public async Task<IActionResult> AddRole(string name)
        {
            return Ok();
        }
    }
}
