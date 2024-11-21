import axios from 'axios';
import { toast } from "react-toastify";
import { Dialog, Transition ,DialogPanel,TransitionChild,DialogTitle} from '@headlessui/react'
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//const tStyleHeader = 'px-6 py-3 text-start font-medium text-gray-500 uppercase';
//const tStyleBody = 'px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800';
//const buttonStyle ='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
import { useEffect, useState, useContext,Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import "preline/preline";
import { AuthContext } from "./AuthContext";
import axiosInstance from './axiosInstance';
//import { IStaticMethods } from "preline/preline";


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

interface MentorSlot {
  mentorSlotId: string;
  mentorId: string;
  startTime: string;
  endTime: string;
  bookingPoint: number;
  isOnline: boolean;
  room: string;
}


export default function ManageMentors(){
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
    getMentors();

  }, [location.pathname]);
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { authData,setAuthData} = authContext;
  const [openDel, setDel] = useState<boolean>(false);
  const [openEdit, setEdit] = useState<boolean>(false);

  const [specMentor, setSpecMentor]= useState<string>('');

  const [data, setData] = useState<Mentors[]>([]);
  const [mentorSlots, setMentorSlots] = useState<MentorSlot[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [meetUrl, setMeetUrl] = useState<string>("");

  function closeDelModal() {
    setDel(false)
  }

  function openDelModal(n :string) {
    setDel(true)
    setSpecMentor(n)
  }

  function closeEditModal() {
    setEdit(false)
  }

  function openEditModal(n :Mentors) {
    setSpecMentor(n.mentorId),
    getMentorSlots(n.mentorId),
    setEdit(true)
  }

  const getMentors = async () => {
    try {
      const response = await axiosInstance.get(
        `https://localhost:7007/api/Mentor/all`,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          }
        }
      );

      setData(response.data);
      console.log(data);
    } catch (error) {
      console.log("Can not get mentor list", error);
      toast.error("Can not get mentor list");
    }
  }

  const deleteMentor = async (id:string) => {
    try {
      const response = await axiosInstance.delete(
        `https://localhost:7007/api/Mentor/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      ).then(response => {
        console.log(response.data);
        getMentors();
      })
    }catch(err){

    }
  }

  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const data = {
        role: "Mentor",
        id: specMentor,
        name: fullName,
        email: email,
        phone: phone,
        gender: gender,
        dateOfBirth: dateOfBirth,
        meetUrl: meetUrl
      };

      if (dateOfBirth >= new Date().toISOString().split("T")[0]) {
        toast.error("Invalid date of birth!");
        return;
      }
      console.log(data);
      const response = await axiosInstance.put(
        "https://localhost:7007/api/User/update-user",
        data,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );
      
      toast.success("Update successful!");
      getMentors();
      //setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
        //console.log(data);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

    const getMentorSlots = async (id : string) => {
      try {
        const response = await axios.get(
          `https://localhost:7007/api/MentorSlot/get-by-mentor-id/${id}`,
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

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return(
    <>      
            {/*Grid starts*/}
            <div className="px-2 grid grid-cols-1 gap-4 py-2">
                    {/* Main Content */}
                    {data.map((mentor)=> (   
                      <div key={mentor.mentorId} className="grid grid-cols-5 py-2 border-4 rounded-lg ">
                        <div className="col-span-1 ">
                          <div className="flex justify-center items-center gap-x-2 py-3 px-4">
                            <FontAwesomeIcon icon={faUser} size= '8x' />
                          </div>
                        </div>
                        <div className="col-span-3 border-l px-4">
                          ID: {mentor.mentorId} <br></br>
                          Name: {mentor.mentorName}{/*add preview email, name and gender to the items preview */}<br></br>
                          Email: {mentor.email}<br></br>
                          Gender: {mentor.gender}<br></br>
                          Phone: {mentor.phone}<br></br>
                          Meet URL:{mentor.meetUrl}
                          <div>Application Status : {mentor.applyStatus ? 'Approved' : 'Pending'}</div>   
                        </div>

                        {/* Buttons  */}
                        <div className="col-span-1">
                          <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                            <a href='#'>

                              {/* Edit button code */}
                              <button onClick={()=> {
                                  openEditModal(mentor);
                                  
                                }} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                View
                              </button>
                              {/* Edit button code */}

                                {/*Delete button code */}
                                <button onClick={()=> {
                                  openDelModal(mentor.mentorId);
                                }} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                  Delete
                                </button>
                                {/*Delete button code */}
                            </a>
                          </div>
                        </div>
                      </div> 
                    ))}                   
                    {/*  Main Content Ends */}
                </div>

          {/*Del Modal*/}
          <Transition appear show={openDel} as={Fragment}>
          <Dialog as="div" className="relative z-[100]" onClose={closeDelModal}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Confirm Deleting {specMentor}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete selected mentor
                      </p>
                    </div>

                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                      <button
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={()=> 
                          {
                            deleteMentor(specMentor)
                            closeDelModal()             
                          }}
                      >
                        Confirm Delete
                      </button>
                    </div>
    
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
          </Transition>
          {/*Delete Modal*/}

          {/*Edit Modal*/}
          <Transition appear show={openEdit} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={closeEditModal}>
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </TransitionChild>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Schdedule for {specMentor}
                      </DialogTitle>
                        <div className="p-4 overflow-y-auto flex flex-col justify-center items-center">                     
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
                                      {mentorSlots
                                      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                                      .map((slot) => (
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
                        
                            
                              
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                          <button
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                            onClick={()=> 
                              {
                                closeEditModal()             
                              }}
                          >
                            Close
                          </button>
                          </div>
                        </div>

                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
          {/*Edit Modal*/}
               
    </>  
  );
}


