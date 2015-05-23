using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Owin;

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
