import {
  faBell,
  faHouse,
  faUser,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminDashboard from "./AdminDashboard";
import { useContext, useState } from "react";
import ManageMentors from "./ManageMentors";
import ManageStudents from "./ManageStudents";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Admin = () => {
  const [navLink, setNavLink] = useState<string>("dashboard");

  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    if (authContext) {
      const { logout } = authContext;
      await logout();
    }
  };

  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }

  const { authData } = authContext;

  return (
    <>
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]">
        <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
          <div className="me-5 lg:me-0 lg:hidden">
            <div className="flex items-center font-bold text-[30px]">
              <span className="text-[#ff7d2d]">F</span> Booking
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
                      Admin
                    </div>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    <div
                      className="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      onClick={() => {
                        handleLogout();
                      }}
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
              <li className="flex items-center text-sm text-gray-800">
                Application Layout
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-gray-800 truncate"
                aria-current="page"
              >
                Dashboard
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
              <ul className="flex flex-col text-[17px]">
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => setNavLink("dashboard")}
                    className={`${
                      navLink === "dashboard" && "bg-gray-100"
                    } w-full  flex gap-x-2.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`}
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
                    to="/admin/mentors"
                    onClick={() => setNavLink("mentors")}
                    className={`${
                      navLink === "mentors" && "bg-gray-100"
                    } w-full flex gap-x-3.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`}
                  >
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="text-[18px] mt-[1px]"
                    />
                    Mentors
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/admin/students"
                    onClick={() => setNavLink("students")}
                    className={`${
                      navLink === "students" && "bg-gray-100"
                    } w-full flex gap-x-3.5 py-3 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100`}
                  >
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      className="text-[18px] mt-[1px]"
                    />
                    Students
                  </NavLink>
                </li>

                {/* <li className="hs-accordion" id="projects-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    aria-expanded="true"
                    aria-controls="projects-accordion-child"
                  >
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
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    Projects
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4"
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
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:hidden ms-auto block size-4"
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    id="projects-accordion-child"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                    role="region"
                    aria-labelledby="projects-accordion"
                  >
                    <ul className="ps-8 pt-1 space-y-1">
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          href="#"
                        >
                          Link 1
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          href="#"
                        >
                          Link 2
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          href="#"
                        >
                          Link 3
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <a
                    className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                    href="#"
                  >
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
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                    </svg>
                    Calendar
                  </a>
                </li>
                <li>
                  <a
                    className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                    href="#"
                  >
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
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Documentation
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full lg:ps-64 bg-[#F9FAFB]">
        <Outlet />
      </div>
    </>
  );
};

export default Admin;
