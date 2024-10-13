import {
  faEnvelope,
  faGift,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const BookingMentor = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
      <div className="p-10 h-[90vh]">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-[#ffffff] border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mentor
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Feedback Score
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b  hover:bg-gray-50 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  TamPM
                </th>
                <td className="px-6 py-4">tampm@fe.edu.vn</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">5 / 5</td>
                <td className="px-6 py-4 text-right">
                  <span
                    className="cursor-pointer font-medium text-blue-600 hover:underline"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="hs-scale-animation-modal"
                    data-hs-overlay="#hs-scale-animation-modal"
                  >
                    Profile
                  </span>
                  <span className="cursor-pointer font-medium text-yellow-700 hover:underline ml-3">
                    Availability
                  </span>
                </td>
              </tr>
              <tr className="bg-white border-b  hover:bg-gray-50 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  TamPM
                </th>
                <td className="px-6 py-4">tampm@fe.edu.vn</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">5 / 5</td>
                <td className="px-6 py-4 text-right">
                  <span
                    className="cursor-pointer font-medium text-blue-600 hover:underline"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="hs-scale-animation-modal"
                    data-hs-overlay="#hs-scale-animation-modal"
                  >
                    Profile
                  </span>
                  <span className="cursor-pointer font-medium text-yellow-700 hover:underline ml-3">
                    Availability
                  </span>
                </td>
              </tr>
              <tr className="bg-white border-b  hover:bg-gray-50 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  TamPM
                </th>
                <td className="px-6 py-4">tampm@fe.edu.vn</td>
                <td className="px-6 py-4">0123456789</td>
                <td className="px-6 py-4">5 / 5</td>
                <td className="px-6 py-4 text-right">
                  <span
                    className="cursor-pointer font-medium text-blue-600 hover:underline"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="hs-scale-animation-modal"
                    data-hs-overlay="#hs-scale-animation-modal"
                  >
                    Profile
                  </span>
                  <span className="cursor-pointer font-medium text-yellow-700 hover:underline ml-3">
                    Availability
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="hs-scale-animation-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-scale-animation-modal-label"
      >
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200  sm:w-full lg:w-[900px] m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h2
                id="hs-scale-animation-modal-label"
                className="font-bold text-gray-800 text-[18px]"
              >
                Mentor Profile
              </h2>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Close"
                data-hs-overlay="#hs-scale-animation-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 px-10 overflow-y-auto flex justify-center items-center">
              <div className="w-[50%]">
                <div className="size-[120px] bg-gray-200 rounded-full border-[3px] border-white shadow-lg"></div>
                <div>
                  <div className="text-[25px] font-medium mt-2 mb-3">
                    Full name
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faUser} className="size-4 mr-2" />
                      Male
                    </div>

                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faGift}
                        className="size-4 mr-2 text-gray-500"
                      />
                      <span className="text-gray-500">Date of birth</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="size-4 mr-2 text-gray-500"
                      />
                      <span className="text-gray-500">Email</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="size-4 mr-2 text-gray-500"
                      />
                      <span className="text-gray-500">Phone</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[50%]">
                <div className="mt-6">
                  <h3 className="font-semibold">Expert</h3>
                  <div className="mt-3 ml-1 flex gap-x-4">
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      React
                    </span>
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      ASP.NET
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold">Advanced</h3>
                  <div className="mt-3 ml-1 flex gap-x-4">
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      React
                    </span>
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      ASP.NET
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold">Proficient</h3>
                  <div className="mt-3 ml-1 flex gap-x-4">
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      React
                    </span>
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      ASP.NET
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold">Intermediate</h3>
                  <div className="mt-3 ml-1 flex gap-x-4">
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      React
                    </span>
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      ASP.NET
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold">Beginner</h3>
                  <div className="mt-3 ml-1 flex gap-x-4">
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      React
                    </span>
                    <span className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow">
                      ASP.NET
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-scale-animation-modal"
              >
                Close
              </button>
              {/* <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingMentor;
