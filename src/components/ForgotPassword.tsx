import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PasswordReset from "./PasswordReset";

const ForgotPassword = () => {
  const [state, setState] = useState<string>("");

  const handleForgotPassword = () => {
    setState("password-reset");
  };

  return (
    <>
      {state === "" && (
        <div className="container flex justify-center items-center h-svh text-[#5B5B5B] ">
          <div className="h-[500px] w-[450px] rounded-[10px] border-black border-[1px] shadow-lg ">
            <div className="mt-[50px] flex justify-center items-center h-1/4 font-semibold text-[38px] text-[#222222]">
              Forgot password?
            </div>

            <div className="h-2/4 px-[70px]">
              <input
                type="email"
                className="w-full h-[55px] bg-[#f7f7f7] pl-5 rounded-[10px] text-[18px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
                placeholder="Email"
                required
              />

              <button
                type="submit"
                className="mt-5 w-full h-[55px] bg-[#F56965] pl-5 rounded-[10px] text-[21px] text-[white] font-semibold"
                onClick={() => handleForgotPassword()}
              >
                Send
              </button>

              <div className="text-center mt-10 text-[18px]">
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

      {state === "password-reset" && (
        <PasswordReset />
      )}
    </>
  );
};

export default ForgotPassword;
