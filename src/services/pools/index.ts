import { getAllPools } from "./get-all.pools";
import { createPools } from "./create.pools";
import { getPoolsByPondId } from "./get-by-pond-id.pools";
import { getPoolsById } from "./get-by-id.pools";
import { bindPools } from "./bind.pools";
import { getPoolsByPondIdAdmin } from "./get-by-pond-id.pools-admin";

const Pools = {
  getAllPools,
  getPoolsByPondId,
  createPools,
  getPoolsById,
  getPoolsByPondIdAdmin,
  bindPools,
};

export { Pools };
