import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import {useReducer} from 'react';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
        type: 'added',
        id: nextId++,
        text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
        type: 'changed',
        task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
        type: 'deleted',
        id: taskId
    }
    );
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];

function tasksReducer(tasks, action) {
    if (action.type == 'added') {
        return [...tasks, {id: action.id, text: action.text, done: true}]
    } 
    else if (action.type === 'changed'){
        return tasks.map(task => {
            if (task.id === action.task.id){
                return action.task
        } else {
            return task
        }
        })
    } 
    else if (action.type === 'deleted') {
        return tasks.filter(task => task.id != action.id)
    }
    else {
        throw Error('Unkown action: ' + action.type)
    }
    
}