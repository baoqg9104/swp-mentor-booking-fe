import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="container flex justify-center items-center h-svh text-[#5B5B5B] ">
        <div className="h-[500px] w-[450px] rounded-[10px] border-black border ">
          <div className="flex justify-center items-center h-1/4 font-semibold text-[40px] text-black">
            Login
          </div>

          <div className="h-2/4 px-[70px]">
            <input
              type="email"
              className="w-full h-[55px] bg-[#EDEDED] pl-5 rounded-[10px] text-[18px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
              placeholder="Email"
              required
            />

            <input
              type="password"
              className="mt-4 w-full h-[55px] bg-[#EDEDED] pl-5 rounded-[10px] text-[18px] placeholder:text-[#808080] text-[#5B5B5B] placeholder:font-normal"
              placeholder="Password"
              required
            />

            <p className="text-end text-[18px] mt-2 text-[#6e6e6e]">
              Forgot password?
            </p>

            <button
              type="submit"
              className="mt-5 w-full h-[55px] bg-[#F56965] pl-5 rounded-[10px] text-[22px] text-[white] font-semibold"
            >
              Log in
            </button>

            <div className="text-center mt-10 text-[20px]">
              <span>Not a member? </span>

              <Link to={"/signup"} className="font-semibold text-[#00BEB3]">Sign up</Link>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
