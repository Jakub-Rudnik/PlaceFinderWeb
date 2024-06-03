using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PlaceFinderWeb.Models;
using PlaceFinderWeb.Persistence;

namespace PlaceFinderWeb.Pages;

public class AddPlace : PageModel
{
    private readonly PlaceFinderDbContext _context;
    
    [BindProperty]
    public Place NewPlace { get; set; }
    
    public AddPlace(PlaceFinderDbContext context)
    {
        _context = context;
    }
    
    public void OnGet()
    {
        
    }
    
    public IActionResult OnPost()
    {
        _context.Places.Add(NewPlace);
        _context.SaveChanges();
        
        return RedirectToPage("/Index");
    }
}