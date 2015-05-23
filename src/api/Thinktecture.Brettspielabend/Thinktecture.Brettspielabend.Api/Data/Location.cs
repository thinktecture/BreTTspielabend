namespace Thinktecture.Brettspielabend.Api.Data
{
	public class Location
	{
		public string StreetAddress { get; set; }
		public string PostCode { get; set; }
		public string City { get; set; }
		public Coordinates Coordinates { get; set; }
	}
}