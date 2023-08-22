import React, { useState } from "react";

function TodoForm() {
  const [formData, setFormData] = useState({ title: "", completed: false });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the 'title' field
    if (formData.title.trim() === "") {
      console.log("Title is empty. Please enter a title.");
      setErrorMessage("Title is empty. Please enter a title.");
      return;
    }

    // Create a new todo object
    const newTodo = { title: formData.title, completed: formData.completed };

    console.log("Title: ", formData.title);
    console.log("Status: ", formData.completed);

    // Send POST request to JSON server

    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        // Clear Form Fields after submitting form
        setFormData({ title: "", completed: false });
        // Inform parent component about the new todo
        onAddTodo(data);
      })
      .catch((error) => console.error("Error adding todo:", error));
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md  p-4 bg-white shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="completed"
            className="block text-gray-700 font-bold mb-2"
          >
            Status
          </label>
          <select
            name="completed"
            id="completed"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            value={formData.completed ? "completed" : "not_completed"}
            onChange={handleInputChange}
          >
            <option value="completed" onChange={handleInputChange}>
              Completed
            </option>
            <option
              value="not_completed"
              onChange={(e) => setCompleted(e.target.value)}
            >
              Not Completed
            </option>
          </select>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-md mb-2">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
