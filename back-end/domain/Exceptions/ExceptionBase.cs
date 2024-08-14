namespace domain.Exceptions
{
    public class ExceptionBase : Exception
    {
        public ExceptionCodes ExceptionCode { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }

        public ExceptionBase(ExceptionCodes ExceptionCode) => this.ExceptionCode = ExceptionCode;

        public ExceptionBase(ExceptionCodes ExceptionCode, string message)
        {
            this.ExceptionCode = ExceptionCode;
            this.Message = message;
        }
    }
}
