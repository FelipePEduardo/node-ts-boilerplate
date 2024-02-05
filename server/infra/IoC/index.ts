import { Container } from 'inversify';

import UserController from '@application/controllers/User/UserController';
import AuthController from '@application/controllers/Auth/AuthController';
import SkillController from '@application/controllers/Skill/SkillController';

import { IAuthController, ISkillController, IUserController } from '@interfaces/controllers';

import { ISkillRepository, IUserRepository } from '@interfaces/repositories';

import { ISkillService, IUserService } from '@interfaces/services';

import { SkillService, UserService } from '@services';

import { SkillRepository, UserRepository } from '@repositories';

const container = new Container({ skipBaseClassChecks: true });

/* Controllers */
container.bind(IAuthController).to(AuthController);
container.bind(IUserController).to(UserController);
container.bind(ISkillController).to(SkillController);

/* Services */
container.bind(IUserService).to(UserService);
container.bind(ISkillService).to(SkillService);

/* Repositories */
container.bind(IUserRepository).to(UserRepository);
container.bind(ISkillRepository).to(SkillRepository);

export default container;
