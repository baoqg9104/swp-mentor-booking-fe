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
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Dayjs } from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

interface MentorSlot {
  mentorSlotId: string;
  mentorId: string;
  startTime: string;
  endTime: string;
  bookingPoint: number;
  isOnline: boolean;
  room: string;
}

const ManageCalendar = () => {
  const [mentorSlots, setMentorSlots] = useState<MentorSlot[]>([]);

  useEffect(() => {
    const getMentorSlots = async () => {
      try {
        // setLoading(true);

        // Make the GET request
        const response = await axios.get(
          `https://localhost:7007/api/MentorSlot/get-by-mentor-id/${authData?.id}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`, // Replace YOUR_TOKEN_HERE with your actual token
            },
          }
        );

        // Set the response data
        setMentorSlots(response.data);
      } catch (error) {
        console.log("Can not get mentor slots", error);
        toast.error("Can not get mentor slots");
      }
    };

    getMentorSlots();
  }, [mentorSlots]);

  const data = mentorSlots.map((slot) => ({
    Id: slot.mentorSlotId, // Hoặc chuyển đổi sang số nếu cần
    Subject: slot.room !== "" ? slot.room : "Online", // Bạn có thể thay đổi tiêu đề nếu cần
    StartTime: new Date(slot.startTime), // Chuyển đổi chuỗi startTime thành đối tượng Date
    EndTime: new Date(slot.endTime), // Chuyển đổi chuỗi endTime thành đối tượng Date
  }));

  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [format, setFormat] = useState<string>("offline");
  const [room, setRoom] = useState<string>("");

  const [isShowForm, setIsShowForm] = useState<boolean>(true);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }

  const { authData } = authContext;

  const handleAddSlot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !startTime ||
      !endTime ||
      !date ||
      !format ||
      (format === "offline" && !room)
    ) {
      return;
    }

    if (startTime.isAfter(endTime) || startTime.isSame(endTime)) {
      toast.error("End time must be after start time");
      return;
    }

    // console.log(startTime, endTime, date, format, room);

    const mentorSlot = {
      mentorId: authData?.id,
      startTime: `${date.format("YYYY-MM-DD")}T${startTime.format(
        "HH:mm:ss.SSS"
      )}Z`,
      endTime: `${date.format("YYYY-MM-DD")}T${endTime.format(
        "HH:mm:ss.SSS"
      )}Z`,
      bookingPoint: 1,
      isOnline: format === "online",
      room,
    };

    try {
      const response = await axios.post(
        "https://localhost:7007/api/MentorSlot/create",
        mentorSlot
      );

      toast.success("Slot added successfully");
    } catch (error) {
      toast.error("Failed to add slot");
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex">
          <div className="w-[40%] mt-3">
            <div className="flex justify-end mr-4">
              <button
                className="absolute"
                onClick={() => setIsShowForm(!isShowForm)}
              >
                {isShowForm && (
                  <FontAwesomeIcon
                    className="size-[20px]"
                    icon={faChevronDown}
                  />
                )}
                {!isShowForm && (
                  <FontAwesomeIcon className="size-[20px]" icon={faChevronUp} />
                )}
              </button>
            </div>
            {isShowForm && (
              <form className="w-full" onSubmit={handleAddSlot}>
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
                    <TimePicker
                      value={startTime}
                      onChange={(e) => setStartTime(e)}
                    />
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
                    <TimePicker
                      value={endTime}
                      onChange={(e) => setEndTime(e)}
                    />
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
                    <DatePicker value={date} onChange={(e) => setDate(e)} />
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
                    <select
                      name=""
                      id=""
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="border-gray-400"
                      required
                    >
                      <option value="offline">Offline</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                </div>

                {format === "offline" && (
                  <div className="md:flex md:items-center mb-3">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-password"
                      >
                        Room
                      </label>
                    </div>

                    <div className="flex items-center">
                      <select
                        name=""
                        id=""
                        className="font-semibold text-gray-600"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        {...(format === "offline" && { required: true })}
                      >
                        <option value="" disabled></option>
                        <option value="601">601</option>
                        <option value="602">602</option>
                        <option value="603">603</option>
                        <option value="604">604</option>
                        <option value="605">605</option>
                        <option value="606">606</option>
                        <option value="607">607</option>
                        <option value="608">608</option>
                        <option value="609">609</option>
                        <option value="610">610</option>
                        <option value="611">611</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* <div className="md:flex md:items-center mb-3">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-password"
                  >
                    Meet URL
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="url" className="w-[320px] text-sm" />
                </div>
              </div> */}

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      className="shadow bg-[#3F51B5] hover:bg-[#4d5fc3] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Add slot
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="pl-10 pt-5 font-medium text-[#6e6e6e]">
              Number of slots remaining: {10 - mentorSlots.length}{" "}
            </div>

            <div className="flex flex-col mt-7">
              {mentorSlots.length > 0 && (
                <div className="-m-1.5 overflow-x-auto bg-white shadow">
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
                          {/* <tr>
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
                            >
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="size-4"
                              />
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="size-4"
                              />
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="size-4"
                              />
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                className="size-4"
                              />
                            </button>
                          </td>
                        </tr> */}

                          {mentorSlots.map((slot) => {
                            return (
                              <tr key={slot.mentorSlotId}>
                                {/* Format date as dd-mm-yyyy */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {new Date(slot.startTime)
                                    .toLocaleDateString("en-GB")
                                    .replace(/\//g, "-")}
                                </td>
                                {/* Format time to exclude seconds */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {`${new Date(
                                    slot.startTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })} - ${new Date(
                                    slot.endTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {slot.isOnline ? "Online" : slot.room}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-3">
                                  <button
                                    type="button"
                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                  >
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      className="size-4"
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashCan}
                                      className="size-4"
                                    />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              ;
            </div>
          </div>
          <ScheduleComponent
            readonly
            width="60%"
            startHour="07:00"
            height="100vh"
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
