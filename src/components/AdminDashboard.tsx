import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminDashboard = () => {
  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-7 lg:py-7 mx-auto h-[90vh]">
        <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-x-2">
                <p className="text-[14px] uppercase tracking-wide text-gray-500">
                  Total{" "}
                  <span className="font-semibold text-[#00BEB3]">mentors</span>
                </p>
              </div>

              <div className="mt-1 lg:flex lg:justify-between lg:items-center">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                  10
                </h3>

                <a
                  className="mt-1 lg:mt-0 min-h-[24px] inline-flex items-center gap-x-1 py-0.5 px-2  rounded-md bg-[#FEE3C3] hover:bg-orange-200 focus:outline-none"
                  href="#"
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-orange-700 text-[13px]"
                  />

                  <span className="inline-block text-xs font-semibold text-orange-700">
                    5 pending approval
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-x-2">
                <p className="text-[14px] uppercase tracking-wide text-gray-500">
                  Total{" "}
                  <span className="font-semibold text-[#70b319]">students</span>
                </p>
              </div>

              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                  100
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-x-2">
                <p className="text-[14px] uppercase tracking-wide text-gray-500">
                  Total{" "}
                  <span className="font-semibold text-[#70b319]">groups</span>
                </p>
              </div>

              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                  10
                </h3>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-x-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Pageviews
                </p>
              </div>

              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                  92,913
                </h3>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
