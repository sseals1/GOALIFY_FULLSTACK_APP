using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
//using Microsoft.Data.SqlClient;
using Goalify.Models;
using System;
using Goalify.Utils;

namespace Goalify.Repositories
{
    public class UsersRepository : IUsersRepository
    {

        private readonly string _connectionString;
        public UsersRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Users> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Email, Address
                        FROM users";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<Users>();
                        while (reader.Read())
                        {
                            users.Add(new Users()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                Address = reader.GetString(reader.GetOrdinal("Address"))
                            });

                        }
                        reader.Close();
                        return users;
                    }
                }
            }
        }

        public Users Get(Users email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Email, Address
                          FROM Users
                         WHERE Email = @email;";
                    cmd.Parameters.AddWithValue("@email", email);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Users user = null;
                        if (reader.Read())
                        {
                            user = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Address = DbUtils.GetString(reader, "Address"),

                            };

                        }
                        return user;
                    }
                }
            }
        }

            public void Add(Users user)
            {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO Users (name, address, email)
                            OUTPUT INSERTED.ID
                            VALUES (@name, @address, @email)";
                    //cmd.Parameters.AddWithValue("@userId", user.Id);
                    cmd.Parameters.AddWithValue("@name", user.Name);
                    cmd.Parameters.AddWithValue("@address", user.Address);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                   

                    //if (variety.Notes == null)
                    //    {
                    //        cmd.Parameters.AddWithValue("@notes", DBNull.Value);
                    //    }
                    //    else
                    //    {
                    //        cmd.Parameters.AddWithValue("@notes", variety.Notes);
                    //    }

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Goals 
                               SET  = Id = @Id,
                                      name = @name,
                                      email = @email, 
                                      address = @address, 
                                      
                             WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@userId", user.Id);
                    cmd.Parameters.AddWithValue("@categoryId", user.Name);
                    cmd.Parameters.AddWithValue("@priorityId", user.Email);
                    cmd.Parameters.AddWithValue("@termId", user.Address);
                    
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
        //        using (var conn = Connection)
        //        {
        //            conn.Open();
        //            using (var cmd = conn.CreateCommand())
        //            {
        //                cmd.CommandText = "DELETE FROM Goals WHERE Id = @id";
        //                cmd.Parameters.AddWithValue("@id", id);

        //                cmd.ExecuteNonQuery();
        //            }
        //        }
          }

    }
}

