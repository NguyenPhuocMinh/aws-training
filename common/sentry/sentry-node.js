import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import configs from '../../configs';

Sentry.init({
  dsn: configs.sentry.dsn,
  tracesSampleRate: 1.0,
  debug: true
});

const sentryNode = Sentry;

export default sentryNode;
