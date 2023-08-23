import { useState } from "react";

function Todo({ todo, onToggleStatus, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdate(todo.id, { ...todo, title: editedTitle });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4  space-x-4 max-w-xl flex justify-between items-center">
      <h2 className={`text-xl font-semibold ${isEditing ? "hidden" : ""}`}>
        {todo.id} &nbsp;
        {todo.title}
      </h2>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border-2 border-black hover:border-2"
            />
            <button
              onClick={handleSaveClick}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white inline-block px-2 py-1 rounded-full focus:outline-none focus:shadow-outline-red active:bg-blue-700 cursor-pointer"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p className="mt-1 ">
              <span
                onClick={() => onToggleStatus(todo.id)}
                className={`cursor-pointer inline-block px-2 py-1 rounded-full ${
                  todo.completed
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </span>
            </p>
            <button
              onClick={handleEditClick}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white inline-block px-2 py-1 rounded-full focus:outline-none focus:shadow-outline-red active:bg-blue-700 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white inline-block px-2 py-1 rounded-full focus:outline-none focus:shadow-outline-red active:bg-red-700 cursor-pointer"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Todo;
