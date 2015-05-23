using System.Web.Http;

namespace Thinktecture.Brettspielabend.Api.Controllers
{
	public class UserController : ApiController
	{
		[HttpGet]
		public string Ping()
		{
			return "Pong";
		}
	}
}