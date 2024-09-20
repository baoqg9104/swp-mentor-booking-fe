import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>

    {/* For Guest */}
      <div className="h-[70px] w-full flex text-[#333333] absolute">
        <div className="w-2/12 flex items-center justify-end font-bold text-[40px]">
          <span className="text-[#ff7d2d]">F</span> Booking
        </div>

        <div className="w-6/12">

        </div>

        <div className="w-4/12 flex items-center justify-center gap-4">
          <Link to={"/login"} className="border-[2px] border-black rounded-[42px] w-[155px] py-1 font-bold flex items-center justify-center text-[22px] cursor-pointer">
            Log in
          </Link>
          <Link to={"/signup"} className="border-[2px] border-[#00E492] bg-[#00E492] rounded-[42px] w-[155px] py-1 font-bold flex items-center justify-center text-[22px] text-white cursor-pointer">
            Sign up
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar