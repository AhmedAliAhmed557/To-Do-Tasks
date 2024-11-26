import { Task as TaskType } from "../types/types";

interface TaskProps {
	task: TaskType;
	onEdit: () => void;
	onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
	return (
		<div className='border-green-200 border p-4 mb-2 rounded shadow-lg bg-white/10'>
			<h2 className='text-xl font-semibold'>{task.title}</h2>
			<p className='text-gray-600'>{task.description}</p>
			<p className='text-xs text-gray-200'>
				Last updated: {new Date(task.updatedAt).toLocaleString()}
			</p>
			<div className='mt-2'>
				<button
					className='text-blue-500'
					onClick={onEdit}
				>
					Edit
				</button>
				<button
					className='text-red-500 ml-4'
					onClick={onDelete}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Task;
