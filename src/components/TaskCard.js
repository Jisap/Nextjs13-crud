import { useTasks } from '@/context/TaskContext'
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast";
import { VscTrash } from "react-icons/vsc";

const TaskCard = ({ task }) => {

  const router = useRouter()
  const { deleteTask } = useTasks()

  return (
    <div 
        className="bg-gray-500 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2 flex justify-between rounded shadow-gray-500"
        onClick={() => router.push(`/edit/${task.id}`)}    
    >
      <div>
        <div className="flex justify-between">
          <h2 className="font-bold">{ task.title }</h2>
          <button
            className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center rounded" 
            onClick = { 
              (e) => {
                e.stopPropagation()
                const accept = window.confirm("Estas seguro de borrar ?")
                if( accept ) {
                  deleteTask( task.id )
                  toast.success("Task deleted successfully");
                }
              }
            }
          >
            <VscTrash className="mr-2" />Delete
          </button>
        </div>
        <p className="text-gray-100">{ task.description }</p>
        <span className="text-gray-200 text-xs">Id: {task.id}</span>
      </div>
    </div>
  )
}

export default TaskCard