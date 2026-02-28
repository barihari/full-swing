import { init } from '@instantdb/react';
import schema from './schema';

const APP_ID = '9793ef60-5bc8-483e-b712-c6897ff04405';

const db = init({ appId: APP_ID, schema });

export default db;
