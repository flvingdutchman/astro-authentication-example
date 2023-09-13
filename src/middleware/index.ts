// A file containing all the middleware functions
// See https://docs.astro.build/en/guides/middleware/

// Cookie libarary
// https://github.com/jshttp/cookie#readme

import type { APIContext } from "astro";
import { defineMiddleware } from "astro:middleware";
import cookie from "cookie";

export const onRequest = defineMiddleware(async (context: APIContext, next) => {
    const { request, locals } = context;

    const response = await next();

    if (locals.session) {
        response.headers.set("Set-cookie", cookie.serialize(
            "sid", 
            locals.session.session_id,
            {
                httpOnly: true,
                path: "/",
                sameSite: "lax"
            })
        );
    }

    return response;
});
