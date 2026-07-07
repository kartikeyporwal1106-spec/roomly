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
	"/assets/AppShell-DHRZ6xVu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f80-cLTs55fJ5enCsWgwHJ5GKAk6Dhc\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 3968,
		"path": "../public/assets/AppShell-DHRZ6xVu.js"
	},
	"/assets/admin-B4sywlmB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec7-natD6zmXrLA5uNdHyh+9I9NaH6A\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 3783,
		"path": "../public/assets/admin-B4sywlmB.js"
	},
	"/assets/arrow-right-Bsby20pU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-pTNUTUC4VOOQYHwV6beK2XErPUg\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 165,
		"path": "../public/assets/arrow-right-Bsby20pU.js"
	},
	"/assets/auth-LIi5vb-c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c1-UQKL/6Phi69CF9SLXjPtzQlROa4\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 1985,
		"path": "../public/assets/auth-LIi5vb-c.js"
	},
	"/assets/avatar-BbOTd3i6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a42-m4OvPrGV4hUqlHAmaRlanH/XVr8\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 2626,
		"path": "../public/assets/avatar-BbOTd3i6.js"
	},
	"/assets/building-2-CEaYbnK3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-gdbFKRrsUG4p7WyjHpFXxlOPggA\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 383,
		"path": "../public/assets/building-2-CEaYbnK3.js"
	},
	"/assets/button-CbMTnQ6T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100b-uKQKtV+19ICAim+2tx4CthwebZ4\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 4107,
		"path": "../public/assets/button-CbMTnQ6T.js"
	},
	"/assets/dist-Cs1LKgEe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140b-VraGGi/PdMNOeQko76Bd2LMRwdQ\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 5131,
		"path": "../public/assets/dist-Cs1LKgEe.js"
	},
	"/assets/createLucideIcon-BTwyofvr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a9-6FvVu+7C6/VEBhUS0egQAm9e7FU\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 1193,
		"path": "../public/assets/createLucideIcon-BTwyofvr.js"
	},
	"/assets/dist-D_W0LEUj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de0-42QaisPfrqMjgpHjCr+q9eXNAnc\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 3552,
		"path": "../public/assets/dist-D_W0LEUj.js"
	},
	"/assets/dashboard-BJhhFQ50.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e40-8OzyzcHTJNBKi/R+WT/hbFfpsaw\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 7744,
		"path": "../public/assets/dashboard-BJhhFQ50.js"
	},
	"/assets/badge-D_QMhnO8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"329-ZmdgSgyPYbD7QlV3OtBsBVFnQsY\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 809,
		"path": "../public/assets/badge-D_QMhnO8.js"
	},
	"/assets/door-open-CwZ5QN19.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"261-0zqPYXNRt5GqVQmZhdyFs1rMDg4\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 609,
		"path": "../public/assets/door-open-CwZ5QN19.js"
	},
	"/assets/explore-BhV25Hmu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116e-yrgVJeXHhNiL9rA9yJB+9orTniA\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 4462,
		"path": "../public/assets/explore-BhV25Hmu.js"
	},
	"/assets/hostels-DkUZcygg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eeb-K/eVTEWiabLvglrHpD7l1bwC+6A\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 3819,
		"path": "../public/assets/hostels-DkUZcygg.js"
	},
	"/assets/matchContext-BxCc2jFf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c-8Hrh2AN/Qzz3X1g2Uvwp9+iWAuc\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 140,
		"path": "../public/assets/matchContext-BxCc2jFf.js"
	},
	"/assets/loader-circle-DxIxW42Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-8OXzLlx/g4Gm1lAYwv+WcS+N7IE\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 144,
		"path": "../public/assets/loader-circle-DxIxW42Q.js"
	},
	"/assets/profile._id-C4Sg7fe2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1839-bK2yycHuM33zi0SgiIwLhv1krno\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 6201,
		"path": "../public/assets/profile._id-C4Sg7fe2.js"
	},
	"/assets/queries-DfTUWG6e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"352-mxEOgkWkf6ZBMawonQdibizprVs\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 850,
		"path": "../public/assets/queries-DfTUWG6e.js"
	},
	"/assets/requests-CYBFYYcI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce5-YpwcRK84mfzQPluEp8oTO4eGACE\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 7397,
		"path": "../public/assets/requests-CYBFYYcI.js"
	},
	"/assets/roomly-logo-D8R9MQ_r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"569-hITd7tfk1L9rG+BQKvUqwo2p88w\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 1385,
		"path": "../public/assets/roomly-logo-D8R9MQ_r.js"
	},
	"/assets/roomly-data-BIdaD1E5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"341dd-sF45qYhn9kTpoU/X6lXwKBtI+mk\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 213469,
		"path": "../public/assets/roomly-data-BIdaD1E5.js"
	},
	"/assets/dist-XoqHZ9Sb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6cc-4qsf/TO0gu/xoJSDuWrtNYgxJ9c\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 1740,
		"path": "../public/assets/dist-XoqHZ9Sb.js"
	},
	"/assets/onboarding-BwdZ2oK7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f01-cz7ZmbZP2lny63fKseC2cnVd7eU\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 32513,
		"path": "../public/assets/onboarding-BwdZ2oK7.js"
	},
	"/assets/index-CMnTBHeZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dfcad-eKncMMvJ4Lb/eGAcM9F9XsOqP14\"",
		"mtime": "2026-07-07T05:06:36.260Z",
		"size": 916653,
		"path": "../public/assets/index-CMnTBHeZ.js"
	},
	"/assets/route-Cdc4f9A3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-N1LoqkMmJ6lSQd/WHpHAKAPalpQ\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 139,
		"path": "../public/assets/route-Cdc4f9A3.js"
	},
	"/assets/routes-BUXyUtK7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1330-VGgpIirxdGhE1hjnzlPxLp+vPNw\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 4912,
		"path": "../public/assets/routes-BUXyUtK7.js"
	},
	"/assets/select-B1bhFbbA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110f7-W/Ek7RAF/xnh/kKSVGglT+c1kPc\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 69879,
		"path": "../public/assets/select-B1bhFbbA.js"
	},
	"/assets/skeleton-DGuy0Wrm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd-AbMYelPFcgSeSg3LxsVlFnrDEVY\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 221,
		"path": "../public/assets/skeleton-DGuy0Wrm.js"
	},
	"/assets/settings-BPkgiWbL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e29-UPSW6iImJt2RXCW49eF78Xif9zM\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 3625,
		"path": "../public/assets/settings-BPkgiWbL.js"
	},
	"/assets/textarea-BfrcOWKo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41b-GZQJcrs5ylv/vY6f+mibammRCbY\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 1051,
		"path": "../public/assets/textarea-BfrcOWKo.js"
	},
	"/assets/useRouter-DeDOna9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234e-Loeqy2p7pFuxFqrID3iwesw38+o\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 9038,
		"path": "../public/assets/useRouter-DeDOna9C.js"
	},
	"/assets/useStore-DFEHhR9E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4873-uCBfTNiS73L5PQEb+mJMBoAwcMI\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 18547,
		"path": "../public/assets/useStore-DFEHhR9E.js"
	},
	"/assets/styles-4a8mIRia.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13774-L8UO5/SIphYSfMmRR4r/BFO6H6s\"",
		"mtime": "2026-07-07T05:06:36.262Z",
		"size": 79732,
		"path": "../public/assets/styles-4a8mIRia.css"
	},
	"/assets/users-Bu2kxg74.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-Z/BUJKDy4+J+ACxytcNSAjQG4fM\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 306,
		"path": "../public/assets/users-Bu2kxg74.js"
	},
	"/assets/users-round-B7ZnnvPn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-E6eNpa52fE3ZPTw6LJBVf7p+hNE\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 253,
		"path": "../public/assets/users-round-B7ZnnvPn.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-07-07T05:06:36.261Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
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
