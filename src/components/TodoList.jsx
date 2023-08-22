import React, { useEffect, useState } from "react";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  // Add Todo
  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todoItem) => todoItem.id !== id));

    // Send DELETE request to JSON Server to delete the todo item
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Todo deleted:", data);
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  // Toggle Completion
  const toggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        // Toggle the completion status
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    // Update the UI and state
    setTodos(updatedTodos);

    // Send PUT request to JSON Server to update the todo item
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodos.find((todo) => todo.id)),
    })
      .then((response) => response.json())
      .then((data) => console.log("Todo updated: ", data))
      .catch((error) => console.log("Error while updating todo: ", error));
  };

  // Fetch all todos
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        console.log(data);
      })
      .catch((error) => console.log("Error fetching todos: ", error));
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <>
          <Todo
            todo={todo}
            key={todo.id}
            onAddTodo={addTodo}
            onToggleStatus={toggleCompletion}
            onDelete={deleteTodo}
          />
        </>
      ))}
    </div>
  );
}

export default TodoList;
