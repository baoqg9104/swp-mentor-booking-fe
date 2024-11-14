import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { toast } from "react-toastify";
import axios from "axios";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

interface SignupDto {
  fullName: string;
  email: string;
  password: string;
  role: string;
  swpClassId?: number;
}

interface SwpClass {
  swpClassId: number;
  name: string;
  semesterId: number;
  status: string;
}

const Signup = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [swpClass, setSwpClass] = useState<SwpClass[]>([]);
  const [swpClassId, setSwpClassId] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match!");
        return;
      }

      const data: SignupDto = {
        fullName,
        email,
        password,
        role,
        swpClassId,
      };

      console.log(data);

      const response = await axios.post(
        "https://localhost:7007/api/auth/register",
        data
      );

      toast.success("Sign up successfully!");
    } catch (error) {
      toast.error("Email already exists!");
    }
  };

  useEffect(() => {
    const getClass = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7007/api/SwpClass/all"
        );

        setSwpClass(response.data);
      } catch (error) {
        console.log("Can not get class", error);
      }
    }

    getClass();
  }, []);

  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
      <div className="container flex justify-center items-center h-svh text-[#5B5B5B] ">
        <div className="h-[550px] w-[450px] rounded-[10px] border-black border shadow-lg">
          <div className="flex justify-center items-center h-1/6 font-semibold text-[40px] text-[#222222]">
            Sign up
          </div>
          <form onSubmit={handleSubmit}>
            <div className="h-2/4 px-[70px]">
              <input
                type="text"
                className="w-full h-[50px] bg-[#f7f7f7] pl-5 rounded-[10px] text-[16px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
                placeholder="Full name"
                required
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                type="email"
                className="mt-4 w-full h-[50px] bg-[#f7f7f7] pl-5 rounded-[10px] text-[16px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                <input
                  id="hs-toggle-password"
                  type="password"
                  className="mt-4 w-full h-[50px] bg-[#f7f7f7] pl-5 rounded-[10px] text-[16px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  tabIndex={-1}
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

              <div className="relative">
                <input
                  id="hs-toggle-password-confirm"
                  type="password"
                  className="mt-4 w-full h-[50px] bg-[#f7f7f7] pl-5 rounded-[10px] text-[16px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
                  placeholder="Confirm password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  tabIndex={-1}
                  type="button"
                  data-hs-toggle-password='{
        "target": "#hs-toggle-password-confirm"
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

              <div className="flex justify-between gap-x-3">
                <select
                  className="mt-4 w-[50%] h-[50px] bg-[#f7f7f7] pl-3 rounded-[10px] text-[16px] text-[#5B5B5B]"
                  defaultValue=""
                  required
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="mentor">Mentor</option>
                  <option value="student">Student</option>
                </select>

                <select
                className="mt-4 w-[50%] h-[50px] bg-[#f7f7f7] pl-2 rounded-[10px] text-[16px] text-[#5B5B5B] disabled:text-[#888888]"
                defaultValue=""
                required
                disabled={role === "mentor"}
                value={role === "mentor" ? "" : undefined}
                onChange={(e) => setSwpClassId(Number(e.target.value))}
              >
                <option value="" disabled>
                  Select class
                </option>
                {swpClass.map((item) => (
                  <option key={item.swpClassId} value={item.swpClassId}>
                    {item.name}
                  </option>
                ))}
              </select>
              </div>
              <button
                type="submit"
                className="mt-5 w-full h-[50px] bg-[#F56965] pl-5 rounded-[10px] text-[20px] text-[white] font-semibold"
              >
                Sign up
              </button>

              <div className="text-center mt-5 text-[19px]">
                <span>Already a account? </span>

                <Link
                  to={"/login"}
                  className="font-semibold text-[#00BEB3] hover:underline"
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
