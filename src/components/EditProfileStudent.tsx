import { faEnvelope, faGift, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditProfileStudent = () => {
  return (
    <>
      <div className="p-14 pt-7">
        <div className="space-y-8">
          <div>
            <div className="mt-10">
              <div className="w-[80%]">
                <div className="mt-2 flex items-center w-full gap-10 shadow p-7 pt-5 rounded-[10px] bg-white">
                  <div className="w-[20%]">
                    <div className="size-[120px] bg-gray-200 rounded-full border-[3px] border-white shadow-lg"></div>
                  </div>
                  <div className="w-[75%]">
                    <div className="text-[25px] font-medium mt-2 mb-3">
                      Full name
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="size-4 mr-2"
                        />
                        Male
                      </div>

                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faGift}
                          className="size-4 mr-2 text-gray-500"
                        />
                        <span className="text-gray-500">Date of birth</span>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="size-4 mr-2 text-gray-500"
                        />
                        <span className="text-gray-500">Email</span>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="size-4 mr-2 text-gray-500"
                        />
                        <span className="text-gray-500">Phone</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[5%]">
                    <div
                      className="relative bottom-[25px] rounded-full size-[40px] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls="hs-scale-animation-modal"
                      data-hs-overlay="#hs-scale-animation-modal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="size-5"
                      >
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileStudent;
