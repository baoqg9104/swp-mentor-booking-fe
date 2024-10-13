import {
  faEnvelope,
  faGift,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Agenda,
  Day,
  Inject,
  Month,
  ScheduleComponent,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

("use client");

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const BookingMentor = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const data = [
    {
      Id: 1,
      Subject: "Meeting",
      StartTime: new Date(2024, 8, 26, 7, 0),
      EndTime: new Date(2024, 8, 26, 9, 30),
    },
    {
      Id: 2,
      Subject: "Meeting",
      StartTime: new Date(2024, 8, 26, 10, 0),
      EndTime: new Date(2024, 8, 26, 12, 30),
    },
  ];

  const [open, setOpen] = useState<boolean>(false);

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
                  <span
                    className="cursor-pointer font-medium text-yellow-700 hover:underline ml-3"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="hs-scale-animation-modal-avaibility"
                    data-hs-overlay="#hs-scale-animation-modal-avaibility"
                  >
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
                  <span
                    className="cursor-pointer font-medium text-yellow-700 hover:underline ml-3"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="hs-scale-animation-modal-avaibility"
                    data-hs-overlay="#hs-scale-animation-modal-avaibility"
                  >
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
                  <span
                    className="cursor-pointer font-medium text-yellow-700 hover:underline ml-3"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="hs-scale-animation-modal-avaibility"
                    data-hs-overlay="#hs-scale-animation-modal-avaibility"
                  >
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

      <div
        id="hs-scale-animation-modal-avaibility"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-scale-animation-modal-label-avaibility"
      >
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200  sm:w-full lg:w-[90%] m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h2
                id="hs-scale-animation-modal-label-avaibility"
                className="font-bold text-gray-800 text-[18px]"
              >
                Mentor Availability
              </h2>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Close"
                data-hs-overlay="#hs-scale-animation-modal-avaibility"
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
            <div className="p-4 px-10 overflow-y-auto flex justify-center">
              <div className="w-[40%]">
                <div className="mb-5 text-[20px] font-medium">TamPM</div>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                              <button
                                type="button"
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                onClick={() => setOpen(true)}
                              >
                                Book
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                              <button
                                type="button"
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                onClick={() => setOpen(true)}
                              >
                                Book
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                              <button
                                type="button"
                                disabled
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                onClick={() => setOpen(true)}
                              >
                                Book
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[60%]">
                <ScheduleComponent
                  readonly
                  startHour="07:00"
                  height={635}
                  selectedDate={new Date(2024, 8, 27)}
                  eventSettings={{
                    dataSource: data,
                  }}
                >
                  <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-scale-animation-modal-avaibility"
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

      <Dialog open={open} onClose={setOpen} className="relative z-[100]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-[100] w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Booking
                    </DialogTitle>
                    <div className="mt-2">
                      <select name="" id="" className="w-[200px]">
                        <option value="" disabled selected>
                          Choose skill
                        </option>
                        <option value="Git">Git</option>
                        <option value="React">React</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Book
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default BookingMentor;
