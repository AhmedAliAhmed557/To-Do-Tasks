"use client";
import { useState, useEffect } from "react";
import { Task as TaskType } from "../types/types";
import Task from "@/components/Tasks";
import TaskModal from "@/components/TaskModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import NoTasks from "./NoTasks";

export default function MainToDoList() {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [editTask, setEditTask] = useState<TaskType | null>(null);
	const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const toggleSortOrder = () => {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
		setTasks(savedTasks);
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	const addTask = (task: TaskType) => {
		setTasks([...tasks, { ...task, id: Date.now() }]);
		setShowModal(false);
	};

	const updateTask = (updatedTask: TaskType) => {
		setTasks(
			tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		);
		setEditTask(null);
		setShowModal(false);
	};

	const deleteTask = (id: number) => {
		setTasks(tasks.filter((task) => task.id !== id));
		setDeleteTaskId(null);
	};

	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks));
		}
	}, []);

	const filteredTasks = tasks.filter((task) =>
		task.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const sortedTasks = filteredTasks.sort((a, b) => {
		if (sortOrder === "asc") {
			return a.title.localeCompare(b.title);
		} else {
			return b.title.localeCompare(a.title);
		}
	});

	return (
		<div className='p-4 max-w-lg mx-auto'>
			<h1 className='text-2xl block font-bold text-center mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text border-2 border-purple-500 px-4 py-2  rounded-lg'>
				To-Do List
			</h1>

			<div className='mb-4 flex items-center justify-between gap-3 flex-col md:flex-row flex-wrap'>
				<button
					className='bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded w-full md:w-auto'
					onClick={() => setShowModal(true)}
				>
					Add Task
				</button>
				<input
					type='text'
					value={searchQuery}
					onChange={handleSearchChange}
					placeholder='Search tasks...'
					className='p-2 border focus:border-0 border-gray-300 rounded-lg w-full max-w-md flex-1 focus:outline focus:outline-2 outline-offset-2 outline-blue-500'
				/>
				<button
					onClick={toggleSortOrder}
					disabled={sortedTasks.length <= 0}
					className={`${
						sortedTasks.length <= 1
							? "opacity-70 cursor-not-allowed"
							: "cursor-pointer"
					} px-4 py-2 bg-blue-500 text-white rounded-lg  hover:bg-blue-600 focus:outline focus:outline-2 outline-offset-2 outline-blue-500 w-full md:w-auto`}
				>
					Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
				</button>
			</div>

			<div className='mt-4'>
				{tasks.length === 0 && <NoTasks />}
				{sortedTasks.map((task) => (
					<Task
						key={task.id}
						task={task}
						onEdit={() => {
							setEditTask(task);
							setShowModal(true);
						}}
						onDelete={() => setDeleteTaskId(task.id)}
					/>
				))}
			</div>
			{showModal && (
				<TaskModal
					task={editTask}
					onSave={editTask ? updateTask : addTask}
					onClose={() => {
						setShowModal(false);
						setEditTask(null);
					}}
				/>
			)}
			{deleteTaskId && (
				<ConfirmDeleteModal
					onConfirm={() => deleteTask(deleteTaskId)}
					onClose={() => setDeleteTaskId(null)}
				/>
			)}
		</div>
	);
}
