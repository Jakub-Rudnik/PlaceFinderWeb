using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PlaceFinderWeb.Models;
using PlaceFinderWeb.Persistence;
using PlaceFinderWeb.Services;

namespace PlaceFinderWeb.Pages;

public class IndexModel : PageModel
{
    private readonly PlaceFinderDbContext _dbContext;
    private PlaceService _placeService;
    
    public List<Place> Places { get; set; }
    
    public IndexModel(PlaceFinderDbContext context)
    {
        _dbContext = context;
    }

    public void OnGet()
    {
        Places = _dbContext.Places.ToList();
    }
}