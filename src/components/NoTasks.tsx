import React from "react";

const NoTasks: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center h-48 mt-20 text-center animate-bounce bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-md'>
			<h2 className='text-2xl font-semibold text-white mb-2'>No Tasks Yet!</h2>
			<p className='text-white text-opacity-80'>
				Add your first task to get started
			</p>
		</div>
	);
};

export default NoTasks;
