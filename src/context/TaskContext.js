"use client"
import { useLocalStorage } from "@/hooks/useLocalstorage";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from 'uuid'

export const TaskContext = createContext();                                             // Instancia

export const useTasks = () => {                                                         // Uso de la instancia            
    const context = useContext( TaskContext )
    if(!context) throw new Error('useTasks must be used within a TaskProvider')
    return context
}


export const TaskProvider = ({ children }) => {                                         // Valor que le damos a la instancia    

    const [tasks, setTasks] = useLocalStorage('tasks' , [])

    const createTask = (title, description) => {

        setTasks([
            ...tasks, {
                title,
                description,
                id: uuid()
            }
        ])
    }

    const deleteTask = ( id ) => {
    
        setTasks([...tasks.filter( task => task.id !== id )])
    }

    const updateTask = ( id, newData ) =>{ 
       
        setTasks([...tasks.map( (task) => task.id === id
            ? { 
                ...task,
                ...newData
              }
            : task       
        )])
       
    }
    

    return <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
        { children }
    </TaskContext.Provider>
}