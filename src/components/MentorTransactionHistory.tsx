

const MentorTransactionHistory = () => {
  return (
    <>
      <div className="flex flex-col p-10 h-[90svh]">
        <div
          className="-m-1.5 overflow-x-auto p-5 bg-white"
          style={{ boxShadow: "0 0 8px #bbbbbb" }}
        >
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="bg-[#f8f8f8] border-none text-[#3D3B3C] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 "
              placeholder="Search transactions"
            />
          </div>
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y bg-white">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-[#443C3F] uppercase"
                    >
                      Transaction
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-[#443C3F] uppercase"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-[#443C3F] uppercase"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-[#443C3F] uppercase"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-[#443C3F] uppercase"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-[#443C3F] uppercase"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-200 divide-">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Receive
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      + 1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      07-10-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      10:50
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Group 1 - SE1867
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center">
                      <span className="text-[#209526]  font-medium w-[80px] h-[35px] flex items-center justify-center bg-[#e7fae3] rounded-[20px]">
                        Success
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Receive
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      + 1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      07-10-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      10:50
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Group 1 - SE1867
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center">
                      <span className="text-[#C81C15] font-medium w-[80px] h-[35px] flex items-center justify-center bg-[#FCE4E4] rounded-[20px]">
                        Failed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorTransactionHistory;
