using application.Security;
using domain.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using System.Globalization;
using System.Net;

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
            var hasAuthorizeAttribute = context.Features.Get<IEndpointFeature>().Endpoint.Metadata
                .FirstOrDefault(m => m is AuthAttribute);

            if (hasAuthorizeAttribute != null)
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
            }
            await _next(context);
        }
    }

}

