import { Container } from 'inversify';

import AuthController from 'server/application/controllers/Auth/AuthController';

import { IAuthController } from 'server/domain/interfaces/controllers';

const container = new Container({ skipBaseClassChecks: true });

/* Definitions */
container.bind(IAuthController).to(AuthController);

export default container;
