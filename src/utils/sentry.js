import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import { Environment } from 'ycloud-ui/src/config/index';
window.Sentry = Sentry;

const users = () => {
  if (Environment.USER_SENTRY && Environment.NODE_ENV === 'production') {   
    Sentry.init({
      dsn: Environment.SENTRY_DSN,
      beforeSend (event) {
        let values = event.exception.values;
        // 排除no catch 错误
        if (values && values[0].type === 'UnhandledRejection') {
          if (event.extra && event.extra.__serialized__ && event.extra.__serialized__.api && values[0].value.includes('res')) {
            values[0].value = '请求地址: ' + event.extra.__serialized__.api;
            values[0].mechanism = { handled: false, type: 'generic' };
            values[0].type = '请求返回,发生错误';
          } else {
            return null;
          }
        }
        // 排除element带来的错误影响
        if (values && values[0].type === 'Error') {
          if (values[0].value === 'ResizeObserver loop limit exceeded') {
            return null;
          } else {
            return event;
          }
        }
        return event;
      },
      integrations: [new Integrations.Vue({ Vue, attachProps: true })],
      release: Environment.RELEASE,
      logErrors: true,
      environment: Environment.USER_ENVIRONMENT
    });
  }
};

export default users;