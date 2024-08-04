import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { buttonClass, inputClass, labelClass } from "./constants";
import ErrorMessage from "./components/ErrorMessage";
import List from "./components/List";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./formSchema";

const App = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [users, setUsers] = useState([]);
  const [editModes, setEditModes] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const updatedUsers = [...users, data];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    reset();
  };

  const handleReset = () => {
    reset();
  };

  const handleEdit = (index) => {
    const updatedEditModes = [...editModes];
    updatedEditModes[index] = true;
    setEditModes(updatedEditModes);
  };

  const handleUpdate = (index, updatedUser) => {
    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedEditModes = [...editModes];
    updatedEditModes[index] = false;
    setEditModes(updatedEditModes);
  };

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedEditModes = [...editModes];
    updatedEditModes.splice(index, 1); // Remove edit mode state for deleted user
    setEditModes(updatedEditModes);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="flex justify-center font-bold text-xl my-4">
          Registeration Form
        </h1>
        <div className="w-64 md:w-2/4 lg:w-2/5 h-auto flex flex-col items-center gap-4 mx-auto my-4 bg-gray-200 p-4 rounded-xl md:grid grid-cols-2">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              placeholder="Name"
              className={inputClass}
              {...register("name")}
              tabIndex={1}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="text"
              placeholder="Email"
              className={inputClass}
              {...register("email")}
              tabIndex={2}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              placeholder="Password"
              className={inputClass}
              {...register("password")}
              tabIndex={3}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <div>
            <label className={labelClass}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className={inputClass}
              {...register("confirmPassword")}
              tabIndex={4}
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}
          </div>
          <div className="flex justify-center md:col-span-2 gap-4">
            <button className="md:w-60 text-white bg-blue-700 py-2 px-3 rounded-lg hover:bg-blue-800">
              Submit
            </button>
            <button
              className="md:w-60 text-white bg-blue-700 py-2 px-3 rounded-lg hover:bg-blue-800"
              onClick={handleReset}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      <div className="w-auto h-auto lg:w-3/5 bg-gray-200 mx-8 flex flex-col items-center gap-4 p-2 lg:mx-auto">
        {users?.map((user, index) => (
          <List
            key={index}
            user={user}
            index={index}
            editMode={editModes[index]}
            emailPattern={emailPattern}
            updateUser={(updatedUser) => handleUpdate(index, updatedUser)}
            handleDelete={() => handleDelete(index)}
            handleEdit={() => handleEdit(index)}
          />
        ))}
      </div>
    </>
  );
};

export default App;
