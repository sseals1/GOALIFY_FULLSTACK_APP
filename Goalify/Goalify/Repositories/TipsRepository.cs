using Goalify.Models;
using Goalify.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Goalify.Repositories
{
    public class TipsRepository : ITipsRepository
    {
        private readonly string _connectionString;
        public TipsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Tips> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Suggestions, Tip
                        FROM tips";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tips = new List<Tips>();
                        while (reader.Read())
                        {
                            tips.Add(new Tips()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Tip = DbUtils.GetString(reader, "Tip"),
                                Suggestions = DbUtils.GetString(reader, "Suggestions")
                            });

                        }
                        reader.Close();
                        return tips;
                    }
                }
            }
        }

        public Tips Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Tip, Suggestions
                          FROM tips
                         WHERE Id = @id;";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Tips tip = null;
                        if (reader.Read())
                        {
                            tip = new Tips()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Tip = DbUtils.GetString(reader, "Tip"),
                                Suggestions = DbUtils.GetString(reader, "Suggestions")


                            };

                        }
                        return tip;
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

