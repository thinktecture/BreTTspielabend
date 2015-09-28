using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Thinktecture.Brettspielabend.Api.Data;
using Thinktecture.Brettspielabend.Api.Helpers;

namespace Thinktecture.Brettspielabend.Api.Controllers
{
	public class ContestController : ApiController
	{
		private readonly DataStore _store;
		private readonly DistanceCalculator _distanceCalculator;

		public ContestController(DataStore store, DistanceCalculator distanceCalculator)
		{
			_store = store;
			_distanceCalculator = distanceCalculator;
		}

		[HttpPut]
		public IHttpActionResult Create(Contest contest)
		{
			// Sanity checks
			if (!_store.Users.ContainsKey(contest.HostId))
			{
				throw new Exception("Unknown Host.");
			}

			if (!_store.Games.ContainsKey(contest.GameId))
			{
				throw new Exception("Unknown Game.");
			}

			contest.Id = Guid.NewGuid();
			_store.Contests.Add(contest.Id, contest);

			return Created("Get?id=" + contest.Id, contest);
		}

		[HttpGet]
		public IHttpActionResult List()
		{
			return Ok(_store.Contests.Values.Select(v => new Contest
			{
				GameId = v.GameId,
				HostId = v.HostId,
				Game = _store.Games.Single(g => g.Key == v.GameId).Value,
				Id = v.Id,
				Location = v.Location
			}).ToList());
		}

		[HttpGet]
		public IHttpActionResult Get(Guid id)
		{
			if (!_store.Contests.ContainsKey(id))
			{
				return NotFound();
			}

			return Ok(_store.Contests[id]);
		}

		[HttpPost]
		public IHttpActionResult Update(Contest contest)
		{
			if (!_store.Contests.ContainsKey(contest.Id))
			{
				return NotFound();
			}

			_store.Contests[contest.Id] = contest;

			return Ok();
		}

		[HttpPost]
		public IHttpActionResult Delete(Guid id)
		{
			if (!_store.Contests.ContainsKey(id))
			{
				return NotFound();
			}

			_store.Contests.Remove(id);

			return Ok();
		}

		[HttpGet]
		public IHttpActionResult FindNearby([FromUri] Coordinates origin, int radius)
		{
			var contestsNearby = _store.Contests
				.Select(c => new 
				{
					Details = LoadGame(c.Value),
					Distance = _distanceCalculator.CalculateDistance(origin, c.Value.Location.Coordinates)
				})
				.Where(c => c.Distance < radius);

			return Ok(contestsNearby);
		}

		internal Contest LoadGame(Contest contest)
		{
			var game = _store.Games.SingleOrDefault(g => g.Key == contest.GameId);

			contest.Game = game.Value;

			return contest;
		}
	}
}