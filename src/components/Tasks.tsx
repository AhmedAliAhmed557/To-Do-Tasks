import { Task as TaskType } from "../types/types";

interface TaskProps {
	task: TaskType;
	onEdit: () => void;
	onDelete: () => void;
	onToggleDone: () => void;
}

const Task: React.FC<TaskProps> = ({
	task,
	onEdit,
	onDelete,
	onToggleDone,
}) => {
	return (
		<div
			className={`border-green-200 border p-4 mb-2 rounded shadow-lg  ${
				task.completed ? "bg-white/60" : "bg-white/10"
			}`}
		>
			<div className='flex items-center gap-3 justify-between'>
				<h2 className='text-xl font-semibold'>
					<span className={`${task.completed ? "line-through" : ""}`}>
						{task.title}
					</span>{" "}
					-{" "}
					<span
						className={`${
							task.completed ? "text-green-500" : "text-red-500"
						} text-lg`}
					>
						{task.completed ? "Done" : "Not Done"}
					</span>
				</h2>
				<label className='relative inline-flex items-center cursor-pointer'>
					<input
						type='checkbox'
						checked={task.completed}
						onChange={onToggleDone}
						className='sr-only peer'
					/>
					<div className='w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300'></div>
					<div className='absolute w-5 h-5 bg-white rounded-full left-0.5 top-0.5 transition-transform duration-300 peer-checked:translate-x-5'></div>
				</label>
			</div>

			<p
				className={`${
					task.completed ? "line-through" : ""
				} text-gray-600 truncate`}
			>
				{task.description}
			</p>
			<p
				className={`${
					task.priority === "high"
						? "text-red-500"
						: task.priority === "medium"
						? "text-yellow-500"
						: "text-green-500"
				} text-sm block`}
			>
				{task.priority === "high"
					? "High"
					: task.priority === "medium"
					? "Medium"
					: "Low"}
			</p>
			<p
				className={`${
					task.completed ? "text-gray-600" : "text-gray-200"
				} text-xs `}
			>
				Last updated: {new Date(task.updatedAt).toLocaleString()}
			</p>
			<div className={`mt-2 ${task.completed ? "opacity-10" : "opacity-100"}`}>
				<button
					className='text-blue-500'
					onClick={onEdit}
					disabled={task.completed}
				>
					Edit
				</button>
				<button
					className='text-red-500 ml-4'
					onClick={onDelete}
					disabled={task.completed}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Task;
