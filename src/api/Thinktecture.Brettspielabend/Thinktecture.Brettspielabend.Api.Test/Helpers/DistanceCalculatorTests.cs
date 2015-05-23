using System;
using FluentAssertions;
using Thinktecture.Brettspielabend.Api.Data;
using Thinktecture.Brettspielabend.Api.Helpers;
using Xunit;

namespace Thinktecture.Brettspielabend.Api.Test.Helpers
{
	public class DistanceCalculatorTests
	{
		[Fact]
		public void CalculateDistance_returns_the_distance_between_two_coordinates_1()
		{
			var sut = new DistanceCalculator();
			var karlsruhe = new Coordinates { Latitude = 49.014, Longitude = 8.4043 };
			var mainz = new Coordinates { Latitude = 50, Longitude = 8.271111 };

			var result = sut.CalculateDistance(karlsruhe, mainz);

			result.Should().BeApproximately(110, 0.1);
		}
		[Fact]
		public void CalculateDistance_returns_the_distance_between_two_coordinates_2()
		{
			var sut = new DistanceCalculator();
			var karlsruhe = new Coordinates { Latitude = 49.014, Longitude = 8.4043 };
			var leimersheim = new Coordinates { Latitude = 49.1225, Longitude = 8.343333 };

			var result = sut.CalculateDistance(karlsruhe, leimersheim);

			result.Should().BeApproximately(12.8, 0.1);
		}

		[Fact]
		public void Deg2Rad_converts_a_degree_value_to_a_radiant_value()
		{
			var result = DistanceCalculator.Deg2Rad(180);

			result.Should().Be(Math.PI);
		}

		[Fact]
		public void Rad2Deg_converts_a_radiant_value_to_a_degree_value()
		{
			var result = DistanceCalculator.Rad2Deg(Math.PI);

			result.Should().Be(180);
		}
	}
}
