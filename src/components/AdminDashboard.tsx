import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
//const tStyleHeader = 'px-6 py-3 text-start font-medium text-gray-500 uppercase';
//const tStyleBody = 'px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800';
//const buttonStyle ='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface Mentors {
  mentorId: string;
  mentorName: string;
  password: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  pointsReceived: string;
  numOfSlot: string;
  registrationDate: string;
  meetUrl: string;
  applyStatus: true;
  mentorSkills: null;
  mentorSlots: null;
  swpClassId: null;
  swpClass: null;
}

interface Student {
  StudentId: string;
  Studentname: string;
  Password: string;
  Email: number;
  Phone: number;
  Gender: number;
  progress: number;
  createdDate: string;
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

interface MentorSkill {
  mentorSkillId: number;
  mentorId: string;
  skillId: number;
  skillName: string;
  level: number;
}

interface Requests {
  requestId: number;
  studentId: string;
  currentClassName: string;
  classNameToMove: string;
  reason: string;
  requestDate: string;
  approvalDate: string;
  status: string;
}

interface Class {
  swpClassId: number;
  name: string;
  semesterId: number;
  status: boolean;
}

const AdminDashboard = () => {
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
    getMentors();
    getStudents();
    //getGroup();
    getRequests();
    getClasses();
  }, [location.pathname]);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { authData, setAuthData } = authContext;

  const [mentors, setMentors] = useState<Mentors[]>([]);

  const [students, setStudents] = useState<Student[]>([]);
  const [request, setRequest] = useState<Requests[]>([]);

  const [group, setGroup] = useState<Group[]>([]);
  const [open, setOpen] = useState(false);

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
      // console.log('auth :' + authData?.token)
    } catch (error) {
      console.log("Can not get student list", error);
      toast.error("Can not get student list");
    }
  };

  const getMentors = async () => {
    try {
      const response = await axiosInstance.get(
        `https://localhost:7007/api/Mentor/all`,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );

      setMentors(response.data);
      pendingMentors;
      // console.log('auth :' + authData?.token)
    } catch (error) {
      console.log("Can not get mentor list", error);
      toast.error("Can not get mentor list");
    }
  };

  /*const getGroup = async () => {
    try {
      const response = await axiosIn.get(
        `https://localhost:7007/api/Group/all`
      );

      setGroup(response.data);
      // console.log('auth :' + authData?.token)
    } catch (error) {
      console.log("Can not get group list", error);
      toast.error("Can not get group list");
    }
  }*/

  const pendingMentors = mentors.filter((fMentor) => {
    return fMentor.applyStatus != true;
  });

  const setStatus = async (mentorId: string) => {
    try {
      // console.log(authData?.token);
      await axiosInstance
        .put(
          `https://localhost:7007/api/Mentor/change-apply-status`,
          {
            mentorId: mentorId,
            swpClassId: selectedClass,
          },
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          getMentors();
        });
    } catch (error) {
      console.log(error);
      toast.error("An Error has occured");
    }
  };

  const [mentorSkills, setMentorSkills] = useState<MentorSkill[]>([]);

  const getMentorSkills = async (mentorId: string) => {
    try {
      const response = await axiosInstance.get(
        `https://localhost:7007/api/Skills/mentorskill/${mentorId}`,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );
      setMentorSkills(response.data);
    } catch (error) {
      console.log("Can not get mentor skills", error);
      toast.error("Can not get mentor skills");
    }
  };

  const getRequests = async () => {
    try {
      const response = await axiosInstance.get(
        `https://localhost:7007/api/RequestToMoveClass/get-all`
      );

      setRequest(response.data);
      filterReq;
      console.log(request);
      // console.log('auth :' + authData?.token)
    } catch (error) {
      console.log("Can not get group list", error);
      toast.error("Can not get group list");
    }
  };

  const setRequests = async (requestID: Requests) => {
    try {
      // console.log(authData?.token);
      const data = {
        requestId: requestID.requestId,
        status: "Approved",
      };
      await axiosInstance
        .put(`https://localhost:7007/api/RequestToMoveClass/update`, data, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          getRequests();
          toast.success("Approve Successful");
        });
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };
  const filterReq = request.filter((fReq) => {
    return fReq.status != "Approved";
  });

  const [classes, setClasses] = useState<Class[]>([]);

  const getClasses = async () => {
    try {
      const response = await axiosInstance.get(
        `https://localhost:7007/api/SwpClass/all`
      );

      setClasses(response.data);
      // console.log('auth :' + authData?.token)
    } catch (error) {
      console.log("Can not get class list", error);
      toast.error("Can not get class list");
    }
  };

  const [selectedClass, setSelectedClass] = useState<number | undefined>(
    undefined
  );

  return (
    <>
      {/*Mentor approval box*/}
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
                  {mentors.filter((x) => x.applyStatus == true).length}
                </h3>

                <a
                  className="mt-1 lg:mt-0 min-h-[24px] inline-flex items-center gap-x-1 py-0.5 px-2  rounded-md bg-[#FEE3C3] hover:bg-orange-200 focus:outline-none"
                  href="#"
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-orange-700 text-[13px]"
                  />

                  <span className="inline-block font-semibold text-orange-700 text-[13px]">
                    <button
                      onClick={() => getMentors()}
                      data-hs-overlay="#Appointments"
                    >
                      {pendingMentors.length} approval pending
                    </button>
                  </span>
                </a>
              </div>
            </div>
          </div>
          {/*Mentor approval box*/}

          {/*Student box*/}
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
                  {students.length}
                </h3>
              </div>
            </div>
          </div>
          {/*Student box*/}

          {/*Group box*/}
          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-x-2">
                <p className="text-[14px] uppercase tracking-wide text-gray-500">
                  Total{" "}
                  <span className="font-semibold text-[#70b319]">requests</span>
                </p>
              </div>

              <div className="mt-1 lg:flex lg:justify-between lg:items-center">
                <div className="mt-1 lg:mt-0 min-h-[24px] inline-flex items-center gap-x-1 py-0.5 px-2  rounded-md bg-[#FEE3C3] hover:bg-orange-200 focus:outline-none">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-orange-700 text-[13px]"
                  />
                  <span className="inline-block text-[14px] font-semibold text-orange-700">
                    <button data-hs-overlay="#Requests">
                      {filterReq.length} approval pending
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="Appointments"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-full-screen-label"
      >
        <div className="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full max-h-full h-full">
          <div className="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 id="hs-full-screen-label" className="font-bold text-gray-800">
                Approval Pending
              </h3>

              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Close"
                data-hs-overlay="#Appointments"
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
            <div className="p-4 overflow-y-auto">
              <div className="mt-1 text-gray-800">
                {pendingMentors.map((mentor) => (
                  <div
                    key={mentor.mentorId}
                    className="grid grid-cols-5 py-2 border-4 rounded-lg "
                  >
                    <div className="col-span-1 ">
                      <div className="flex justify-center items-center gap-x-2 py-3 px-4">
                        <FontAwesomeIcon icon={faUser} size="8x" />
                      </div>
                    </div>
                    <div className="col-span-2 border-l px-4">
                      ID: {mentor.mentorId}
                      <br></br>
                      Name: {mentor.mentorName}
                      {/*add preview email, name and gender to the items preview */}
                      <br></br>
                      Email: {mentor.email}
                      <br></br>
                      Gender: {mentor.gender}
                      <br></br>
                      Phone: {mentor.phone}
                      <br></br>
                      <div>
                        Application Status :{" "}
                        {mentor.applyStatus ? "Approved" : "Pending"}
                      </div>
                    </div>

                    {/* Buttons  */}
                    <div className="col-span-2">
                      <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                        <button
                          type="button"
                          onClick={() => {
                            getMentorSkills(mentor.mentorId);
                            setOpen(true);
                          }}
                          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="hs-basic-modal"
                          data-hs-overlay="#DeleteModal"
                        >
                          View Skills
                        </button>
                        <select
                          value={selectedClass}
                          onChange={(e) =>
                            setSelectedClass(Number(e.target.value))
                          }
                        >
                          <option value={undefined}></option>
                          {classes
                            .filter(
                              (x) =>
                                x.status == true &&
                                !mentors.some(
                                  (mentor) => mentor.swpClassId === x.swpClassId
                                )
                            )
                            .map((classItem) => (
                              <option value={classItem.swpClassId}>
                                {classItem.name}
                              </option>
                            ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setStatus(mentor.mentorId)}
                          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="hs-basic-modal"
                          data-hs-overlay="#DeleteModal"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    {/*  Buttons End */}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 mt-auto border-t dark:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-overlay="#Appointments"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-[100]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-[100] w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 lg:w-[600px] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="p-0">
                  <div className="text-center sm:ml-2 sm:mt-0 sm:text-left">
                    <div className="mt-2">
                      {mentorSkills.filter((skill) => skill.level === 5)
                        .length > 0 && (
                        <div className="mt-6">
                          <h3 className="font-semibold">Expert</h3>
                          <div className="mt-3 ml-1">
                            {mentorSkills
                              .filter((skill) => skill.level === 5)
                              .map((skill) => (
                                <span
                                  key={skill.mentorSkillId}
                                  className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow"
                                >
                                  {skill.skillName}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                      {mentorSkills.filter((skill) => skill.level === 4)
                        .length > 0 && (
                        <div className="mt-6">
                          <h3 className="font-semibold">Advanced</h3>
                          <div className="mt-3 ml-1">
                            {mentorSkills
                              .filter((skill) => skill.level === 4)
                              .map((skill) => (
                                <span
                                  key={skill.mentorSkillId}
                                  className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow"
                                >
                                  {skill.skillName}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                      {mentorSkills.filter((skill) => skill.level === 3)
                        .length > 0 && (
                        <div className="mt-6">
                          <h3 className="font-semibold">Proficient</h3>
                          <div className="mt-3 ml-1">
                            {mentorSkills
                              .filter((skill) => skill.level === 3)
                              .map((skill) => (
                                <span
                                  key={skill.mentorSkillId}
                                  className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow"
                                >
                                  {skill.skillName}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {mentorSkills.filter((skill) => skill.level === 2)
                        .length > 0 && (
                        <div className="mt-6">
                          <h3 className="font-semibold">Intermediate</h3>
                          <div className="mt-3 ml-1">
                            {mentorSkills
                              .filter((skill) => skill.level === 2)
                              .map((skill) => (
                                <span
                                  key={skill.mentorSkillId}
                                  className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow"
                                >
                                  {skill.skillName}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {mentorSkills.filter((skill) => skill.level === 1)
                        .length > 0 && (
                        <div className="mt-6">
                          <h3 className="font-semibold">Beginner</h3>
                          <div className="mt-3 ml-1">
                            {mentorSkills
                              .filter((skill) => skill.level === 1)
                              .map((skill) => (
                                <span
                                  key={skill.mentorSkillId}
                                  className="py-[4px] px-[12px] rounded-[20px] bg-[#F7F7F7] shadow"
                                >
                                  {skill.skillName}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <div
        id="Appointments"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-full-screen-label"
      >
        <div className="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full max-h-full h-full">
          <div className="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full dark:bg-neutral-800">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3
                id="hs-full-screen-label"
                className="font-bold text-gray-800 dark:text-white"
              >
                Approval Pending
              </h3>

              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#Appointments"
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
            <div className="p-4 overflow-y-auto">
              <div className="mt-1 text-gray-800 dark:text-neutral-400">
                {pendingMentors.map((mentor) => (
                  <div
                    key={mentor.mentorId}
                    className="grid grid-cols-5 py-2 border-4 rounded-lg "
                  >
                    <div className="col-span-1 ">
                      <div className="flex justify-center items-center gap-x-2 py-3 px-4">
                        <FontAwesomeIcon icon={faUser} size="8x" />
                      </div>
                    </div>
                    <div className="col-span-3 border-l px-4">
                      {mentor.mentorId}
                      <br></br>
                      {mentor.mentorName}
                      {/*add preview email, name and gender to the items preview */}
                      <br></br>
                      {mentor.email}
                      <br></br>
                      {mentor.gender}
                      <br></br>
                      {mentor.phone}
                      <br></br>
                      <div>
                        Application Status :{" "}
                        {mentor.applyStatus ? "Approved" : "Pending"}
                      </div>
                    </div>

                    {/* Buttons  */}
                    <div className="col-span-1">
                      <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                        {/*Change Status*/}
                        <button
                          type="button"
                          onClick={() => setStatus(mentor.mentorId)}
                          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="hs-basic-modal"
                          data-hs-overlay="#DeleteModal"
                        >
                          Approve
                        </button>
                        {/*Change Status*/}
                      </div>
                    </div>
                    {/*  Buttons End */}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 mt-auto border-t dark:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-overlay="#Appointments"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="Requests"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-full-screen-label"
      >
        <div className="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full max-h-full h-full">
          <div className="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full dark:bg-neutral-800">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3
                id="hs-full-screen-label"
                className="font-bold text-gray-800 dark:text-white"
              >
                Requests Pending
              </h3>

              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#Requests"
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
            <div className="p-4 overflow-y-auto">
              <div className="mt-1 text-gray-800 dark:text-neutral-400">
                {filterReq.map((requests) => (
                  <div
                    key={requests.studentId}
                    className="grid grid-cols-5 py-2 border-4 rounded-lg "
                  >
                    <div className="col-span-2 ">
                      <div className="grid grid-rows-2 py-2 text-lg">
                        <div className="flex justify-center items-center gap-x-2 py-2 px-4  ">
                          {requests.studentId}
                        </div>
                        <div className="inline-flex justify-center items-center gap-x-2 ">
                          {requests.currentClassName}
                          <FontAwesomeIcon icon={faArrowRight} />
                          {requests.classNameToMove}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 border-l px-4 text-lg">
                      <div className="font-bold">
                        Reason: <br></br>
                      </div>

                      {requests.reason}
                      <br></br>
                    </div>

                    {/* Buttons  */}
                    <div className="col-span-1">
                      <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                        {/*Change Status*/}
                        <button
                          type="button"
                          onClick={() => {
                            setRequests(requests);
                          }}
                          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="hs-basic-modal"
                          data-hs-overlay="#DeleteModal"
                        >
                          Approve
                        </button>
                        {/*Change Status*/}
                      </div>
                    </div>
                    {/*  Buttons End */}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 mt-auto border-t dark:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-overlay="#Requests"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
