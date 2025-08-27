function Tasks({ tasks, newTask, setNewTask, addTask, toggleTask, removeTask, taskLimitReached }) {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    return (
        <>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="O que precisa ser feito?"
                    disabled={taskLimitReached}
                />
                <button onClick={addTask} disabled={taskLimitReached}>
                    Adicionar
                </button>
            </div>

            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? 'completed' : ''}>
                        <div className="task-item" onClick={() => toggleTask(index)}>
                            <span className="checkbox">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="task-text">{task.text}</span>
                        </div>
                        <button className="remove-button" onClick={() => removeTask(index)}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Tasks;