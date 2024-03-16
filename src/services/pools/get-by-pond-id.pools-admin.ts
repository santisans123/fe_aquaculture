import { serviceInstance } from "..";

interface ILogin {
  isNotify: boolean;
  pondId: string;
}

async function getPoolsByPondIdAdmin(user: ILogin) {
  const { data } = await serviceInstance(user.isNotify).get(
    "/api/v1/pools/pondsIdAdmin/" + user.pondId
  );
  return data;
}
export { getPoolsByPondIdAdmin };
