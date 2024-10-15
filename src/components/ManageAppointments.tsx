import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";

import { registerLicense } from "@syncfusion/ej2-base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF5cWGNCf1NpR2ZGfV5ycEVHYVZTQHxcS00DNHVRdkdnWXZcdnRVRGBdV010V0M="
);

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const ManageAppointments = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const data = [
    {
      Id: 1,
      Subject: "3 Booked",
      StartTime: new Date(2024, 8, 26, 7, 0),
      EndTime: new Date(2024, 8, 26, 8, 0),
    },
  ];

  return (
    <>
      <div className="flex flex-col py-10 px-16">
        <div className="bg-white rounded-lg shadow-md">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Room
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                      >
                        Bookings
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                      >
                        Group
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        20-09-2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        07:00 - 09:30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        601
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center p-[0.25rem] bg-[#CFF1E6] rounded-full">
                            <span className="size-[0.375rem] bg-[#10B981] inline-block rounded-full"></span>
                          </span>
                          <span className="ml-[6px]">Approved</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                        1 - SE1856
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                        <button
                          disabled
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="hs-scale-animation-modal"
                          data-hs-overlay="#hs-scale-animation-modal"
                        >
                          View
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        20-09-2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        08:00 - 10:30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        Online
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                        {/* <span className="text-[#7c7c7c] font-medium">
                          Completed
                        </span> */}
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center p-[0.25rem] bg-gray-200 rounded-full">
                            <span className="size-[0.375rem] bg-[#adadad] inline-block rounded-full"></span>
                          </span>
                          <span className="ml-[6px]">Completed</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                        1 - SE1856
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                        <button
                          disabled
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="hs-scale-animation-modal"
                          data-hs-overlay="#hs-scale-animation-modal"
                        >
                          View
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        20-09-2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        14:00 - 16:30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        611
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        3
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                        {/* <span className="text-[#b7ba27] font-medium">
                          Pending
                        </span> */}
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center p-[0.25rem] bg-yellow-100 rounded-full">
                            <span className="size-[0.375rem] bg-[#e9e931] inline-block rounded-full"></span>
                          </span>
                          <span className="ml-[6px]">Pending</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                        {/* 1 - SE1856 */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="hs-scale-animation-modal"
                          data-hs-overlay="#hs-scale-animation-modal"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ScheduleComponent
          readonly
          width="100%"
          height={635}
          startHour="07:00"
          selectedDate={new Date(2024, 8, 27)}
          eventSettings={{
            dataSource: data,
          }}
          className="mt-10"
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>

      <div
        id="hs-scale-animation-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-scale-animation-modal-label"
      >
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center justify-center">
          <div className="w-[800px] flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3
                id="hs-scale-animation-modal-label"
                className="font-bold text-gray-800"
              >
                Booking details
              </h3>
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
            <div className="p-4 overflow-y-auto">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase flex items-center"
                          >
                            Book time
                            <FontAwesomeIcon
                              icon={faSort}
                              className="ml-2 cursor-pointer"
                            />
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Group
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Topic
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Skill
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {new Date().toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            1 - SE1856
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            Koi Farm Shop
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            Set up environment
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                            <input
                              type="radio"
                              name="booking"
                              className="border-gray-300"
                            />
                          </td>
                        </tr>

                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {new Date().toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            2 - SE1856
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            Event Flower Exchange
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            Git & Deploy
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                            <input
                              type="radio"
                              name="booking"
                              className="border-gray-300"
                            />
                          </td>
                        </tr>

                        <tr
                          className="bg-blue-300 font-medium"
                          onClick={() => {}}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {new Date().toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            3 - SE1856
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            Taxi-sharing Platform
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            Review requirements
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                            <input
                              type="radio"
                              name="booking"
                              className="border-gray-300"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAppointments;
