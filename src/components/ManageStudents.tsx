import { toast } from "react-toastify";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const buttonStyle ='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
import { useLocation } from 'react-router-dom';
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "./AuthContext";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
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

export default function ManageStudents(){
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);
  

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { authData,setAuthData} = authContext;

  const [data, setData] = useState<Student[]>([]);

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

      setData(response.data);
      console.log(data);
    } catch (error) {
      console.log("Can not get mentor list", error);
      toast.error("Can not get mentor list");
    }
  }


  useEffect(() => {
    window.HSStaticMethods.autoInit();
    getStudents();
  }, [location.pathname]);
  return (
    <>
            <div className="px-2 grid grid-cols-1 gap-4 py-2">
                                 
                    {data.map((students) => (
                      <div key={students.Email} className="grid grid-cols-5 py-2 border-4 rounded-lg ">
                        <div className="col-span-1 ">
                          <div className="flex justify-center items-center gap-x-2 py-3 px-4">
                            <FontAwesomeIcon icon={faUser} size= '8x' />
                          </div>
                        </div>
                        <div className="col-span-3 border-l px-4">
                          {students.Email}
                        </div>
                        <div className="col-span-1">
                          <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                            <button className={buttonStyle}>Edit</button>
                            <button type='button' className={buttonStyle}  aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal" >Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}                   
                  
                </div>
            
    </>
    
    );
}