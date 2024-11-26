interface ConfirmDeleteModalProps {
	onConfirm: () => void;
	onClose: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
	onConfirm,
	onClose,
}) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
			<div className='bg-white p-6 rounded-lg shadow-lg'>
				<h2 className='text-xl mb-4'>Confirm Delete</h2>
				<p>Are you sure you want to delete this task?</p>
				<div className='mt-4 flex justify-end'>
					<button
						className='bg-gray-500 text-white py-1 px-3 rounded'
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className='bg-red-500 text-white py-1 px-3 ml-2 rounded'
						onClick={onConfirm}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDeleteModal;
