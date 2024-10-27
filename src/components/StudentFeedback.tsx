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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faStar,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";
import { Rating, Stack } from "@mui/material";
import { toast } from "react-toastify";

const StudentFeedback = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const [open, setOpen] = useState<boolean>(false);
  const [openGroupFeedback, setOpenGroupFeedback] = useState<boolean>(false);
  const [openFeedback, setOpenFeedback] = useState<boolean>(false);

  const [rating, setRating] = useState<number>(0);

  return (
    <>
      <div className="h-[90vh] py-10 px-20">
        {/* <div className="font-medium text-gray-600 mb-3 uppercase">Rate groups</div> */}
        {/* <h1 className="uppercase text-[15px] font-semibold text-[#4B6883] mb-3">
          Mentor's Rating for Group
        </h1> */}
        <div className="-m-1.5 overflow-x-auto bg-white rounded-lg shadow-md">
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
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
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
                        Not rated
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      {/* <Stack spacing={1}>
                        <Rating
                          size="small"
                          precision={0.5}
                          value={3}
                          readOnly
                        />
                      </Stack> */}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      <button
                        type="button"
                        className="bg-[#48D7B9] hover:bg-[#48eac7] px-4 py-[4px] inline-flex items-center gap-x-1 text-sm rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-white"
                        onClick={() => setOpen(true)}
                      >
                        <FontAwesomeIcon icon={faStar} />
                        <span className="">Rate</span>
                      </button>

                      <button
                        type="button"
                        className="ml-[10px] bg-[#eba749] hover:bg-[#ffad39] px-4 py-[4px] inline-flex items-center gap-x-1 text-sm rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-white"
                        onClick={() => setOpenGroupFeedback(true)}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                        <span className="">Mentor's feedback</span>
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
                        Rated
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      <div className="flex gap-2 items-center">
                        <Stack spacing={1}>
                          <Rating
                            size="small"
                            precision={1}
                            value={3}
                            readOnly
                          />
                        </Stack>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="size-4 cursor-pointer"
                          onClick={() => setOpenFeedback(true)}
                        >
                          <path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                        </svg>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      <button
                        disabled
                        type="button"
                        className="bg-[#48D7B9] hover:bg-[#48eac7] px-4 py-[4px] inline-flex items-center gap-x-1 text-sm rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-white"
                        onClick={() => setOpen(true)}
                      >
                        <FontAwesomeIcon icon={faStar} />
                        <span className="">Rate</span>
                      </button>

                      <button
                        type="button"
                        className="ml-[10px] bg-[#eba749] hover:bg-[#ffad39] px-4 py-[4px] inline-flex items-center gap-x-1 text-sm rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-white"
                        onClick={() => setOpenGroupFeedback(true)}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                        <span className="">Mentor's feedback</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <h1 className="uppercase text-[15px] font-semibold text-[#4B6883] mb-3 mt-10">
          Group ratings & Feedback
        </h1> */}
        {/* <div>fedkjhn</div> */}
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
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Group's Feedback
                    </DialogTitle>
                    <div className="mt-2">
                      <h1 className="mb-3 font-medium">Mentor: TamPM</h1>
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

                      <hr className="mt-5 border-[#d0d0d0]" />

                      {/* <div className="mt-3">Rating:</div> */}
                      <div className="flex items-center mt-3">
                        <Stack spacing={1}>
                          <Rating
                            size="large"
                            precision={1}
                            value={rating}
                            onChange={(event, newValue) => {
                              setRating(newValue === null ? 0 : newValue);
                              console.log(newValue);
                            }}
                          />
                        </Stack>

                        <span className="ml-3 text-[18px]">{rating} / 5</span>
                      </div>

                      {/* <div className="mt-3">Feedback:</div> */}
                      <div className="relative mt-5">
                        <textarea
                          id="hs-floating-textarea"
                          className="peer p-4 block h-[100px] w-full border-gray-200 rounded-lg text-[15px] placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2"
                          placeholder="This is a textarea placeholder"
                        ></textarea>
                        <label
                          htmlFor="hs-floating-textarea"
                          className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:text-xs
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500
      peer-[:not(:placeholder-shown)]:text-xs
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 "
                        >
                          Feedback
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setRating(0);

                    //call api -> success or fail
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
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

      <Dialog
        open={openGroupFeedback}
        onClose={setOpenGroupFeedback}
        className="relative z-[100]"
      >
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
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Mentor's Feedback
                    </DialogTitle>
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

                      <hr className="mt-5 border-[#d0d0d0]" />

                      <div className="mt-3 text-[18px]">
                        <Stack spacing={1}>
                          <Rating
                            size="medium"
                            precision={1}
                            value={3}
                            readOnly
                          />
                        </Stack>

                        <textarea className="resize-none rounded-md mt-3 w-[70%] h-[100px]" disabled>Good</textarea>

                      </div>
                      <div className="flex items-center mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {/* <button
                  type="button"
                  onClick={() => {
                    setOpenGroupFeedback(false);
                    //call api -> success or fail
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
                >
                  Yes
                </button> */}
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenGroupFeedback(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>


      <Dialog
        open={openFeedback}
        onClose={setOpenFeedback}
        className="relative z-[100]"
      >
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
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Group's Feedback
                    </DialogTitle>
                    <div className="mt-2">
                      <h1 className="mb-3 font-medium">Mentor: TamPM</h1>
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

                      <hr className="mt-5 border-[#d0d0d0]" />

                      <div className="mt-3 text-[18px]">
                        <Stack spacing={1}>
                          <Rating
                            size="medium"
                            precision={1}
                            value={3}
                            readOnly
                          />
                        </Stack>

                        <textarea
                          className="resize-none rounded-md mt-3 w-[70%] h-[100px]"
                          disabled
                        >
                          Good
                        </textarea>
                      </div>
                      <div className="flex items-center mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {/* <button
                  type="button"
                  onClick={() => {
                    setOpenGroupFeedback(false);
                    //call api -> success or fail
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
                >
                  Yes
                </button> */}
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenFeedback(false)}
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

export default StudentFeedback