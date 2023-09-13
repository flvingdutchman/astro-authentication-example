import type { APIContext } from "astro";
import { parseJWT } from "../../../utils/parseJWT";
import { userProvider, sessionProvider } from "../../../auth";
import { nanoid } from "nanoid";

const poolDomain = process.env.COGNITO_DOMAIN;
const poolClientId = process.env.COGNITO_CLIENT_ID;
const poolId = process.env.COGNITO_USER_POOL_ID;
const poolClientSecret = process.env.COGNITO_CLIENT_SECRET;


export async function GET({request, redirect, url, locals}: APIContext) {
    const code = url.searchParams.get('code');

    if (!code) {
        return {
            status: 400,
            body: 'Missing code'
        };
    }

    if (!poolDomain || !poolClientId || !poolId || !poolClientSecret) {
        return {
            status: 500,
            body: 'Missing IDP Configuration'
        };
    }

    const formData = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: poolClientId,
        redirect_uri: 'http://localhost:3000/api/auth/redirect',
        code,
    }).toString();

    const token = await fetch(`${poolDomain}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${poolClientId}:${poolClientSecret}`).toString('base64'),
        },
        body: formData,
    }).then(res => res.json());

    const userData = parseJWT(token.id_token);
    const user = userProvider.parseUserData(userData);

    await userProvider.createUser(user);

    locals.user = user;
    locals.session = {
        session_id: nanoid(32),
        user_id: user.user_id,
        expires: Math.floor(Date.now()/1000) + token.expires_in,
        token: token
    };

    await sessionProvider.createSession(locals.session);

    return redirect('/');
}