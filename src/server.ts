import env from "./constants/env";
import middleware from '../shared/middleware';
import routes from './routes';
import applyMiddleware from "../shared/utils/applyMiddleware";
import applyRoutes from "../shared/utils/applyRoutes";
import app from "./app";
import { connect } from "../shared/redis";

process.on("uncaughtException", e => {
  console.error('uncaughtException', e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.error('unhandledRejection', e);
  process.exit(1);
});

applyMiddleware(app, middleware);
applyRoutes(app, routes);

app.listen(env.port, () => {
  console.log('started callback handler');

  app.locals.startup = new Date();
  app.locals.redis = connect(env.redis_url);
});
