import { Router, RouterOptions } from '../../deps.ts';
import { getOrder, updateOrder } from '../controller/todoOrderController.ts';

function routerWithUrl(url: string) {
  const routerUrl = `${url}/order-todo`;
  const routerOptions: RouterOptions = { prefix: routerUrl };
  const router = new Router(routerOptions);
  router.options('/').get('/', getOrder).put('/', updateOrder);
  return router;
}

export default routerWithUrl;
