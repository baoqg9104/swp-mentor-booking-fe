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
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF5cWGNCf1NpR2ZGfV5ycEVHYVZTQHxcS00DNHVRdkdnWXZcdnRVRGBdV010V0M="
);

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const ManageCalendar = () => {
  const data = [
    {
      Id: 1,
      Subject: "Meeting",
      StartTime: new Date(2024, 9, 26, 7, 0),
      EndTime: new Date(2024, 9, 26, 9, 30),
    },
    {},
  ];

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex">
          <div className="w-[45%] mt-3">
            <form className="w-full max-w-sm">
              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Start time
                  </label>
                </div>
                <div className="md:w-2/3">
                  <TimePicker />
                </div>
              </div>
              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-password"
                  >
                    End time
                  </label>
                </div>
                <div className="md:w-2/3">
                  <TimePicker />
                </div>
              </div>

              <div className="md:flex md:items-center mb-3">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-password"
                  >
                    Date
                  </label>
                </div>
                <div className="md:w-2/3">
                  <DatePicker />
                </div>
              </div>

              <div className="md:flex md:items-center mb-3">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-password"
                  >
                    Format
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="offline" name="format" /> <label className="ml-1" htmlFor="offline">Offline</label>
                  <div className="inline-block ml-10"></div>
                  <input type="radio" id="online" name="format" /> <label className="ml-1" htmlFor="online">Online</label>
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-[#3F51B5] hover:bg-[#4d5fc3] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Add slot
                  </button>
                </div>
              </div>
            </form>
          </div>
          <ScheduleComponent
            readonly
            width="55%"
            height={635}
            selectedDate={new Date(2024, 9, 26)}
            eventSettings={{
              dataSource: data,
            }}
          >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
      </LocalizationProvider>
    </>
  );
};

export default ManageCalendar;
