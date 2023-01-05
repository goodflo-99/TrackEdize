using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Identity.Security;

public class AuthOptions
{
    public const string ISSUER = "TrackEdizeAuthServer";
    public const string AUDIENCE = "TrackEdizeAuthClient";
    const string KEY = "mysupersecret_secretkey!123";
    public const int LIFETIME = 120;
    public static SymmetricSecurityKey SymmetricSecurityKey
    {
        get => new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
    }
}