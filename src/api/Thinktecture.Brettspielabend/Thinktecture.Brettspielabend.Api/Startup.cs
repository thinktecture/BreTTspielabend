using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Owin;
using Thinktecture.Brettspielabend.Api.Data;
using Thinktecture.Brettspielabend.Api.Helpers;

namespace Thinktecture.Brettspielabend.Api
{
    public class Startup
    {
	    public void Configuration(IAppBuilder app)
	    {
		    var container = GetAutofacContainerBuilder();
		    var config = ConfigureWebApi(container);

		    app.UseWebApi(config);
	    }

	    public IContainer GetAutofacContainerBuilder()
	    {
			var containerBuilder = new ContainerBuilder();
			containerBuilder.RegisterApiControllers(typeof(Startup).Assembly);

		    containerBuilder.RegisterType<DataStore>().SingleInstance();
		    containerBuilder.RegisterType<DistanceCalculator>().SingleInstance();

		    return containerBuilder.Build();
	    }

	    public HttpConfiguration ConfigureWebApi(IContainer container)
	    {
			var config = new HttpConfiguration();
			config.Routes.MapHttpRoute("Default", "api/{controller}/{action}");
			config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

		    return config;
	    }
    }
}
