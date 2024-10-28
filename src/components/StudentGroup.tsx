import {
  faGear,
  faPaperclip,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

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

  useEffect(() => {
    const getGroup = async () => {
      try {
        const groupId = localStorage.getItem("groupId");
        const data = groupId;
        console.log(data);
        if (data === "") {
          return;
        }

        const response = await axios.get(
          `https://localhost:7007/api/Group/get/${data}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );
        setGroup(response.data);

        localStorage.setItem("group", JSON.stringify(response.data));
        getGroupTopic();
      } catch (error) {
        // console.log("Can not get group", error);
        // toast.error("Can not get group");
      }
    };

    const getMembers = async () => {
      try {
        const groupId = localStorage.getItem("groupId");
        const response = await axios.get(
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

    getGroup();
    getMembers();
  }, [refresh]);

  const getGroupTopic = async () => {
    try {
      const groupDataString = localStorage.getItem("group"); // Lấy dữ liệu nhóm từ localStorage

      // Chuyển đổi chuỗi JSON thành đối tượng
      const groupData = groupDataString ? JSON.parse(groupDataString) : null;
      const response = await axios.get(
        `https://localhost:7007/api/Topic/get/${groupData.topicId}`,
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

  const [groupTopic, setGroupTopic] = useState<GroupTopic | null>(null);

  const getClasses = async () => {
    try {
      const response = await axios.get(
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
      const response = await axios.get(`https://localhost:7007/api/Topic/all`, {
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
  const [classId, setClassId] = useState<number>(0);
  const [topicId, setTopicId] = useState<number>(0);

  const handleCreateGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        leaderId: authData?.id,
        name,
        topicId,
        swpClassId: classId,
      };

      const response = await axios.post(
        `https://localhost:7007/api/Group/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );

      localStorage.setItem("groupId", response.data);

      window.location.reload();

      toast.success("Create group successful!");

      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error("Dupplicate topic in the same class!");
    }
  };

  const [email, setEmail] = useState<string>("");

  const addMember = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const groupId = localStorage.getItem("groupId");
      const data = {
        groupId: groupId,
        email: email,
      };

      if (email === "") {
        return;
      }

      const response = await axios.put(
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
    } catch (error: any) {
      // Display response message if available, otherwise show a generic message
      toast.error(error.response.data!);
    }
  };

  const [members, setMembers] = useState<Member[]>([]);

  return (
    <>
      <div className="py-10 px-12 h-[90vh]">
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
                setClassId(0);
                setTopicId(0);
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
                    <div className="p-4 overflow-y-auto flex flex-col justify-center items-center">
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
                            value={classId}
                            onChange={(e) =>
                              setClassId(parseInt(e.target.value))
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
                            <option value="">Choose class</option>
                            {/* <option value="SE1849">SE1849</option>
                            <option value="SE1850">SE1850</option>
                            <option value="SE1851">SE1851</option>
                            <option value="SE1854">SE1854</option>
                            <option value="SE1855">SE1855</option>
                            <option value="SE1856">SE1856</option>
                            <option value="SE1857">SE1857</option>
                            <option value="SE1858">SE1858</option>
                            <option value="SE1859">SE1859</option>
                            <option value="SE1860">SE1860</option>
                            <option value="SE1861">SE1861</option>
                            <option value="SE1862">SE1862</option>
                            <option value="SE1863">SE1863</option>
                            <option value="SE1864">SE1864</option>
                            <option value="SE1865">SE1865</option>
                            <option value="SE1866">SE1866</option>
                            <option value="SE1867">SE1867</option>
                            <option value="SE1868">SE1868</option>
                            <option value="SE1870">SE1870</option>
                            <option value="SE1871">SE1871</option>
                            <option value="SE1872">SE1872</option>
                            <option value="SE1874">SE1874</option>
                            <option value="SE1875">SE1875</option>
                            <option value="SE1876">SE1876</option>
                            <option value="SE1878">SE1878</option> */}
                            {classes.map(
                              (c) =>
                                c.status == true && (
                                  <option
                                    key={c.swpClassId}
                                    value={c.swpClassId}
                                  >
                                    {c.name}
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
                            Class
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
                            {/* <option value="Koi Farm Shop">Koi Farm Shop</option>
                            <option value="Koi Ordering System in Japan">
                              Koi Ordering System in Japan
                            </option>
                            <option value="Koi Delivery Ordering System">
                              Koi Delivery Ordering System
                            </option>
                            <option value="Koi Pond Construction Ordering System">
                              Koi Pond Construction Ordering System
                            </option>
                            <option value="Feng Shui Koi Consulting System">
                              Feng Shui Koi Consulting System
                            </option>
                            <option value="Koi Veterinary Service Center">
                              Koi Veterinary Service Center
                            </option>
                            <option value="Koi Care System at Home">
                              Koi Care System at Home
                            </option>
                            <option value="Koi Show Management System">
                              Koi Show Management System
                            </option>
                            <option value="Koi Auction System for Breeder">
                              Koi Auction System for Breeder
                            </option>
                            <option value="Koi Breeding Game">
                              Koi Breeding Game
                            </option>
                            <option value="POD Booking System">
                              POD Booking System
                            </option>
                            <option value="SWP Mentor Booking System">
                              SWP Mentor Booking System
                            </option>
                            <option value="Hair Salon Booking App">
                              Hair Salon Booking App
                            </option>
                            <option value="EduToyRent - Edu Toy Rental Platform">
                              EduToyRent - Edu Toy Rental Platform
                            </option>
                            <option value="TicketResell - Unused Ticket Reselling Platform">
                              TicketResell - Unused Ticket Reselling Platform
                            </option>
                            <option value="PawFund - Platform to support">
                              PawFund - Platform to support
                            </option>
                            <option value="EventFlowerExchange - Platform for Reselling Event Flowers">
                              EventFlowerExchange - Platform for Reselling Event
                              Flowers
                            </option>
                            <option value="Taxi-sharing Platform">
                              Taxi-sharing Platform
                            </option>
                            <option value="Taxi Xanh SM Booking System">
                              Taxi Xanh SM Booking System
                            </option>
                            <option value="STEM KIT Sales System">
                              STEM KIT Sales System
                            </option> */}
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

                        <div className="relative"></div>
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
                        <div className="size-7 rounded-full ring-2 ring-gray-200 flex items-center justify-center bg-white">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-gray-500 size-4"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div
                      className="cursor-pointer flex justify-center items-center size-9 rounded-full bg-[#ffffff] hover:bg-[#e2e2e2] shadow"
                      onClick={() => setOpenSetting(true)}
                    >
                      <FontAwesomeIcon icon={faGear} className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <h1 className="text-[15px] font-semibold text-[#3c3c3c]">
                    Remaining points:{" "}
                    <span className="text-[#0c9eff]">{group.walletPoint}</span>
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
              </div>
              <div className="bg-white rounded-lg p-5 px-16 shadow">
                <div className="flex flex-col">
                  <div className="-m-1.5 overflow-x-auto">
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
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                  {member.fullName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {member.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {member.phone}
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
              <div className="p-4 overflow-y-auto flex flex-col justify-center items-center">
                <h1 className="mb-2 font-medium text-[#474747]">
                  - Add member -
                </h1>
                <form className="w-full mb-5" onSubmit={addMember}>
                  <div className="flex gap-3">
                    <div className="relative w-[80%]">
                      <input
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
                      </label>
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
    </>
  );
};

export default StudentGroup;
