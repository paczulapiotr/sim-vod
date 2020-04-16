using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace SimVodServer.API
{
    public static class ServiceProviderExtensions
    {
        public static void RegisterUsecases(this IServiceCollection serviceProvider)
        {
            var usecases = Assembly.GetExecutingAssembly()
                .GetTypes()
                .Where(type => type.Name.ToLower().Contains("usecase"));
            foreach (var usecase in usecases)
            {
                serviceProvider.AddScoped(usecase);
            }
        }
    }
}
