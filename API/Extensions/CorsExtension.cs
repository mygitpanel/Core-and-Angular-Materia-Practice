using Microsoft.AspNetCore.Builder;

namespace API.Extensions
{
    public static class CorsExtension
    {
        public static IApplicationBuilder ApplicationBuilderCorsService(this IApplicationBuilder app)
        {
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
            return app;
        }
    }
}