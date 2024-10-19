
import {TestMentors} from '../shared/listOfOrchids' ;
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const tStyleHeader = 'px-6 py-3 text-start font-medium text-gray-500 uppercase';
const tStyleBody = 'px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800';
const buttonStyle ='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function ManageStudents(){
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);
  return (
    <>
            <div className="px-2 grid grid-cols-1 gap-4 py-2">
                                 
                    {TestMentors.map((mentors) => (
                      <div className="grid grid-cols-5 py-2 border-4 rounded-lg ">
                        <div className="col-span-1 ">
                          <div className="flex justify-center items-center gap-x-2 py-3 px-4">
                            <FontAwesomeIcon icon={faUser} size= '8x' />
                          </div>
                        </div>
                        <div className="col-span-3 border-l px-4">
                          {mentors.name}
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