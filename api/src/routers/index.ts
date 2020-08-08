import todoRouter from './todoRoute.ts';

const initRouters = (app: any) => {
  app.use(todoRouter.routes());
};

export default initRouters;
