import { useState } from 'react';
import Tasks from './components/Tasks';
import './App.css';

function App() {
  // Armazena a lista de tarefas
  const [tasks, setTasks] = useState([
    { text: "Estudar React", completed: false },
    { text: "Ler um livro", completed: false },
    { text: "Fazer exercícios", completed: false }
  ]);
  
  // Armazena o texto da nova tarefa que está sendo digitada
  const [newTask, setNewTask] = useState("");

  // Adiciona uma nova tarefa à lista
  const addTask = () => {
    if (!newTask.trim()) return; // Evita adicionar tarefas vazias
    const newTasksList = [...tasks, { text: newTask, completed: false }];
    setTasks(newTasksList);
    setNewTask(""); // Limpa o input após adicionar a tarefa
  };

  // Marca ou desmarca uma tarefa como concluída
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Remove uma tarefa da lista
  const removeTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  // O App agora renderiza o componente Tasks e passa tudo o que ele precisa via "props"
  return (
    <div className="app">
      <h1>To-Do List 📝</h1>
      <Tasks
        tasks={tasks}
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        toggleTask={toggleTask}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;