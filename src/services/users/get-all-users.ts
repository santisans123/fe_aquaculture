import { serviceInstance } from "..";

interface ILogin {
  isNotify: boolean;
}

async function getAllUserProfiles(user: ILogin) {
  const { data } = await serviceInstance(user.isNotify).get(
    "/api/v1/users/all"
  );
  return data;
}
export { getAllUserProfiles };
