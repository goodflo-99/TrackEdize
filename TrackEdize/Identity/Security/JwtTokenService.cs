using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Database.Repositories;
using Microsoft.IdentityModel.Tokens;

namespace Identity.Security;

public class JwtTokenService
{
    private AccountRepository _repository;

    public JwtTokenService(AccountRepository accountRepository) 
    {
        _repository = accountRepository;
    }

    internal async Task<string> GetTokenAsync(string username, string password)
    {
        var identity = await GetIdentityAsync(username, password);
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

        var claims = new[] {
            new Claim(ClaimTypes.Name, username)
        };
        
        ClaimsIdentity ci = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
        return ci;
    }
}