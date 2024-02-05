import express from 'express';

import { routerResolver } from '@application/helpers';

import { ISkillController } from '@interfaces/controllers';

import Container from '@infra/IoC';

const controller = Container.get(ISkillController);

const router = express.Router();

router.get('/search', routerResolver(controller.search.bind(controller)));
router.post('/', routerResolver(controller.create.bind(controller)));
router.patch('/:id', routerResolver(controller.update.bind(controller)));
router.patch('/reactive/:id', routerResolver(controller.reactivate.bind(controller)));
router.delete('/:id', routerResolver(controller.inactivate.bind(controller)));

export default { basePath: '/skill', router };
