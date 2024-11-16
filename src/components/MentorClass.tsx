import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

interface Student {
  studentId: string;
  studentName: string;
  groupId: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string | null;
  swpClassId: number;
}

interface Mentor {
  mentorId: string;
  swpClassId: number;
}

interface Group {
  groupId: string;
  status: boolean;
  name: string;
  topicName: string;
  walletPoint: number;
  leaderId: string;
  swpClassId: number;
  createdDate: string;
}

const MentorClass = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [openManageGroup, setOpenManageGroup] = useState<boolean>(false);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7007/api/Student/all"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to get students: ", error);
      }
    };

    const getMentor = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7007/api/Mentor/${authData?.id}`
        );

        setMentor(response.data);
      } catch (error) {
        console.error("Failed to get mentor: ", error);
      }
    };

    const getGroups = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7007/api/Group/all`
        );
        setGroups(response.data);
      } catch (error) {
        console.error("Failed to get groups: ", error);
      }
    };

    getStudents();
    getMentor();
    getGroups();
  }, [refresh]);

  const updateStatusGroup = async (groupId: string, status: boolean) => {

    try {
      await axios.put("https://localhost:7007/api/Group/update-status", {
        groupId: groupId,
        status: status,
      });
      setRefresh(!refresh);
      toast.success("Update status successfully");
    } catch (error: any) {
      toast.error(error.respone.data);
    }
  }

  // Gom nhóm học sinh
  const groupedStudents = students.reduce<Record<string, Student[]>>(
    (acc, student) => {
      const group = student.groupId || "No Group";
      if (!acc[group]) acc[group] = [];
      acc[group].push(student);
      return acc;
    },
    {}
  );

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }

  const { authData } = authContext;

  return (
    <div className="flex flex-col py-10 px-16 h-[90vh] text-[15px]">
      <div className="mb-3 flex justify-end">
        <button
          onClick={() => setOpenManageGroup(true)}
          className="text-[15px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Manage group
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead className="min-w-full divide-y divide-gray-200">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                      Group
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                      Status
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                      Topic
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold w-[50px]">
                      Wallet Point
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                      Student Name
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                      Email
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                      Phone
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                      Gender
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                      Date of birth
                    </th>
                    {/* <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedStudents).map(([group, members]) => (
                    <Fragment key={group}>
                      {members
                        .filter(
                          (student) => student.swpClassId === mentor?.swpClassId
                        )
                        .map((student, index) => (
                          <>
                            <tr
                              key={student.studentId}
                              className="hover:bg-gray-50"
                            >
                              {/* Hiển thị tên nhóm chỉ ở hàng đầu tiên của mỗi cụm nhóm */}
                              <td className="px-4 py-2">
                                {index === 0
                                  ? groups.find((g) => g.groupId == group)?.name
                                  : ""}
                              </td>
                              <td className="px-4 py-2 border-l-[1px]">
                                {index === 0
                                  ? groups.find(
                                      (g) => g.groupId === student.groupId
                                    )?.status
                                    ? "Activated"
                                    : "Disabled"
                                  : ""}
                              </td>
                              <td className="px-4 py-2 border-l-[1px]">
                                {index === 0 &&
                                  groups.find(
                                    (g) => g.groupId === student.groupId
                                  )?.topicName}
                              </td>
                              <td className="px-4 py-2 border-l-[1px] text-center">
                                {index === 0 &&
                                  groups.find(
                                    (g) => g.groupId === student.groupId
                                  )?.walletPoint}
                              </td>
                              <td
                                className={`border border-gray-200 px-4 py-2 ${
                                  groups.find(
                                    (g) => g.leaderId === student.studentId
                                  ) && "font-medium"
                                }`}
                              >
                                {student.studentName}
                              </td>
                              <td className="border border-gray-200 px-4 py-2">
                                {student.email}
                              </td>
                              <td className="border border-gray-200 px-4 py-2">
                                {student.phone}
                              </td>
                              <td className="border border-gray-200 px-4 py-2">
                                {student.gender}
                              </td>
                              <td className="border border-gray-200 px-4 py-2">
                                {student.dateOfBirth !== null &&
                                  new Date(
                                    student.dateOfBirth
                                  ).toLocaleDateString("en-GB")}
                              </td>
                              {/* <td className="border border-gray-200 px-4 py-2">
                                <button className="text-[13px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                                  Delete
                                </button>
                              </td> */}
                            </tr>
                          </>
                        ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={openManageGroup}
        onClose={setOpenManageGroup}
        className="relative z-[100]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-[60%] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Manage group
                    </DialogTitle>
                    <div className="mt-2">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-[#ffffff] border-b">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Group
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Leader
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Topic
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Created Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {groups
                            .filter(
                              (group) => group.swpClassId === mentor?.swpClassId
                            )
                            .map((group) => (
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                  {group.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {
                                    students.find(
                                      (s) => s.studentId == group.leaderId
                                    )?.studentName
                                  }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {group.topicName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {new Date(
                                    group.createdDate
                                  ).toLocaleDateString("en-GB")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {group.status == false
                                    ? "Disabled"
                                    : "Activated"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {group.status == false ? (
                                    <button
                                    onClick={() => updateStatusGroup(group.groupId, true)}
                                     className="text-[15px] bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                                      Approve
                                    </button>
                                  ) : (
                                    <button
                                    onClick={() => updateStatusGroup(group.groupId, false)}
                                     className="text-[15px] bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                      Disable
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenManageGroup(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MentorClass;
