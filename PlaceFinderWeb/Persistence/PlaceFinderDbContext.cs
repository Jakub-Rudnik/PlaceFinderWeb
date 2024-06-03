using Microsoft.EntityFrameworkCore;
using PlaceFinderWeb.Models;

namespace PlaceFinderWeb.Persistence;

public class PlaceFinderDbContext: DbContext
{
    public PlaceFinderDbContext(DbContextOptions<PlaceFinderDbContext> options) : base(options)
    {
    }
    
    public DbSet<Place> Places { get; set; }
}