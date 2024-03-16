import { Button, Modal } from "antd";
import React, { useState } from "react";

interface IUsersData {
	_id: string;
	fullName: string;
	username: string;
	apiKey: string;
	listRefresher: Function;
	iterationNumber: number;
}

function UserCard(props: IUsersData) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<button
				className="px-4 py-2 rounded bg-green-500 text-white hover:text-green-500 hover:bg-white border-2 border-green-500"
				onClick={showModal}
			>
				Show
			</button>
			<Modal
				title="Tambahkan Tambak Baru"
				open={isModalOpen}
				footer={[
					<button
						className="px-2 py-2 rounded border-2 ml-2 bg-red-500 text-white w-24"
						key="ahh"
						onClick={() => handleCancel()}
					>
						Batal
					</button>,
					<button
						onClick={handleOk}
						className="px-2 py-2 rounded border-2 ml-2 bg-green-500 text-white w-24"
						key="ahh2"
					>
						Tambah
					</button>,
				]}
				onCancel={() => handleCancel()}
			>
				<p>{props.fullName}</p>
				<p>{props.username}</p>
				<p>{props.apiKey}</p>
			</Modal>
		</div>
	);
}
export default UserCard;
