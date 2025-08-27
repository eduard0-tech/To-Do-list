import { useState, useEffect } from 'react';
import Tasks from './components/Tasks';
import './App.css';

function capitalizarPrimeiraLetra(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const TASK_LIMIT = 10;

function App() {
  const [tasks, setTasks] = useState(() => {
    // Carrega as tarefas do localStorage na primeira renderização.
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTask, setNewTask] = useState("");

  // Salva as tarefas no localStorage sempre que a lista 'tasks' for alterada.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (tasks.length >= TASK_LIMIT) {
      alert(`Você não pode adicionar mais de ${TASK_LIMIT} tarefas.`);
      return;
    }

    const trimmedTask = newTask.trim();
    if (!trimmedTask) {
      alert("Por favor, digite uma tarefa válida.");
      return;
    }
    
    const formattedTask = capitalizarPrimeiraLetra(trimmedTask);

    setTasks([...tasks, { text: formattedTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  const taskLimitReached = tasks.length >= TASK_LIMIT;

  return (
    <div className="app">
      <h1>Lista de Tarefas 📝</h1>
      {taskLimitReached && (
        <p className="limit-warning">Você atingiu o limite de {TASK_LIMIT} tarefas!</p>
      )}
      <Tasks
        tasks={tasks}
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        toggleTask={toggleTask}
        removeTask={removeTask}
        taskLimitReached={taskLimitReached}
      />
    </div>
  );
}

export default App;