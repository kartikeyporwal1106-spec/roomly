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
	"/assets/admin-ClkiogSy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1abe-8Yi7k7/u/rrrKNOb7eMEDg04mt4\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 6846,
		"path": "../public/assets/admin-ClkiogSy.js"
	},
	"/assets/AppShell-B1J-01Qk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1585-ZvwKd04HS4YRF5uO9rJsQGYcyBg\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 5509,
		"path": "../public/assets/AppShell-B1J-01Qk.js"
	},
	"/assets/auth-eV54JXI-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c09-GHS2FSW2f9lTxthH3DeE1hR7Hd0\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 3081,
		"path": "../public/assets/auth-eV54JXI-.js"
	},
	"/assets/avatar-C7DFGQTP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-V51VX86ZSP9jEklW061iewq88Jk\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 2638,
		"path": "../public/assets/avatar-C7DFGQTP.js"
	},
	"/assets/badge-CnCkPKVb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32e-N1eWOUGOv+himke7faPHkhRFQIg\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 814,
		"path": "../public/assets/badge-CnCkPKVb.js"
	},
	"/assets/complaints-CHwSVj10.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cee-HMx9H3bcpIM/Qcd/fVkoogSUStw\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 3310,
		"path": "../public/assets/complaints-CHwSVj10.js"
	},
	"/assets/arrow-right-YolICf5F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-pJkhFLFB1JvT7bUtgn4/vNiptg4\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 165,
		"path": "../public/assets/arrow-right-YolICf5F.js"
	},
	"/assets/dashboard-lDjiww2f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22ac-tQPJ3lqjfdpO4jsGkfl5nfRpwOU\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 8876,
		"path": "../public/assets/dashboard-lDjiww2f.js"
	},
	"/assets/dist-Cc52s4fp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9f-LuPJrTKJLIHlLR+7xcufmuF1DB4\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 3487,
		"path": "../public/assets/dist-Cc52s4fp.js"
	},
	"/assets/building-2-Bbjo9Da1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-mmH5pJTG4df0AL0wRf+vce6z4bU\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 383,
		"path": "../public/assets/building-2-Bbjo9Da1.js"
	},
	"/assets/hostels-BfeLM9Lk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eed-GVD50olML1+RFYNQyo3jGFFOht0\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 3821,
		"path": "../public/assets/hostels-BfeLM9Lk.js"
	},
	"/assets/createLucideIcon-4qCv1ZkL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7cea-wWOjItn4QgBaUk9fp4fFa0b7N7E\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 31978,
		"path": "../public/assets/createLucideIcon-4qCv1ZkL.js"
	},
	"/assets/explore-5eYsbn5i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1326-Og24+NzArxi8jmhuMLGHOEZg4og\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 4902,
		"path": "../public/assets/explore-5eYsbn5i.js"
	},
	"/assets/queries-vcQQmybI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"352-+zcoOu7jDZITAEJULAOQGAekdUo\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 850,
		"path": "../public/assets/queries-vcQQmybI.js"
	},
	"/assets/matchContext-BxCc2jFf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c-8Hrh2AN/Qzz3X1g2Uvwp9+iWAuc\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 140,
		"path": "../public/assets/matchContext-BxCc2jFf.js"
	},
	"/assets/profile._id-d4UjIjD9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1822-FP5yavpkm5Pl+mKZidFNnksQoAg\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 6178,
		"path": "../public/assets/profile._id-d4UjIjD9.js"
	},
	"/assets/requests-BrQ9sXP5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c8a-BxhPdGstX7MzZwOXRGlt2vu1rTc\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 7306,
		"path": "../public/assets/requests-BrQ9sXP5.js"
	},
	"/assets/route-D3xDGIrB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c-Y4CRH7M+LXf0JKwCbltwS8Ot6Rs\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 140,
		"path": "../public/assets/route-D3xDGIrB.js"
	},
	"/assets/loader-circle-iCqfyCid.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-DsAkZ8pTDMO3XvorDYUTgoRCfPw\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 144,
		"path": "../public/assets/loader-circle-iCqfyCid.js"
	},
	"/assets/onboarding-CJRaaHX-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7615-ymU059QAtlHNPbYxMQjvQr4V1Ww\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 30229,
		"path": "../public/assets/onboarding-CJRaaHX-.js"
	},
	"/assets/input-CjLEcm2K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"276-SVNSWEDS1/9R2PG7dtVXFWUaXWI\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 630,
		"path": "../public/assets/input-CjLEcm2K.js"
	},
	"/assets/roomly-data-DKdlNHxX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33dcd-7+O3UxXLlfWems/rZ2hZS2B8idQ\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 212429,
		"path": "../public/assets/roomly-data-DKdlNHxX.js"
	},
	"/assets/excel-DqFIM4XI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"514bb-oxj+LVgROFl8ZNW1JRa9jb50t94\"",
		"mtime": "2026-07-08T17:58:55.159Z",
		"size": 332987,
		"path": "../public/assets/excel-DqFIM4XI.js"
	},
	"/assets/label-HrkUKAnf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27b-0iMG6bt0CBnAbb/YHNzxgDX1w+8\"",
		"mtime": "2026-07-08T17:58:55.160Z",
		"size": 635,
		"path": "../public/assets/label-HrkUKAnf.js"
	},
	"/assets/index-DuNQRpL_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4a9a-QJWYyIKqIsXtd+5THIRBzVIYTk0\"",
		"mtime": "2026-07-08T17:58:55.158Z",
		"size": 1002138,
		"path": "../public/assets/index-DuNQRpL_.js"
	},
	"/assets/skeleton-CVEHRtVi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-EA7eR5Otvwi4re33Z+i6x1tz0RY\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 237,
		"path": "../public/assets/skeleton-CVEHRtVi.js"
	},
	"/assets/settings-bTT6LR15.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2d-7hSzNXx9ThxzyvO6h+j+YcLEYZs\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 3629,
		"path": "../public/assets/settings-bTT6LR15.js"
	},
	"/assets/switch-CEidSJrw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e5f-nSmbfjFcFmB1Oi36TGy9xEaJFgc\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 3679,
		"path": "../public/assets/switch-CEidSJrw.js"
	},
	"/assets/textarea-BOcUrwng.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"210-iDJQUFBk6jnP1AlL49Ztr0m4Y38\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 528,
		"path": "../public/assets/textarea-BOcUrwng.js"
	},
	"/assets/upload-DJQ7MGNh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-0y4ymdesqxpEnYnUOTLGZv+9ZlM\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 230,
		"path": "../public/assets/upload-DJQ7MGNh.js"
	},
	"/assets/useRouter-DeDOna9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234e-Loeqy2p7pFuxFqrID3iwesw38+o\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 9038,
		"path": "../public/assets/useRouter-DeDOna9C.js"
	},
	"/assets/upsifs-hostel-DLMZDpne.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ce6-xHyewaR/Q6EIt3hPwFGAU6J3N44\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 15590,
		"path": "../public/assets/upsifs-hostel-DLMZDpne.js"
	},
	"/assets/users-round-B7cvEvPe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-EdM9ajWxKJZrJdbElSwLcOypyow\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 253,
		"path": "../public/assets/users-round-B7cvEvPe.js"
	},
	"/assets/useStore-DFEHhR9E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4873-uCBfTNiS73L5PQEb+mJMBoAwcMI\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 18547,
		"path": "../public/assets/useStore-DFEHhR9E.js"
	},
	"/assets/users-BvQMkGXE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"354-blBeG8GNrGJdBTx3WSAhfDjR6CQ\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 852,
		"path": "../public/assets/users-BvQMkGXE.js"
	},
	"/assets/routes-BECYr8ug.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d1-xH3h/MnUd9nnTfCS8a2JDdxeFGo\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 5073,
		"path": "../public/assets/routes-BECYr8ug.js"
	},
	"/assets/styles-y-IxSfCy.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14172-aIcl1/jmESBv9acx+pUocEY/dRI\"",
		"mtime": "2026-07-08T17:58:55.161Z",
		"size": 82290,
		"path": "../public/assets/styles-y-IxSfCy.css"
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
