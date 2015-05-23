﻿using System;
using System.Linq;
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

		public IHttpActionResult Create(Contest contest)
		{
			contest.Id = Guid.NewGuid();
			_store.Contests.Add(contest.Id, contest);

			return Created("Get?id=" + contest.Id, contest);
		}

		[HttpGet]
		public IHttpActionResult List()
		{
			return Ok(_store.Contests.Values);
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

		public IHttpActionResult FindNearby([FromBody] Coordinates origin, int radius)
		{
			var contestsNearby = _store.Contests
				.Select(c => new 
				{
					Contest = c.Value,
					c.Value.Location.Coordinates
				})
				.Where(c => _distanceCalculator.CalculateDistance(origin, c.Coordinates) < radius)
				.Select(c => c.Contest);

			return Ok(contestsNearby);
		}
	}
}