using Goalify.Models;
using Goalify.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System;

namespace Goalify.Repositories
{
    public class PrioritiesRepository : IPrioritiesRepository
    {
        private readonly string _connectionString;
        public PrioritiesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Priorities> GetAll()
        {
            using (var conn = connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Priority
                        FROM priority";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var priorities = new List<Priorities>();
                        while (reader.Read())
                        {
                            priorities.Add(new Priorities()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Priority = DbUtils.GetString(reader, "Priority"),
                            });

                        }
                        reader.Close();
                        return priorities;
                    }
                }
            }
        }

        public Priorities Get(int id)
        {
            using (var conn = connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, priority
                         WHERE Id = @id;";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Priorities priority = null;
                        if (reader.Read())
                        {
                            priority = new Priorities()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Priority = DbUtils.GetString(reader, "Priority")
                                
                            };
                            //if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                            //{
                            //    variety.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                            //}
                        }

                        return priority;
                    }
                }
            }
        }

        public Priorities Get(Priorities priority)
        {
            using (var conn = connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Priority
                          FROM priority
                         WHERE priority = @priority;";
                    cmd.Parameters.AddWithValue("@priority", priority);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        priority = null;
                        if (reader.Read())
                        {
                            priority = new Priorities()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Priority = DbUtils.GetString(reader, "Priority"),

                            };

                        }
                        return priority;
                    }
                }
            }
        }

        public void Add(Priorities priority)
        {
            using (var conn = connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                insert into priority (priority)
                                output inserted.id
                                values (@priority)";
                    cmd.Parameters.AddWithValue("@priority", priority.Id);


                   

                    priority.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Priorities priority)
        {
            using (var conn = connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Priority 
                               SET Id = @Id,
                                      priority = @priority                                  
                             WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", priority.Priority);
                    cmd.Parameters.AddWithValue("@term", priority.Priority);


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
            using (var conn = connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "delete from priority where id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
