using application.Security;
using application.Services;
using domain.Exceptions;
using Microsoft.AspNetCore.Http.Features;

namespace api.Middleware
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var authAttribute = context.Features.Get<IEndpointFeature>()?.Endpoint?.Metadata
                .FirstOrDefault(m => m is AuthAttribute) as AuthAttribute;

            if (authAttribute != null)
            {
                var authorization = context.Request.Headers["authorization"].ToString();
                if (authorization.Length == 0)
                {
                    throw new ExceptionBase(ExceptionCodes.NotAuthorized);
                }
                var isValid = Jwt.ValidateToken(authorization);
                if (!isValid)
                {
                    throw new ExceptionBase(ExceptionCodes.NotAuthorized);
                }
                if (authAttribute.RoleType == domain.enums.RoleType.Admin)
                {
                    var isAdmin = Jwt.GetClaimsFromJwt(authorization).Where(x => x.Type == AppClaims.IsAdmin).FirstOrDefault();
                    if (isAdmin.Value.ToLower() == "false")
                    {
                        throw new ExceptionBase(ExceptionCodes.OnlyForAdminUsers);
                    }
                }
            }
            await _next(context);
        }
    }

}

