import { RedisOptions } from 'ioredis';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
};

export default {
  driver: 'redis',

  config: {
    redis : {
      host: "192.168.99.100", // Redis host
      port: 6379, // Redis port
      password: undefined,
    },
  },
} as ICacheConfig;
