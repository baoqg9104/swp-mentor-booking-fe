import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const MentorDashboard = () => {
  return (
    <>
      <div className="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-6 mx-auto h-[100vh]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
            <div className="inline-flex justify-center items-center">
              <span className="size-2 inline-block bg-gray-500 rounded-full me-2"></span>
              <span className="text-xs font-semibold uppercase text-gray-600">
                Upcoming
              </span>
            </div>

            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-800">
                10
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
            <div className="inline-flex justify-center items-center">
              <span className="size-2 inline-block bg-green-500 rounded-full me-2"></span>
              <span className="text-xs font-semibold uppercase text-gray-600">
                Completed
              </span>
            </div>

            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-800">
                5
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
            <div className="inline-flex justify-center items-center">
              <span className="size-2 inline-block bg-red-500 rounded-full me-2"></span>
              <span className="text-xs font-semibold uppercase text-gray-600">
                Canceled
              </span>
            </div>

            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-800">
                0
              </h3>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-5">
          <div className="lg:col-start-1 lg:col-end-3">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
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
                            Group
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
                            1 - SE1856
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
                            2 - SE1857
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
                            3 - SE1858
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
              </div>
            </div>
          </div>
          <div className="lg:col-start-3">
            <div className="flex border shadow-sm rounded-xl bg-white p-6 pl-8 pr-8 justify-between mt-[-10px]">
              <div>
                <p className="uppercase font-semibold text-gray-600 text-[15px]">
                  Total hours
                </p>
                <p className="text-[40px] font-semibold text-gray-800">
                  100,25
                </p>
              </div>

              <div className="bg-[#F5365D] rounded-full size-[70px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#FEFEFE"
                  className="size-[38px]"
                >
                  <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
              </div>
            </div>

            <div className="flex border shadow-sm rounded-xl bg-white p-6 pl-8 pr-8 justify-between mt-3">
              <div>
                <p className="uppercase font-semibold text-gray-600 text-[15px]">
                  Total points
                </p>
                <p className="text-[40px] font-semibold text-gray-800">100</p>
              </div>

              <div className="bg-[#f8c620] rounded-full size-[70px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  fill="#FFFFFF"
                  className="size-[38px]"
                >
                  <path d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white shadow-sm rounded-xl border mt-3">
              <div className="inline-flex justify-center items-center">
                <p className="text-xl font-semibold text-gray-700">
                  Overall Score
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl sm:text-4xl lg:text-[45px] font-semibold text-gray-800">
                  4.5 <span className="text-[30px] text-gray-600">/ 5</span>
                </h3>
              </div>

              <div className="flex justify-center mt-[-13px]">
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={4.5}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
              </div>

              <div className="flex justify-center">
                <span className="text-sm font-semibold text-gray-600 p-3 px-7 bg-[#F4F8FF] rounded-[50px] border-[1px] border-[#dedede] cursor-pointer hover:bg-[#ebebeb]">
                  Based on 100 ratings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorDashboard;
