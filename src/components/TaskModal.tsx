import { useState } from "react";
import { Task as TaskType } from "../types/types";

interface TaskModalProps {
	task: TaskType | null;
	onSave: (task: TaskType) => void;
	onClose: () => void;
	numOfTasks: number;
}

const TaskModal: React.FC<TaskModalProps> = ({
	task,
	onSave,
	onClose,
	numOfTasks,
}) => {
	const [title, setTitle] = useState(task?.title || "");
	const [description, setDescription] = useState(task?.description || "");
	const [priority, setPriority] = useState(task?.priority || "low");
	const [priorityNumber, setPriorityNumber] = useState(task?.priorityNumber);

	const handleSubmit = () => {
		if (title.trim()) {
			onSave({
				...task,
				title,
				description,
				priorityNumber,
				priority,
				updatedAt: Date.now(),
			} as TaskType);
		}
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-96'>
				<h2 className='text-xl mb-4'>{task ? "Edit Task" : "New Task"}</h2>
				<input
					type='text'
					placeholder='Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='border p-2 mb-4 w-full rounded focus:border-0 focus:outline-dashed focus:outline-2 outline-offset-2 outline-green-400'
					maxLength={25}
				/>
				<textarea
					placeholder='Description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='border p-2 w-full min-h-20 max-h-60 focus:border-0 rounded focus:outline-dashed focus:outline-2 outline-offset-2 outline-green-400'
				/>
				<input
					type='number'
					placeholder='Priority Number'
					value={priorityNumber}
					onChange={(e) => setPriorityNumber(Number(e.target.value))}
					className='border p-2 mt-4 w-full rounded focus:border-0 focus:outline-dashed focus:outline-2 outline-offset-2 outline-green-400'
					maxLength={numOfTasks}
				/>
				<div className='mt-4'>
					<label className='block text-sm mb-2'>Priority</label>
					<select
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
						className='border p-2 w-full rounded focus:outline-dashed focus:outline-2 outline-offset-2 outline-green-400'
					>
						<option value=''>Select Priority</option>
						<option value='low'>Low</option>
						<option value='medium'>Medium</option>
						<option value='high'>High</option>
					</select>
				</div>

				<div className='mt-4 flex justify-end'>
					<button
						className='bg-gray-500 text-white py-1 px-3 rounded'
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className='bg-blue-500 text-white py-1 px-3 ml-2 rounded'
						onClick={handleSubmit}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default TaskModal;
