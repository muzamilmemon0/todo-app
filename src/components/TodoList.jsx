import { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

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
      .then(() => {
        // After successful deletion, reassign IDs
        const updatedTodos = todos.map((todo, index) => ({
          ...todo,
          id: index + 1,
        }));
        setTodos(updatedTodos);
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

    // Find the specific todo that was toggled
    const toggledTodo = updatedTodos.find((todo) => todo.id === id);

    // Send PUT request to JSON Server to update the todo item
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toggledTodo), // Send the toggled todo object
    })
      .then((response) => response.json())
      .then((data) => console.log("Todo updated: ", data))
      .catch((error) => console.log("Error while updating todo: ", error));
  };

  // Update todo
  const updateTodo = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
    // Send PUT request to JSON Server to update the todo item
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Todo updated:", data);
      })
      .catch((error) => console.error("Error updating todo:", error));
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
    <>
      <TodoForm onAddTodo={addTodo} />
      <div>
        {todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            onAddTodo={addTodo}
            onToggleStatus={toggleCompletion}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))}
      </div>
    </>
  );
}

export default TodoList;
