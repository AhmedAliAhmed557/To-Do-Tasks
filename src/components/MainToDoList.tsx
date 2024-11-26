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
	const [filterStatus, setFilterStatus] = useState<
		"all" | "completed" | "notCompleted"
	>("all");
	const [filterPriority, setFilterPriority] = useState<
		"all" | "high" | "medium" | "low"
	>("all");

	useEffect(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			setTasks(JSON.parse(savedTasks));
		}
	}, []);

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

	const toggleTaskDone = (id: number) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const addTask = (task: TaskType) => {
		const newTask: TaskType = {
			...task,
			id: Date.now(),
			updatedAt: Date.now(),
			completed: false,
		};
		setTasks([...tasks, newTask]);
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

	const filteredTasks = tasks
		.filter((task) =>
			task.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.filter((task) => {
			if (filterStatus === "completed") return task.completed;
			if (filterStatus === "notCompleted") return !task.completed;
			return true;
		})
		.filter((task) => {
			if (filterPriority === "all") return true;
			return task.priority === filterPriority;
		});

	const sortedTasks = filteredTasks.sort((a, b) => {
		if (sortOrder === "asc") {
			return a.title.localeCompare(b.title);
		} else {
			return b.title.localeCompare(a.title);
		}
	});

	return (
		<div className='p-4 max-w-lg md:max-w-7xl mx-auto'>
			<h1 className='text-2xl block font-bold text-center mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text border-2 border-purple-500 px-4 py-2 rounded-lg'>
				To-Do List{" "}
				<span className=''>
					{tasks.length === 0 ? "" : "(" + tasks.length + ")"}
				</span>
			</h1>

			<div className='mb-4 flex items-center justify-between gap-3 flex-col flex-wrap'>
				<div className='flex items-center gap-3 justify-between flex-col md:flex-row w-full'>
					<button
						className='bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded w-full md:w-auto'
						onClick={() => setShowModal(true)}
					>
						Add Task
					</button>

					<div className='relative w-full max-w-md flex-1 '>
						<input
							type='text'
							value={searchQuery}
							onChange={handleSearchChange}
							placeholder='Search tasks...'
							className='p-2 border border-gray-300 rounded-lg w-full focus:outline focus:outline-2 outline-offset-2 outline-blue-500'
						/>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery("")}
								className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
								aria-label='Clear search'
							>
								✕
							</button>
						)}
					</div>
					<button
						onClick={toggleSortOrder}
						disabled={sortedTasks.length <= 0}
						className={`${
							sortedTasks.length <= 1
								? "opacity-70 cursor-not-allowed"
								: "cursor-pointer"
						} px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline focus:outline-2 outline-offset-2 outline-blue-500 w-full md:w-auto`}
					>
						Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
					</button>
				</div>

				<div className='flex flex-wrap gap-2 mt-2'>
					<button
						onClick={() => {
							setFilterStatus("all");
							setFilterPriority("all");
						}}
						className={`px-4 py-2 rounded-lg ${
							filterStatus === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}
					>
						All
					</button>
					<button
						onClick={() => setFilterStatus("completed")}
						className={`px-4 py-2 rounded-lg ${
							filterStatus === "completed"
								? "bg-green-500 text-white"
								: "bg-gray-200"
						}`}
					>
						Done
					</button>
					<button
						onClick={() => setFilterStatus("notCompleted")}
						className={`px-4 py-2 rounded-lg ${
							filterStatus === "notCompleted"
								? "bg-red-500 text-white"
								: "bg-gray-200"
						}`}
					>
						Not Done
					</button>

					<button
						onClick={() => setFilterPriority("all")}
						className={`px-4 py-2 rounded-lg ${
							filterPriority === "all"
								? "bg-blue-500 text-white"
								: "bg-gray-200"
						}`}
					>
						All Priorities
					</button>
					<button
						onClick={() => setFilterPriority("high")}
						className={`px-4 py-2 rounded-lg ${
							filterPriority === "high"
								? "bg-red-500 text-white"
								: "bg-gray-200"
						}`}
					>
						High
					</button>
					<button
						onClick={() => setFilterPriority("medium")}
						className={`px-4 py-2 rounded-lg ${
							filterPriority === "medium"
								? "bg-yellow-500 text-white"
								: "bg-gray-200"
						}`}
					>
						Medium
					</button>
					<button
						onClick={() => setFilterPriority("low")}
						className={`px-4 py-2 rounded-lg ${
							filterPriority === "low"
								? "bg-green-500 text-white"
								: "bg-gray-200"
						}`}
					>
						Low
					</button>
					<button
						onClick={() => setTasks([])}
						className={`px-4 py-2 rounded-lg bg-red-500 text-white`}
					>
						Reset
					</button>
				</div>
			</div>

			<div className='mt-4'>
				{tasks.length === 0 && <NoTasks />}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{sortedTasks.map((task) => (
						<Task
							key={task.id}
							task={task}
							onEdit={() => {
								setEditTask(task);
								setShowModal(true);
							}}
							onDelete={() => setDeleteTaskId(task.id)}
							onToggleDone={() => toggleTaskDone(task.id)}
						/>
					))}
				</div>
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
