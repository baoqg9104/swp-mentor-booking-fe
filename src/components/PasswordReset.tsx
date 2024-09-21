import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SetNewPassword from "./SetNewPassword";

import "preline/preline";
import { IStaticMethods } from "preline/preline";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const PasswordReset = () => {
  const [state, setState] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const handlePasswordReset = () => {
    setState("set-new-password");
  };

  return (
    <>
      {state === "" && (
        <div className="container flex justify-center items-center h-svh text-[#5B5B5B] ">
          <div className="h-[500px] w-[450px] rounded-[10px] border-black border-[1px] shadow-lg ">
            <div className="mt-[50px] flex justify-center items-end h-[80px] font-semibold text-[38px] text-[#222222]">
              Password reset?
            </div>

            <div className="text-center h-[50px] mt-2 text-[20px]">
              <span className="">We send a code to </span>
              <span className="text-[#00BEB3] font-semibold">
                abc@gmail.com
              </span>
            </div>

            <div className="flex gap-x-2 justify-center" data-hs-pin-input="">
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
                autoFocus={true}
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
              />
            </div>

            <div className="px-[70px]">
              <button
                type="submit"
                className="mt-5 w-full h-[55px] bg-[#F56965] pl-5 rounded-[10px] text-[21px] text-[white] font-semibold"
                onClick={() => handlePasswordReset()}
              >
                Continue
              </button>

              <div className="text-[18px] text-center mt-6">
                <span>Didn't receive the email? </span>
                <span className="font-semibold text-[#00BEB3]">Re-send</span>
              </div>

              <div className="text-center mt-8 text-[18px]">
                <Link to={"/login"}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ color: "#6e6e6e" }}
                  />

                  <span className="ml-3">Back to log in </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {state === "set-new-password" && (
        <SetNewPassword />
      )}
    </>
  );
};

export default PasswordReset;
