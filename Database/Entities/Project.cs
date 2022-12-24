using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Database.Entities.Base;

namespace Database.Entities
{
    public class Project : BaseEntity
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Abbreviation { get; set; }
    }
}
