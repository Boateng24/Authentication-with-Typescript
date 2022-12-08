import { originVal } from './allowedOrigins';

export const corsOptions = {
  origin: (origin:any, callback:any) => {
    if (originVal.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
};
