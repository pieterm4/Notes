/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
       //types of envs
        NODE_ENV: 'development' | 'production' | 'test';
        PUBLIC_URL: string;
        DEV_API_ENDPOINT: 'https://localhost:7105/api'

    }
}
