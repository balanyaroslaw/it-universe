import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useModalStore from "../../store/modal.store";
import useTreeStore from "../../store/tree.store";
import { User, Calendar, MapPinHouse, X, VenusAndMars } from "lucide-react";
import { windowList } from "../keys/windowList";
const EditDetailsModal = ({ isOpen, node }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      fatherName: "",
      birthDate: "",
      deathDate: "",
      birthPlace: "",
      deathPlace: "",
      gender: "",
      maidenName: ""
    }
  });

  const close = useModalStore((state) => state.close);
  const window = useModalStore((state) => state.window);
  const member = useModalStore((state) => state.member);
  const data = useTreeStore((state) => state.node);
  const addParent = useTreeStore((state) => state.addParent);
  const addChild = useTreeStore((state) => state.addChild);
  const addSibling = useTreeStore((state) => state.addSibling);
  const changeData = useTreeStore((state) => state.changeNode);

  const gender = watch("gender");

  useEffect(() => {
    if (node) {
      setValue("firstName", node.firstName || "");
      setValue("lastName", node.lastName || "");
      setValue("fatherName", node.fatherName || "");
      setValue("maidenName", node.maidenName || "");
      setValue("birthDate", node.birthDate || "");
      setValue("deathDate", node.deathDate || "");
      setValue("birthPlace", node.birthPlace || "");
      setValue("deathPlace", node.deathPlace || "");
      setValue("gender", node.gender || "");
    }
  }, [node, setValue]);

  const onChangeData = (formData) => {
    const jointData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      fatherName: formData.fatherName,
      maidenName: formData.maidenName,
      gender: formData.gender,
      birthDate: formData.birthDate && new Date(formData.birthDate).toISOString()
    };

    changeData(node.id, jointData);
    close(windowList.changeWindow);
  };

  const onAddMember = async (formData) => {
    const jointData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      fatherName: formData.fatherName,
      maidenName: formData.maidenName,
      gender: formData.gender,
      birthDate: formData.birthDate && new Date(formData.birthDate).toISOString()
    };

    if (member === 'parent') {
      await addParent(data, jointData);
    } else if (member === 'sibling') {
      addSibling(data.id, jointData);
    } else if (member === 'child') {
      await addChild(data, jointData);
    }
    
    close(windowList.addWindow);
  };

  const onFormSubmit = (formData) => {
    if (window === windowList.addWindow) {
      onAddMember(formData);
    } else if (window === windowList.changeWindow) {
      onChangeData(formData);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden flex flex-col max-h-[90vh]">
          <div
            className={`flex items-center justify-between bg-greenly px-6 py-4`}
          >
            <h2 className="text-xl font-semibold text-black">
              {member === 'sibling' ? 'Додати брата/сестру' :
                member === 'parent' ? "Додати члена сім'ї" :
                  member === 'child' ? 'Додати дітей' : 'Змінити дані про предка'}
            </h2>
            <button
              onClick={() => close(window)}
              className="text-black p-1 rounded-full transition-colors hover:text-gray-500"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <User size={20} className="text-gray-300" />
                    <h3 className="font-medium text-gray-700">Особисті дані</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Ім'я"
                        className={`w-full rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 outline-none transition-all`}
                        {...register("firstName", { required: "Ім'я обов'язкове" })}
                      />
                      {errors.firstName && (
                        <span className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Прізвище"
                        className={`w-full rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 outline-none transition-all`}
                        {...register("lastName", { required: "Прізвище обов'язкове" })}
                      />
                      {errors.lastName && (
                        <span className="text-red-500 text-xs mt-1">{errors.lastName.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="По-батькові"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all"
                      {...register("fatherName")}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <div className="flex items-center gap-2 mr-2 justify-center">
                      <VenusAndMars size={20} className="text-gray-300" />
                      <span className="font-medium text-gray-600">Стать</span>
                    </div>
                    <select
                      className={`w-full rounded-lg border ${errors.gender ? 'border-red-500' : 'border-gray-300'} px-4 py-2 outline-none transition-all bg-white text-gray-600`}
                      {...register("gender", { required: "Стать обов'язкова" })}
                    >
                      <option value="">Оберіть стать</option>
                      <option value="male">Чоловік</option>
                      <option value="female">Жінка</option>
                    </select>
                  </div>
                  {errors.gender && (
                    <span className="text-red-500 text-xs block mt-1">{errors.gender.message}</span>
                  )}

                  {gender === 'female' && (
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Дівоче прізвище"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all"
                        {...register("maidenName")}
                      />
                    </div>
                  )}
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={20} className="text-gray-300" />
                    <h3 className="font-medium text-gray-700">Дата народження</h3>
                  </div>

                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all"
                    {...register("birthDate")}
                  />

                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinHouse size={20} className="text-gray-300" />
                      <span className="text-sm text-gray-600">Місце народження</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Місце народження"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all"
                      {...register("birthPlace")}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={20} className="text-gray-300" />
                    <h3 className="font-medium text-gray-700">Дата смерті</h3>
                  </div>

                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all"
                    {...register("deathDate")}
                  />

                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinHouse size={20} className="text-gray-300" />
                      <span className="text-sm text-gray-600">Місце смерті</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Місце смерті"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all"
                      {...register("deathPlace")}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => close(window)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className={`
                    px-4 py-2 bg-greenly
                    text-black rounded-lg transition-colors`}
                >
                  Зберегти
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default EditDetailsModal;