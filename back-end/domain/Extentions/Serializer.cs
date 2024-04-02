using System.Text.Json;

namespace System
{
    public static class Serializer
    {
        public static string Serialize(this object obj)
        {
            return JsonSerializer.Serialize(obj);
        }
    }
}
