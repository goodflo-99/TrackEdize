using BusinessLogic.Services;
using Common.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TrackEdize;

[Route("api/[controller]")]
[Route("api/[controller]/[action]")]
[Authorize(Roles = "Admin")] // Add appropriate authorization
[ApiController]
public class UserManagementController : ControllerBase
{
    private readonly AccountService _accountService;
    private readonly ILogger<UserManagementController> _logger;

    public UserManagementController(AccountService accountService, ILogger<UserManagementController> logger)
    {
        _accountService = accountService;
        _logger = logger;
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var users = await _accountService.UsersByRole("User");
            return Ok(users);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while fetching users");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("update-user-role")]
    public async Task<IActionResult> UpdateUserRole([FromBody] AccountInfo model)
    {
        try
        {
            var accountInfo = await _accountService.GetAccountInfo(model.Id);
            accountInfo.Role = model.Role; // Update the user's role
            await _accountService.UpdateAccountInfo(accountInfo);
            return Ok(accountInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while updating user role");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("delete-user/{userId}")]
    public async Task<IActionResult> DeleteUser(string userId)
    {
        try
        {
            // Implement your logic to delete a user by their userId
            // You can use the UserManager<ApplicationUser> for this purpose
            // Example: await _userManager.DeleteAsync(user);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while deleting user");
            return StatusCode(500, "Internal server error");
        }
    }


}
