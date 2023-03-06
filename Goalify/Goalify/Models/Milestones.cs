using System;

namespace Goalify.Models
{
    public class Milestones
    {
        public int Id { get; set; }
        public int GoalId { get; set; }
        public string ProgressNotes { get; set; }
        public string DirectionNotes { get; set; }
        public string DefinedNotes { get; set; }
        public string FeaturesNotes {get; set;}

    public string AttainedNotes { get; set; }
    public bool Progress { get; set; }
    public bool Direction { get; set; } 
    public bool Defined { get; set; }
    public bool Features { get; set; }
    public bool Attained { get; set; }
    }
}
