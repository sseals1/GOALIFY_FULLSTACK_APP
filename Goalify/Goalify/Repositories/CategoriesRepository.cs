﻿using Goalify.Models;
using Goalify.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Goalify.Repositories
{
    public class CategoriesRepository
    {

            private readonly string _connectionString;
            public CategoriesRepository(IConfiguration configuration)
            {
                _connectionString = configuration.GetConnectionString("DefaultConnection");
            }

            private SqlConnection Connection
            {
                get { return new SqlConnection(_connectionString); }
            }

            public List<Categories> GetAll()
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"SELECT Id, Category, ColorId
                        FROM Categories";
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            var categories = new List<Categories>();
                            while (reader.Read())
                            {
                                var category = new Categories()
                                {               
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Category = DbUtils.GetString(reader, "Category"),
                                    ColorId = DbUtils.GetInt(reader, "Region")
                                };
                                //if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                                //{
                                //   variety.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                                //}
                                //varieties.Add(variety);
                            }

                            return categories;
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
                                    UserId = reader.GetInt32(reader.GetOrdinal("Id")),
                                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                    PriorityId = reader.GetInt32(reader.GetOrdinal("Id")),
                                    TermId = reader.GetInt32(reader.GetOrdinal("Id")),
                                    MilestoneId = reader.GetInt32(reader.GetOrdinal("Id")),
                                    GoalDescription = reader.GetString(reader.GetOrdinal("Id")),
                                    GoalObjectives = reader.GetString(reader.GetOrdinal("Id")),
                                    Notes = reader.GetString(reader.GetOrdinal("Id")),
                                    Date = reader.GetDateTime(reader.GetOrdinal("Id")),
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

            //public void Add(Goals goal)
            //{
            //    using (var conn = Connection)
            //    {
            //        conn.Open();
            //        using (var cmd = conn.CreateCommand())
            //        {
            //            cmd.CommandText = @"
            //            INSERT INTO Goal (userId,categoryId, priorityId, termId, milestoneId, goalDescription, goalObjectives, notes, date)
            //            OUTPUT INSERTED.ID
            //            VALUES (@userId, @categoryId, @priorityId, @termId, @milestoneId, @goalDescription, @notes, @date)";
            //            cmd.Parameters.AddWithValue("@userId", goal.UserId);
            //            cmd.Parameters.AddWithValue("@categoryId", goal.CategoryId);
            //            cmd.Parameters.AddWithValue("@priorityId", goal.PriorityId);
            //            cmd.Parameters.AddWithValue("@termId", goal.TermId);
            //            cmd.Parameters.AddWithValue("@milestoneId", goal.MilestoneId);
            //            cmd.Parameters.AddWithValue("@goalDescription", goal.GoalDescription);
            //            cmd.Parameters.AddWithValue("@notes", goal.Notes);
            //            cmd.Parameters.AddWithValue("@date", goal.Date);

            //            //if (variety.Notes == null)
            //            //    {
            //            //        cmd.Parameters.AddWithValue("@notes", DBNull.Value);
            //            //    }
            //            //    else
            //            //    {
            //            //        cmd.Parameters.AddWithValue("@notes", variety.Notes);
            //            //    }

            //            goal.Id = (int)cmd.ExecuteScalar();
            //        }
            //    }
            //}

            //public void Update(Goals goal)
            //{
            //    using (var conn = Connection)
            //    {
            //        conn.Open();
            //        using (var cmd = conn.CreateCommand())
            //        {
            //            cmd.CommandText = @"
            //            UPDATE Goals 
            //               SET  = userId = @userId,
            //                      categoryId = @categoryId,
            //                      priorityId = @priorityId, 
            //                      termId = @termId, 
            //                      milestoneId = @milestoneId, 
            //                      goalDescription = @goalDescription, 
            //                      goalObjectives = @goalObjectives, 
            //                      notes = @notes, 
            //                      date = @dates
            //             WHERE Id = @id";
            //            cmd.Parameters.AddWithValue("@userId", goal.UserId);
            //            cmd.Parameters.AddWithValue("@categoryId", goal.CategoryId);
            //            cmd.Parameters.AddWithValue("@priorityId", goal.PriorityId);
            //            cmd.Parameters.AddWithValue("@termId", goal.TermId);
            //            cmd.Parameters.AddWithValue("@milestoneId", goal.MilestoneId);
            //            cmd.Parameters.AddWithValue("@goalDescription", goal.GoalDescription);
            //            cmd.Parameters.AddWithValue("@notes", goal.Notes);
            //            cmd.Parameters.AddWithValue("@date", goal.Date);
            //            //if (variety.Notes == null)
            //            //{
            //            //    cmd.Parameters.AddWithValue("@notes", DBNull.Value);
            //            //}
            //            //else
            //            //{
            //            //    cmd.Parameters.AddWithValue("@notes", variety.Notes);
            //            //}

            //            cmd.ExecuteNonQuery();
            //        }
            //    }
            //}

            //public void Delete(int id)
            //{
            //    using (var conn = Connection)
            //    {
            //        conn.Open();
            //        using (var cmd = conn.CreateCommand())
            //        {
            //            cmd.CommandText = "DELETE FROM Goals WHERE Id = @id";
            //            cmd.Parameters.AddWithValue("@id", id);

            //            cmd.ExecuteNonQuery();
            //        }
            //    }
            //}

        //}
    }
}

