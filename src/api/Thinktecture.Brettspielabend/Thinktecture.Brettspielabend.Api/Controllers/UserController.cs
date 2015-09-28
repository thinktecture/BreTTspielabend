using System;
using System.Linq;
using System.Web.Http;
using Thinktecture.Brettspielabend.Api.Data;

namespace Thinktecture.Brettspielabend.Api.Controllers
{
	public class UserController : ApiController
	{
		private readonly DataStore _store;

		public UserController(DataStore store)
		{
			_store = store;
		}

		[HttpPost]
		public IHttpActionResult Create(User user)
		{
			user.Id = Guid.NewGuid();
			_store.Users.Add(user.Id, user);

			return Created("Get?id=" + user.Id, user);
		}

		[HttpGet]
		public IHttpActionResult List()
		{
			return Ok(_store.Users.Values.Select(u => new {
					u.Id,
					u.FullName
				}));
		}

        [HttpGet]
        public IHttpActionResult Get(Guid id)
        {
            if (!_store.Users.ContainsKey(id))
            {
                return NotFound();
            }

            return Ok(_store.Users[id]);
        }

        [HttpGet]
        public IHttpActionResult GetByName(string name)
        {
            var user = _store.Users.SingleOrDefault(u => u.Value.Name == name);

            if (user.Value == null)
            {
                return NotFound();
            }

            return Ok(user.Value);
        }

        [HttpPut]
		public IHttpActionResult Update(User user)
		{
			if (!_store.Users.ContainsKey(user.Id))
			{
				return NotFound();
			}

			_store.Users[user.Id] = user;

			return Ok();
		}

		[HttpPost]
		public IHttpActionResult Delete(Guid id)
		{
			if (!_store.Users.ContainsKey(id))
			{
				return NotFound();
			}

			_store.Users.Remove(id);

			return Ok();
		}
	}
}