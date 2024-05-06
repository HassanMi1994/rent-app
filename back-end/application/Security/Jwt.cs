using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace application.Security
{
    public class Jwt
    {
        public const string SECURITY_KEY = "MIIBrTCCAaGgfjawoinvajaWEfeffowe89529fusjffmvskeofejfosFJDALWEO";

        public static string TokenGenerator(Dictionary<string, object> claims)
        {
            DateTime value = DateTime.Now.AddDays(1);
            byte[] bytes = Encoding.ASCII.GetBytes(Jwt.SECURITY_KEY);
            SigningCredentials signingCredentials = new SigningCredentials(new SymmetricSecurityKey(bytes), "http://www.w3.org/2001/04/xmldsig-more#hmac-sha256");
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = value,
                SigningCredentials = signingCredentials,
                Issuer = "Hasan Monjezi",
                IssuedAt = DateTime.Now,
                Claims = claims
            };
            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = jwtSecurityTokenHandler.CreateToken(tokenDescriptor);
            return jwtSecurityTokenHandler.WriteToken(token);
        }

        public static bool ValidateToken(string authToken)
        {
            authToken = authToken.Split(' ')[1];
            if (string.IsNullOrEmpty(authToken)) { return false; }
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters();

            SecurityToken validatedToken;
            IPrincipal principal = tokenHandler.ValidateToken(authToken, validationParameters, out validatedToken);
            return true;
        }

        private static TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = false, // Because there is no expiration in the generated token
                ValidateAudience = false, // Because there is no audiance in the generated token
                ValidateIssuer = false,   // Because there is no issuer in the generated token
                ValidIssuer = "Hassan Monjezi",
                ValidAudience = "Rent Sell App",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SECURITY_KEY)) // The same key as the one that generate the token
            };
        }

        public static IEnumerable<Claim> GetClaimsFromJwt(string jwtToken)
        {
            var stream = jwtToken.Split(' ')[1];
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadJwtToken(stream);
            return jsonToken.Claims;
        }


    }
}
