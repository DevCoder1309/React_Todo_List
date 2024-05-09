import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import {v4 as uuid} from 'uuid';
import {Box, Typography} from '@mui/material';


const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem('todos'));
    if(!data){
        return [];
    }
    return data;
}

export default function TodoList(){
    const [todos, setTodods] = useState(getInitialData);

    useEffect(()=>{
        localStorage.setItem(
            'todos',
            JSON.stringify(todos)
        )
    }, [todos])

    const removeTodo = (id) => {
        setTodods((prevTodo) => {
            return prevTodo.filter((t) => t.id !== id)
        })
    }

    const toggleTodo = (id) => {
        setTodods((currentTodo) => {
            return (
                currentTodo.map((e) => {
                    if(e.id === id){
                       return {...e, completed: !e.completed}
                    }
                    else{
                        return e
                    }
                })
            )
        })
    }

    const addTodo = (todo) => {
        setTodods(prevTodo => {
            return [...prevTodo, {id: uuid(), text: todo, completed: false}]
        })
    }

    return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
    }}>
        <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
            Todo's
          </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todos.map((todo) => {
                return <TodoItem todo={todo} key={todo.id} removeTodo={() => removeTodo(todo.id)} toggleTodo={() => toggleTodo(todo.id)} />
      })}
      <TodoForm addTodo={addTodo}/>
        </List>
    </Box>
    )
}



// export default function CheckboxList() {
//   const [checked, setChecked] = React.useState([0]);

//   const handleToggle = (value: number) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };

//   return (
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      
//     </List>
//   );
// }