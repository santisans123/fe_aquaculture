import { Auth } from "@/services";
import { Modal, Input, message } from "antd";
import { LoadingOutlined, LoginOutlined } from "@ant-design/icons";
import cookiesHandler from "@/utils/storage/cookies";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface ILoginCred {
	fullName: string;
	username: string;
	password: string;
}

function UserCard() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const [passwordConf, setPasswordConf] = useState("");
	const [cred, _setCred] = useState<ILoginCred>({
		fullName: "",
		username: "",
		password: "",
	});

	const setCred = (label: string, value: string) => {
		_setCred({
			...cred,
			[label]: value,
		});
	};

	const handleLogin = async () => {
		if (passwordConf != cred.password) {
			return message.info("Password konfirmasi tidak sama");
		}
		setLoading(true);
		Auth.register({
			data: cred,
			isNotify: true,
		}).then(() => {
			return handleCancel();
		});
	};

	const showModal = () => {
		setIsModalOpen(true);
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
				Tambahkan User
			</button>
			<Modal
				title="Tambahkan User Baru"
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
						onClick={handleLogin}
						className="px-2 py-2 rounded border-2 ml-2 bg-green-500 text-white w-24"
						key="ahh2"
					>
						{!isLoading ? (
							<p>Tambah</p>
						) : (
							<LoadingOutlined />
						)}
					</button>,
				]}
				onCancel={() => handleCancel()}
			>
				<div className="mt-4">
					<div>
						<label htmlFor="fullname" className="text-black">
							Nama Lengkap
						</label>
						<Input
							onChange={(text: any) =>
								setCred("fullName", text.target.value)
							}
							id="fullname"
							name="fullname"
						/>
					</div>
					<div>
						<label htmlFor="username" className="text-black">
							Username
						</label>
						<Input
							onChange={(text: any) =>
								setCred("username", text.target.value)
							}
							id="username"
							name="username"
						/>
					</div>
					<div>
						<label htmlFor="password" className="text-black">
							Password
						</label>
						<Input.Password
							onChange={(text: any) =>
								setCred("password", text.target.value)
							}
							id="password"
							name="password"
						/>
					</div>
					<div>
						<label htmlFor="password-conf" className="text-black">
							Konfirmasi Password
						</label>
						<Input.Password
							onChange={(text: any) =>
								setPasswordConf(text.target.value)
							}
							id="password-conf"
							name="password-conf"
						/>
					</div>
					{/* <button
						onClick={handleLogin}
						className="mt-8 w-full bg-gray-100 text-gray-700 rounded-full py-2"
					>
						{!isLoading ? (
							<p>Register</p>
						) : (
							<LoadingOutlined rev="string" />
						)}
					</button> */}
				</div>
			</Modal>
		</div>
	);
}
export default UserCard;
