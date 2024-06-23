import { Button, Modal } from "antd";
import React, { useState } from "react";

interface IUsersData {
	_id: string;
	fullName: string;
	username: string;
	apiKey: string;
	createdAt: string;
	listRefresher: Function;
	iterationNumber: number;
}

function UserCard(props: IUsersData) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const formattedDate = new Date(props.createdAt).toLocaleString();

	return (
		<div>
			<button
				className="px-4 py-2 rounded bg-blue-500 text-white hover:text-blue-500 hover:bg-white border-2 border-blue-500"
				onClick={showModal}
			>
				Detail
			</button>
			<Modal
				title="Detail User"
				open={isModalOpen}
				footer={[
					<button
						className="px-2 py-2 rounded border-2 ml-2 bg-red-500 text-white w-24"
						key="ahh"
						onClick={() => handleCancel()}
					>
						Tutup
					</button>,
				]}
				onCancel={() => handleCancel()}
			>
				<div className="mt-5 mb-3">
					<label className="block text-sm font-medium text-gray-900 ">
						Nama Lengkap
					</label>
					<p className="text-gray-900 text-sm">{props.fullName}</p>
				</div>
				<div className="mb-3">
					<label className="block text-sm font-medium text-gray-900 ">
						Username
					</label>
					<p className="text-gray-900 text-sm">{props.username}</p>
				</div>
				<div className="mb-3">
					<label className="block text-sm font-medium text-gray-900 ">
						User ID
					</label>
					<p className="text-gray-900 text-sm">{props.apiKey}</p>
				</div>
				<div className="mb-3">
					<label className="block text-sm font-medium text-gray-900 ">
						Tanggal Akun Dibuat
					</label>
					<p className="text-gray-900 text-sm">{formattedDate}</p>
				</div>
			</Modal>
		</div>
	);
}
export default UserCard;
