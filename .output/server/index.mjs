globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/AppShell-wyDw_dN7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6f-HGHJICHXnQzT/lVpINtYY2RoKJI\"",
		"mtime": "2026-07-06T20:03:29.662Z",
		"size": 3951,
		"path": "../public/assets/AppShell-wyDw_dN7.js"
	},
	"/assets/arrow-right-Bsby20pU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-pTNUTUC4VOOQYHwV6beK2XErPUg\"",
		"mtime": "2026-07-06T20:03:29.662Z",
		"size": 165,
		"path": "../public/assets/arrow-right-Bsby20pU.js"
	},
	"/assets/admin-QXIZKaoN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec7-D8oOrou/GMuTvy/mDIr9Q4KMFpA\"",
		"mtime": "2026-07-06T20:03:29.662Z",
		"size": 3783,
		"path": "../public/assets/admin-QXIZKaoN.js"
	},
	"/assets/auth-DvfAD3bq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c1-+sU18eo1zyaPSKYjwZko2zKK+wc\"",
		"mtime": "2026-07-06T20:03:29.662Z",
		"size": 1985,
		"path": "../public/assets/auth-DvfAD3bq.js"
	},
	"/assets/avatar--HF4u0Pe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a42-OF4FhrxyL9lx9jNhrnMGaJx4sYM\"",
		"mtime": "2026-07-06T20:03:29.662Z",
		"size": 2626,
		"path": "../public/assets/avatar--HF4u0Pe.js"
	},
	"/assets/badge-D_QMhnO8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"329-ZmdgSgyPYbD7QlV3OtBsBVFnQsY\"",
		"mtime": "2026-07-06T20:03:29.663Z",
		"size": 809,
		"path": "../public/assets/badge-D_QMhnO8.js"
	},
	"/assets/building-2-CEaYbnK3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-gdbFKRrsUG4p7WyjHpFXxlOPggA\"",
		"mtime": "2026-07-06T20:03:29.663Z",
		"size": 383,
		"path": "../public/assets/building-2-CEaYbnK3.js"
	},
	"/assets/createLucideIcon-BTwyofvr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a9-6FvVu+7C6/VEBhUS0egQAm9e7FU\"",
		"mtime": "2026-07-06T20:03:29.663Z",
		"size": 1193,
		"path": "../public/assets/createLucideIcon-BTwyofvr.js"
	},
	"/assets/button-CbMTnQ6T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100b-uKQKtV+19ICAim+2tx4CthwebZ4\"",
		"mtime": "2026-07-06T20:03:29.663Z",
		"size": 4107,
		"path": "../public/assets/button-CbMTnQ6T.js"
	},
	"/assets/dashboard-DxPboJ8W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8e-x5sWWYjQmbpxtVnXVovIjqLyfRI\"",
		"mtime": "2026-07-06T20:03:29.663Z",
		"size": 6798,
		"path": "../public/assets/dashboard-DxPboJ8W.js"
	},
	"/assets/dist-1tUvxsND.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de0-VimChXz3twZY5Hv5lO7nolMBiiU\"",
		"mtime": "2026-07-06T20:03:29.663Z",
		"size": 3552,
		"path": "../public/assets/dist-1tUvxsND.js"
	},
	"/assets/dist-B7E13Niz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6cc-slIGvdv3I3L4b1yiWUZOm+jTYtI\"",
		"mtime": "2026-07-06T20:03:29.664Z",
		"size": 1740,
		"path": "../public/assets/dist-B7E13Niz.js"
	},
	"/assets/dist-CVxIucbf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140b-YHkf6N+HS2N35WK8ZEKfI6B0byE\"",
		"mtime": "2026-07-06T20:03:29.664Z",
		"size": 5131,
		"path": "../public/assets/dist-CVxIucbf.js"
	},
	"/assets/door-open-CwZ5QN19.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"261-0zqPYXNRt5GqVQmZhdyFs1rMDg4\"",
		"mtime": "2026-07-06T20:03:29.664Z",
		"size": 609,
		"path": "../public/assets/door-open-CwZ5QN19.js"
	},
	"/assets/explore-DVkBB_hx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116e-1AzdPvvUORb3jgcTvs3hU+jwCxU\"",
		"mtime": "2026-07-06T20:03:29.664Z",
		"size": 4462,
		"path": "../public/assets/explore-DVkBB_hx.js"
	},
	"/assets/hostels-D_5wt2NB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eeb-W4L/ePBFRmxF5btmzYdx9LN4srg\"",
		"mtime": "2026-07-06T20:03:29.664Z",
		"size": 3819,
		"path": "../public/assets/hostels-D_5wt2NB.js"
	},
	"/assets/loader-circle-DxIxW42Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-8OXzLlx/g4Gm1lAYwv+WcS+N7IE\"",
		"mtime": "2026-07-06T20:03:29.664Z",
		"size": 144,
		"path": "../public/assets/loader-circle-DxIxW42Q.js"
	},
	"/assets/onboarding-BfBc3NUr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7e0b-MvVmKOn3xBf8xhOBReBcr+C2CiI\"",
		"mtime": "2026-07-06T20:03:29.665Z",
		"size": 32267,
		"path": "../public/assets/onboarding-BfBc3NUr.js"
	},
	"/assets/matchContext-BxCc2jFf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c-8Hrh2AN/Qzz3X1g2Uvwp9+iWAuc\"",
		"mtime": "2026-07-06T20:03:29.664Z",
		"size": 140,
		"path": "../public/assets/matchContext-BxCc2jFf.js"
	},
	"/assets/profile._id-BKdReJkS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1839-DI+GEjsXsPbTgZqvx040l1CM36M\"",
		"mtime": "2026-07-06T20:03:29.665Z",
		"size": 6201,
		"path": "../public/assets/profile._id-BKdReJkS.js"
	},
	"/assets/queries-DHq43lOV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33d-Y2ACc1eO2c2B2p8mUV/YNEvPTJo\"",
		"mtime": "2026-07-06T20:03:29.665Z",
		"size": 829,
		"path": "../public/assets/queries-DHq43lOV.js"
	},
	"/assets/requests-DXZgtM5t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce5-E/ULWqfGDXp4NVieH1KBmpzgrho\"",
		"mtime": "2026-07-06T20:03:29.665Z",
		"size": 7397,
		"path": "../public/assets/requests-DXZgtM5t.js"
	},
	"/assets/roomly-logo-D8R9MQ_r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"569-hITd7tfk1L9rG+BQKvUqwo2p88w\"",
		"mtime": "2026-07-06T20:03:29.665Z",
		"size": 1385,
		"path": "../public/assets/roomly-logo-D8R9MQ_r.js"
	},
	"/assets/roomly-data-BNI0lTnI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"341dd-tTaZHM0tO0hQUdS5To+b4my40L4\"",
		"mtime": "2026-07-06T20:03:29.665Z",
		"size": 213469,
		"path": "../public/assets/roomly-data-BNI0lTnI.js"
	},
	"/assets/index-D5mRZscw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dfc9e-czAPO8qyLJs5CkUmgLoDVGD4Na8\"",
		"mtime": "2026-07-06T20:03:29.662Z",
		"size": 916638,
		"path": "../public/assets/index-D5mRZscw.js"
	},
	"/assets/route-C3M5P6jd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-qcFUhZABxAU7Ej1g1avhN3d9Ch0\"",
		"mtime": "2026-07-06T20:03:29.666Z",
		"size": 139,
		"path": "../public/assets/route-C3M5P6jd.js"
	},
	"/assets/select-Dd1x-rp1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110f7-wBXEXjf4cnSy2dQ//PdIn/byleI\"",
		"mtime": "2026-07-06T20:03:29.666Z",
		"size": 69879,
		"path": "../public/assets/select-Dd1x-rp1.js"
	},
	"/assets/settings-DNJUOd5N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e29-moLslRUdZl1NEMgERMKmKPc7P38\"",
		"mtime": "2026-07-06T20:03:29.666Z",
		"size": 3625,
		"path": "../public/assets/settings-DNJUOd5N.js"
	},
	"/assets/skeleton-DGuy0Wrm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd-AbMYelPFcgSeSg3LxsVlFnrDEVY\"",
		"mtime": "2026-07-06T20:03:29.667Z",
		"size": 221,
		"path": "../public/assets/skeleton-DGuy0Wrm.js"
	},
	"/assets/styles-BfddCotQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13534-sFA1ZvlvYNfR1GvwTdADuuJENJQ\"",
		"mtime": "2026-07-06T20:03:29.668Z",
		"size": 79156,
		"path": "../public/assets/styles-BfddCotQ.css"
	},
	"/assets/textarea-ClhSjKED.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41b-0300mA4jEFpo468bPt0LA0q08EE\"",
		"mtime": "2026-07-06T20:03:29.667Z",
		"size": 1051,
		"path": "../public/assets/textarea-ClhSjKED.js"
	},
	"/assets/useStore-DFEHhR9E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4873-uCBfTNiS73L5PQEb+mJMBoAwcMI\"",
		"mtime": "2026-07-06T20:03:29.667Z",
		"size": 18547,
		"path": "../public/assets/useStore-DFEHhR9E.js"
	},
	"/assets/useRouter-DeDOna9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234e-Loeqy2p7pFuxFqrID3iwesw38+o\"",
		"mtime": "2026-07-06T20:03:29.667Z",
		"size": 9038,
		"path": "../public/assets/useRouter-DeDOna9C.js"
	},
	"/assets/users-Bu2kxg74.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-Z/BUJKDy4+J+ACxytcNSAjQG4fM\"",
		"mtime": "2026-07-06T20:03:29.667Z",
		"size": 306,
		"path": "../public/assets/users-Bu2kxg74.js"
	},
	"/assets/users-round-B7ZnnvPn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-E6eNpa52fE3ZPTw6LJBVf7p+hNE\"",
		"mtime": "2026-07-06T20:03:29.668Z",
		"size": 253,
		"path": "../public/assets/users-round-B7ZnnvPn.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-07-06T20:03:29.668Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/routes-qyOoYn54.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1330-cUNiiovr8N+96hUX1CvIecaWL+4\"",
		"mtime": "2026-07-06T20:03:29.666Z",
		"size": 4912,
		"path": "../public/assets/routes-qyOoYn54.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_lXDSgv = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_lXDSgv
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
