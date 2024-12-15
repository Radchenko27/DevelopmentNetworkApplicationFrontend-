import { resolve } from 'path';

import { generateApi } from 'swagger-typescript-api';

generateApi({
    name: 'Api.ts',
    output: resolve(process.cwd(), './src/api'),
    input: resolve(process.cwd(), './swagger/Swagger.yml'),
    url: 'http://127.0.0.1:8000/swagger/?format=openapi',
    httpClientType: 'axios',
});