import { Router } from '../../deps.ts';
import {
  get,
  post,
  getAll,
  remove,
  update,
} from '../controller/todoController.ts';

const router = new Router();
router
  .get('/:id', get)
  .get('/', getAll)
  .post('/', post)
  .delete('/:id', remove)
  .put('/:id', update);

export default router;
