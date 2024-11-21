import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

interface Student {
  studentId: string;
  studentName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  groupId: string;
  groupName: string;
  swpClassId: number;
}

interface Group {
  groupId: string;
  name: string;
}

interface Class {
  swpClassId: number;
  name: string;
  semesterId: number;
  status: boolean;
}

interface Request {
  requestId: number;
  studentId: string;
  currentClassName: number;
  classNameToMove: number;
  reason: string;
  requestDate: string;
  approvalDate: string;
  status: string;
}

const StudentClass = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { authData } = authContext;

  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [openViewRequest, setOpenViewRequest] = useState<boolean>(false);

  const [classMove, setClassMove] = useState<number>();
  const [reason, setReason] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axiosInstance.get(
          `https://localhost:7007/api/Student/all`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );
        setStudents(response.data);
      } catch (error) {
        console.log("Can not get students", error);
        // toast.error("Can not get group");
      }
    };

    const getGroups = async () => {
      try {
        const response = await axiosInstance.get(
          `https://localhost:7007/api/Group/all`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );
        setGroups(response.data);
      } catch (error) {
        console.log("Can not get groups", error);
        // toast.error("Can not get group");
      }
    };

    const getClasses = async () => {
      try {
        const response = await axiosInstance.get(
          `https://localhost:7007/api/SwpClass/all`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );
        setClasses(response.data);
      } catch (error) {
        console.log("Can not get classes", error);
        // toast.error("Can not get group");
      }
    };

    const getRequests = async () => {
      try {
        const response = await axiosInstance.get(
          "https://localhost:7007/api/RequestToMoveClass/get-all"
        );

        setRequests(response.data);
      } catch (error) {
        console.log("Can not get request", error);
      }
    };

    getStudents();
    getGroups();
    getClasses();
    getRequests();
  }, [refresh]);

  const [searchTerm, setSearchTerm] = useState("");

  const safeString = (value: any) => {
    return (value || "").toString().toLowerCase();
  };

  const filteredStudents = useMemo(() => {
    const searchValue = searchTerm.toLowerCase();
    return students.filter((student) => {
      if (!student || student.swpClassId != authData?.swpClassId) return false;

      return (
        safeString(student.studentName).includes(searchValue) ||
        safeString(student.email).includes(searchValue)
      );
    });
  }, [students, searchTerm]);

  // Handle search input change
  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleMoveOutClass = async (event: any) => {
    try {
      event.preventDefault();

      const data = {
        studentId: authData?.id,
        currentClassId: authData?.swpClassId,
        classIdToMove: classMove,
        reason: reason,
      };

      const response = await axiosInstance.post(
        `https://localhost:7007/api/RequestToMoveClass/create`,
        data
      );

      toast.success("Submit successful");
      setRefresh(!refresh);
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="p-10 h-[100%] min-h-[90vh]">
      <div className="flex justify-between">
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
              placeholder="Search by name, email..."
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

        <div>
          <button
            className="text-[15px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => {
              setOpen(true);
              setClassMove(undefined);
              setReason("");
            }}
          >
            Move out class
          </button>
          <button
            className="ml-3 text-[15px] text-yellow-600 bg-transparent hover:bg-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
            onClick={() => {
              setOpenViewRequest(true);
            }}
          >
            View request 
            ({requests
            .filter((request) => request.studentId === authData?.id)
            .length})
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-[#ffffff] border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mentor
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Date of birth
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Group
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents
            .sort((a, b) => {
              if (a.groupId === null || a.groupId === undefined) return 1; 
              if (b.groupId === null || b.groupId === undefined) return -1; 
              return a.groupId.localeCompare(b.groupId); 
            })
            .map((student) => (
              <tr
                key={student.studentId}
                className="bg-white border-b  hover:bg-gray-50 "
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {student.studentName}
                </th>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">{student.phone}</td>
                <td className="px-6 py-4">{student.gender}</td>
                <td className="px-6 py-4">
                  {formatDate(student.dateOfBirth)}
                </td>{" "}
                <td className="px-6 py-4 text-center">
                  {
                    groups.find((group) => group.groupId === student.groupId)
                      ?.name
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-[100]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-[400px] sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <form onSubmit={handleMoveOutClass}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Move out class
                      </DialogTitle>
                      <div className="mt-2">
                        <div>
                          <label>Current class:</label>
                          <input
                            className="ml-2 w-[100px] mt-4 pl-2 rounded-[5px] text-[16px] text-[#5B5B5B] disabled:text-[#888888]"
                            readOnly={true}
                            onFocus={(e) => e.target.blur()}
                            value={
                              classes.find(
                                (x) => x.swpClassId == authData?.swpClassId
                              )?.name
                            }
                          />
                        </div>
                        <div>
                          <label>Move to class:</label>
                          <select
                            required
                            defaultValue=""
                            className="mt-4 ml-[5px] pl-2 rounded-[5px] text-[16px] text-[#5B5B5B] disabled:text-[#888888]"
                            value={classMove}
                            onChange={(e) =>
                              setClassMove(Number(e.target.value))
                            }
                          >
                            <option value="" disabled></option>
                            {classes
                              .filter(
                                (item) =>
                                  item.swpClassId != authData?.swpClassId &&
                                  item.status
                              )
                              .map((item) => (
                                <option
                                  key={item.swpClassId}
                                  value={item.swpClassId}
                                >
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="flex mt-4">
                          <label>Reason:</label>
                          <textarea
                            className="ml-2"
                            value={reason}
                            required
                            onChange={(e) => setReason(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    // onClick={() => setOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openViewRequest}
        onClose={setOpenViewRequest}
        className="relative z-[100]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-[60%] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      View request
                    </DialogTitle>
                    <div className="mt-2">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-[#ffffff] border-b">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Current class
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Move to class
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Reason
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Request date
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Approval date
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {requests
                          .filter((request) => request.studentId === authData?.id)
                          .map((request) => (
                            <tr
                              key={request.requestId}
                              className="bg-white border-b  hover:bg-gray-50 text-black"
                            >
                              <td
                                className="px-6 py-4"
                              >
                                {request.currentClassName}
                              </td>
                              <td className="px-6 py-4">
                                {request.classNameToMove}
                              </td>
                              <td className="px-6 py-4">{request.reason}</td>
                              <td className="px-6 py-4">
                                {formatDate(request.requestDate)}
                              </td>
                              <td className="px-6 py-4">
                                {formatDate(request.approvalDate)}
                              </td>
                              <td className="px-6 py-4 text-center">
                                {request.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenViewRequest(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default StudentClass;
