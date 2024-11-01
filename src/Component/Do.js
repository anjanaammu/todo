import React, { useState } from 'react';
import axios from 'axios';
import './Do.css'

function Do({ setTodos }) {
    const [task, setTask] = useState('');

    const createTask = () => {
        const trimmedTask = task.trim();
        if (!trimmedTask) return;

        axios.post('http://localhost:4000/add', { task: trimmedTask })
            .then(response => {
                setTodos(prevTodos => [...prevTodos, response.data]);
                setTask('');
            })
            .catch(err => console.error('Error creating task:', err));
    };

    return (
        <>
        <h1>To Do List</h1>
        <main>
            
            <div className='form'>
                <input
                    type='text'
                    placeholder='Enter a task'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <button onClick={createTask} className='but'>ADD</button>
            </div>
        </main>
        </>
    );
}

export default Do;