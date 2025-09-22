

export const ReceiveMoney = () => {
//   const { data, error, isLoading } = useReceiveMoneyQuery();

//   if (isLoading) return <div>Loading your wallet info...</div>;
//   if (error) return <div>Failed to load wallet info</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Receive Money</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Share your wallet address or QR code with the sender to receive money.
      </p>

      {/* Example wallet address */}
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded text-indigo-600 font-mono break-all">
        {/* {data?.walletAddress} */}
      </div>

      {/* You could add a QR code here, example: react-qr-code */}
      <div className="mx-auto w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">
        QR CODE
      </div>

      <p className="mt-4 text-gray-900 dark:text-gray-200 font-semibold">
        Balance:
         {/* ${data?.balance.toFixed(2)} */}
         
      </p>
    </div>
  );
};
