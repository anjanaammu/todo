import React, { useEffect, useState } from 'react';
import Do from './Do';
import axios from 'axios';
import './Home.css'



function Home() {
    const [todos, setTodos] = useState([]);
    const [editTask, setEditTask] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.error('Error fetching todos:', err));
    }, []);

    const toggleDone = (id) => {
        axios.put(`http://localhost:4000/edit/${id}`)
            .then(() => {
                setTodos(todos.map(todo => (
                    todo._id === id ? { ...todo, done: !todo.done } : todo
                )));
            })
            .catch(err => console.error('Error toggling task:', err));
    };

    const updateTask = (id, updatedTask) => {
        axios.put(`http://localhost:4000/update/${id}`, { task: updatedTask })
            .then(() => {
                setTodos(todos.map(todo => (
                    todo._id === id ? { ...todo, task: updatedTask } : todo
                )));
                setEditingId(null);
                setEditTask('');
            })
            .catch(err => console.error('Error updating task:', err));
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:4000/delete/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.error('Error deleting task:', err));
    };

    return (
        <main>
            <Do setTodos={setTodos} />
            {todos.length === 0 ? (
                <div className='task'>No tasks found</div>
            ) : (
                <ol className='tasklist' >  
                    {todos.map((todo) => (
                        <li key={todo._id} className='task-box'> 
                            <div className='task-content'>
                                {editingId === todo._id ? (
                                    <input 
                                        type='text' 
                                        value={editTask} 
                                        onChange={e => setEditTask(e.target.value)} 
                                    />
                                ) : (
                                    <p className={todo.done ? 'through' : ''}>{todo.task}</p>
                                )}
                            </div>
                            <div className='task-actions'>
                                {editingId === todo._id ? (
                                    <button onClick={() => updateTask(todo._id, editTask)}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => {
                                            setEditingId(todo._id);
                                            setEditTask(todo.task);
                                        }}>Edit</button>
                                        <button onClick={() => deleteTask(todo._id)}>Delete</button>
                                    </>
                                )}
                                <button onClick={() => toggleDone(todo._id)}>
                                    {todo.done ? 'undo' : 'completed'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            )}
        </main>
    );
    
}

export default Home;