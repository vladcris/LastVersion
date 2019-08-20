namespace FeedbackV1.Models
{
    public class ApiUser
    {
        public const string TableName = "User";

    public ApiUser(User obj)
    {
        Id = obj.RowKey;
        Dep_Id = obj.PartitionKey;
        Name = obj.Name;
        Email = obj.Email;
        Manager_ID = obj.Manager_ID;
        PasswordHash = obj.PasswordHash;
        PasswordSalt = obj.PasswordSalt;

    }

        public string Dep_Id { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Manager_ID { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }


}