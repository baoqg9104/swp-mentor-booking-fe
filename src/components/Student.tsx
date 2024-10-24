import {
  faBell,
  faCalendarCheck,
  faCalendarPlus,
  faCommentDots,
  faHistory,
  faHouse,
  faPenToSquare,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect } from "react"; 
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const Student = () => {
  const [navLink, setNavLink] = useState<string>("dashboard");

  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    if (authContext) {
      const { logout } = authContext;
      await logout();
    }
  };

  return (
    <>
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]">
        <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
          <div className="me-5 lg:me-0 lg:hidden">
            <div className="flex items-center font-bold text-[30px]">
              <span className="text-[#ff7d2d]">SWP</span> Booking
            </div>
          </div>

          <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
            <div className="hidden md:block"></div>

            <div className="flex flex-row items-center justify-end gap-3 pr-2">
              <button
                type="button"
                className="size-[45px] bg-[#e6eef6] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                <FontAwesomeIcon className="text-[22px]" icon={faBell} />
                <span className="sr-only">Notifications</span>
              </button>

              <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                <button
                  id="hs-dropdown-account"
                  type="button"
                  className="size-[45px] hover:bg-gray-200 bg-[#e6eef6] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <FontAwesomeIcon className="text-[22px]" icon={faUser} />
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-account"
                >
                  <div className="py-3 px-5 bg-[#ffffff] rounded-t-lg shadow flex gap-3 items-center">
                    <div className="size-[45px] bg-[#e6eef6] flex justify-center items-center rounded-full">
                      <FontAwesomeIcon className="text-[22px]" icon={faUser} />
                    </div>
                    <div className="text-[18px] text-gray-800 font-semibold">
                      Student
                    </div>
                  </div>
                  <div className="p-1.5">
                    <NavLink
                      to="/student/edit-profile"
                      className="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      onClick={() => setNavLink("edit-profile")}
                    >
                      <svg
                        className="size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                      </svg>
                      Edit Profile
                    </NavLink>
                    <div className="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    onClick={() => handleLogout()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="size-4"
                      >
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                      </svg>
                      Log out
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="-mt-px">
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
          <div className="flex items-center py-2">
            <button
              type="button"
              className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">Toggle Navigation</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
            </button>

            <ol className="ms-3 flex items-center whitespace-nowrap">
              <li
                className="text-sm font-semibold text-gray-800 truncate"
                aria-current="page"
              >
                {navLink === "dashboard" && "Dashboard"}
                {navLink === "group" && "Group"}
                {navLink === "booking-mentor" && "Booking Mentor"}
                {navLink === "my-appoinments" && "My Appointments"}
                {navLink === "feedback" && "Feedback"}
                {navLink === "transaction-history" && "Transaction History"}
                {navLink === "edit-profile" && "Edit Profile"}
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div
        id="hs-application-sidebar"
        className="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-[260px] h-full
  hidden
  fixed inset-y-0 start-0 z-[60]
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
 "
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4">
            <div className="flex items-center font-bold text-[30px]">
              <span className="text-[#ff7d2d]">SWP</span> Booking
            </div>
          </div>

          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <nav
              className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="flex flex-col text-[15px]">
                <li>
                  <NavLink
                    to="/student/dashboard"
                    onClick={() => setNavLink("dashboard")}
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-100" : ""
                      } w-full flex gap-x-3.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`
                    }
                  >
                    <FontAwesomeIcon
                      icon={faHouse}
                      className="text-[16px] mt-[3px]"
                    />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/student/group"
                    onClick={() => setNavLink("group")}
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-100" : ""
                      } w-full flex gap-x-3.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`
                    }
                  >
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      className="text-[16px] mt-[3px]"
                    />
                    Group
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/student/booking-mentor"
                    onClick={() => setNavLink("booking-mentor")}
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-100" : ""
                      } w-full flex gap-x-3.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCalendarPlus}
                      className="text-[16px] mt-[3px]"
                    />
                    Booking Mentor
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/student/my-appointments"
                    onClick={() => setNavLink("my-appoinments")}
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-100" : ""
                      } w-full flex gap-x-3.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      className="text-[16px] mt-[3px]"
                    />
                    My Appointments
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/student/feedback"
                    onClick={() => setNavLink("feedback")}
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-100" : ""
                      } w-full flex gap-x-3.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      className="text-[16px] mt-[3px]"
                    />
                    Feedback
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/student/transaction-history"
                    onClick={() => setNavLink("transaction-history")}
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-100" : ""
                      } w-full flex gap-x-3.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`
                    }
                  >
                    <FontAwesomeIcon
                      icon={faHistory}
                      className="text-[16px] mt-[3px]"
                    />
                    Transaction History
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/student/edit-profile"
                    onClick={() => setNavLink("edit-profile")}
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-100" : ""
                      } w-full flex gap-x-3.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-[18px] mt-[1px]"
                    />
                    Edit Profile
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="w-full lg:ps-64 bg-[#F9FAFB]">
        <Outlet />
      </div>
    </>
  );
};

export default Student;
