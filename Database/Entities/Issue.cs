using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database.Entities.Base;
using MongoDB.Bson.Serialization.Attributes;

namespace Database.Entities
{
    public class Issue : BaseEntity
    {
        public int OrderNumber { get; set; }
        public string? Subject { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Steps { get; set; }
        public string? ActualResult { get; set; }
        public string? ExpectedResult { get; set; }
        public string? Environment { get; set; }
        public string? Version { get; set; }
        public string? Browser { get; set; }
        public string? Device { get; set; }
        public string? System { get; set; }
        public Dropdown? Project { get; set; }
        public string? Key { get; set; }
        public string? Status { get; set; }
        public string? Type { get; set; }
        public List<Comment>? Comments { get; set; }
        public string? Acceptance { get; set; }
        public string? CreatedBy { get; set; }


    }
}
