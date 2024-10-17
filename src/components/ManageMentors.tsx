
import {TestMentors} from './shared/listOfOrchids' ;
const tStyleHeader = 'px-6 py-3 text-start font-medium text-gray-500 uppercase';
const tStyleBody = 'px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800';
const buttonStyle ='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
export default function ManageMentors(){
  return (
    <>
        <div className="mb-3 md:w-96 mx-auto">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon3" />

                    
                    <button
                        className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                        type="button"
                        id="button-addon3">
                        Search
                    </button>
                    
                </div>
            </div>
    <div className="mt-5 grid grid-cols-3 p-8 gap-x-8 gap-y-8 bg-[white] shadow-md rounded-[10px]">
          <div className="col-start-1 col-end-3">
            <div className="border rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className={tStyleHeader}
                    >
                      MentorID
                    </th>
                    <th
                      scope="col"
                      className={tStyleHeader}
                    >
                      MentorName
                    </th>
                    <th
                      scope="col"
                      className={tStyleHeader}
                    >
                      Subject
                    </th>
                    <th
                      scope="col"
                      className={tStyleHeader}
                    >
                      isApproved
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                {TestMentors.map((mentors) => (
                    <tr>
                        <td className={tStyleBody}>
                            {mentors.id}
                        </td>
                        <td className={tStyleBody}>
                            {mentors.name}
                        </td>
                        <td>
                            <div>subject here</div>
                        </td>
                        <td>
                            <div>pending/approved</div>
                        </td>
                        <td>
                            <button className={buttonStyle}>Edit</button>
                            <button type='button' className={buttonStyle}  aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal" >Delete</button>
                        </td>
                    </tr>
                    
                ))}
                
               
                </tbody>
                </table>
                
                <div id="hs-scale-animation-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog"  aria-labelledby="hs-scale-animation-modal-label">
                <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 id="hs-scale-animation-modal-label" className="font-bold text-gray-800 dark:text-white">
                        Modal title
                        </h3>
                        <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-scale-animation-modal">
                        <span className="sr-only">Close</span>
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <p className="mt-1 text-gray-800 dark:text-neutral-400">
                        This is a wider card with supporting text below as a natural lead-in to additional content.
                        </p>
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#hs-scale-animation-modal">
                        Close
                        </button>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                        Save changes
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
                


    </>
    );
}
