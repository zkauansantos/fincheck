import getAll from './getAll';
import { create } from './create';
import { update } from './update';
import { remove } from './delete';

export const subcategoriesService = {
  getAll,
  create,
  update,
  delete: remove,
};