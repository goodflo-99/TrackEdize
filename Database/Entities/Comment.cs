using Database.Entities.Base;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Entities
{
    public class Comment : BaseEntity
    {
        public string Text { get; set; }

        public Comment()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }
    }
}
