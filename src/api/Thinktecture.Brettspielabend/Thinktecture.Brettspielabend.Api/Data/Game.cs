using System;

namespace Thinktecture.Brettspielabend.Api.Data
{
	public class Game
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public Packshot Packshot { get; set; }
	}
}