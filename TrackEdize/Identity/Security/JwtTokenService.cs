using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Database.Entities.Identity;
using Database.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Common.Entities.Identity;

namespace Identity.Security;

public class JwtTokenService
{
    private readonly AccountRepository _repository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public JwtTokenService(AccountRepository accountRepository, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager) 
    {
        _repository = accountRepository;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    internal async Task<string> GetTokenAsync(LoginRequest request)
    {
        var identity = await GetIdentityAsync(request.UserName, request.Password);
        if(identity == null) {
            return null;
        }

        var now = DateTime.UtcNow;
        // создаем JWT-токен
        var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.SymmetricSecurityKey, SecurityAlgorithms.HmacSha256));
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        return encodedJwt;
    }

    private async Task<ClaimsIdentity> GetIdentityAsync(string username, string password)
    {
        var user = await _repository.GetUserAsync(username);

        if(user == null) {
            return null;
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

        if(!result.Succeeded)
        {
            return null;
        }

        var claims = new[] {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };
        
        ClaimsIdentity ci = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
        return ci;
    }
}