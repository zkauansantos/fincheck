import create from "./create";
import getAll from "./getAll";
import update from "./update";
import remove from "./delete";

export const bankAccountsService = {
  create,
  getAll,
  update,
  delete: remove,
};
