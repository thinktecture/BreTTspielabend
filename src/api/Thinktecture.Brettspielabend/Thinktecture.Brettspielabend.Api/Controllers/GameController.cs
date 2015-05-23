using System;
using System.Linq;
using System.Web.Http;
using Thinktecture.Brettspielabend.Api.Data;

namespace Thinktecture.Brettspielabend.Api.Controllers
{
	public class GameController : ApiController
	{
		private readonly DataStore _store;

		public GameController(DataStore store)
		{
			_store = store;
		}

		[HttpPut]
		public IHttpActionResult Create(Game game)
		{
			game.Id = Guid.NewGuid();
			_store.Games.Add(game.Id, game);

			return Created("Get?id=" + game.Id, game);
		}

		[HttpGet]
		public IHttpActionResult List()
		{
			return Ok(_store.Games.Values.Select(u => new {
				u.Id,
				u.Title
			}));
		}

		[HttpGet]
		public IHttpActionResult Get(Guid id)
		{
			if (!_store.Games.ContainsKey(id))
			{
				return NotFound();
			}

			return Ok(_store.Games[id]);
		}

		[HttpPost]
		public IHttpActionResult Update(Game game)
		{
			if (!_store.Games.ContainsKey(game.Id))
			{
				return NotFound();
			}

			_store.Games[game.Id] = game;

			return Ok();
		}

		[HttpPost]
		public IHttpActionResult Delete(Guid id)
		{
			if (!_store.Games.ContainsKey(id))
			{
				return NotFound();
			}

			_store.Games.Remove(id);

			return Ok();
		}
	}
}