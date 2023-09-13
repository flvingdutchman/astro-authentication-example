import type { APIContext } from 'astro';

const authEndpoint = '/oauth2/authorize';
const authScope = 'email openid profile';
const poolDomain = process.env.COGNITO_DOMAIN;
const poolClientId = process.env.COGNITO_CLIENT_ID;
const redirectUri = 'http://localhost:3000/api/auth/redirect'

if (!poolDomain || !poolClientId) {
    throw new Error(`Cognito environment is not initialized`);
}

const params = new URLSearchParams({
    client_id: poolClientId,
    response_type: 'code',
    scope: authScope,
    redirect_uri: redirectUri
});

// Exapmple URL
// https://my-domain.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=<my-client>&response_type=code&scope=email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fredirect
const loginUrl = `${poolDomain}${authEndpoint}?${params.toString()}`;


export function GET({redirect}: APIContext) {
    return redirect(loginUrl);
}

