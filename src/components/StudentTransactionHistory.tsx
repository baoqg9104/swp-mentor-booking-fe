
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "./axiosInstance";

interface Transaction {
  transactionId: number;
  bookingId: number;
  type: string;
  point: number;
  dateTime: string;
  groupName: string;
  swpClassName: string;
  mentorName: string;
}

const StudentTransactionHistory = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { authData, setAuthData } = authContext;

  useEffect(() => {
    const getTransactionByGroupId = async () => {
      try {
        const groupId = localStorage.getItem("groupId");

        const data = groupId;

        if (data === "") {
          return;
        }

        const response = await axiosInstance.get(
          `https://localhost:7007/api/Transaction/get-transactions-by-groupId/${data}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );

        setTransactions(response.data);
        setFilteredTransactions(response.data);
      } catch (error) {
        // console.log("Can not get group", error);
        // toast.error("Can not get group");
      }
    };

    getTransactionByGroupId();
  }, [refresh]);

  const handleSearch = () => {
    if (!startDate || !endDate) return;

    const normalizedStartDate = new Date(startDate);
    normalizedStartDate.setHours(0, 0, 0, 0);
    
    const normalizedEndDate = new Date(endDate);
    normalizedEndDate.setHours(23, 59, 59, 999);

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.dateTime);
      return transactionDate >= normalizedStartDate && transactionDate <= normalizedEndDate;
    });

    setFilteredTransactions(filtered);
};

  return (
    <>
      <div className="flex flex-col p-10 h-[90svh]">
        <div
          className="-m-1.5 overflow-x-auto p-5 bg-white"
          style={{ boxShadow: "0 0 8px #bbbbbb" }}
        >
          <div className="relative">
            <div
              id="date-range-picker"
              className="flex items-center justify-start mb-2"
            >
              <div className="relative">
                <input
                  type="date"
                  placeholder="Select date start"
                  value={startDate ? startDate.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    setStartDate(
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                />
              </div>
              <span className="mx-4 text-gray-500">to</span>
              <div className="relative">
                <input
                  type="date"
                  placeholder="Select date end"
                  value={endDate ? endDate.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    setEndDate(e.target.value ? new Date(e.target.value) : null)
                  }
                />
              </div>
              <div className="relative ml-5">
                <button
                  onClick={() => {
                    handleSearch();
                  }}
                  className="flex items-center rounded bg-[#6AD9C2] py-2 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:shadow-none hover:bg-[#58efd0] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 mr-1.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </div>
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
                  {/* <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Booking
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">
                      - 1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      07-10-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      10:50:50
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      TamPM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center">
                      <span className="text-[#209526]  font-medium w-[80px] h-[35px] flex items-center justify-center bg-[#e7fae3] rounded-[20px]">
                        Success
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Booking
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">
                      - 1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      07-10-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      10:50:50
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      TamPM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center">
                      <span className="text-[#C81C15] font-medium w-[80px] h-[35px] flex items-center justify-center bg-[#FCE4E4] rounded-[20px]">
                        Failed
                      </span>
                    </td>
                  </tr> */}
                  {filteredTransactions.map((transaction) => (
                    <tr
                      className="hover:bg-gray-50"
                      key={transaction.transactionId}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {transaction.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                        {transaction.type === "Booking" && (
                          <span className="text-red-500">
                            {" "}
                            - {transaction.point}
                          </span>
                        )}

                        {transaction.type === "Refund" && (
                          <span className="text-green-600">
                            {" "}
                            + {transaction.point}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {new Date(transaction.dateTime)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {`${new Date(transaction.dateTime).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        Pay for Mentor {transaction.mentorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center">
                        <span className="text-[#209526]  font-medium w-[80px] h-[35px] flex items-center justify-center bg-[#e7fae3] rounded-[20px]">
                          Success
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentTransactionHistory;
