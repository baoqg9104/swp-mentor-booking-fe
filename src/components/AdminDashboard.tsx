import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { toast } from "react-toastify";
//const tStyleHeader = 'px-6 py-3 text-start font-medium text-gray-500 uppercase';
//const tStyleBody = 'px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800';
//const buttonStyle ='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import "preline/preline";
import { AuthContext } from "./AuthContext";


interface Mentors {
  mentorId: string,
  mentorName: string,
  password: string,
  email: string,
  phone: string,
  gender: string,
  dateOfBirth: string,
  pointsReceived: string,
  numOfSlot:string,
  registrationDate: string,
  meetUrl: string,
  applyStatus: true,
  mentorSkills: null,
  mentorSlots: null
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


const AdminDashboard = () => {
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
    getMentors();
    getStudents();
    getGroup();

  }, [location.pathname]);
  

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { authData,setAuthData} = authContext;

  const [mentors, setMentors] = useState<Mentors[]>([]);

  const [students, setStudents] = useState<Student[]>([]);
  
  const [group, setGroup] = useState<Group[]>([]);

  const getStudents = async () => {
    try {
      const response = await axios.get(
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
  }
  

  const getMentors = async () => {
    try {
      const response = await axios.get(
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
  }

  const getGroup = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7007/api/Group/all`,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );

      setGroup(response.data);
      // console.log('auth :' + authData?.token)
    } catch (error) {
      console.log("Can not get group list", error);
      toast.error("Can not get group list");
    }
  }

  const pendingMentors = mentors.filter(fMentor=>{
    return fMentor.applyStatus != true;
  });
  
const setStatus = async (mentorId: string) => {
  try {
    // console.log(authData?.token);
    await axios.put(
      `https://localhost:7007/api/Mentor/change-apply-status/${mentorId}`, 4 ,
      {
        headers: {
          Authorization: `Bearer ${authData?.token}`
        },
      }
    ).then(response => {
      console.log(response.data);
      getMentors();
    })
  } catch (error) {
    console.log(error);
    toast.error("An Error has occured");
  }
}
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
                  {pendingMentors.length}
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
                    <button  onClick={()=>getMentors()} data-hs-overlay="#Appointments">
                      appointments pending
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
                  <span className="font-semibold text-[#70b319]">groups</span>
                </p>
              </div>

              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                  {group.length}
                </h3>
              </div>
            </div>
          </div>
          {/*Group box*/}
``
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

      <div id="Appointments" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabIndex={-1} aria-labelledby="hs-full-screen-label">
                  <div className="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full max-h-full h-full">
                    <div className="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full dark:bg-neutral-800">
                      
                      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 id="hs-full-screen-label" className="font-bold text-gray-800 dark:text-white">
                          Approval Pending
                        </h3>
                     
                        <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#Appointments">
                          <span className="sr-only">Close</span>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 overflow-y-auto">
                        <div className="mt-1 text-gray-800 dark:text-neutral-400">
                          {pendingMentors.map((mentor)=> ( 
                            <div key={mentor.mentorId} className="grid grid-cols-5 py-2 border-4 rounded-lg ">
                            <div className="col-span-1 ">
                              <div className="flex justify-center items-center gap-x-2 py-3 px-4">
                                <FontAwesomeIcon icon={faUser} size= '8x' />
                              </div>
                            </div>
                            <div className="col-span-3 border-l px-4">
                              {mentor.mentorId}
                              {mentor.mentorName}{/*add preview email, name and gender to the items preview */}<br></br>
                              {mentor.email}<br></br>
                              {mentor.gender}<br></br>
                              {mentor.phone}<br></br>
                              <div>Application Status : {mentor.applyStatus ? 'Approved' : 'Pending'}</div>

                            </div>
                          
                            {/* Buttons  */}``
                            <div className="col-span-1">
                              <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                                {/*Change Status*/}
                                <button type="button" onClick={()=>setStatus(mentor.mentorId)} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#DeleteModal">
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
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#Appointments">
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
