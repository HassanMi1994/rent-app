namespace domain.Exceptions
{
    public enum ExceptionCodes
    {
        NotAuthorized = 401,


        #region domain exception codes
        /// <summary>
        /// throw when an object is null
        /// </summary>
        ItemNotFound = 1000,

        /// <summary>
        /// throw when count of returning of one item is more than of count of rented!
        /// </summary>
        ItemsToReturnAreMoreThanRemaining = 1001,

        /// <summary>
        /// throw when try to edit a closed contract!
        /// </summary>
        ContractIsClosedSuccuessfulyCannotBeChanged = 1002


        #endregion
    }
}
