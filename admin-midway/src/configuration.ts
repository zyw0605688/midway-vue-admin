import {Configuration, App} from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import {ReportMiddleware} from './middleware/report.middleware.js';
import {ResponseMiddleware} from './middleware/response.middleware.js';
import {DefaultErrorFilter} from './filter/default.filter.js';
import {NotFoundFilter} from './filter/notfound.filter.js';
import DefaultConfig from './config/config.default.js';
import UnittestConfig from './config/config.unittest.js';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [
    {
      default: DefaultConfig,
      unittest: UnittestConfig,
    },
  ],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    this.app.useMiddleware([ReportMiddleware, ResponseMiddleware]);
    this.app.useFilter([DefaultErrorFilter, NotFoundFilter]);
  }
}
