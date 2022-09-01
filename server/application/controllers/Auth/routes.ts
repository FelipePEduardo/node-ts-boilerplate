import express from 'express';

import { routerResolver } from '@application/helpers';

import { IAuthController } from '@interfaces/controllers';

import Container from '@infra/IoC';

const controller = Container.get(IAuthController);

const router = express.Router();

router.get('/', routerResolver(controller.get.bind(controller)));

export default { basePath: '/auth', router };
