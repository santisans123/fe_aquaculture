import { useEffect, useState } from "react";

import ShowUserProfile from "./ShowUserProfile";

interface IUsersData {
	_id: string;
	fullName: string;
	username: string;
	apiKey: string;
	createdAt: string;
	listRefresher: Function;
	iterationNumber: number;
}

function AdminUsersTable(props: IUsersData) {
	return (
		<tr className="odd:bg-white  even:bg-gray-50  border-b">
			<td className="px-6 py-4">{props.iterationNumber}</td>
			<td
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
			>
				{props.fullName}
			</td>
			<td className="px-6 py-4 font-medium"> {props.username}</td>
			<td className="px-6 py-4 text-center">
				<ShowUserProfile
					_id={props._id}
					fullName={props.fullName}
					username={props.username}
					apiKey={props.apiKey}
					createdAt={props.createdAt}
					listRefresher={props.listRefresher}
					iterationNumber={props.iterationNumber}
				/>
				{/* <a
					href="#"
					className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
				>
					Show
				</a> */}
			</td>
		</tr>
	);
}

export default AdminUsersTable;
