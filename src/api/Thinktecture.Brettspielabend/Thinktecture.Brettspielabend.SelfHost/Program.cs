using System;
using Microsoft.Owin.Hosting;
using Thinktecture.Brettspielabend.Api;

namespace Thinktecture.Brettspielabend.SelfHost
{
	class Program
	{
		static void Main(string[] args)
		{
			using (var host = WebApp.Start<Startup>("http://+:8080"))
			{
				Console.WriteLine("Api started!");
				Console.ReadLine();
			}
		}
	}
}
