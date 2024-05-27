using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PlaceFinderWeb.Models;

namespace PlaceFinderWeb.Pages;

public class TestPlaces : PageModel
{
    private Place[] _places = new Place[]
    {
        new Place
        {
            Id = 1,
            Name = "Eiffel Tower",
            Description = "An iconic symbol of France located in Paris.",
            Latitude = "48.8584",
            Longitude = "2.2945",
            ImageUrl = "https://example.com/eiffel.jpg"
        },
        new Place
        {
            Id = 2,
            Name = "Great Wall of China",
            Description = "A series of fortifications made of stone, brick, tamped earth, and other materials.",
            Latitude = "40.4319",
            Longitude = "116.5704",
            ImageUrl = "https://example.com/greatwall.jpg"
        },
        new Place
        {
            Id = 3,
            Name = "Pyramids of Giza",
            Description = "Ancient pyramid structures located in Egypt.",
            Latitude = "29.9792",
            Longitude = "31.1342",
            ImageUrl = "https://example.com/pyramids.jpg"
        },
        new Place
        {
            Id = 4,
            Name = "Statue of Liberty",
            Description = "A colossal neoclassical sculpture on Liberty Island in New York City.",
            Latitude = "40.6892",
            Longitude = "-74.0445",
            ImageUrl = "https://example.com/liberty.jpg"
        },
        new Place
        {
            Id = 5,
            Name = "Machu Picchu",
            Description = "An Incan citadel set high in the Andes Mountains in Peru.",
            Latitude = "-13.1631",
            Longitude = "-72.5450",
            ImageUrl = "https://example.com/machu.jpg"
        },
        new Place
        {
            Id = 6,
            Name = "Sydney Opera House",
            Description = "A multi-venue performing arts centre in Sydney, Australia.",
            Latitude = "-33.8568",
            Longitude = "151.2153",
            ImageUrl = "https://example.com/opera.jpg"
        },
        new Place
        {
            Id = 7,
            Name = "Christ the Redeemer",
            Description = "An iconic statue of Jesus Christ in Rio de Janeiro, Brazil.",
            Latitude = "-22.9519",
            Longitude = "-43.2105",
            ImageUrl = "https://example.com/redeemer.jpg"
        },
        new Place
        {
            Id = 8,
            Name = "Colosseum",
            Description = "An ancient amphitheater in Rome, Italy.",
            Latitude = "41.8902",
            Longitude = "12.4922",
            ImageUrl = "https://example.com/colosseum.jpg"
        },
        new Place
        {
            Id = 9,
            Name = "Taj Mahal",
            Description = "A white marble mausoleum located in Agra, India.",
            Latitude = "27.1751",
            Longitude = "78.0421",
            ImageUrl = "https://example.com/tajmahal.jpg"
        },
        new Place
        {
            Id = 10,
            Name = "Mount Fuji",
            Description = "An active stratovolcano and the highest peak in Japan.",
            Latitude = "35.3606",
            Longitude = "138.7274",
            ImageUrl = "https://example.com/fuji.jpg"
        }
    };
    
    private readonly DatabaseContext _context;
    
    public TestPlaces(DatabaseContext context)
    {
        _context = context;
    }
    
    public void OnGet()
    {
       
    }
    
    public void OnPost()
    {
        foreach (var place in _places)
        {
            _context.Places.Add(place);
        }
        
        _context.SaveChanges();
    }
}