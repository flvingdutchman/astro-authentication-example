import { defineConfig } from 'astro/config';
import nodejs from '@astrojs/node';
import {config as dotenvConfig} from 'dotenv';

dotenvConfig();

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: nodejs({
        mode: 'standalone',
        port: process.env.PORT || 3000,
    })
});
