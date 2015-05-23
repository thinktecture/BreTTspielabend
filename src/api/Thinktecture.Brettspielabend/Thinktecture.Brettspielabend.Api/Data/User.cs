using System;

namespace Thinktecture.Brettspielabend.Api.Data
{
	public class User
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string FullName { get; set; }
	}
}