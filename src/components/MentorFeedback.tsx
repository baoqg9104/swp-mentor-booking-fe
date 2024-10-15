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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersRectangle } from "@fortawesome/free-solid-svg-icons";
import { Rating, Stack } from "@mui/material";

const MentorFeedback = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="h-[90vh] py-6 px-20">
        {/* <div className="font-medium text-gray-600 mb-3 uppercase">Rate groups</div> */}
        <h1 className="uppercase text-[15px] font-semibold text-[#4B6883] mb-3">
          Rate group
        </h1>
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
                      Group
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Rating Score
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
                      1 - SE67
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
                        Not rated
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center"></td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                        onClick={() => setOpen(true)}
                      >
                        Rate
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      2 - SE1856
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
                        Rated
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      4 / 5
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      <button
                        disabled
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700"
                        onClick={() => setOpen(true)}
                      >
                        Rate
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h1 className="uppercase text-[15px] font-semibold text-[#4B6883] mb-3 mt-10">
          Group ratings & Feedback
        </h1>
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
                      Booking
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

                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.5}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
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

export default MentorFeedback;
