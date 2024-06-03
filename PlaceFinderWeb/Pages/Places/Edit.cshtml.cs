using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using PlaceFinderWeb.Models;
using PlaceFinderWeb.Persistence;

namespace PlaceFinderWeb.Pages.Places;

public class Edit : PageModel
{
    private readonly PlaceFinderDbContext _dbContext;

    public Edit(PlaceFinderDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [BindProperty]
    public Place Place { get; set; } = default!;

    public async Task<IActionResult> OnGetAsync(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        Place = await _dbContext.Places.FindAsync(id);

        if (Place == null)
        {
            return NotFound();
        }
        return Page();
    }

    public async Task<IActionResult> OnPostAsync(int id)
    {
        var placeToUpdate = await _dbContext.Places.FindAsync(id);

        if (placeToUpdate == null)
        {
            return NotFound();
        }

        if (await TryUpdateModelAsync<Place>(
                placeToUpdate,
                "place",
                p => p.Name, p => p.Description, p => p.Latitude, p => p.Longitude))
        {
            await _dbContext.SaveChangesAsync();
            return RedirectToPage("/Index");
        }

        return Page();
    }
}