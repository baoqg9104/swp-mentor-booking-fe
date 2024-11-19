import {
  faCircleXmark,
  faGear,
  faPaperclip,
  faPenToSquare,
  faPlus,
  faUser,
  faUserPlus,
  faUserShield,
  faUserXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Slider from "@mui/material/Slider";
import Select from "react-select";
import { MultiValue } from "react-select";

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

("use client");

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import makeAnimated from "react-select/animated";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axiosInstance from "./axiosInstance";

const animatedComponents = makeAnimated();

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

interface Group {
  groupId: string;
  name: string;
  topicId: number;
  topicName: string;
  swpClassId: number;
  swpClassName: string;
  walletPoint: number;
  progress: number;
  createdDate: string;
  status: boolean;
  leaderId: string;
}

interface Class {
  swpClassId: number;
  name: string;
  status: boolean;
}

interface Topic {
  topicId: number;
  name: string;
  status: boolean;
}

interface GroupTopic {
  topicId: number;
  name: string;
  description: string;
  semesterId: string;
  semesterName: string;
  actors: string;
  status: boolean;
}

interface Member {
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
}

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

const StudentGroup = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const [open, setOpen] = useState(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { authData, setAuthData } = authContext;

  const [group, setGroup] = useState<Group | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [openLeaveGroup, setOpenLeaveGroup] = useState<boolean>(false);

  const [selectedMembers, setSelectedMembers] = useState<MultiValue<any>>([]);

  useEffect(() => {
    const studentOptions = students
      .filter(
        (student) =>
          student.swpClassId === Number(authData?.swpClassId) &&
          student.groupId === null &&
          student.studentId != authData?.id
      )
      .map((student) => ({
        value: student.email,
        label: `${student.studentName} | ${student.email}`,
      }));
    setOptions(studentOptions);
  }, [students]);

  useEffect(() => {
    const getGroup = async () => {
      try {
        const response = await axiosInstance.get(
          `https://localhost:7007/api/Student/${authData?.id}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );

        const groupId = response.data.groupId;

        if (groupId === null) {
          return;
        }

        const groupResponse = await axiosInstance.get(
          `https://localhost:7007/api/Group/get/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );

        setGroup(groupResponse.data);
        setProgress(groupResponse.data.progress);
      } catch (error) {
        // console.log("Can not get group", error);
        // toast.error("Can not get group");
      }
    };

    const getMembers = async () => {
      try {
        const studentResponse = await axiosInstance.get(
          `https://localhost:7007/api/Student/${authData?.id}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );

        const groupId = studentResponse.data.groupId;

        if (groupId === null) {
          return;
        }

        const response = await axiosInstance.get(
          `https://localhost:7007/api/Group/get-members/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );

        setMembers(response.data);
      } catch (error) {
        console.log("Can not get members", error);
        // toast.error("Can not get members");
      }
    };

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

        // const studentOptions = response.data.map((student: any) => ({
        //   value: student.id,
        //   label: `${student.studentName}`
        // }));

        // setOptions(studentOptions);
      } catch (error) {
        console.log("Can not get students", error);
        // toast.error("Can not get group");
      }
    };

    getGroup();
    getMembers();
    getStudents();
  }, [refresh]);

  useEffect(() => {
    const getGroupTopic = async () => {
      try {
        const response = await axiosInstance.get(
          `https://localhost:7007/api/Topic/get/${group?.topicId}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );

        setGroupTopic(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getGroupTopic();
  }, [group]);

  const [groupTopic, setGroupTopic] = useState<GroupTopic | null>(null);

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
      toast.error("Can not get classes");
    }
  };

  const getTopics = async () => {
    try {
      const response = await axiosInstance.get(`https://localhost:7007/api/Topic/all`, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });

      setTopics(response.data);
    } catch (error) {
      console.log("Can not get topics", error);
      toast.error("Can not get topics");
    }
  };

  const [name, setName] = useState<string>("");
  const [topicId, setTopicId] = useState<number>(0);

  const handleCreateGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const members = [
        ...selectedMembers,
        {
          value: authData?.email,
          label: `${authData?.fullName} | ${authData?.email}`,
        },
      ];

      const data = {
        leaderId: authData?.id,
        name,
        topicId,
        swpClassId: authData?.swpClassId,
        memberEmails: members.map((member: any) => member.value),
      };

      const response = await axiosInstance.post(
        `https://localhost:7007/api/Group/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );

      localStorage.setItem("groupId", response.data);

      // toast.success("Create group successful!");
      window.location.reload();

      setRefresh(!refresh);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const [email, setEmail] = useState<string>("");

  const addMember = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const data = {
        groupId: group?.groupId,
        leaderId: authData?.id,
        emails: selectedMembers.map((member: any) => member.value),
      };

      if (selectedMembers == null || selectedMembers.length == 0) {
        return;
      }

      const response = await axiosInstance.put(
        `https://localhost:7007/api/Group/add-member/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );

      toast.success("Add member successful!");
      setRefresh(!refresh);
      setSelectedMembers([]);
    } catch (error: any) {
      let errorMessage = error.response?.data || "An error occurred";
      errorMessage = errorMessage.replace(/^Error:\s*/, "");
      toast.error(errorMessage);
    }
  };

  const [members, setMembers] = useState<Member[]>([]);

  const [openProgress, setOpenProgress] = useState<boolean>(false);

  const [progress, setProgress] = useState<number>(0);

  const updateProgress = async () => {
    try {
      const data = {
        groupId: group?.groupId,
        progress: progress,
      };

      const response = await axiosInstance.put(
        `https://localhost:7007/api/Group/update-progress`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );

      toast.success("Update progress successful!");
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Update progress failed!");
    }
  };

  const leaveGroup = async () => {
    try {
      const response = await axiosInstance.put(
        `https://localhost:7007/api/Group/leave-group?studentId=${authData?.id}`
      );

      window.location.reload();
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const deleteMember = async (studentId: string) => {
    try {
      const response = await axiosInstance.put(
        `https://localhost:7007/api/Group/delete-member?studentId=${studentId}`
      );

      toast.success("Delete member successful!");
      setRefresh(!refresh);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="py-10 px-12 h-[100vh]">
        {/* If have not joined group */}
        {group === null && (
          <>
            <div className="mb-2">
              You haven't joined any project group yet.
            </div>
            <div
              className="cursor-pointer bg-[#00BDB2] hover:bg-[#23d6cd] inline-flex items-center justify-center rounded-[10px] text-white font-medium py-2 px-3"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-scale-animation-modal"
              data-hs-overlay="#hs-scale-animation-modal"
              onClick={() => {
                getClasses();
                getTopics();
                setName("");
                setTopicId(0);
                setSelectedMembers([]);
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="size-4 mr-1" />
              Create new group
            </div>

            <div
              id="hs-scale-animation-modal"
              className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
              role="dialog"
              tabIndex={-1}
              aria-labelledby="hs-scale-animation-modal-label"
            >
              <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
                  <form
                    className="flex flex-col gap-3"
                    onSubmit={handleCreateGroup}
                  >
                    <div className="flex justify-between items-center py-3 px-4 border-b">
                      <h2
                        id="hs-scale-animation-modal-label"
                        className="font-bold text-gray-800 text-[18px]"
                      >
                        Create new group
                      </h2>
                      <button
                        type="button"
                        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                        aria-label="Close"
                        data-hs-overlay="#hs-scale-animation-modal"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="p-4 flex flex-col justify-center items-center">
                      <div className="w-full px-10 flex flex-col gap-3">
                        <div className="relative">
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            type="text"
                            className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2"
                            placeholder="Name"
                          />
                          <label
                            className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
                          >
                            Name
                          </label>
                        </div>
                        <div className="relative">
                          <select
                            value={topicId}
                            onChange={(e) =>
                              setTopicId(parseInt(e.target.value))
                            }
                            required
                            className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2"
                          >
                            <option value="">Choose topic</option>
                            {topics.map(
                              (t) =>
                                t.status == true && (
                                  <option key={t.topicId} value={t.topicId}>
                                    {t.name}
                                  </option>
                                )
                            )}
                          </select>

                          <label
                            className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
                          >
                            Topic
                          </label>
                        </div>

                        <h1 className="mt-2 font-medium text-[#474747] text-center">
                          - Add member -
                        </h1>
                        <div className="flex gap-x-3">
                          <div className="relative w-[100%]">
                            {/* <select
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2"
                            >
                              <option value=""></option>
                              {students
                              .filter((student) => student.swpClassId === Number(authData?.swpClassId) && student.groupId === null && student.studentId != authData?.id)
                              .map((student) => (
                                <option
                                  key={student.studentId}
                                  value={student.email}
                                >
                                   {student.studentName} | {student.email}
                                </option>
                              ))}
                            </select> */}
                            <Select
                              closeMenuOnSelect={false}
                              // components={animatedComponents}
                              options={options}
                              isMulti
                              value={selectedMembers}
                              onChange={(selectedOptions) =>
                                setSelectedMembers(
                                  selectedOptions as MultiValue<any>
                                )
                              }
                              placeholder="Select members..."
                            />
                            {/* <label
                              className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
                            >
                              Email
                            </label> */}
                          </div>
                          {/* <button
                            type="button"
                            className="flex items-center justify-center cursor-pointer border border-[blue] py-3 rounded-md w-[23%] text-blue-500 font-semibold hover:bg-blue-50"
                          >
                            Add
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        data-hs-overlay="#hs-scale-animation-modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Create group
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
        {/* If have joined group */}
        {group !== null && (
          <>
            <div className="flex">
              <div className="w-[50%]">
                <div className="flex w-[280px]">
                  <div className="w-[90%]">
                    <h1 className="text-[21px] font-medium mb-3">
                      {group.name} - {group.swpClassName}
                    </h1>
                    <div className="flex -space-x-1 overflow-hidden p-1">
                      {/* <div className="size-7 rounded-full ring-2 ring-gray-200 flex items-center justify-center bg-white">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-500 size-4"
                        />
                      </div>
                      <div className="size-7 rounded-full ring-2 ring-gray-200 flex items-center justify-center bg-white">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-500 size-4"
                        />
                      </div>
                      <div className="size-7 rounded-full ring-2 ring-gray-200 flex items-center justify-center bg-white">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-500 size-4"
                        />
                      </div>
                      <div className="size-7 rounded-full ring-2 ring-gray-200 flex items-center justify-center bg-white">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-500 size-4"
                        />
                      </div> */}
                      {members.map((member) => (
                        <div
                          key={member.studentId}
                          className="size-8 rounded-full ring-2 ring-gray-200 flex items-center justify-center bg-white"
                        >
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-gray-500 size-[17px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`cursor-pointer flex justify-center items-center size-9 rounded-full 
  bg-[#ffffff] shadow 
  ${
    authData?.id === group.leaderId
      ? "hover:bg-[#e2e2e2]"
      : "bg-gray-300 cursor-not-allowed opacity-50"
  }`}
                      onClick={() => {
                        if (authData?.id == group.leaderId) {
                          setSelectedMembers([]);
                          setOpenSetting(true);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faGear} className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <h1 className="text-[15px] font-semibold text-[#3c3c3c]">
                    Status:{" "}
                    <span
                      className={`text-[16px] ${
                        group.status ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {group.status ? "Approved" : "Disabled"}
                    </span>
                  </h1>
                  <h1 className="mt-2 text-[15px] font-semibold text-[#3c3c3c]">
                    Remaining points:{" "}
                    <span className="text-[#0c9eff] text-[16px]">
                      {group.walletPoint}
                    </span>
                  </h1>
                </div>

                <div className="mt-7">
                  <h1 className="uppercase text-[13px] font-semibold text-[#4B6883]">
                    Current project
                  </h1>
                  <div className="pt-4 mt-3 bg-white shadow-md rounded-lg inline-block min-w-[300px]">
                    <div className="border-l-[4px] border-[#FFD0B5] pl-5 ml-3 mb-4 pr-8">
                      <p className="text-[14px] font-medium text-[#4a4a4a] bg-[#F0F4F8] px-[10px] inline-block rounded-md py-[2px]">
                        {groupTopic?.semesterName}
                      </p>
                      <p className="font-semibold mt-3 ml-1">SWP391</p>
                      <p className="mt-2 text-[#4a4a4a] text-[15px] ml-1">
                        {groupTopic?.name}
                      </p>
                    </div>
                    <div className="border-t-2 py-[6px] flex justify-end px-4">
                      <div
                        className={`hover:bg-[#ffefe5] size-[30px] rounded-full flex justify-center items-center cursor-pointer ${
                          authData?.id == group.leaderId
                            ? "hover:bg-[#e2e2e2]"
                            : "cursor-not-allowed opacity-50 bg-white hover:bg-white"
                        }`}
                        onClick={() => {
                          if (authData?.id == group.leaderId) {
                            setOpenProgress(true);
                            setProgress(group?.progress!);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-[#595959] text-[18px]"
                        />
                      </div>
                      <div
                        className="hover:bg-[#ffefe5] size-[30px] rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => setOpen(true)}
                      >
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          className="text-[#595959] text-[18px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <h1 className="uppercase text-[13px] font-semibold text-[#4B6883]">
                    Project progress
                  </h1>
                  <div className="pt-4 rounded-lg flex justify-center w-[300px]">
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
                          className={`stroke-current ${
                            progress >= 100
                              ? "text-[#228B22]"
                              : progress >= 90
                              ? "text-[#36bb36]"
                              : progress >= 80
                              ? "text-[#32CD32]"
                              : progress >= 70
                              ? "text-[#7FFF00]"
                              : progress >= 60
                              ? "text-[#ADFF2F]"
                              : progress >= 50
                              ? "text-[#FFFF00]"
                              : progress >= 40
                              ? "text-[#FFD700]"
                              : progress >= 30
                              ? "text-[#FFA500]"
                              : progress >= 20
                              ? "text-[#FF8C00]"
                              : progress >= 10
                              ? "text-[#FF4500]"
                              : "text-[#FF0000]"
                          }`}
                          strokeWidth="2"
                          // strokeDasharray="56.25 100"
                          strokeDasharray={`${
                            (group?.progress! * 56.25) / 75
                          } ${100}`}
                          strokeLinecap="round"
                        ></circle>
                      </svg>

                      <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span
                          className={`text-4xl font-bold ${
                            progress >= 100
                              ? "text-[#228B22]"
                              : progress >= 90
                              ? "text-[#36bb36]"
                              : progress >= 80
                              ? "text-[#32CD32]"
                              : progress >= 70
                              ? "text-[#7FFF00]"
                              : progress >= 60
                              ? "text-[#ADFF2F]"
                              : progress >= 50
                              ? "text-[#dddd36]"
                              : progress >= 40
                              ? "text-[#FFD700]"
                              : progress >= 30
                              ? "text-[#FFA500]"
                              : progress >= 20
                              ? "text-[#FF8C00]"
                              : progress >= 10
                              ? "text-[#FF4500]"
                              : "text-[#FF0000]"
                          }`}
                        >
                          {group?.progress}
                          <span className="text-[25px]">%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-5 px-16 shadow h-[400px]">
                <div className="flex flex-col">
                  <div className="-m-1.5 overflow-x-auto">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setOpenLeaveGroup(true)}
                        className="text-[14px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                      >
                        Leave group
                      </button>
                    </div>
                    <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        <p className="text-center mb-3 font-medium">
                          Member list
                        </p>
                        <hr />
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Full name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Email
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Phone
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {/* <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                Member 1
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                member1@gmail.com
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                0123456789
                              </td>
                              
                            </tr>

                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                Member 1
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                member1@gmail.com
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                0123456789
                              </td>

                            </tr>

                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                Member 1
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                member1@gmail.com
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                0123456789
                              </td>
                            
                            </tr> */}
                            {members.map((member) => (
                              <tr key={member.studentId}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                  {member.fullName}
                                  {member.studentId == group.leaderId && (
                                    <FontAwesomeIcon
                                      icon={faUserShield}
                                      className="ml-2"
                                    />
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {member.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {member.phone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {member.studentId != authData?.id &&
                                    group.leaderId == authData?.id && (
                                      <button
                                        onClick={() =>
                                          deleteMember(member.studentId)
                                        }
                                        className="hover:bg-blue-100 rounded-full size-[24px] flex items-center justify-center"
                                      >
                                        <FontAwesomeIcon
                                          icon={faXmark}
                                          className="size-[14px]"
                                        />
                                      </button>
                                    )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[20%] mt-10"></div>
          </>
        )}
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-[100]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 pt-0 shadow-xl">
                  {/* <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Panel title
                    </DialogTitle>
                  </div> */}
                  <div className="relative mt-6 flex-1 px-4 sm:px-6 py-3">
                    <p className="font-medium text-[18px] mb-3">
                      {groupTopic?.name}
                    </p>
                    <p className="mr-2 text-[#a17a3a] font-medium">Actors: </p>
                    <span className="text-[15px]">{groupTopic?.actors}</span>
                    {/* <div className="mt-2 flex gap-2">
                      <span className="bg-[#C6F7E9] rounded-[20px] py-[2px] px-[10px] text-[14px] font-medium text-[#46ad90]">
                        Guest
                      </span>
                      <span className="bg-[#ffe6d8] rounded-[20px] py-[2px] px-[10px] text-[14px] font-medium text-[#c4977d]">
                        Member
                      </span>
                      <span className="bg-[#bfefff] rounded-[20px] py-[2px] px-[10px] text-[14px] font-medium text-[#5292a7]">
                        Koi Breeder
                      </span>
                      <span className="bg-[#ccf1d0] rounded-[20px] py-[2px] px-[10px] text-[14px] font-medium text-[#82b588]">
                        Staff
                      </span>
                    </div> */}
                    <div className="mt-4">
                      <p className="text-[#39ae6c] font-medium">
                        Description:{" "}
                      </p>
                      <p className="text-[15px]">{groupTopic?.description}</p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openSetting}
        onClose={setOpenSetting}
        className="relative z-[100]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="w-[500px] flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h2
                  id="hs-scale-animation-modal-label-setting"
                  className="font-bold text-gray-800 text-[18px]"
                >
                  Setting Group
                </h2>
                <button
                  type="button"
                  className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => setOpenSetting(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 flex flex-col justify-center items-center">
                <h1 className="mb-2 font-medium text-[#474747]">
                  - Add member -
                </h1>
                <form className="w-full mb-5" onSubmit={addMember}>
                  <div className="flex gap-3">
                    <div className="relative w-[100%]">
                      {/* <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2"
                        placeholder="Email"
                      />
                      <label
                        className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
                      >
                        Email
                      </label> */}
                      <Select
                        closeMenuOnSelect={false}
                        // components={animatedComponents}
                        options={options}
                        isMulti
                        value={selectedMembers}
                        onChange={(selectedOptions) =>
                          setSelectedMembers(selectedOptions as MultiValue<any>)
                        }
                        className="text-start"
                        placeholder="Select members..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex items-center justify-center cursor-pointer border border-[blue] py-3 rounded-md w-[20%] text-blue-500 font-semibold hover:bg-blue-50"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => setOpenSetting(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openProgress}
        onClose={setOpenProgress}
        className="relative z-[100]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="w-[500px] flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h2
                  id="hs-scale-animation-modal-label-setting"
                  className="font-bold text-gray-800 text-[18px]"
                >
                  Update project progress
                </h2>
                <button
                  type="button"
                  className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => setOpenProgress(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex flex-col justify-center items-center">
                <div className="p-5 py-10 px-8 w-full">
                  <Slider
                    aria-label="Temperature"
                    defaultValue={group?.progress}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={10}
                    marks
                    min={0}
                    max={100}
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (target) {
                        setProgress(Number(target.value));
                      }
                    }}
                  />

                  <div className="w-full flex justify-center">
                    <div className="relative size-40 mt-6">
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
                          className={`stroke-current ${
                            progress >= 100
                              ? "text-[#228B22]"
                              : progress >= 90
                              ? "text-[#36bb36]"
                              : progress >= 80
                              ? "text-[#32CD32]"
                              : progress >= 70
                              ? "text-[#7FFF00]"
                              : progress >= 60
                              ? "text-[#ADFF2F]"
                              : progress >= 50
                              ? "text-[#FFFF00]"
                              : progress >= 40
                              ? "text-[#FFD700]"
                              : progress >= 30
                              ? "text-[#FFA500]"
                              : progress >= 20
                              ? "text-[#FF8C00]"
                              : progress >= 10
                              ? "text-[#FF4500]"
                              : "text-[#FF0000]"
                          }`}
                          strokeWidth="2"
                          // strokeDasharray="56.25 100"
                          strokeDasharray={`${(progress * 56.25) / 75} ${100}`}
                          strokeLinecap="round"
                        ></circle>
                      </svg>

                      <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span
                          className={`text-4xl font-bold ${
                            progress >= 100
                              ? "text-[#228B22]"
                              : progress >= 90
                              ? "text-[#36bb36]"
                              : progress >= 80
                              ? "text-[#32CD32]"
                              : progress >= 70
                              ? "text-[#7FFF00]"
                              : progress >= 60
                              ? "text-[#ADFF2F]"
                              : progress >= 50
                              ? "text-[#c9c92b]"
                              : progress >= 40
                              ? "text-[#FFD700]"
                              : progress >= 30
                              ? "text-[#FFA500]"
                              : progress >= 20
                              ? "text-[#FF8C00]"
                              : progress >= 10
                              ? "text-[#FF4500]"
                              : "text-[#FF0000]"
                          }`}
                        >
                          {progress}
                          <span className="text-[25px]">%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => setOpenProgress(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenProgress(false);
                    updateProgress();
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openLeaveGroup}
        onClose={setOpenLeaveGroup}
        className="relative z-[100]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="px-5 flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
              <div className="w-[400px] p-4 overflow-y-auto flex flex-col justify-center items-center">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Leave group
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {group?.leaderId == authData?.id
                          ? "You are the group leader, if you leave the group the group will be deleted."
                          : "Are you sure you want to leave this group?"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center py-3 px-4 border-t">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => setOpenLeaveGroup(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenLeaveGroup(false);
                    leaveGroup();
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default StudentGroup;
