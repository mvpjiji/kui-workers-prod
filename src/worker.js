import { onRequest, onRequestScheduled } from '../functions/api/[[path]].js';

function apiParams(pathname) {
    const segments = pathname.slice('/api/'.length).split('/').filter(Boolean);
    return { path: segments };
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
            return onRequest({ request, env, params: apiParams(url.pathname), waitUntil: ctx.waitUntil.bind(ctx) });
        }

        return env.ASSETS.fetch(request);
    },

    async scheduled(controller, env, ctx) {
        return onRequestScheduled({ scheduledTime: controller.scheduledTime, cron: controller.cron, env, waitUntil: ctx.waitUntil.bind(ctx) });
    },
};
