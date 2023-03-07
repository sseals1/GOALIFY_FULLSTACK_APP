using Goalify.Models;
using Goalify.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Goalify.Repositories
{
    public class MilestonesRepository : IMilestonesRepository
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

        public List<Milestones> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, goalId, progressNotes, directionNotes, definedNotes, featuresNotes, attainedNotes, direction, defined, progress, features, attained
                          FROM Milestones
                         ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var milestones = new List<Milestones>();
                        while (reader.Read())
                        {
                            var milestone = new Milestones()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                GoalId= DbUtils.GetInt(reader, "GoalId"),
                                ProgressNotes = DbUtils.GetString(reader, "ProgressNotes"),
                                DirectionNotes = DbUtils.GetString(reader, "DirectionNotes"),
                                DefinedNotes = DbUtils.GetString(reader, "DefinedNotes"),
                                FeaturesNotes = DbUtils.GetString(reader, "FeaturesNotes"),
                                AttainedNotes = DbUtils.GetString(reader, "AttainedNotes"),
                                Direction = DbUtils.IsNotDbNull(reader, "Direction"),
                                Defined = DbUtils.IsNotDbNull(reader, "Defined"),
                                Progress = DbUtils.IsNotDbNull(reader, "Progress"),
                                Features = DbUtils.IsNotDbNull(reader, "Features"),
                                Attained = DbUtils.IsNotDbNull(reader, "Attained")
                            };
                            //if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                            //{
                            //    goal.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                            //}
                            milestones.Add(milestone);
                        }

                        return milestones;
                    }
                }
            }
        }

        public Milestones Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, goalId, progressNotes, directionNotes, definedNotes, featuresNotes, attainedNotes, direction, defined, progress, features, attained
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
                                Id = DbUtils.GetInt(reader, "Id"),
                                GoalId = DbUtils.GetInt(reader, "GoalId"),
                                ProgressNotes = DbUtils.GetString(reader, "ProgressNotes"),
                                DirectionNotes = DbUtils.GetString(reader, "DirectionNotes"),
                                DefinedNotes = DbUtils.GetString(reader, "DefinedNotes"),
                                FeaturesNotes = DbUtils.GetString(reader, "FeaturesNotes"),              
                                AttainedNotes = DbUtils.GetString(reader, "AttainedNotes"),
                                Direction = DbUtils.Bool(reader, "Direction"),
                                Defined = DbUtils.Bool(reader, "Defined"),
                                Progress = DbUtils.Bool(reader, "Progress"),
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
                        INSERT INTO milestones (goalId, progressNotes, directionNotes, definedNotes, featuresNotes, attainedNotes, direction, defined, progress, features, attained)
                        OUTPUT INSERTED.ID
                        VALUES (@goalId, @progressNotes, @directionNotes, @definedNotes, @featuresNotes, @attainedNotes, @direction, @defined, @progress, @features, @attained)";
                    cmd.Parameters.AddWithValue("@goalId", milestone.GoalId);
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

        public void Update(Milestones milestone)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Milestones 
                   SET progressNotes = @progressNotes,
                       directionNotes = @directionNotes,
                       definedNotes = @definedNotes, 
                       featuresNotes = @featuresNotes, 
                       attainedNotes = @attainedNotes, 
                       direction = @direction, 
                       defined = @defined, 
                       progress = @progress, 
                       features = @features,
                       attained = @attained,
                       goalId = @goalid
                 WHERE goalId = @goalid";
                    cmd.Parameters.AddWithValue("@goalId", milestone.GoalId);
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
                    cmd.CommandText = "DELETE FROM Milestones WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
