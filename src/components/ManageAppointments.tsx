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
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF5cWGNCf1NpR2ZGfV5ycEVHYVZTQHxcS00DNHVRdkdnWXZcdnRVRGBdV010V0M="
);

const ManageAppointments = () => {
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
      <div className="flex">
        <div className="w-[50%]">
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
                        3
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        <span className="size-[8px] inline-block bg-green-500 rounded-full me-2"></span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="size-4"
                          />
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 text-center">
                        <span className="size-[8px] inline-block bg-green-500 rounded-full me-2"></span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="size-4"
                          />
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <span className="size-[8px] inline-block bg-gray-400 rounded-full me-2"></span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="size-4"
                          />
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
          width="50%"
          height={635}
          startHour="07:00"
          selectedDate={new Date(2024, 8, 27)}
          eventSettings={{
            dataSource: data,
          }}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    </>
  );
};

export default ManageAppointments;
