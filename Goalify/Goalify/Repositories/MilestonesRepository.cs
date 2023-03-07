using Goalify.Models;
using Goalify.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Goalify.Repositories
{
    public class MilestonesRepository
    {
        private readonly string _connectionString;
        public MilestonesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        //public List<Milestones> GetAll()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT userId, categoryId, priorityId, termId, milestoneId, goalDescription, goalObjectives, notes, goalDate
        //                FROM Goals";
        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //                var goals = new List<Goals>();
        //                while (reader.Read())
        //                {
        //                    var goal = new Goals()
        //                    {
        //                        UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
        //                        CategoryId = DbUtils.GetInt(reader, "CategoryId"),
        //                        PriorityId = reader.GetInt32(reader.GetOrdinal("PriorityId")),
        //                        TermId = reader.GetInt32(reader.GetOrdinal("TermId")),
        //                        //MilestoneId = reader.GetInt32(reader.GetOrdinal("MilestoneId")),
        //                        GoalDescription = reader.GetString(reader.GetOrdinal("GoalDescription")),
        //                        GoalObjectives = reader.GetString(reader.GetOrdinal("GoalObjectives")),
        //                        Notes = reader.GetString(reader.GetOrdinal("Notes")),
        //                        goalDate = reader.GetDateTime(reader.GetOrdinal("goalDate"))
        //                    };
        //                    if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
        //                    {
        //                        goal.Notes = reader.GetString(reader.GetOrdinal("Notes"));
        //                    }
        //                    goals.Add(goal);
        //                }

        //                return goals;
        //            }
        //        }
        //    }
        //}

        public Milestones Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT progressNotes, directionNotes, definedNotes, featuresNotes, attainedNotes, direction, defined, progress, features, attained
                          FROM Milestones
                         WHERE Id = @id;";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Milestones milestone = null;
                        if (reader.Read())
                        {
                            milestone = new Milestones()
                            {
                                ProgressNotes = DbUtils.GetString(reader, "ProgresNotes"),
                                DirectionNotes = DbUtils.GetString(reader, "DirectionNotes"),
                                DefinedNotes = DbUtils.GetString(reader, "DefinedNotes"),
                                FeaturesNotes = DbUtils.GetString(reader, "FeaturesNotes"),              
                                AttainedNotes = DbUtils.GetString(reader, "AttainedNotes"),
                                Direction = DbUtils.Bool(reader, "Direction"),
                                Defined = DbUtils.Bool(reader, "Defined"),
                                Progress = DbUtils.Bool(reader, "goalDate"),
                                Features = DbUtils.Bool(reader,"Features"),
                                Attained = DbUtils.Bool(reader, "Attained")

                            };
                            //if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                            //{
                            //    variety.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                            //}
                        }

                        return milestone;
                    }
                }
            }
        }

        public void Add(Milestones milestone)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO milestones (progressNotes, directionNotes, definedNotes, featuresNotes, attainedNotes, direction, defined, progress, features, attained)
                        OUTPUT INSERTED.ID
                        VALUES (@progressNotes, @directionNotes, @definedNotes, @featuresNotes, @attainedNotes, @direction, @defined, @progress, @features, @attained)";
                    cmd.Parameters.AddWithValue("@progressNotes", milestone.ProgressNotes);
                    cmd.Parameters.AddWithValue("@directionNotes", milestone.DirectionNotes);
                    cmd.Parameters.AddWithValue("@definedNotes", milestone.DefinedNotes);
                    cmd.Parameters.AddWithValue("@featuresNotes", milestone.FeaturesNotes);
                    cmd.Parameters.AddWithValue("@attainedNotes", milestone.AttainedNotes);
                    cmd.Parameters.AddWithValue("@direction", milestone.Direction);
                    cmd.Parameters.AddWithValue("@defined", milestone.Defined);
                    cmd.Parameters.AddWithValue("@progress", milestone.Progress);
                    cmd.Parameters.AddWithValue("@features", milestone.Features);
                    cmd.Parameters.AddWithValue("@attained", milestone.Attained);

                    //if (variety.Notes == null)
                    //    {
                    //        cmd.Parameters.AddWithValue("@notes", DBNull.Value);
                    //    }
                    //    else
                    //    {
                    //        cmd.Parameters.AddWithValue("@notes", variety.Notes);
                    //    }

                    milestone.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Goals goal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Goals 
                   SET userId = @userId,
                       categoryId = @categoryId,
                       priorityId = @priorityId, 
                       termId = @termId, 
                       milestoneId = @milestoneId, 
                       goalDescription = @goalDescription, 
                       goalObjectives = @goalObjectives, 
                       notes = @notes, 
                       goalDate = @goalDate
                 WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@userId", goal.UserId);
                    cmd.Parameters.AddWithValue("@categoryId", goal.CategoryId);
                    cmd.Parameters.AddWithValue("@priorityId", goal.PriorityId);
                    cmd.Parameters.AddWithValue("@termId", goal.TermId);
                    //cmd.Parameters.AddWithValue("@milestoneId", goal.MilestoneId);
                    cmd.Parameters.AddWithValue("@goalDescription", goal.GoalDescription);
                    cmd.Parameters.AddWithValue("@notes", goal.Notes);
                    cmd.Parameters.AddWithValue("@goalDate", goal.goalDate);
                    cmd.Parameters.AddWithValue("@id", goal.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Goals WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
