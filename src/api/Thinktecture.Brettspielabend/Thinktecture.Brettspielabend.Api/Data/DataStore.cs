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

			SetFakeData();
		}

		private void SetFakeData()
		{
			var userId = new Guid("4848be37-9891-4aa9-845e-41f3a6fe02f4");
			Users.Add(userId, new User
			{
				FullName = "Alan Parish",
				Name = "alanp",
				Id = userId
			});

            var gameId = new Guid("886dade5-d263-4c76-bec4-88231a3aaae1");
            Games.Add(gameId, new Game
            {
                Id = gameId,
                Title = "Jumanji"
            });

            var gameId2 = new Guid("886dade5-d263-4c76-bec4-88231a3aaae2");
            Games.Add(gameId2, new Game
            {
                Id = gameId2,
                Title = "You don't know, Jack!"
            });

            var gameId3 = new Guid("886dade5-d263-4c76-bec4-88331a3aaae2");
            Games.Add(gameId3, new Game
            {
                Id = gameId3,
                Title = "Wer wird Millionär?"
            });

            var gameId4 = new Guid("486dade5-d263-4c76-bec4-88231a3aaae2");
            Games.Add(gameId4, new Game
            {
                Id = gameId4,
                Title = "Das Mercury Puzzle"
            });

            var contestId = new Guid("32137202-451f-4211-afdd-90d809b42860");
			Contests.Add(contestId, new Contest
			{
				Id = contestId,
				GameId = gameId,
				HostId = userId,
				Location = new Location
				{
					City = "Mainz",
					PostCode = "55116",
					StreetAddress = "Rheinstr. 66",
					Coordinates = new Coordinates
					{
						Latitude = 50.001796,
						Longitude = 8.276228
					}
				}
			});
            
            contestId = new Guid("43114782-0c5e-4efa-8bfe-0843e7b3ab82");
            Contests.Add(contestId, new Contest()
            {
                Id = contestId,
                GameId = gameId2,
                HostId = userId,
                Location = new Location()
                {
                    City = "Karlsruhe",
                    PostCode = "76137",
                    StreetAddress = "Ludwig-Erhard-Allee 6",
                    Coordinates = new Coordinates()
                    {
                        Latitude = 49.0092,
                        Longitude = 8.4040
                    }
                }
            });

            contestId = new Guid("43114782-0c5e-4efa-8bfe-0843e7b3ab83");
            Contests.Add(contestId, new Contest()
            {
                Id = contestId,
                GameId = gameId3,
                HostId = userId,
                Location = new Location()
                {
                    City = "Frankfurt",
                    PostCode = "63124",
                    StreetAddress = "Hanauer Landstraße 123",
                    Coordinates = new Coordinates()
                    {
                        Latitude = 50.1167,
                        Longitude = 8.6833
                    }
                }
            });

            contestId = new Guid("44114782-0c5e-4efa-8bfe-0843e7b3ab83");
            Contests.Add(contestId, new Contest()
            {
                Id = contestId,
                GameId = gameId4,
                HostId = userId,
                Location = new Location()
                {
                    City = "Mannheim",
                    PostCode = "68219",
                    StreetAddress = "Richard-Wagner-Str. 32",
                    Coordinates = new Coordinates()
                    {
                        Latitude = 49.4889,
                        Longitude = 8.4692
                    }
                }
            });
        }

		public Dictionary<Guid, User> Users { get; private set; }
		public Dictionary<Guid, Contest> Contests { get; private set; }
		public Dictionary<Guid, Game> Games { get; set; }
	}
}