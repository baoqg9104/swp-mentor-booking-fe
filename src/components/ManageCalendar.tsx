import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Dayjs } from "dayjs";
import axios from "axios";
import dayjs from "dayjs";
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
  const [refresh, setRefresh] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [format, setFormat] = useState<string>("offline");
  const [point, setPoint] = useState<number>(1);
  const [room, setRoom] = useState<string>("");
  const [isShowForm, setIsShowForm] = useState<boolean>(true);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { authData } = authContext;

  const [slot, setSlot] = useState<number>();
  const [numOfSlot, setNumOfSlot] = useState<number>(0);

  useEffect(() => {
    const getMentorSlots = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7007/api/MentorSlot/get-by-mentor-id/${authData?.id}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );
        setMentorSlots(response.data);
      } catch (error) {
        console.log("Can not get mentor slots", error);
        toast.error("Can not get mentor slots");
      }
    };

    const getNumOfSlots = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7007/api/Mentor/${authData?.id}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );
        setNumOfSlot(response.data.numOfSlot);
      } catch (error) {
      }
    };

    getMentorSlots();
    getNumOfSlots();
  }, [refresh, authData]);

  const data = mentorSlots.map((slot) => ({
    Id: slot.mentorSlotId,
    Subject: slot.room !== "" ? `Room: ${slot.room}` : "Online",
    StartTime: new Date(slot.startTime),
    EndTime: new Date(slot.endTime),
  }));

  const handleAddSlot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !startTime ||
      !endTime ||
      !date ||
      !format ||
      !point
    ) {
      return;
    }

    if (startTime.isAfter(endTime) || startTime.isSame(endTime)) {
      toast.error("End time must be after start time");
      return;
    }

    if (numOfSlot <= 0) {
      toast.error("You have no slot left!");
      return;
    }

    const slotStartDateTime = date.hour(startTime.hour()).minute(startTime.minute());
    const slotEndDateTime = date.hour(endTime.hour()).minute(endTime.minute());
    
    const mentorSlot = {
      mentorId: authData?.id,
      startTime: slotStartDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS"),
      endTime: slotEndDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS"),
      bookingPoint: point,
      isOnline: format === "online",
      room,
    };

    // console.log("Selected start time:", startTime.format("HH:mm"));
    // console.log("Slot start time:", dayjs(mentorSlot.startTime).format("YYYY-MM-DD HH:mm:ss"));
    // console.log("Current time:", dayjs().format("YYYY-MM-DD HH:mm:ss"));

    if (slotStartDateTime.isBefore(dayjs())) {
      toast.error("Can not add slot in the past!");
      return;
    }

    try {
      await axios.post(
        "https://localhost:7007/api/MentorSlot/create",
        mentorSlot
      );
      toast.success("Slot added successfully!");
      setRefresh(!refresh);
    } catch (error:any) {
      toast.error(error.response.data.replace("Error: ", ""), {autoClose: 2000}); 
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex">
        <div className="w-[40%] mt-3">
          <div className="flex justify-end mr-4">
            <button
              className="absolute"
              onClick={() => setIsShowForm(!isShowForm)}
            >
              <FontAwesomeIcon
                className="size-[20px]"
                icon={isShowForm ? faChevronDown : faChevronUp}
              />
            </button>
          </div>

          {isShowForm && (
            <form onSubmit={handleAddSlot} className="w-[80%] ml-12">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                {/* <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Start Time
                  </label>
                  <div className="mt-2">
                    <TimePicker
                      value={startTime}
                      onChange={(e) => setStartTime(e)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    End Time
                  </label>
                  <div className="mt-2">
                    <TimePicker
                      value={endTime}
                      onChange={(e) => setEndTime(e)}
                    />
                  </div>
                </div> */}

                <div className="sm:col-span-4 w-[200px]">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Date
                  </label>
                  <div className="mt-2">
                    <DatePicker value={date} onChange={(e) => setDate(e)} />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Slot
                  </label>
                  <div className="mt-2">
                    <select
                      value={slot}
                      onChange={(e) => {
                        setSlot(parseInt(e.target.value));
                        if (e.target.value === "1") {
                          setStartTime(dayjs("07:00", "HH:mm"));
                          setEndTime(dayjs("09:15", "HH:mm"));
                        } else if (e.target.value === "2") {
                          setStartTime(dayjs("09:30", "HH:mm"));
                          setEndTime(dayjs("11:45", "HH:mm"));
                        } else if (e.target.value === "3") {
                          setStartTime(dayjs("12:30", "HH:mm"));
                          setEndTime(dayjs("14:45", "HH:mm"));
                        } else if (e.target.value === "4") {
                          setStartTime(dayjs("15:00", "HH:mm"));
                          setEndTime(dayjs("17:15", "HH:mm"));
                        } else if (e.target.value === "5") {
                          setStartTime(dayjs("17:45", "HH:mm"));
                          setEndTime(dayjs("20:00", "HH:mm"));
                        } else if (e.target.value === "6") {
                          setStartTime(dayjs("20:15", "HH:mm"));
                          setEndTime(dayjs("22:30", "HH:mm"));
                        }
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value=""></option>
                      <option value="1">
                        Slot {1} : {"07:00 - 09:15"}
                      </option>
                      <option value="2">
                        Slot {2} : {"09:30 - 11:45"}
                      </option>
                      <option value="3">
                        Slot {3} : {"12:30 - 14:45"}
                      </option>
                      <option value="4">
                        Slot {4} : {"15:00 - 17:15"}
                      </option>
                      <option value="5">
                        Slot {5} : {"17:45 - 20:00"}
                      </option>
                      <option value="6">
                        Slot {6} : {"20:15 - 22:30"}
                      </option>
                      {/* <option value="1">Slot {7} : {"07:00 - 09:00"}</option>
                      <option value="1">Slot {8} : {"07:00 - 09:00"}</option> */}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Format
                  </label>
                  <div className="mt-2">
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="offline">Offline</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Point
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      min={1}
                      max={3}
                      value={point}
                      onChange={(e) => setPoint(Number(e.target.value))}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* {format === "offline" && (
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Room
                    </label>
                    <div className="mt-2">
                      <select
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        required={format === "offline"}
                      >
                        <option value=""></option>
                        {Array.from({ length: 11 }, (_, i) => i + 601).map(
                          (roomNum) => (
                            <option key={roomNum} value={roomNum.toString()}>
                              {roomNum}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                )} */}

                <div className="sm:col-span-6">
                  <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                  >
                    Add slot
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="pl-10 pt-5 font-medium text-[#6e6e6e]">
            Number of slots remaining: {numOfSlot}  
          </div>

          <div className="flex flex-col mt-7">
            {mentorSlots.length > 0 && (
              <div className="-m-1.5 overflow-x-auto bg-white shadow">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            Date
                          </th>
                          <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            Time
                          </th>
                          <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            Room
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                            Point
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {mentorSlots.map((slot) => (
                          <tr key={slot.mentorSlotId}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {new Date(slot.startTime)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "-")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {`${new Date(slot.startTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )} - ${new Date(slot.endTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {slot.isOnline ? "Online" : "Offline"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                              {slot.bookingPoint}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
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
  );
};

export default ManageCalendar;
