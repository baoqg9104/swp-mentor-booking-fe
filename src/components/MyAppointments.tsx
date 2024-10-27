import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useContext, useEffect, useMemo } from "react";
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
import {
  Agenda,
  Day,
  Inject,
  Month,
  ScheduleComponent,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import { AuthContext } from "./AuthContext";
import axios from "axios";

interface Booking {
  bookingId: number;
  groupId: string;
  groupName: string;
  mentorSlotId: number;
  mentorName: string;
  startTime: string;
  endTime: string;
  room: string;
  isOnline: boolean;
  skillName: string;
  bookingTime: string;
  status: string;
}

const MyAppointments = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const [open, setOpen] = useState<boolean>(false);

  const [refresh, setRefresh] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const data = bookings
  // .filter((booking) => booking.status === "Approved")
  .map((booking) => ({
    Id: booking.mentorSlotId,
    Subject: booking.room !== "" ? `Room: ${booking.room}` : "Online",
    StartTime: new Date(booking.startTime),
    EndTime: new Date(booking.endTime),
    Status: booking.status,
  }));

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { authData } = authContext;

  useEffect(() => {
    const getBookings = async () => {
      try {
        const groupId = localStorage.getItem("groupId");
        const response = await axios.get(
          `https://localhost:7007/api/Booking/get-bookings-by-groupId/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );

        setBookings(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBookings();
  }, [refresh]);

  const [searchTerm, setSearchTerm] = useState("");

  // Safe string check helper function
  const safeString = (value: any) => {
    return (value || "").toString().toLowerCase();
  };

  // Filter bookings based on search term
  const filteredBookings = useMemo(() => {
    const searchValue = searchTerm.toLowerCase();
    return bookings.filter((booking) => {
      if (!booking) return false;

      return (
        safeString(booking.mentorName).includes(searchValue) ||
        safeString(booking.room).includes(searchValue)
      );
    });
  }, [bookings, searchTerm]);

  // Handle search input change
  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const onEventRendered = (args: any) => {

    if (args.data.Status === "Approved") {
      args.element.style.backgroundColor = '#1AAA55';
    } else if (args.data.Status === "Denied") {
      args.element.style.backgroundColor = '#ff8773';
    } else if (args.data.Status === "Pending") {
      args.element.style.backgroundColor = '#FEC200';
    } else if (args.data.Status === "Completed") {
      args.element.style.backgroundColor = '#E6E6E6';
    }
  }

  return (
    <>
      <div className="h-[90vh] py-10 px-20">
        <div className="w-[300px] mb-5">
          <div className="relative flex items-center bg-white shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search mentor, date, room..."
              value={searchTerm}
              onChange={handleSearch}
            />

            {/* <button
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
            >
              Search
            </button> */}
          </div>
        </div>
        <div className="-m-1.5 overflow-x-auto bg-white rounded-lg shadow">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Mentor
                    </th>
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
                      Status
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      TamPM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      20-09-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      07:00 - 09:30
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      601
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center">
                      <span className="text-[#636363]  font-medium w-[100px] h-[35px] flex items-center justify-center bg-[#e6e6e6] rounded-[20px] shadow">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      <button
                        disabled
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                        onClick={() => setOpen(true)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      TamPM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      20-09-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      08:00 - 10:30
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Online
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center">
                      <span className="text-[#209526]  font-medium w-[100px] h-[35px] flex items-center justify-center bg-[#e7fae3] rounded-[20px] shadow">
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      <button
                        disabled
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                        onClick={() => setOpen(true)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      TamPM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      20-09-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      14:00 - 16:30
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      611
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center">
                      <span className="text-[#9d9f34] font-medium w-[100px] h-[35px] flex items-center justify-center bg-[#ffffc3] rounded-[20px] shadow">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                        onClick={() => setOpen(true)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr> */}

                  {filteredBookings
                    .sort(
                      (a, b) =>
                        new Date(b.startTime).getTime() -
                        new Date(a.startTime).getTime()
                    )
                    .map((booking) => (
                      <tr key={booking.bookingId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {booking.mentorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {new Date(booking.startTime)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {`${new Date(booking.startTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )} - ${new Date(booking.endTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {booking.room ? booking.room : "Online"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center">
                          {booking.status === "Pending" && (
                            <span className="text-[#9d9f34] font-medium w-[100px] h-[35px] flex items-center justify-center bg-[#ffffc3] rounded-[20px] shadow">
                              Pending
                            </span>
                          )}

                          {booking.status === "Approved" && (
                            <span className="text-[#209526]  font-medium w-[100px] h-[35px] flex items-center justify-center bg-[#e7fae3] rounded-[20px] shadow">
                              Approved
                            </span>
                          )}

                          {booking.status === "Denied" && (
                            <span className="text-[#d34d41]  font-medium w-[100px] h-[35px] flex items-center justify-center bg-[#ffe1de] rounded-[20px] shadow">
                              Denied
                            </span>
                          )}

                          {booking.status === "Completed" && (
                            <span className="text-[#636363]  font-medium w-[100px] h-[35px] flex items-center justify-center bg-[#e6e6e6] rounded-[20px] shadow">
                              Completed
                            </span>
                          )}
                        </td>

                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                          onClick={() => setOpen(true)}
                        >
                          Cancel
                        </button>
                      </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
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
          eventRendered={onEventRendered}
          className="mt-10"
        >
          <Inject services={[Day, Week, Month, Agenda]} />
        </ScheduleComponent>
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
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
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
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Yes
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

export default MyAppointments;
