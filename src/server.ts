import env from "./constants/env";
import middleware from './middleware';
import routes from './routes';
import applyMiddleware from "./utils/applyMiddleware";
import applyRoutes from "./utils/applyRoutes";
import app from "./app";
import { connect } from "../../runupto-shared/src/redis";

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
