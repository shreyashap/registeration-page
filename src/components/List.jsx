import { useState } from "react";
import Button from "./Button";

const List = ({
  user,
  handleDelete,
  editMode,
  emailPattern,
  updateUser,
  handleEdit,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = () => {
    if (!name || !email) return;
    const isValid = emailPattern.test(email);
    if (!isValid) return;

    const updatedUser = { ...user, name: name, email: email };
    updateUser(updatedUser);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 bg-orange-300 w-full h-auto py-2 rounded-md">
      {editMode ? (
        <>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-gray-200 px-2 py-1 rounded-lg focus-within:outline-none"
          />
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-gray-200 px-2 py-1 rounded-lg focus-within:outline-none"
          />
          <Button
            text="Update"
            className="bg-cyan-500 px-2 py-1 rounded-lg hover:bg-cyan-600"
            handleClick={handleUpdate}
          />
        </>
      ) : (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <Button
            text="Edit"
            className="bg-cyan-500 px-2 py-1 rounded-lg hover:bg-cyan-600"
            handleClick={handleEdit}
          />
        </>
      )}

      <Button
        text="Delete"
        handleClick={handleDelete}
        className="bg-cyan-500 px-2 py-1 rounded-lg hover:bg-cyan-600"
      />
    </div>
  );
};

export default List;
