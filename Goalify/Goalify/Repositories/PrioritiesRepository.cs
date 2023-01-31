using Goalify.Models;
using Goalify.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Goalify.Repositories
{
    public class PrioritiesRepository
    {
        private readonly string _connectionString;
        public PrioritiesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Priorities> GetAll()
        {
            using (var conn = Connection)
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

        public Priorities Get(Priorities priority)
        {
            using (var conn = Connection)
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

        //public void Add(Terms term)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                        INSERT INTO Term (term)
        //                        OUTPUT INSERTED.ID
        //                        VALUES (@term)";
        //            cmd.Parameters.AddWithValue("@term", term.Term);


        //if (variety.Notes == null)
        //    {
        //        cmd.Parameters.AddWithValue("@notes", DBNull.Value);
        //    }
        //    else
        //    {
        //        cmd.Parameters.AddWithValue("@notes", variety.Notes);
        //    }

        //            term.Id = (int)cmd.ExecuteScalar();
        //        }
        //    }
        //}

        //public void Update(Terms term)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                    UPDATE Terms 
        //                       SET  = Id = @Id,
        //                              term = @term                                  
        //                     WHERE Id = @id";
        //            cmd.Parameters.AddWithValue("@id", term.Id);
        //            cmd.Parameters.AddWithValue("@term", term.Term);


        //if (variety.Notes == null)
        //{
        //    cmd.Parameters.AddWithValue("@notes", DBNull.Value);
        //}
        //else
        //{
        //    cmd.Parameters.AddWithValue("@notes", variety.Notes);
        //}

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

    }
}
