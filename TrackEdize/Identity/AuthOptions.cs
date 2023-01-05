using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Identity.Security;

public class AuthOptions
{
    public const string ISSUER = "TrackEdizeAuthServer"; // издатель токена
    public const string AUDIENCE = "TrackEdizeAuthClient"; // потребитель токена
    const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
    public const int LIFETIME = 1; // время жизни токена - 1 минута
    public static SymmetricSecurityKey SymmetricSecurityKey
    {
        get => new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
    }
}