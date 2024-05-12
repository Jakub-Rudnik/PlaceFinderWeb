using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PlaceFinderWeb.Models;

namespace PlaceFinderWeb.Pages;

public class IndexModel : PageModel
{
    private readonly DatabaseContext _context;
    
    public List<Place> Places { get; set; }
    
    public IndexModel(DatabaseContext context)
    {
        _context = context;

        
        
        Places = _context.Places.ToList();
        
        _context.SaveChanges();
        
    }

    public void OnGet()
    {
    }
}