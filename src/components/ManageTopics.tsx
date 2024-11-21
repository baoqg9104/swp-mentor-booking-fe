import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useState, useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import { AuthContext } from "./AuthContext";
import axiosInstance from "./axiosInstance";

interface Topic {
  topicId: number;
  name: string;
  description: string;
  actors: string;
}

export default function ManageTopics() {
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }

  const { authData } = authContext;

  const [topics, setTopics] = useState<Topic[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    actors: "",
  });
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const response = await axiosInstance.get(
          "https://localhost:7007/api/Topic/all",
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );
        setTopics(response.data);
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    };

    getTopics();
  }, [refresh]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTopic = async () => {
    try {
      const response = await axiosInstance.post(
        "https://localhost:7007/api/Topic/create",
        {
          name: formData.name,
          description: formData.description,
          semesterId: 1,
          actors: formData.actors,
          status: true,
        },
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );
      setRefresh(!refresh);
      setIsModalOpen(false);
      setFormData({
        name: "",
        description: "",
        actors: "",
      });
      toast.success("Topic added successfully.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleEditTopic = async () => {
    try {
      // const data = {
      //   topicId: selectedTopic?.topicId,
      //   name: formData.name,
      //   description: formData.description,
      //   semesterId: 1,
      //   actors: formData.actors,
      //   status: true,
      // }

      // console.log(data);
      // return;

      const response = await axiosInstance.put(
        `https://localhost:7007/api/Topic/update`,
        {
          topicId: selectedTopic?.topicId,
          name: formData.name,
          description: formData.description,
          semesterId: 1,
          actors: formData.actors,
          status: true,
        },
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );
      setRefresh(!refresh);
      setOpenEdit(false);
      setFormData({
        name: "",
        description: "",
        actors: "",
      });
      toast.success("Topic updated successfully.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDelete = async (topicId: number) => {
    try {
      const response = await axiosInstance.delete(
        `https://localhost:7007/api/Topic/delete/${topicId}`
      );

      setRefresh(!refresh);
      toast.success("Topic deleted successfully.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => {
          setFormData({
            name: "",
            description: "",
            actors: "",
          });
          setIsModalOpen(true) }}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add New Topic
      </button>

      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actors</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.topicId}>
              <td className="border px-4 py-2">{topic.name}</td>
              <td className="border px-4 py-2">{topic.description}</td>
              <td className="border px-4 py-2">{topic.actors}</td>
              <td className="border px-4 py-2 flex">
                <button
                  className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setOpenEdit(true);
                    setSelectedTopic(topic);
                    setFormData({
                      name: topic.name,
                      description: topic.description,
                      actors: topic.actors,
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(topic.topicId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Create/Edit */}
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {selectedTopic ? "Edit Topic" : "Add Topic"}
                </Dialog.Title>
                <div className="mt-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Topic Name"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded mb-4 h-[250px]"
                  ></textarea>
                  <input
                    type="text"
                    name="actors"
                    value={formData.actors}
                    onChange={handleFormChange}
                    placeholder="Actors"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mt-4">
                  <button
                    className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleAddTopic()}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>

      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => setOpenEdit(false)}
        open={openEdit}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {selectedTopic ? "Edit Topic" : "Add Topic"}
                </Dialog.Title>
                <div className="mt-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Topic Name"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded mb-4 h-[250px]"
                  ></textarea>
                  <input
                    type="text"
                    name="actors"
                    value={formData.actors}
                    onChange={handleFormChange}
                    placeholder="Actors"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mt-4">
                  <button
                    className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEditTopic()}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setOpenEdit(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
