using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PlaceFinderWeb.Models;
using PlaceFinderWeb.Services;

namespace PlaceFinderWeb.Pages;

public class IndexModel : PageModel
{
    private readonly DatabaseContext _context;
    private PlaceService _placeService;
    
    public List<Place> Places { get; set; }
    
    public IndexModel(DatabaseContext context)
    {
        _placeService = new PlaceService(context);
        
        Places = _placeService.ReadAll();
    }

    public void OnGet()
    {
    }
}