using PlaceFinderWeb.Interfaces;
using PlaceFinderWeb.Models;
using PlaceFinderWeb.Pages;
using PlaceFinderWeb.Persistence;

namespace PlaceFinderWeb.Services;

public class PlaceService: IPlaceService
{
    private readonly PlaceFinderDbContext _dbContext;

    public PlaceService(PlaceFinderDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    
    
    public List<Place> ReadAll()
    {
        Place[] places = new Place[]
        {
            new Place
            {
                Id = 1,
                Name = "Eiffel Tower",
                Description = "An iconic symbol of France located in Paris.",
                Latitude = "48.8584",
                Longitude = "2.2945",
                ImageUrl = "https://cdn.britannica.com/52/245552-050-3D7334F9/Eiffel-Tower-Paris.jpg"
            },
            new Place
            {
                Id = 2,
                Name = "Great Wall of China",
                Description = "A series of fortifications made of stone, brick, tamped earth, and other materials.",
                Latitude = "40.4319",
                Longitude = "116.5704",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/1200px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg"
            },
            new Place
            {
                Id = 3,
                Name = "Pyramids of Giza",
                Description = "Ancient pyramid structures located in Egypt.",
                Latitude = "29.9792",
                Longitude = "31.1342",
                ImageUrl = "https://i.natgeofe.com/n/535f3cba-f8bb-4df2-b0c5-aaca16e9ff31/giza-plateau-pyramids.jpg"
            },
            new Place
            {
                Id = 4,
                Name = "Statue of Liberty",
                Description = "A colossal neoclassical sculpture on Liberty Island in New York City.",
                Latitude = "40.6892",
                Longitude = "-74.0445",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/d/dd/Lady_Liberty_under_a_blue_sky_%28cropped%29.jpg"
            },
        };

        return places.ToList();
    }
}