import {TestStudents} from './shared/listOfOrchids.tsx' ;
const tStyleHeader = 'px-6 py-3 text-start font-medium text-gray-500 uppercase';
const tStyleBody = 'px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800';
const buttonStyle ='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';

const ManageStudents = () => {
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
                      StudentID
                    </th>
                    <th
                      scope="col"
                      className={tStyleHeader}
                    >
                      StudentName
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
                      StudentGroup
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                {TestStudents.map((students) => (
                    <tr>
                        <td className={tStyleBody}>
                            {students.id}
                        </td>
                        <td className={tStyleBody}>
                            {students.name}
                        </td>
                        <td>
                            <div>subject here</div>
                        </td>
                        <td>
                            <div>student group here</div>
                        </td>
                        <td>
                            <button className={buttonStyle} >Edit</button>
                            <button className={buttonStyle} >Delete</button>
                        </td>
                    </tr>
                    
                ))}
                
                    

                </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default ManageStudents