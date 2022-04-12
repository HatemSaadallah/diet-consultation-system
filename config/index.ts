import devConfig from './configuration.development';
import prodConfig from './configuration.production';

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log("Node env", NODE_ENV);

export default NODE_ENV === 'development'
  ? devConfig : prodConfig;