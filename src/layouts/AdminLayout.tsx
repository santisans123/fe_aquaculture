/* eslint-disable react-hooks/exhaustive-deps */
import AdminHeader from "@/components/AdminLayout/Header";
import cookiesHandler from "@/utils/storage/cookies";
import { message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface IMainLayout {
	children: JSX.Element;
}

function AdminLayout({ children }: IMainLayout) {
	const router = useRouter();
	const checkLoggedIn = () => {
		const isLoggedIn = cookiesHandler.getCookie("access_token");
		const username_isLoggedIn = cookiesHandler.getCookie("username");
		const role_isLoggedIn = cookiesHandler.getCookie("role");
		if (!isLoggedIn) {
			message.info({ content: "You have to logged in first!" });
			return router.replace("/");
		} else {
			if (username_isLoggedIn != "admin") {
				message.info({ content: "You haven't admin access!" });
				return router.replace("/dashboard");
			} else {
				if (!role_isLoggedIn) {
					message.info({ content: "You haven't admin access!" });
					return router.replace("/dashboard");
				}
			}
		}
	};

	useEffect(() => {
		checkLoggedIn();
	}, []);
	return (
		<div className="w-full">
			<div className="m-auto w-11/12 md:w-10/12 lg:8/12 xl:w-6/12">
				<AdminHeader />
				{children}
			</div>
			{/* <FooterMainLayout /> */}
		</div>
	);
}

export default AdminLayout;
