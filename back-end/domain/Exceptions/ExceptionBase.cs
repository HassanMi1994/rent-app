namespace domain.Exceptions
{
    public class ExceptionBase : Exception
    {
        public int ExceptoinCode { get; set; }
        public string Name { get; set; }

        public ExceptionBase(int ExceptionCode)
        {
            
        }
    }
}
