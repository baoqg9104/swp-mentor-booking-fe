import axios from 'axios';
import { toast } from "react-toastify";
import { Dialog, Transition ,DialogPanel,TransitionChild,DialogTitle} from '@headlessui/react'
import {
  faDoorClosed,
  faPlus,
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
//import { IStaticMethods } from "preline/preline";


interface Class {
  swpClassId: string,
  name: string,
  semesterId: string,
  status: boolean
}


export default function ManageClass(){
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
    getClass();
  }, [location.pathname]);
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  //const { authData,setAuthData} = authContext;
  const [data, setData] = useState<Class[]>([]);

  const getClass = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7007/api/SwpClass/all`,
        {
          /*headers: {
            Authorization: `Bearer ${authData?.token}`,
          },*/
        }
      );

      setData(response.data);
      console.log(data);
    } catch (error) {
      console.log("Can not get class list", error);
      toast.error("Can not get class list");
    }
  }
  return(
    <>      
      <div className="px-2 grid grid-cols-1 gap-4 py-2">     
                    <div>
                    <FontAwesomeIcon icon={faPlus} size= '2x' />  
                    </div>                        
                    {data.map((classes) => (
                      <div key={classes.swpClassId} className="grid grid-cols-5 py-2 border-4 rounded-lg ">
                        <div className="col-span-1 ">
                          <div className="flex justify-center items-center gap-x-2 py-3 px-4">
                            <FontAwesomeIcon icon={faDoorClosed} size= '8x' />
                          </div>
                        </div>
                        <div className="col-span-3 border-l px-4">
                          ID: {classes.swpClassId}<br></br>
                          Name: {classes.name}<br></br>
                          SemesterID: {classes.semesterId}<br></br>
                          Status: {classes.status}<br></br>
                        </div>
                         {/* Buttons  */}
                        <div className="col-span-1">
                          <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                            <a href='#'>

                              {/* Edit button code */}
                              <button onClick={()=> {
                                  //openEditModal(students);
                                  
                                }} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                View
                              </button>
                              {/* Edit button code */}

                                {/*Delete button code */}
                                <button onClick={()=> {
                                  //openDelModal(students.studentId);
                                }} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                  Delete
                                </button>
                                {/*Delete button code */}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}                   
                </div>
                
               {/*  Modals Code */}
    </>  
  );
}


