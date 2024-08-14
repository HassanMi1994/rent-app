using domain.Exceptions;

namespace api.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ExceptionBase appException)
            {
                context.Response.Clear();
                context.Response.StatusCode = (int)appException.ExceptionCode;
            }
            catch (Exception notHandled)
            {
                //todo: save log...
                throw;
            }
        }
    }
}
