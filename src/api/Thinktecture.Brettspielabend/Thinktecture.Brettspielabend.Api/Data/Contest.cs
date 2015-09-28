using System;

namespace Thinktecture.Brettspielabend.Api.Data
{
	public class Contest
	{
		public Guid Id { get; set; }
		public Guid HostId { get; set; }
		public Guid GameId { get; set; }
		public Game Game { get; set; }
		public Location Location { get; set; }
	}
}