import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SetNewPassword from "./SetNewPassword";

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import axios from "axios";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

interface PasswordResetProps {
  email: string;
}

const PasswordReset = ({ email }: PasswordResetProps) => {
  const [state, setState] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    // Ensure only single digit is entered
    const sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 1);

    // Create new array to update state immutably
    const newOtp = [...otp];
    newOtp[index] = sanitizedValue;
    setOtp(newOtp);

    // Automatically move focus to next input if a digit is entered
    if (sanitizedValue && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Allow backspace to move focus to previous input when empty
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const handlePasswordReset = async () => {
    try {
      const otpCode = otp.join("");
      if (otpCode.length !== 6) {
        // toast.error("Please enter a valid OTP");
        return;
      }

      const response = await axios.post(
        "https://localhost:7007/api/User/validate-otp",
        {
          email: email,
          otp: otpCode,
        }
      );

      toast.success("OTP has been validated successfully");
      setState("set-new-password");
    } catch (error) {
      console.log(error);
      toast.error("Failed to validate OTP");
      setState("");
    }
  };

  const handleResendOtp = async () => {
    try {
      setState("loading");
      const response = await axios.post(
        "https://localhost:7007/api/User/generate-otp",
        {
          recipientEmail: email,
        }
      );

      toast.success("Email has been sent successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send email");
    }
    setState("");
  };

  return (
    <>
      {state === "" && (
        <div className="container flex justify-center items-center h-svh text-[#5B5B5B] ">
          <div className="h-[500px] w-[450px] rounded-[10px] border-black border-[1px] shadow-lg ">
            <div className="mt-[50px] flex justify-center items-end h-[80px] font-semibold text-[38px] text-[#222222]">
              Password reset?
            </div>

            <div className="text-center mt-2 mb-3 text-[20px]">
              <span className="">We send a code to </span>
              <span className="text-[#00BEB3] font-semibold">{email}</span>
            </div>

            <div className="flex gap-x-2 justify-center" data-hs-pin-input="">
              {/* <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
                autoFocus={true}
                value={otp[0]}
                onChange={(e) => setOtp([e.target.value, ...otp.slice(1)])}
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
                value={otp[1]}
                onChange={(e) => setOtp([otp[0], e.target.value, ...otp.slice(2)])}
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
                value={otp[2]}
                onChange={(e) => setOtp([...otp.slice(0, 2), e.target.value, ...otp.slice(3)])}
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
                value={otp[3]}
                onChange={(e) => setOtp([...otp.slice(0, 3), e.target.value, ...otp.slice(4)])}
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
                value={otp[4]}
                onChange={(e) => setOtp([...otp.slice(0, 4), e.target.value, ...otp.slice(5)])}
              />
              <input
                type="text"
                className="text-[23px] block size-[50px] text-center border-black border rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-pin-input-item=""
                value={otp[5]}
                onChange={(e) => setOtp([...otp.slice(0, 5), e.target.value])}
              />  */}
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className="size-[50px] text-center text-[23px] border rounded-md"
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOtpChange(index, e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(index, e)
                  }
                  autoFocus={index === 0}
                />
              ))}
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
                <span
                  className="font-semibold text-[#00BEB3] hover:underline cursor-pointer"
                  onClick={handleResendOtp}
                >
                  Re-send
                </span>
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

      {state === "set-new-password" && <SetNewPassword email={email} />}

      {state === "loading" && (
        <div className="w-full h-[90vh] flex items-center justify-center">
          <PuffLoader color="#ff9000" size={100} />
        </div>
      )}
    </>
  );
};

export default PasswordReset;
