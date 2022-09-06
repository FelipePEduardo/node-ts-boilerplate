import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
