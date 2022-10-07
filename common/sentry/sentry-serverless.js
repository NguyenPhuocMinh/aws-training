import * as Sentry from '@sentry/serverless';
import configs from '../../configs';

Sentry.AWSLambda.init({
  dsn: configs.sentry.dsn,
  tracesSampleRate: 1.0,
  debug: true
});

const sentryServerless = Sentry;

export default sentryServerless;
