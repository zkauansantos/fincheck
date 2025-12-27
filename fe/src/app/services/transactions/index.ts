import create from './create';
import remove from './delete';
import getAll from './getAll';
import getAnnual from './getAnnual';
import getCategoryAnalytics from './getCategoryAnalytics';
import update from './update';


export const transactionsService = {
  create,
  getAll,
  getAnnual,
  getCategoryAnalytics,
  update,
  delete: remove,
};
