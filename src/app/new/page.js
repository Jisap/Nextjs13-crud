"use client"
import { useEffect } from 'react'
import { useTasks } from '@/context/TaskContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast";

const Page = ({ params }) => {

  //const [task, setTask] = useState({ title:"", description:""});
  const { createTask, tasks, updateTask } = useTasks();
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Forma tradicional

  // const handleChange = (e) => {                           // Establece estado según valores del formulario
  //   setTask({...task, [e.target.name]: e.target.value})
  // }

  // const handleSubmit = (e) => {                           // Cuando demos al boton de submit
  //   e.preventDefault()
  //   if( params.id){                                       // Si la url lleva id
  //     updateTask(params.id, task)                         // actualizamos la tarea   
  //   }else{                                                // Sino
  //     createTask(task.title, task.description)            // la creamos
  //   }
  //   router.push('/')
  // }

  //Forma con react-hook-form

  const onSubmit = handleSubmit( (data) => {
    if( params.id ){
      updateTask( params.id, data );
      toast.success("Task updated successfully");
    }else{
      createTask( data.title, data.description );
      toast.success("Task created successfully");
    }
    router.push("/")
  })
  

  useEffect(() => { // Cada vez que se carga la página se observa si la url lleva un id
    if(params.id){  // Si lo lleva se establece como valor del formulario el contenido asociado a ese id
      const taskFound = tasks.find(task => task.id === params.id)
      if ( taskFound )
        //setTask({ title: taskFound.title, description:taskFound.description })
        setValue("title", taskFound.title);
        setValue("description", taskFound.description);
    }
  }, []);

  return (
    <div className='flex justify-center items-center h-full mt-10'>
     
      <form
        className="bg-gray-700 p-10" 
        onSubmit={ onSubmit }
      >
        <h1 className="text-3xl mb-3">
          {params.id ? "Edit Task" : "New Task"}
        </h1>
        <input 
          //name="title" 
          //onChange={handleChange}
          //value={ task.title }
          type="text"
          name="title"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-2 block"
          autoFocus
          placeholder='write a title'
          {...register("title", {required: true})}
        />
        {errors.title && (
          <span className="block text-red-400 mb-2">
            This field is required
          </span>
        )}

        <textarea 
          //name="description" 
          //onChange={handleChange}
          //value={ task.description }
          cols="2"
          name="description"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-1 block"
          placeholder='write a description'
          {...register("description", {required: true})}
        />
        {errors.description && (
          <span className="block text-red-400 mb-2">
            This field is required
          </span>
        )}

        <button
          className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30 mt-4" 
          type="submit"
        >
            Save
        </button>
      </form>
    </div>
  )
}

export default Page