namespace domain.Exceptions
{
    public class ExceptionBase : Exception
    {
        public ExceptionCodes ExceptoinCode { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }

        public ExceptionBase(ExceptionCodes ExceptionCode)
        {
            this.ExceptoinCode = ExceptionCode;
        }

        public ExceptionBase(ExceptionCodes ExceptionCode, string message)
        {
            this.ExceptoinCode = ExceptionCode;
            this.Message = message;
        }
    }
}
