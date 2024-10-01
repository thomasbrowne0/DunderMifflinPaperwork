using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


[ApiController]
[Route("[controller]")]
public class OrderEntryController(DunderMifflinContext context) : ControllerBase
{
    
}