import { useState } from 'react'
import './App.css'
import Column from './components/Column'
import Tasks from './assets/Tasks'
import PostForm from './components/PostForm'
import InputColumn from './components/InputColumn'
import {useEffect} from 'react'
import uuid from 'react-uuid'

function App() {

  type postCard = {
    id: string;
    title: string;
    content: string;
    status: 'toDo' | 'doing' | 'done';
  }

  const [tasks, setTasks] = useState(Tasks)
  
  function insertTask(newTask: { id:string, title: string; content: string; status: 'toDo' | 'doing' | 'done' }, setCard: (card: postCard) => void) {
    newTask.id = uuid();
    setTasks([...tasks, newTask])
    setCard({id:'', title: '', content: '', status: 'toDo' })
  }
  async function updateTasks(newTask: postCard, oldTask: postCard, setCard:(newCard:postCard) => void, setBoolean:()=>void) {
    const index = tasks.indexOf(oldTask)
    tasks[index] = newTask
    let aux = tasks.filter((task) => {
      return (task.id !== oldTask.id)
    })
    setTasks([...tasks])
    setCard(newTask)
    setBoolean()
  }

  function deleteTask(task:postCard):void{
    setTasks(tasks.filter((post) => {
      return (post.id !== task.id)
    }))
  }

  return (
    <div className='container'>
      <InputColumn>
        <PostForm handleOnClick={insertTask} />
      </InputColumn>
      <Column title='To Do' status='toDo' handleOnClick={updateTasks} deleteTask={deleteTask}> 
        {tasks}
      </Column>
      <Column title='Doing' status='doing' handleOnClick={updateTasks} deleteTask={deleteTask}>
        {tasks}
      </Column>
      <Column title='Done' status='done' handleOnClick={updateTasks} deleteTask={deleteTask}>
        {tasks}
      </Column>
    </div>
  )
}

export default App
