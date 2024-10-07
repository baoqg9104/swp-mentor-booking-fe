import { Rating, Stack } from "@mui/material";

const StudentDashboard = () => {
  return (
    <>
      <div className="h-[90svh] p-5">
        <div className="grid grid-cols-3 p-8 gap-x-8 gap-y-8 bg-white shadow-md rounded-[10px]">
          <div className="bg-[#FFE2E6] p-4 rounded-[15px]">
            <div>
              <div className="bg-[#F9597D] flex justify-center items-center rounded-full size-[45px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="size-[22px] fill-white"
                >
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
              </div>
            </div>
            <div className=" text-[23px] mt-3 pl-1">No group yet</div>
            <div className="text-[15px] pl-1 mt-2">SE1856</div>
          </div>
          <div className="bg-[#FFF4DE] p-4  rounded-[15px]">
            <div>
              <div className="bg-[#FF957B] flex justify-center items-center rounded-full size-[45px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="size-[22px] fill-white"
                >
                  <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zM312 376c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0z" />
                </svg>
              </div>
            </div>
            <div className="text-[23px] mt-3 pl-1">0</div>
            <div className="text-[15px] pl-1 mt-2 capitalize">
              Upcoming appointments
            </div>
          </div>
          <div className="bg-[#DCFCE7] p-4 rounded-[15px]">
            <div>
              <div className="bg-[#3CD755] flex justify-center items-center rounded-full size-[45px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="size-[22px] fill-white"
                >
                  <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z" />
                </svg>
              </div>
            </div>
            <div className="text-[23px] mt-3 pl-1">0</div>
            <div className="text-[15px] pl-1 mt-2 capitalize">
              Completed appointments
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 p-8 gap-x-8 gap-y-8 bg-[white] shadow-md rounded-[10px]">
          <div className="col-start-1 col-end-3">
            <div className="border rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start font-medium text-gray-500 uppercase"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start font-medium text-gray-500 uppercase"
                    >
                      Mentor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start font-medium text-gray-500 uppercase"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start font-medium text-gray-500 uppercase"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium text-gray-500 uppercase"
                    >
                      Subject
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end font-medium text-gray-500 uppercase"
                    >
                      Room
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800">
                      1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      TamPM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      01-10-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      07:00 - 08:00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-end">
                      Set up environment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-end">
                      {/* <span className="size-2 inline-block bg-green-500 rounded-full me-2"></span> */}
                      Online
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800">
                      2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      HoangNT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      01-10-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      07:00 - 08:00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-end">
                      Set up environment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-end">
                      {/* <span className="size-2 inline-block bg-green-500 rounded-full me-2"></span> */}
                      601
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800">
                      3
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      PhuongLHK
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      01-10-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      07:00 - 08:00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-end">
                      Set up environment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-end">
                      {/* <span className="size-2 inline-block bg-green-500 rounded-full me-2"></span> */}
                      603
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className=" p-4 col-start-3 rounded-[15px] flex bg-[#f4fcff]">
            <div className="relative size-40">
              <svg
                className="rotate-[135deg] size-full"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-neutral-700"
                  strokeWidth="1"
                  strokeDasharray="75 100"
                  strokeLinecap="round"
                ></circle>

                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-[#2797F7]"
                  strokeWidth="2"
                  strokeDasharray="56.25 100"
                  // strokeDasharray={`${50} 100`}
                  strokeLinecap="round"
                ></circle>
              </svg>

              <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-4xl font-bold text-[#2797F7]">
                  75<span className="text-[25px]">%</span>
                </span>
                {/* <span className="text-[#2797F7] block">
                  Project
                </span> */}
              </div>
            </div>
            <div className="ml-6 font-medium text-[20px] flex items-center">
              Project <br /> Progress
            </div>
          </div>

          <div className="bg-[#f8f1fe] p-4 col-start-3 rounded-[15px]">
            <div>
              <div className="bg-[#BF83FF] flex justify-center items-center rounded-full size-[45px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="size-[22px] fill-white"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
              </div>
            </div>
            <div className="text-[23px] mt-3 pl-1">
              4.5 <span className="text-[18px]">/</span>
              <span className="text-[20px]"> 5</span>
            </div>
            <div>
              <Stack spacing={1}>
                <Rating
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                />
              </Stack>
            </div>
            <div className="text-[15px] pl-1 mt-2 capitalize">
              Feedback score
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
