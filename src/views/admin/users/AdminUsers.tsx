/* eslint-disable react-hooks/exhaustive-deps */

import AdminUsersTable from "@/components/AdminTable/AdminUsersTable";
import AddNewUsers from "./partials/AddNewUsers";
import CenterEmpty from "@/components/Empty/CenterEmpty";
import { Ponds, Users } from "@/services";
import cookiesHandler from "@/utils/storage/cookies";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "../../../utils/redux/slices/user";

interface IUserData {
	fullName: string;
	username: string;
	apiKey: string;
}

// interface ILoginCred {
// 	fullName: string;
// 	username: string;
// 	password: string;
// }

interface IUsersData {
	_id: string;
	fullName: string;
	username: string;
	apiKey: string;
	createdAt: string;
}

function AdminHome() {
	const [userData, setUserData] = useState<IUserData>();
	const [usersData, setUsersData] = useState<IUsersData[]>();

	const router = useRouter();

	function buttonCopy() {
		navigator.clipboard.writeText(userData?.apiKey as string);

		message.info({
			content: "User ID: " + userData?.apiKey + " has beed copied!",
		});
	}

	const getUser = async () => {
		Users.getAllUserProfiles({
			isNotify: true,
		}).then((res: any) => {
			if (!res) return;

			const sortedUsers = res.data.sort((a: IUserData, b: IUserData) => {
				if (a.username === "admin") return -1; // Username 'admin' menjadi nomor 1
				if (b.username === "admin") return 1; // Username 'admin' menjadi nomor 1
				return 0; // Urutan lainnya tidak diubah
			});
			setUsersData(sortedUsers);
		});
	};

	useEffect(() => {
		Users.getMyProfile({ isNotify: false }).then((res: any) => {
			if (!res) {
				cookiesHandler.deleteCookie("access_token");
				router.replace("/");
				return;
			}
			setUserData(res.data);
		});
		getUser();
	}, []);

	return (
		<div className="mt-8 px-2 lg:w-full lg:m-auto lg:mt-8 pb-16">
			<div className="w-full mt-16 flex flex-row justify-between items-center">
				<h2 className="text-2xl font-semibold">Users</h2>
				<AddNewUsers />
			</div>
			<div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
					<thead className="text-sm text-gray-700  capitalize bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								Id
							</th>
							<th scope="col" className="px-6 py-3">
								Full Name
							</th>
							<th scope="col" className="px-6 py-3">
								Username
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{usersData?.map((users: IUsersData, i: number) => {
							return (
								<AdminUsersTable
									listRefresher={() => getUser()}
									iterationNumber={i + 1}
									{...users}
									key={i}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default AdminHome;
