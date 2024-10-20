import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faUsersRectangle } from "@fortawesome/free-solid-svg-icons";

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const ManageAppointments = () => {
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const data = [
    {
      Id: 1,
      Subject: "3 Bookings",
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
                      <td className="pl-12 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
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
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                          onClick={() => setOpen(true)}
                        >
                          Complete
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
                      <td className="pl-12 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
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
                      <td className="pl-12 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
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


      <Dialog open={open} onClose={setOpen} className="relative z-[100]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4 pt-0">
                {/* <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Cancel appointments
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure want to cancel this appointments?
                      </p>
                    </div>
                  </div>
                </div> */}

                <div className="p-0">
                  <div className="text-center sm:ml-2 sm:mt-0 sm:text-left">
                    {/* <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Complete
                    </DialogTitle> */}
                    <div className="mt-2">
                      <h1 className="mb-3 font-medium">Group: 1 - SE1856</h1>
                      <div className="flex">
                        <div className="w-1/3 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="size-4"
                          >
                            <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
                          </svg>
                          20-09-2024
                        </div>
                        <div className="w-1/3 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="size-4"
                          >
                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                          </svg>
                          7:00 - 9:30
                        </div>
                        <div className="w-1/3 flex items-center gap-1">
                          <FontAwesomeIcon
                            icon={faUsersRectangle}
                            className="size-[18px]"
                          />
                          601
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {


                    //call api -> success or fail
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto"
                >
                  Complete
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  No
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ManageAppointments;
