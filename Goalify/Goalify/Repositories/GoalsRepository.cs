using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
//using Microsoft.Data.SqlClient;
using Goalify.Models;
using System;
using Goalify.Utils;

namespace Goalify.Repositories
{
    public class GoalsRepository : IGoalsRepository
    {

        private readonly string _connectionString;
        public GoalsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Goals> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, userId, categoryId, priorityId, termId, milestoneId, goalDescription, goalObjectives, notes, goalNotes, goalDate
                        FROM Goals";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var goals = new List<Goals>();
                        while (reader.Read())
                        {
                            var goal = new Goals()
                            {
                                Id = DbUtils.GetInt(reader, ("Id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                PriorityId = reader.GetInt32(reader.GetOrdinal("PriorityId")),
                                TermId = reader.GetInt32(reader.GetOrdinal("TermId")),
                                //MilestoneId = reader.GetInt32(reader.GetOrdinal("MilestoneId")),
                                GoalDescription = reader.GetString(reader.GetOrdinal("GoalDescription")),
                                GoalObjectives = reader.GetString(reader.GetOrdinal("GoalObjectives")),
                                GoalDate = reader.GetDateTime(reader.GetOrdinal("GoalDate")),
                                //Notes = reader.GetString(reader.GetOrdinal("Notes")),
                                //GoalNotes = reader.GetString(reader.GetOrdinal("GoalNotes"))
                            };
                            if (!reader.IsDBNull(reader.GetOrdinal("Notes")) || !reader.IsDBNull(reader.GetOrdinal("GoalNotes"))) ;
                            {
                                goal.Notes = DbUtils.GetString(reader, "Notes");
                                goal.GoalNotes = DbUtils.GetString(reader, "GoalNotes");
                            }
                            goals.Add(goal);

                            //if (!reader.IsDBNull(reader.GetOrdinal("GoalNotes")))
                            //{
                            //    goal.Notes = reader.GetString(reader.GetOrdinal("GoalNotes"));
                            //}
                            //goals.Add(goal);
                        }

                        return goals;
                    }
                }
            }
        }

        public Goals Get(int id)
         {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, userId, categoryId, priorityId, termId, milestoneId, goalDescription, goalObjectives, notes, goalNotes, goalDate 
                          FROM Goals
                         WHERE Id = @id;";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                         Goals goal = null;
                        if (reader.Read())
                        {
                            goal = new Goals()
                            {
                                Id = DbUtils.GetInt(reader,"id"),
                                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),  
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                PriorityId = reader.GetInt32(reader.GetOrdinal("PriorityId")),
                                TermId = reader.GetInt32(reader.GetOrdinal("TermId")),
                                //MilestoneId = reader.GetInt32(reader.GetOrdinal("Id")),
                                GoalDescription = DbUtils.GetString(reader, "GoalDescription"),
                                GoalObjectives = reader.GetString(reader.GetOrdinal("GoalObjectives")),
                                Notes = reader.GetString(reader.GetOrdinal("Notes")),  
                                GoalDate = reader.GetDateTime(reader.GetOrdinal("GoalDate")),
                                GoalNotes = reader.GetString(reader.GetOrdinal("GoalNotes")),
                            };
                            //if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                            //{
                            //    goal.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                            //}
                        }

                        return goal;
                    }
                }
            }
        } 

        public void Add(Goals goal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO goals (UserId, CategoryId, PriorityId, TermId, goalDescription, goalObjectives, Notes, goalDate)
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @categoryId, @priorityId, @termId, @goalDescription, @goalObjectives, @notes, @goalDate)";
                    cmd.Parameters.AddWithValue("@userId", goal.UserId);
                    cmd.Parameters.AddWithValue("@categoryId", goal.CategoryId);
                    cmd.Parameters.AddWithValue("@priorityId", goal.PriorityId);
                    cmd.Parameters.AddWithValue("@termId", goal.TermId);
                    cmd.Parameters.AddWithValue("@goalObjectives", goal.GoalObjectives);
                    cmd.Parameters.AddWithValue("@goalDescription", goal.GoalDescription);
                    //cmd.Parameters.AddWithValue("@milestoneId", goal.MilestoneId);
                    cmd.Parameters.AddWithValue("@notes", goal.Notes);
                    cmd.Parameters.AddWithValue("@goalDate", goal.GoalDate);

                    //if (variety.Notes == null)
                    //    {
                    //        cmd.Parameters.AddWithValue("@notes", DBNull.Value);
                    //    }
                    //    else
                    //    {
                    //        cmd.Parameters.AddWithValue("@notes", variety.Notes);
                    //    }

                    goal.Id = (int)cmd.ExecuteScalar();
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
                       goalDescription = @goalDescription, 
                       goalObjectives = @goalObjectives, 
                       notes = @notes,
                       goalNotes = @goalNotes, 
                       goalDate = @goalDate
                 WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@userId", goal.UserId);
                    cmd.Parameters.AddWithValue("@categoryId", goal.CategoryId);
                    cmd.Parameters.AddWithValue("@priorityId", goal.PriorityId);
                    cmd.Parameters.AddWithValue("@termId", goal.TermId);
                    //cmd.Parameters.AddWithValue("@milestoneId", goal.MilestoneId);
                    cmd.Parameters.AddWithValue("@goalDescription", goal.GoalDescription);
                    cmd.Parameters.AddWithValue("@goalObjectives", goal.GoalObjectives);
                    cmd.Parameters.AddWithValue("@goalNotes", goal.GoalNotes);
                    cmd.Parameters.AddWithValue("@notes", goal.Notes);
                    cmd.Parameters.AddWithValue("@goalDate", goal.GoalDate);
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

