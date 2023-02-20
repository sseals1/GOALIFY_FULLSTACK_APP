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
                    cmd.CommandText = @"SELECT userId, categoryId, priorityId, termId, milestoneId, goalDescription, goalObjectives, notes, goalDate
                        FROM Goals";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var goals = new List<Goals>();
                        while (reader.Read())
                        {
                            var goal = new Goals()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                //Name = reader.GetString(reader.GetOrdinal("Name")),
                                //Region = reader.GetString(reader.GetOrdinal("Region")),
                            };
                            if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                            {
                                //variety.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                            }
                            //varieties.Add(variety);
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
                        SELECT userId, categoryId, priorityId, termId, milestoneId, goalDescription, goalObjectives, notes, date 
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
                                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),  
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                PriorityId = reader.GetInt32(reader.GetOrdinal("PriorityId")),
                                TermId = reader.GetInt32(reader.GetOrdinal("TermId")),
                                //MilestoneId = reader.GetInt32(reader.GetOrdinal("Id")),
                                GoalDescription = reader.GetString(reader.GetOrdinal("GoalDesription")),
                                GoalObjectives = reader.GetString(reader.GetOrdinal("GoalObjectives")),
                                Notes = reader.GetString(reader.GetOrdinal("Notes")),  
                                goalDate = reader.GetDateTime(reader.GetOrdinal("goalDate"))
                            };
                            //if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                            //{
                            //    variety.Notes = reader.GetString(reader.GetOrdinal("Notes"));
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
                        INSERT INTO goals (UserId, MilestoneId, CategoryId, PriorityId, TermId, goalDescription, goalObjectives, Notes, goalDate)
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @milestoneId, @categoryId, @priorityId, @termId, @goalDescription, @goalObjectives, @notes, @goalDate)";
                    cmd.Parameters.AddWithValue("@userId", goal.UserId);
                    cmd.Parameters.AddWithValue("@categoryId", goal.CategoryId);
                    cmd.Parameters.AddWithValue("@priorityId", goal.PriorityId);
                    cmd.Parameters.AddWithValue("@termId", goal.TermId);
                    cmd.Parameters.AddWithValue("@goalObjectives", goal.GoalObjectives);
                    cmd.Parameters.AddWithValue("@goalDescription", goal.GoalDescription);
                    cmd.Parameters.AddWithValue("@milestoneId", goal.MilestoneId);
                    cmd.Parameters.AddWithValue("@notes", goal.Notes);
                    cmd.Parameters.AddWithValue("@goalDate", goal.goalDate);

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
                           SET  = userId = @userId,
                                  categoryId = @categoryId,
                                  priorityId = @priorityId, 
                                  termId = @termId, 
                                  milestoneId = @milestoneId, 
                                  goalDescription = @goalDescription, 
                                  goalObjectives = @goalObjectives, 
                                  notes = @notes, 
                                  date = @date
                         WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@userId", goal.UserId);
                    cmd.Parameters.AddWithValue("@categoryId", goal.CategoryId);
                    cmd.Parameters.AddWithValue("@priorityId", goal.PriorityId);
                    cmd.Parameters.AddWithValue("@termId", goal.TermId);
                    cmd.Parameters.AddWithValue("@milestoneId", goal.MilestoneId);
                    cmd.Parameters.AddWithValue("@goalDescription", goal.GoalDescription);
                    cmd.Parameters.AddWithValue("@notes", goal.Notes);
                    cmd.Parameters.AddWithValue("@date", goal.goalDate);
                    //if (variety.Notes == null)
                    //{
                    //    cmd.Parameters.AddWithValue("@notes", DBNull.Value);
                    //}
                    //else
                    //{
                    //    cmd.Parameters.AddWithValue("@notes", variety.Notes);
                    //}

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

