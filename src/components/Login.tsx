import { Link, useLocation } from "react-router-dom";

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        email,
        password,
      };

      if (authContext) {
        const { login } = authContext;
        const roleId = await login(data);
        
        if (roleId === "1") {
          navigate("/student");
        } else {
          navigate("/mentor");
        }

      }

      toast.success("Login successful!");
      
    } catch (error) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <>
      <div className="container flex justify-center items-center h-svh text-[#5B5B5B] ">
        <div className="h-[500px] w-[450px] rounded-[10px] border-black border-[1px] shadow-lg ">
          <div className="flex justify-center items-center h-1/4 font-semibold text-[40px] text-[#222222]">
            Login
          </div>

          <div className="h-2/4 px-[70px]">
            <form onSubmit={handleLogin}>
              <input
                type="email"
                className="w-full h-[55px] bg-[#f7f7f7] pl-5 rounded-[10px] text-[18px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  id="hs-toggle-password"
                  type="password"
                  className="mt-4 w-full h-[55px] bg-[#f7f7f7] pl-5 rounded-[10px] text-[18px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }'
                  className="absolute inset-y-0 end-0 flex items-center z-20 mt-4 mr-1 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                >
                  <svg
                    className="shrink-0 size-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      className="hs-password-active:hidden"
                      d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                    ></path>
                    <path
                      className="hs-password-active:hidden"
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                    ></path>
                    <path
                      className="hs-password-active:hidden"
                      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                    ></path>
                    <line
                      className="hs-password-active:hidden"
                      x1="2"
                      x2="22"
                      y1="2"
                      y2="22"
                    ></line>
                    <path
                      className="hidden hs-password-active:block"
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    ></path>
                    <circle
                      className="hidden hs-password-active:block"
                      cx="12"
                      cy="12"
                      r="3"
                    ></circle>
                  </svg>
                </button>
              </div>

              <Link
                to={"/forgot-password"}
                className="text-end text-[18px] mt-2 text-[#6e6e6e] hover:underline"
              >
                <p className="mt-2">Forgot password?</p>
              </Link>

              <button
                type="submit"
                className="mt-5 w-full h-[55px] bg-[#F56965] pl-5 rounded-[10px] text-[22px] text-[white] font-semibold"
              >
                Log in
              </button>

              <div className="text-center mt-10 text-[20px]">
                <span>Not a member? </span>

                <Link
                  to={"/signup"}
                  className="font-semibold text-[#00BEB3] hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
