using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using PlaceFinderWeb.Models;
using PlaceFinderWeb.Persistence;

namespace PlaceFinderWeb.Pages.Places;

public class Delete : PageModel
{
    private readonly PlaceFinderDbContext _dbContext;

    public Delete(PlaceFinderDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [BindProperty]
    public Place Place { get; set; }
    public string ErrorMessage { get; set; }

    public async Task<IActionResult> OnGetAsync(int? id, bool? saveChangesError = false)
    {
        if (id == null)
        {
            return NotFound();
        }

        Place = await _dbContext.Places
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);

        if (Place == null)
        {
            return NotFound();
        }

        if (saveChangesError.GetValueOrDefault())
        {
            ErrorMessage = String.Format("Delete {ID} failed. Try again", id);
        }

        return Page();
    }

    public async Task<IActionResult> OnPostAsync(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var student = await _dbContext.Places.FindAsync(id);

        if (student == null)
        {
            return NotFound();
        }

        try
        {
            _dbContext.Places.Remove(student);
            await _dbContext.SaveChangesAsync();
            return RedirectToPage("/Index");
        }
        catch (DbUpdateException ex)
        {
            return RedirectToAction("/Places/Delete",
                new { id, saveChangesError = true });
        }
    }
}