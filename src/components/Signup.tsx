import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState<string>("");

  return (
    <>
      <div className="container flex justify-center items-center h-svh text-[#5B5B5B] ">
        <div className="h-[550px] w-[450px] rounded-[10px] border-black border ">
          <div className="flex justify-center items-center h-1/6 font-semibold text-[40px] text-black">
            Sign up
          </div>

          <div className="h-2/4 px-[70px]">
            <input
              type="text"
              className="w-full h-[50px] bg-[#EDEDED] pl-5 rounded-[10px] text-[16px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
              placeholder="Full name"
              required
            />

            <input
              type="email"
              className="mt-4 w-full h-[50px] bg-[#EDEDED] pl-5 rounded-[10px] text-[16px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
              placeholder="Email"
              required
            />

            <input
              type="password"
              className="mt-4 w-full h-[50px] bg-[#EDEDED] pl-5 rounded-[10px] text-[16px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
              placeholder="Password"
              required
            />

            <input
              type="password"
              className="mt-4 w-full h-[50px] bg-[#EDEDED] pl-5 rounded-[10px] text-[16px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
              placeholder="Confirm password"
              required
            />

            <div className="flex justify-between">
              <select
                className="mt-4 w-[46%] h-[50px] bg-[#EDEDED] pl-3 rounded-[10px] text-[16px] text-[#5B5B5B]"
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
                className="mt-4 w-[46%] h-[50px] bg-[#EDEDED] pl-2 rounded-[10px] text-[16px] text-[#5B5B5B] disabled:text-[#888888]"
                defaultValue=""
                required
                disabled={role === "mentor"}
                value={role === "mentor" ? "" : undefined}
              >
                <option value="" disabled>
                  Select class
                </option>
                <option value="class-1">Class 1</option>
                <option value="class-2">Class 2</option>
                <option value="class-3">Class 3</option>
                <option value="class-4">Class 4</option>
                <option value="class-5">Class 5</option>
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

              <Link to={"/login"} className="font-semibold text-[#00BEB3]">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
