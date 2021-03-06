﻿using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.ViewModels
{
    /// <summary>
    /// Pair of user credentials
    /// </summary>
    public class Credentials
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
        public string Password { get; set; }
    }
}
