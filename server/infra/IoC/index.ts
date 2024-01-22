import { Container } from 'inversify';

import UserController from '@application/controllers/User/UserController';
import AuthController from '@application/controllers/Auth/AuthController';

import { IAuthController, IUserController } from '@interfaces/controllers';

import { IUserRepository } from '@interfaces/repositories';

import { IUserService } from '@interfaces/services';

import { UserService } from '@services';

import { UserRepository } from '@repositories';

const container = new Container({ skipBaseClassChecks: true });

/* Controllers */
container.bind(IAuthController).to(AuthController);
container.bind(IUserController).to(UserController);

/* Services */
container.bind(IUserService).to(UserService);

/* Repositories */
container.bind(IUserRepository).to(UserRepository);

export default container;
