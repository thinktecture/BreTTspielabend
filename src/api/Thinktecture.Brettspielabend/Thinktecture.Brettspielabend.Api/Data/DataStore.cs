using System;
using System.Collections.Generic;

namespace Thinktecture.Brettspielabend.Api.Data
{
	public class DataStore
	{
		public DataStore()
		{
			Users = new Dictionary<Guid, User>();
			Contests = new Dictionary<Guid, Contest>();
			Games = new Dictionary<Guid, Game>();
		}

		public Dictionary<Guid, User> Users { get; private set; }
		public Dictionary<Guid, Contest> Contests { get; private set; }
		public Dictionary<Guid, Game> Games { get; set; }
	}
}