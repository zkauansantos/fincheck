import { create } from './create';
import { remove } from './delete';
import getAll from './getAll';
import { update } from './update';

export const subcategoriesService = {
  getAll,
  create,
  update,
  delete: remove,
};
