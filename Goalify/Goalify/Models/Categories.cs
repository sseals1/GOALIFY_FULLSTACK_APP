﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Goalify.Models
{
    public class Categories
    {
        public int Id { get; set; } 
        public string Category { get; set; }
        public string ColorId { get; set; }
        public string Color { get; set; }

    }
}
