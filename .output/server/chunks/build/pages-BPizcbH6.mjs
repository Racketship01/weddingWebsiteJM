import { _ as _sfc_main$8, u as useToast, a as _sfc_main$14, b as useComponentProps, c as useAppConfig, d as useForwardProps, r as reactivePick, t as tv, e as _sfc_main$11, f as formBusInjectionKey, g as formStateInjectionKey, h as formErrorsInjectionKey, i as formInputsInjectionKey, j as formLoadingInjectionKey, k as formOptionsInjectionKey, $ as $fetch$2, l as useFormField, m as useFieldGroup, n as useComponentIcons, P as Primitive, o as makeDestructurable, p as camelize$1, q as isDef, s as looseToNumber, v as isEmpty, w as tryOnScopeDispose } from '../virtual/entry.mjs';
import { w as weddingInfo } from './wedding-CPT_lFsD.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, ref, reactive, resolveComponent, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, vModelRadio, createSlots, useSlots, computed, renderSlot, Fragment, useId, useTemplateRef, inject, provide, readonly, resolveDynamicComponent, onScopeDispose, watch, nextTick, shallowRef, normalizeProps, guardReactiveProps, getCurrentInstance, toRaw, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderSlot, ssrRenderVNode } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import 'unhead/plugins';
import 'unhead/utils';
import '../routes/renderer.mjs';
import '../_/nitro.mjs';
import 'nodemailer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';
import 'node:path';
import 'unhead/server';
import 'unhead/legacy';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';

//#region node_modules/reka-ui/dist/component/BaseSeparator.js
var BaseSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "BaseSeparator",
	props: {
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		decorative: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const ORIENTATIONS = ["horizontal", "vertical"];
		function isValidOrientation(orientation) {
			return ORIENTATIONS.includes(orientation);
		}
		const computedOrientation = computed(() => isValidOrientation(props.orientation) ? props.orientation : "horizontal");
		const ariaOrientation = computed(() => computedOrientation.value === "vertical" ? props.orientation : void 0);
		const semanticProps = computed(() => props.decorative ? { role: "none" } : {
			"aria-orientation": ariaOrientation.value,
			"role": "separator"
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-orientation": computedOrientation.value
			}, semanticProps.value), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"data-orientation"
			]);
		};
	}
});
//#endregion
//#region node_modules/reka-ui/dist/Separator/Separator.js
var Separator_default = /* @__PURE__ */ defineComponent({
	__name: "Separator",
	props: {
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		decorative: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(BaseSeparator_default, normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/@nuxt/ui/node_modules/@vueuse/core/dist/index.js
/**
* This function creates `define` and `reuse` components in pair,
* It also allow to pass a generic to bind with type.
*
* @see https://vueuse.org/createReusableTemplate
*
* @__NO_SIDE_EFFECTS__
*/
function createReusableTemplate(options = {}) {
	const { inheritAttrs = true, name = "ReusableTemplate" } = options;
	const render = shallowRef();
	const define = defineComponent({
		name: `${name}.define`,
		setup(_, { slots }) {
			return () => {
				render.value = slots.default;
			};
		}
	});
	const reuse = defineComponent({
		inheritAttrs,
		name: `${name}.reuse`,
		props: options.props,
		setup(props, { attrs, slots }) {
			return () => {
				var _render$value;
				if (!render.value && true) throw new Error("[VueUse] Failed to find the definition of reusable template");
				const vnode = (_render$value = render.value) === null || _render$value === void 0 ? void 0 : _render$value.call(render, {
					...options.props == null ? keysToCamelKebabCase(attrs) : props,
					$slots: slots
				});
				return inheritAttrs && (vnode === null || vnode === void 0 ? void 0 : vnode.length) === 1 ? vnode[0] : vnode;
			};
		}
	});
	return makeDestructurable({
		define,
		reuse
	}, [define, reuse]);
}
function keysToCamelKebabCase(obj) {
	const newObj = {};
	for (const key in obj) newObj[camelize$1(key)] = obj[key];
	return newObj;
}
function cloneFnJSON(source) {
	return JSON.parse(JSON.stringify(source));
}
var events = /* @__PURE__ */ new Map();
/* @__NO_SIDE_EFFECTS__ */
function useEventBus(key) {
	function on(listener) {
		const listeners = events.get(key) || /* @__PURE__ */ new Set();
		listeners.add(listener);
		events.set(key, listeners);
		const _off = () => off(listener);
		tryOnScopeDispose(_off);
		return _off;
	}
	function once(listener) {
		function _listener(...args) {
			off(_listener);
			listener(...args);
		}
		return on(_listener);
	}
	function off(listener) {
		const listeners = events.get(key);
		if (!listeners) return;
		listeners.delete(listener);
		if (!listeners.size) reset();
	}
	function reset() {
		events.delete(key);
	}
	function emit(event, payload) {
		var _events$get;
		(_events$get = events.get(key)) === null || _events$get === void 0 || _events$get.forEach((v) => v(event, payload));
	}
	return {
		on,
		once,
		off,
		emit,
		reset
	};
}
/**
* Shorthand for v-model binding, props + emit -> ref
*
* @see https://vueuse.org/useVModel
* @param props
* @param key (default 'modelValue')
* @param emit
* @param options
*
* @__NO_SIDE_EFFECTS__
*/
function useVModel(props, key, emit, options = {}) {
	var _vm$$emit, _vm$proxy;
	const { clone = false, passive = false, eventName, deep = false, defaultValue, shouldEmit } = options;
	const vm = getCurrentInstance();
	const _emit = emit || (vm === null || vm === void 0 ? void 0 : vm.emit) || (vm === null || vm === void 0 || (_vm$$emit = vm.$emit) === null || _vm$$emit === void 0 ? void 0 : _vm$$emit.bind(vm)) || (vm === null || vm === void 0 || (_vm$proxy = vm.proxy) === null || _vm$proxy === void 0 || (_vm$proxy = _vm$proxy.$emit) === null || _vm$proxy === void 0 ? void 0 : _vm$proxy.bind(vm === null || vm === void 0 ? void 0 : vm.proxy));
	let event = eventName;
	event = event || `update:${key.toString()}`;
	const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
	const getValue = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
	const triggerEmit = (value) => {
		if (shouldEmit) {
			if (shouldEmit(value)) _emit(event, value);
		} else _emit(event, value);
	};
	if (passive) {
		const proxy = ref(getValue());
		let isUpdating = false;
		watch(() => props[key], (v) => {
			if (!isUpdating) {
				isUpdating = true;
				proxy.value = cloneFn(v);
				nextTick(() => isUpdating = false);
			}
		});
		watch(proxy, (v) => {
			if (!isUpdating && (v !== props[key] || deep)) triggerEmit(v);
		}, { deep });
		return proxy;
	} else return computed({
		get() {
			return getValue();
		},
		set(value) {
			triggerEmit(value);
		}
	});
}
//#endregion
//#region app/assets/image/JM5.jpg
var JM5_default = __buildAssetsURL("JM5.C-iz-7B9.jpg");
//#endregion
//#region app/assets/image/corner.png
var corner_default = __buildAssetsURL("corner.n2jCIW5n.png");
//#endregion
//#region app/assets/image/corner_down.png
var corner_down_default = __buildAssetsURL("corner_down.Bq0d2MoP.png");
//#endregion
//#region app/components/sections/HeroSection.vue?vue&type=script&setup=true&lang.ts
var HeroSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HeroSection",
	__ssrInlineRender: true,
	setup(__props) {
		const scrollToDetails = () => {
			const target = (void 0).getElementById("details");
			if (target) (void 0).scrollTo({
				top: target.offsetTop - 80,
				behavior: "smooth"
			});
		};
		const { couple, date, hashtag, heroLabel, heroSupporting, heroCta } = weddingInfo;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main$8;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "hero",
				class: "relative min-h-screen w-full overflow-hidden"
			}, _attrs))}><div class="absolute inset-0 bg-cover bg-center bg-no-repeat bg-primary-700" style="${ssrRenderStyle({ backgroundImage: `url(${unref(JM5_default)})` })}"></div><div class="absolute inset-0 bg-gradient-to-br from-primary-600/85 via-primary-500/70 to-powderBlue-soft/55"></div><div class="pointer-events-none absolute inset-3 z-20 rounded-sm border border-white/20 sm:inset-5 md:inset-10 lg:inset-14 md:border-white/25"></div><img${ssrRenderAttr("src", unref(corner_default))} alt="Floral corner decoration" class="z-20 pointer-events-none absolute -top-2 -left-2 h-40 w-40 max-w-[45vw] max-h-[45vw] object-contain sm:top-0 sm:left-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><img${ssrRenderAttr("src", unref(corner_down_default))} alt="Floral corner decoration" class="z-20 pointer-events-none absolute -bottom-2 -right-2 h-40 w-40 max-w-[45vw] max-h-[45vw] object-contain sm:bottom-0 sm:right-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-28 text-center sm:px-6 md:px-10"><div class="text-[11px] mb-4 tracking-[0.25em] uppercase text-white/90 sm:text-sans-small-caps sm:mb-6 md:mb-8 md:text-[13px]">${ssrInterpolate(unref(heroLabel))}</div><h1 class="mb-3 font-serif-display leading-none text-white text-[2.75rem] sm:mb-4 sm:text-5xl sm:leading-tight md:mb-6 md:text-7xl lg:text-8xl">${ssrInterpolate(unref(couple).combined)}</h1><p class="mb-5 max-w-xl font-serif-body text-base italic leading-relaxed text-white/90 sm:mb-6 sm:text-lg md:mb-8 md:max-w-2xl md:text-xl lg:text-2xl">${ssrInterpolate(unref(heroSupporting))}</p><div class="mb-3 text-[11px] tracking-[0.2em] uppercase text-white/85 sm:text-sans-small-caps md:mb-4 md:text-[13px]">${ssrInterpolate(unref(date).fullDate)}</div><div class="mb-8 font-script text-xl text-champagne-light sm:mb-10 sm:text-2xl md:text-3xl">${ssrInterpolate(unref(hashtag))}</div>`);
			_push(ssrRenderComponent(_component_UButton, {
				"rounded-full": "",
				class: "bg-champagne px-7 py-3 text-[11px] tracking-[0.2em] uppercase text-warmWhite transition hover:bg-gold sm:px-10 sm:py-4 sm:text-sm md:px-12",
				onClick: scrollToDetails
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(heroCta))}`);
					else return [createTextVNode(toDisplayString(unref(heroCta)), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div><button aria-label="Scroll down" class="z-20 absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 animate-bounce sm:bottom-8 md:bottom-10"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></button></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/HeroSection.vue
var _sfc_setup$19 = HeroSection_vue_vue_type_script_setup_true_lang_default.setup;
HeroSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/HeroSection.vue");
	return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
var HeroSection_default = Object.assign(HeroSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsHeroSection" });
//#endregion
//#region app/composables/useScrollSpy.ts
function useScrollSpy(sectionIds, offset = 120) {
	return { activeSection: ref(sectionIds[0] ?? "") };
}
//#endregion
//#region app/components/sections/StickyNavigation.vue?vue&type=script&setup=true&lang.ts
var StickyNavigation_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StickyNavigation",
	__ssrInlineRender: true,
	setup(__props) {
		const navItems = [
			{
				id: "details",
				label: "Details"
			},
			{
				id: "schedule",
				label: "Schedule"
			},
			{
				id: "entourage",
				label: "Entourage"
			},
			{
				id: "gallery",
				label: "Gallery"
			},
			{
				id: "venue",
				label: "Venue"
			},
			{
				id: "dresscode",
				label: "Attire"
			},
			{
				id: "reminders",
				label: "Reminders"
			},
			{
				id: "rsvp",
				label: "RSVP"
			}
		];
		const { activeSection } = useScrollSpy([
			"details",
			"schedule",
			"entourage",
			"gallery",
			"venue",
			"dresscode",
			"reminders",
			"rsvp"
		], 140);
		const mobileMenu = ref(false);
		const { couple } = weddingInfo;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<nav${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 border-b border-beige/60 bg-cream/95 shadow-soft backdrop-blur transition" }, _attrs))}><div class="hidden md:block"><div class="mx-auto flex max-w-wedding items-center justify-between py-3 px-6"><a href="#hero" class="font-serif-display text-lg text-burgundy md:text-xl">${ssrInterpolate(unref(couple).combined)}</a><div class="flex gap-6 md:gap-8"><!--[-->`);
			ssrRenderList(navItems, (item) => {
				_push(`<a${ssrRenderAttr("href", "#" + item.id)} class="${ssrRenderClass(["text-[13px] font-medium uppercase tracking-[0.18em] transition", unref(activeSection) === item.id ? "font-bold text-burgundy underline decoration-2 underline-offset-8 decoration-gold" : "text-burgundy/80 hover:text-burgundy"])}">${ssrInterpolate(item.label)}</a>`);
			});
			_push(`<!--]--></div></div></div><div class="flex items-center justify-between py-3 px-5 md:hidden"><a href="#hero" class="font-serif-display text-lg text-burgundy">${ssrInterpolate(unref(couple).combined)}</a><button aria-label="Open menu" class="flex h-10 w-10 items-center justify-center rounded-full border border-burgundy/20 text-burgundy">`);
			if (!mobileMenu.value) _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
			else _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`);
			_push(`</button></div>`);
			if (mobileMenu.value) {
				_push(`<div class="absolute inset-x-0 top-full border-b border-beige/60 bg-cream shadow-soft md:hidden"><div class="flex flex-col"><!--[-->`);
				ssrRenderList(navItems, (item) => {
					_push(`<a${ssrRenderAttr("href", "#" + item.id)} class="border-b border-beige/40 px-6 py-4 text-sm uppercase tracking-[0.18em] text-burgundy">${ssrInterpolate(item.label)}</a>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</nav>`);
		};
	}
});
//#endregion
//#region app/components/sections/StickyNavigation.vue
var _sfc_setup$18 = StickyNavigation_vue_vue_type_script_setup_true_lang_default.setup;
StickyNavigation_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/StickyNavigation.vue");
	return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
var StickyNavigation_default = Object.assign(StickyNavigation_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsStickyNavigation" });
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fseparator.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fseparator_default = {
	"slots": {
		"root": "flex items-center align-center text-center",
		"border": "",
		"container": "font-medium text-default flex",
		"icon": "shrink-0 size-5",
		"avatar": "shrink-0",
		"avatarSize": "2xs",
		"label": "text-sm"
	},
	"variants": {
		"color": {
			"primary": { "border": "border-primary" },
			"secondary": { "border": "border-secondary" },
			"success": { "border": "border-success" },
			"info": { "border": "border-info" },
			"warning": { "border": "border-warning" },
			"error": { "border": "border-error" },
			"neutral": { "border": "border-default" }
		},
		"orientation": {
			"horizontal": {
				"root": "w-full flex-row",
				"border": "w-full",
				"container": "whitespace-nowrap"
			},
			"vertical": {
				"root": "h-full flex-col",
				"border": "h-full",
				"container": ""
			}
		},
		"size": {
			"xs": "",
			"sm": "",
			"md": "",
			"lg": "",
			"xl": ""
		},
		"position": {
			"start": "",
			"center": "",
			"end": ""
		},
		"type": {
			"solid": { "border": "border-solid" },
			"dashed": { "border": "border-dashed" },
			"dotted": { "border": "border-dotted" }
		}
	},
	"compoundVariants": [
		{
			"orientation": "horizontal",
			"position": "start",
			"class": { "container": "me-3" }
		},
		{
			"orientation": "horizontal",
			"position": "center",
			"class": { "container": "mx-3" }
		},
		{
			"orientation": "horizontal",
			"position": "end",
			"class": { "container": "ms-3" }
		},
		{
			"orientation": "vertical",
			"position": "start",
			"class": { "container": "mb-2" }
		},
		{
			"orientation": "vertical",
			"position": "center",
			"class": { "container": "my-2" }
		},
		{
			"orientation": "vertical",
			"position": "end",
			"class": { "container": "mt-2" }
		},
		{
			"orientation": "horizontal",
			"size": "xs",
			"class": { "border": "border-t" }
		},
		{
			"orientation": "horizontal",
			"size": "sm",
			"class": { "border": "border-t-[2px]" }
		},
		{
			"orientation": "horizontal",
			"size": "md",
			"class": { "border": "border-t-[3px]" }
		},
		{
			"orientation": "horizontal",
			"size": "lg",
			"class": { "border": "border-t-[4px]" }
		},
		{
			"orientation": "horizontal",
			"size": "xl",
			"class": { "border": "border-t-[5px]" }
		},
		{
			"orientation": "vertical",
			"size": "xs",
			"class": { "border": "border-s" }
		},
		{
			"orientation": "vertical",
			"size": "sm",
			"class": { "border": "border-s-[2px]" }
		},
		{
			"orientation": "vertical",
			"size": "md",
			"class": { "border": "border-s-[3px]" }
		},
		{
			"orientation": "vertical",
			"size": "lg",
			"class": { "border": "border-s-[4px]" }
		},
		{
			"orientation": "vertical",
			"size": "xl",
			"class": { "border": "border-s-[5px]" }
		}
	],
	"defaultVariants": {
		"color": "neutral",
		"size": "xs",
		"type": "solid"
	}
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Separator.vue
var _sfc_main$3 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "USeparator",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		label: {
			type: String,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
			required: false
		},
		color: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		type: {
			type: null,
			required: false
		},
		orientation: {
			type: null,
			required: false,
			default: "horizontal"
		},
		position: {
			type: null,
			required: false,
			default: "center"
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: null,
			required: false
		},
		decorative: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("separator", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "as", "decorative", "orientation"));
		const [DefineContainer, ReuseContainer] = createReusableTemplate();
		const hasContent = computed(() => !!(props.label || props.icon || props.avatar || slots.default));
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fseparator_default,
			...appConfig.ui?.separator || {}
		})({
			color: props.color,
			orientation: props.orientation,
			size: props.size,
			position: props.position,
			type: props.type
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineContainer), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
							if (unref(props).label) _push(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: unref(props).ui?.label }))}"${_scopeId}>${ssrInterpolate(unref(props).label)}</span>`);
							else if (unref(props).icon) _push(ssrRenderComponent(_sfc_main$14, {
								name: unref(props).icon,
								"data-slot": "icon",
								class: ui.value.icon({ class: unref(props).ui?.icon })
							}, null, _parent, _scopeId));
							else if (unref(props).avatar) _push(ssrRenderComponent(_sfc_main$11, mergeProps({ size: unref(props).ui?.avatarSize || ui.value.avatarSize() }, unref(props).avatar, {
								"data-slot": "avatar",
								class: ui.value.avatar({ class: unref(props).ui?.avatar })
							}), null, _parent, _scopeId));
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						_push(`</div>`);
					} else return [createVNode("div", {
						"data-slot": "container",
						class: ui.value.container({ class: unref(props).ui?.container })
					}, [renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [unref(props).label ? (openBlock(), createBlock("span", {
						key: 0,
						"data-slot": "label",
						class: ui.value.label({ class: unref(props).ui?.label })
					}, toDisplayString(unref(props).label), 3)) : unref(props).icon ? (openBlock(), createBlock(_sfc_main$14, {
						key: 1,
						name: unref(props).icon,
						"data-slot": "icon",
						class: ui.value.icon({ class: unref(props).ui?.icon })
					}, null, 8, ["name", "class"])) : unref(props).avatar ? (openBlock(), createBlock(_sfc_main$11, mergeProps({
						key: 2,
						size: unref(props).ui?.avatarSize || ui.value.avatarSize()
					}, unref(props).avatar, {
						"data-slot": "avatar",
						class: ui.value.avatar({ class: unref(props).ui?.avatar })
					}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(Separator_default), mergeProps({ "data-slot": "root" }, {
				...unref(rootProps),
				..._ctx.$attrs
			}, { class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }) }), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (hasContent.value && unref(props).position === "start") _push(ssrRenderComponent(unref(ReuseContainer), null, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`<div data-slot="border" class="${ssrRenderClass(ui.value.border({ class: unref(props).ui?.border }))}"${_scopeId}></div>`);
						if (hasContent.value && unref(props).position === "center") {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(unref(ReuseContainer), null, null, _parent, _scopeId));
							_push(`<div data-slot="border" class="${ssrRenderClass(ui.value.border({ class: unref(props).ui?.border }))}"${_scopeId}></div><!--]-->`);
						} else _push(`<!---->`);
						if (hasContent.value && unref(props).position === "end") _push(ssrRenderComponent(unref(ReuseContainer), null, null, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [
						hasContent.value && unref(props).position === "start" ? (openBlock(), createBlock(unref(ReuseContainer), { key: 0 })) : createCommentVNode("", true),
						createVNode("div", {
							"data-slot": "border",
							class: ui.value.border({ class: unref(props).ui?.border })
						}, null, 2),
						hasContent.value && unref(props).position === "center" ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode(unref(ReuseContainer)), createVNode("div", {
							"data-slot": "border",
							class: ui.value.border({ class: unref(props).ui?.border })
						}, null, 2)], 64)) : createCommentVNode("", true),
						hasContent.value && unref(props).position === "end" ? (openBlock(), createBlock(unref(ReuseContainer), { key: 2 })) : createCommentVNode("", true)
					];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$17 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Separator.vue");
	return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
//#endregion
//#region app/composables/useFadeOnScroll.ts
function useFadeOnScroll(threshold = .12) {
	const visible = ref(false);
	return {
		rootRef: ref(null),
		visible
	};
}
//#endregion
//#region app/assets/image/JM.jpg
var JM_default = __buildAssetsURL("JM.LnX_wFhR.jpg");
//#endregion
//#region app/components/sections/WeddingDetails.vue?vue&type=script&setup=true&lang.ts
var WeddingDetails_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "WeddingDetails",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		const { couple, date, times, address, venues, detailsLabel, detailsHeading, detailsPhotoCaption, invitationParagraph, addToCalendarLabel, viewDirectionsLabel } = weddingInfo;
		const icsEscape = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
		const addToCalendar = () => {
			const start = "20261127T070000Z";
			const end = "20261127T130000Z";
			const now = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z/, "Z");
			const ics = [
				"BEGIN:VCALENDAR",
				"VERSION:2.0",
				"PRODID:-//Julius & Mariel Wedding//EN",
				"CALSCALE:GREGORIAN",
				"METHOD:PUBLISH",
				"BEGIN:VEVENT",
				`UID:${now}@wedding-jm`,
				`DTSTAMP:${now}`,
				`DTSTART:${start}`,
				`DTEND:${end}`,
				`SUMMARY:${icsEscape(`${couple.combined} Wedding`)}`,
				`LOCATION:${icsEscape(address.full)}`,
				`DESCRIPTION:${icsEscape("Join us for our wedding celebration.")}`,
				"END:VEVENT",
				"END:VCALENDAR"
			].join("\r\n");
			const dataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
			const link = (void 0).createElement("a");
			link.href = dataUrl;
			link.download = `${couple.groom}-${couple.bride}-wedding.ics`;
			(void 0).body.appendChild(link);
			link.click();
			(void 0).body.removeChild(link);
		};
		const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${address.mapsQuery}`;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_USeparator = _sfc_main$3;
			const _component_UButton = _sfc_main$8;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "bg-cream section-padding relative overflow-hidden"]
			}, _attrs))}><img${ssrRenderAttr("src", unref(corner_down_default))} alt="Floral corner decoration" class="z-10 pointer-events-none absolute -bottom-3 -right-3 h-44 w-44 max-w-[40vw] max-h-[40vw] object-contain sm:bottom-0 sm:right-0 sm:h-60 sm:w-60 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><div class="section-container relative z-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20"><div class="relative"><img${ssrRenderAttr("src", unref(JM_default))} alt="Julius and Mariel wedding portrait" class="aspect-[4/5] w-full rounded-lg border-8 border-warmWhite object-cover shadow-card"><p class="mt-6 text-center font-script text-2xl text-gold md:text-3xl">${ssrInterpolate(unref(detailsPhotoCaption))}</p></div><div><div class="mb-3 font-script text-3xl text-gold md:text-4xl">${ssrInterpolate(unref(detailsLabel))}</div><h2 class="mb-6 font-serif-display text-4xl text-text md:text-5xl">${ssrInterpolate(unref(detailsHeading))}</h2><p class="mb-10 font-serif-body text-lg leading-relaxed text-text-soft md:text-xl">${ssrInterpolate(unref(invitationParagraph))}</p><div class="flex flex-col gap-5"><div class="grid grid-cols-[110px_1fr] items-baseline gap-4"><span class="text-sans-small-caps text-gold/90">Date</span><span class="font-serif-body text-lg text-text">${ssrInterpolate(unref(date).fullDate)}</span></div>`);
			_push(ssrRenderComponent(_component_USeparator, {
				variant: "horizontal",
				soft: "",
				class: "!bg-beige/60"
			}, null, _parent));
			_push(`<div class="grid grid-cols-[110px_1fr] items-baseline gap-4"><span class="text-sans-small-caps text-gold/90">Arrival</span><span class="font-serif-body text-lg text-text">${ssrInterpolate(unref(times).arrival)}</span></div>`);
			_push(ssrRenderComponent(_component_USeparator, {
				variant: "horizontal",
				soft: "",
				class: "!bg-beige/60"
			}, null, _parent));
			_push(`<div class="grid grid-cols-[110px_1fr] items-baseline gap-4"><span class="text-sans-small-caps text-gold/90">Ceremony</span><span class="font-serif-body text-lg text-text">${ssrInterpolate(unref(times).ceremony)} · ${ssrInterpolate(unref(venues).ceremony.name)}</span></div>`);
			_push(ssrRenderComponent(_component_USeparator, {
				variant: "horizontal",
				soft: "",
				class: "!bg-beige/60"
			}, null, _parent));
			_push(`<div class="grid grid-cols-[110px_1fr] items-baseline gap-4"><span class="text-sans-small-caps text-gold/90">Reception</span><span class="font-serif-body text-lg text-text">${ssrInterpolate(unref(times).reception)} · ${ssrInterpolate(unref(venues).reception.name)}</span></div>`);
			_push(ssrRenderComponent(_component_USeparator, {
				variant: "horizontal",
				soft: "",
				class: "!bg-beige/60"
			}, null, _parent));
			_push(`<div class="grid grid-cols-[110px_1fr] items-baseline gap-4"><span class="text-sans-small-caps text-gold/90">Location</span><span class="font-serif-body text-lg text-text">${ssrInterpolate(unref(address).full)}</span></div></div><div class="mt-10 flex flex-wrap gap-4">`);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "solid",
				color: "neutral",
				"rounded-full": "",
				class: "bg-champagne text-warmWhite hover:bg-gold",
				onClick: addToCalendar
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(addToCalendarLabel))}`);
					else return [createTextVNode(toDisplayString(unref(addToCalendarLabel)), 1)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				color: "neutral",
				"rounded-full": "",
				href: directionsUrl,
				target: "_blank",
				rel: "noopener noreferrer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(viewDirectionsLabel))}`);
					else return [createTextVNode(toDisplayString(unref(viewDirectionsLabel)), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/WeddingDetails.vue
var _sfc_setup$16 = WeddingDetails_vue_vue_type_script_setup_true_lang_default.setup;
WeddingDetails_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/WeddingDetails.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
var WeddingDetails_default = Object.assign(WeddingDetails_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsWeddingDetails" });
//#endregion
//#region app/composables/useCountdown.ts
function useCountdown(targetIso) {
	const now = ref(Date.now());
	const targetMs = new Date(targetIso).getTime();
	return computed(() => {
		const diff = targetMs - now.value;
		if (diff <= 0) return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			isDone: true
		};
		return {
			days: Math.floor(diff / 864e5),
			hours: Math.floor(diff / 36e5 % 24),
			minutes: Math.floor(diff / 6e4 % 60),
			seconds: Math.floor(diff / 1e3 % 60),
			isDone: false
		};
	});
}
//#endregion
//#region app/assets/image/JM2.jpg
var JM2_default = __buildAssetsURL("JM2.BNpoMGVs.jpg");
//#endregion
//#region app/components/sections/CountdownTimer.vue?vue&type=script&setup=true&lang.ts
var CountdownTimer_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CountdownTimer",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const countdown = useCountdown(weddingInfo.countdown.target);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				class: "relative h-auto overflow-hidden px-6 py-24 md:py-32"
			}, _attrs))}><div class="absolute inset-0 bg-cover bg-center" style="${ssrRenderStyle({ backgroundImage: `url(${unref(JM2_default)})` })}"></div><div class="absolute inset-0 bg-gradient-to-b from-primary-600/85 via-primary-500/80 to-primary-600/85"></div><div class="relative z-10 mx-auto max-w-4xl text-center"><div class="mb-6 text-sans-small-caps text-white/90">${ssrInterpolate(unref(weddingInfo).countdown.label)}</div><h2 class="mb-14 font-serif-display text-4xl text-white md:text-6xl">${ssrInterpolate(unref(weddingInfo).countdown.heading)}</h2><div aria-live="polite">`);
			if (!unref(countdown).isDone) _push(`<div class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10"><div class="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md md:h-36 md:w-36"><span class="font-serif-display text-4xl font-bold md:text-5xl">${ssrInterpolate(unref(countdown).days)}</span><span class="mt-1 text-[10px] text-white/80 md:text-xs text-sans-small-caps">Days</span></div><div class="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md md:h-36 md:w-36"><span class="font-serif-display text-4xl font-bold md:text-5xl">${ssrInterpolate(unref(countdown).hours)}</span><span class="mt-1 text-[10px] text-white/80 md:text-xs text-sans-small-caps">Hours</span></div><div class="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md md:h-36 md:w-36"><span class="font-serif-display text-4xl font-bold md:text-5xl">${ssrInterpolate(unref(countdown).minutes)}</span><span class="mt-1 text-[10px] text-white/80 md:text-xs text-sans-small-caps">Minutes</span></div><div class="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md md:h-36 md:w-36"><span class="font-serif-display text-4xl font-bold md:text-5xl">${ssrInterpolate(unref(countdown).seconds)}</span><span class="mt-1 text-[10px] text-white/80 md:text-xs text-sans-small-caps">Seconds</span></div></div>`);
			else _push(`<div class="py-10 font-script text-4xl text-champagne-light md:text-6xl" aria-live="polite">${ssrInterpolate(unref(weddingInfo).countdown.doneMessage)}</div>`);
			_push(`</div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/CountdownTimer.vue
var _sfc_setup$15 = CountdownTimer_vue_vue_type_script_setup_true_lang_default.setup;
CountdownTimer_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/CountdownTimer.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
var CountdownTimer_default = Object.assign(CountdownTimer_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsCountdownTimer" });
//#endregion
//#region app/assets/image/yellow.jpg
var yellow_default = __buildAssetsURL("yellow.Bw7zy5fp.jpg");
//#endregion
//#region app/components/sections/InvitationMessage.vue?vue&type=script&setup=true&lang.ts
var InvitationMessage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InvitationMessage",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "bg-cream section-padding relative overflow-hidden"]
			}, _attrs))}><img${ssrRenderAttr("src", unref(corner_default))} alt="Floral corner decoration" class="z-10 pointer-events-none absolute -top-2 -left-2 h-40 w-40 max-w-[40vw] max-h-[40vw] object-contain sm:top-0 sm:left-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><img${ssrRenderAttr("src", unref(corner_down_default))} alt="Floral corner decoration" class="z-10 pointer-events-none absolute -bottom-3 -right-3 h-44 w-44 max-w-[40vw] max-h-[40vw] object-contain sm:bottom-0 sm:right-0 sm:h-60 sm:w-60 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><div class="relative z-20 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20"><div class="card-bordered relative bg-warmWhite p-6 shadow-soft sm:p-8 md:p-12"><span class="pointer-events-none absolute left-4 top-2 select-none font-serif-display leading-none text-champagne/25 text-[96px] sm:left-6 sm:top-4 sm:text-[120px] md:text-[140px]">“</span><div class="relative z-10 pt-7 sm:pt-8 md:pt-10"><div class="mb-3 font-script text-2xl text-gold sm:text-3xl md:text-4xl">${ssrInterpolate(unref(weddingInfo).message.label)}</div><h2 class="mb-5 font-serif-display text-2xl leading-tight text-text sm:mb-6 sm:text-3xl md:text-4xl md:leading-tight">${ssrInterpolate(unref(weddingInfo).message.heading)}</h2><p class="mb-8 font-serif-body text-base leading-relaxed text-text-soft sm:mb-10 sm:text-lg md:text-xl">${ssrInterpolate(unref(weddingInfo).message.text)}</p><div class="font-script text-3xl text-gold sm:text-4xl">${ssrInterpolate(unref(weddingInfo).message.signature)}</div></div></div><div class="relative h-[340px] sm:h-[420px] md:h-[560px]"><img${ssrRenderAttr("src", unref(yellow_default))} alt="Julius and Mariel" class="h-full w-full rounded-xl object-cover shadow-card"></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/InvitationMessage.vue
var _sfc_setup$14 = InvitationMessage_vue_vue_type_script_setup_true_lang_default.setup;
InvitationMessage_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/InvitationMessage.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
var InvitationMessage_default = Object.assign(InvitationMessage_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsInvitationMessage" });
//#endregion
//#region app/assets/image/JM8.jpg
var JM8_default = __buildAssetsURL("JM8.DETqVr8Q.jpg");
//#endregion
//#region app/components/sections/QuoteBanner.vue?vue&type=script&setup=true&lang.ts
var QuoteBanner_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "QuoteBanner",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-[320px] items-center justify-center overflow-hidden sm:min-h-[420px] md:min-h-[560px]" }, _attrs))}><div class="absolute inset-0 bg-[length:100%_auto] sm:bg-cover bg-center sm:bg-center bg-no-repeat" style="${ssrRenderStyle({ backgroundImage: `url(${unref(JM8_default)})` })}"></div><div class="absolute inset-0 bg-black/55"></div><div class="relative z-10 max-w-3xl px-6 text-center"><!--[-->`);
			ssrRenderList(unref(weddingInfo).quote, (line, index) => {
				_push(`<div class="font-script text-4xl italic leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">${ssrInterpolate(line)}</div>`);
			});
			_push(`<!--]--></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/QuoteBanner.vue
var _sfc_setup$13 = QuoteBanner_vue_vue_type_script_setup_true_lang_default.setup;
QuoteBanner_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/QuoteBanner.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
var QuoteBanner_default = Object.assign(QuoteBanner_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsQuoteBanner" });
//#endregion
//#region app/components/sections/WeddingTimeline.vue?vue&type=script&setup=true&lang.ts
var WeddingTimeline_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "WeddingTimeline",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		const schedule = weddingInfo.schedule;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "bg-cream section-padding relative overflow-hidden"]
			}, _attrs))}><div class="mx-auto mb-16 max-w-5xl text-center"><div class="mb-2 font-script text-3xl text-gold md:text-4xl">${ssrInterpolate(unref(schedule).label)}</div><h2 class="mb-4 font-serif-display text-4xl text-text md:text-5xl">${ssrInterpolate(unref(schedule).heading)}</h2><p class="font-serif-body text-lg text-text-soft md:text-xl">${ssrInterpolate(unref(schedule).supporting)}</p></div><div class="mt-16 relative"><div class="hidden max-w-5xl mx-auto lg:flex lg:flex-row justify-between items-start relative"><div class="absolute top-6 left-1/2 -translate-x-1/2 w-[72%] h-px bg-champagne/50 z-0"></div><!--[-->`);
			ssrRenderList(unref(schedule).events, (ev, i) => {
				_push(`<div class="flex-1 relative z-10 flex flex-col items-center px-4"><div class="mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-champagne bg-warmWhite font-serif-display text-xl font-bold text-gold shadow-soft">${ssrInterpolate(i + 1)}</div><h3 class="mb-2 font-serif-display text-2xl text-text">${ssrInterpolate(ev.title)}</h3><div class="mb-3 text-sans-small-caps text-gold">${ssrInterpolate(ev.time)}</div><p class="mx-auto max-w-xs font-serif-body text-base text-text-soft md:text-lg">${ssrInterpolate(ev.description)}</p></div>`);
			});
			_push(`<!--]--></div><div class="relative ml-6 border-l-2 border-champagne/40 pl-4 lg:hidden block"><!--[-->`);
			ssrRenderList(unref(schedule).events, (ev, i) => {
				_push(`<div class="relative mb-14 last:mb-0"><div class="absolute -left-[34px] top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-champagne bg-warmWhite font-serif-display font-bold text-gold shadow-soft">${ssrInterpolate(i + 1)}</div><div class="ml-4 pt-1"><h3 class="mb-1 font-serif-display text-xl text-text md:text-2xl">${ssrInterpolate(ev.title)}</h3><div class="mb-2 text-sm text-sans-small-caps text-gold">${ssrInterpolate(ev.time)}</div><p class="font-serif-body text-base text-text-soft">${ssrInterpolate(ev.description)}</p></div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/WeddingTimeline.vue
var _sfc_setup$12 = WeddingTimeline_vue_vue_type_script_setup_true_lang_default.setup;
WeddingTimeline_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/WeddingTimeline.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var WeddingTimeline_default = Object.assign(WeddingTimeline_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsWeddingTimeline" });
//#endregion
//#region app/components/sections/EntourageSection.vue?vue&type=script&setup=true&lang.ts
var EntourageSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EntourageSection",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		const { entourage } = weddingInfo;
		const { principalSponsors } = entourage;
		const parentsBride = entourage.groups.find((g) => g.id === "parents-bride");
		const parentsGroom = entourage.groups.find((g) => g.id === "parents-groom");
		const maidOfHonor = entourage.groups.find((g) => g.id === "maid-of-honor");
		const bestMan = entourage.groups.find((g) => g.id === "best-man");
		const bridesmaids = entourage.groups.find((g) => g.id === "bridesmaids");
		const groomsmen = entourage.groups.find((g) => g.id === "groomsmen");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "relative section-padding overflow-hidden"]
			}, _attrs))}><div class="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700"></div><div class="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:24px_24px]"></div><img${ssrRenderAttr("src", unref(corner_default))} alt="Floral corner decoration" class="z-5 pointer-events-none absolute -top-2 -left-2 h-40 w-40 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:top-0 sm:left-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><img${ssrRenderAttr("src", unref(corner_down_default))} alt="Floral corner decoration" class="z-5 pointer-events-none absolute -bottom-3 -right-3 h-44 w-44 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:bottom-0 sm:right-0 sm:h-60 sm:w-60 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><div class="relative z-10"><header class="text-center max-w-3xl mx-auto mb-16"><div class="text-sans-small-caps text-white/90 mb-5">${ssrInterpolate(unref(entourage).label)}</div><h2 class="font-serif-display text-4xl md:text-6xl text-white mb-5">${ssrInterpolate(unref(entourage).heading)}</h2><p class="font-serif-body text-lg md:text-xl text-white/85">${ssrInterpolate(unref(entourage).supporting)}</p></header><div class="md:hidden space-y-10"><div class="space-y-5"><h3 class="font-script text-2xl sm:text-3xl text-champagne-light text-center">Parents</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3 text-center">${ssrInterpolate(unref(parentsBride).label)}</div><ul class="flex flex-col gap-3"><!--[-->`);
			ssrRenderList(unref(parentsBride).people, (person) => {
				_push(`<li class="font-serif-body text-lg text-center">${ssrInterpolate(person.name)}</li>`);
			});
			_push(`<!--]--></ul></div><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3 text-center">${ssrInterpolate(unref(parentsGroom).label)}</div><ul class="flex flex-col gap-3"><!--[-->`);
			ssrRenderList(unref(parentsGroom).people, (person) => {
				_push(`<li class="font-serif-body text-lg text-center">${ssrInterpolate(person.name)}</li>`);
			});
			_push(`<!--]--></ul></div></div></div><div class="space-y-5"><h3 class="font-script text-2xl sm:text-3xl text-champagne-light text-center">Wedding Party</h3><div class="space-y-5"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3 text-center">${ssrInterpolate(unref(maidOfHonor).label)}</div><ul class="flex flex-col gap-3"><!--[-->`);
			ssrRenderList(unref(maidOfHonor).people, (person) => {
				_push(`<li class="font-serif-body text-lg text-center">${ssrInterpolate(person.name)}</li>`);
			});
			_push(`<!--]--></ul></div><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3 text-center">${ssrInterpolate(unref(bestMan).label)}</div><ul class="flex flex-col gap-3"><!--[-->`);
			ssrRenderList(unref(bestMan).people, (person) => {
				_push(`<li class="font-serif-body text-lg text-center">${ssrInterpolate(person.name)}</li>`);
			});
			_push(`<!--]--></ul></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3 text-center">${ssrInterpolate(unref(bridesmaids).label)}</div><ul class="grid grid-cols-2 gap-2"><!--[-->`);
			ssrRenderList(unref(bridesmaids).people, (person) => {
				_push(`<li class="font-serif-body text-base text-center">${ssrInterpolate(person.name)}</li>`);
			});
			_push(`<!--]--></ul></div><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3 text-center">${ssrInterpolate(unref(groomsmen).label)}</div><ul class="grid grid-cols-2 gap-2"><!--[-->`);
			ssrRenderList(unref(groomsmen).people, (person) => {
				_push(`<li class="font-serif-body text-base text-center">${ssrInterpolate(person.name)}</li>`);
			});
			_push(`<!--]--></ul></div></div></div></div><div class="space-y-5"><h3 class="font-script text-2xl sm:text-3xl text-champagne-light text-center">Ninongs &amp; Ninangs</h3><div class="grid grid-cols-2 gap-4"><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3">Ninongs</div><ul class="flex flex-col gap-2 font-serif-body text-white text-sm"><!--[-->`);
			ssrRenderList(unref(principalSponsors).ninongs, (n) => {
				_push(`<li>${ssrInterpolate(n)}</li>`);
			});
			_push(`<!--]--></ul></div><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3">Ninangs</div><ul class="flex flex-col gap-2 font-serif-body text-white text-sm"><!--[-->`);
			ssrRenderList(unref(principalSponsors).ninangs, (n) => {
				_push(`<li>${ssrInterpolate(n)}</li>`);
			});
			_push(`<!--]--></ul></div></div></div><div class="space-y-5"><h3 class="font-script text-2xl sm:text-3xl text-champagne-light text-center">Bearers &amp; Attendants</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3 text-center">Ring Bearer</div><div class="font-serif-body text-lg text-center">${ssrInterpolate(unref(entourage).other.ringBearer)}</div></div><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-3 text-center"> Flower Girl${ssrInterpolate(unref(entourage).other.flowerGirls.length > 1 ? "s" : "")}</div><ul class="flex flex-col gap-2"><!--[-->`);
			ssrRenderList(unref(entourage).other.flowerGirls, (fg) => {
				_push(`<li class="font-serif-body text-lg text-center">${ssrInterpolate(fg)}</li>`);
			});
			_push(`<!--]--></ul></div></div></div></div><div class="hidden md:block"><div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"><!--[-->`);
			ssrRenderList([
				unref(parentsBride),
				unref(parentsGroom),
				unref(maidOfHonor),
				unref(bestMan)
			], (group) => {
				_push(`<div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-4 text-center">${ssrInterpolate(group.label)}</div><ul class="flex flex-col gap-3"><!--[-->`);
				ssrRenderList(group.people, (person) => {
					_push(`<li class="font-serif-body text-lg text-center">${ssrInterpolate(person.name)}</li>`);
				});
				_push(`<!--]--></ul></div>`);
			});
			_push(`<!--]--></div><div class="grid md:grid-cols-2 gap-6 mb-12"><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-4 text-center">${ssrInterpolate(unref(bridesmaids).label)}</div><ul class="grid grid-cols-2 gap-x-4 gap-y-3"><!--[-->`);
			ssrRenderList(unref(bridesmaids).people, (person) => {
				_push(`<li class="font-serif-body text-lg text-center">${ssrInterpolate(person.name)}</li>`);
			});
			_push(`<!--]--></ul></div><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-4 text-center">${ssrInterpolate(unref(groomsmen).label)}</div><ul class="grid grid-cols-2 gap-x-4 gap-y-3"><!--[-->`);
			ssrRenderList(unref(groomsmen).people, (person) => {
				_push(`<li class="font-serif-body text-lg text-center">${ssrInterpolate(person.name)}</li>`);
			});
			_push(`<!--]--></ul></div></div><div class="mb-12"><h3 class="font-script text-3xl md:text-4xl text-champagne-light mb-8 text-center">Ninongs &amp; Ninangs</h3><div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"><div class="card-bordered bg-white/10 p-6 border border-white/20 rounded-xl backdrop-blur-sm"><div class="text-sans-small-caps text-champagne-light mb-4">Ninongs</div><ul class="flex flex-col gap-2 font-serif-body text-white"><!--[-->`);
			ssrRenderList(unref(principalSponsors).ninongs, (ninong) => {
				_push(`<li>${ssrInterpolate(ninong)}</li>`);
			});
			_push(`<!--]--></ul></div><div class="card-bordered bg-white/10 p-6 border border-white/20 rounded-xl backdrop-blur-sm"><div class="text-sans-small-caps text-champagne-light mb-4">Ninangs</div><ul class="flex flex-col gap-2 font-serif-body text-white"><!--[-->`);
			ssrRenderList(unref(principalSponsors).ninangs, (ninang) => {
				_push(`<li>${ssrInterpolate(ninang)}</li>`);
			});
			_push(`<!--]--></ul></div></div></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-4 text-center">Ring Bearer</div><div class="font-serif-body text-lg text-center">${ssrInterpolate(unref(entourage).other.ringBearer)}</div></div><div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl"><div class="text-sans-small-caps text-champagne-light mb-4 text-center"> Flower Girl${ssrInterpolate(unref(entourage).other.flowerGirls.length > 1 ? "s" : "")}</div><ul class="flex flex-col gap-3"><!--[-->`);
			ssrRenderList(unref(entourage).other.flowerGirls, (fg) => {
				_push(`<li class="font-serif-body text-lg text-center">${ssrInterpolate(fg)}</li>`);
			});
			_push(`<!--]--></ul></div></div></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/EntourageSection.vue
var _sfc_setup$11 = EntourageSection_vue_vue_type_script_setup_true_lang_default.setup;
EntourageSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/EntourageSection.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var EntourageSection_default = Object.assign(EntourageSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsEntourageSection" });
//#endregion
//#region app/assets/image/yellow3.jpg
var yellow3_default = __buildAssetsURL("yellow3.5u3ncuqG.jpg");
//#endregion
//#region app/assets/image/JM13.jpg
var JM13_default = __buildAssetsURL("JM13.CpyMQNnc.jpg");
//#endregion
//#region app/assets/image/yellow5.jpg
var yellow5_default = __buildAssetsURL("yellow5.BZ8vKxk9.jpg");
//#endregion
//#region app/assets/image/JM10.jpg
var JM10_default = __buildAssetsURL("JM10.DYKq_gL_.jpg");
//#endregion
//#region app/assets/image/yellow2.jpg
var yellow2_default = __buildAssetsURL("yellow2.DQ55GCxL.jpg");
//#endregion
//#region app/assets/image/JM11.jpg
var JM11_default = __buildAssetsURL("JM11.DUxULcyj.jpg");
//#endregion
//#region app/components/sections/GallerySection.vue?vue&type=script&setup=true&lang.ts
var GallerySection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "GallerySection",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		const galleryImages = [
			{
				src: yellow3_default,
				alt: "Julius and Mariel photo 1"
			},
			{
				src: JM13_default,
				alt: "Julius and Mariel photo 2"
			},
			{
				src: yellow5_default,
				alt: "Julius and Mariel photo 3"
			},
			{
				src: JM10_default,
				alt: "Julius and Mariel photo 4"
			},
			{
				src: yellow2_default,
				alt: "Julius and Mariel photo 5"
			},
			{
				src: JM11_default,
				alt: "Julius and Mariel photo 6"
			}
		];
		const { gallery } = weddingInfo;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "bg-warmWhite section-padding relative overflow-hidden"]
			}, _attrs))}><div class="relative z-10"><header class="text-center max-w-2xl mx-auto mb-14"><div class="font-script text-3xl md:text-4xl text-gold mb-2">${ssrInterpolate(unref(gallery).label)}</div><h2 class="font-serif-display text-4xl md:text-5xl text-text mb-4">${ssrInterpolate(unref(gallery).heading)}</h2><p class="font-serif-body text-lg text-text-soft">${ssrInterpolate(unref(gallery).supporting)}</p></header><div class="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4"><!--[-->`);
			ssrRenderList(galleryImages, (img, idx) => {
				_push(`<div class="aspect-square overflow-hidden rounded-lg shadow-soft"><img${ssrRenderAttr("src", img.src)}${ssrRenderAttr("alt", img.alt)} loading="lazy" class="w-full h-full object-cover object-center rounded-lg hover:scale-[1.03] transition-all duration-500 ease-out"></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/GallerySection.vue
var _sfc_setup$10 = GallerySection_vue_vue_type_script_setup_true_lang_default.setup;
GallerySection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/GallerySection.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var GallerySection_default = Object.assign(GallerySection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsGallerySection" });
//#endregion
//#region app/assets/image/paco2.png
var paco2_default = __buildAssetsURL("paco2.w9lGT2e4.png");
//#endregion
//#region app/assets/image/paco.png
var paco_default = __buildAssetsURL("paco.Du4M-QUT.png");
//#endregion
//#region app/components/sections/VenueSection.vue?vue&type=script&setup=true&lang.ts
var VenueSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VenueSection",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		const imgUrl = (p, s = "landscape_16_9") => `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(p)}&image_size=${s}`;
		const { venues, venueSection } = weddingInfo;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main$8;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "relative section-padding overflow-hidden"]
			}, _attrs))}><div class="absolute inset-0 bg-cover bg-center" style="${ssrRenderStyle({ backgroundImage: `url(${unref(paco2_default)})` })}"></div><div class="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary-700/85 to-primary-800/95"></div><div class="relative z-10 max-w-6xl mx-auto"><header class="max-w-3xl mx-auto bg-primary-700/70 backdrop-blur-md border border-white/15 rounded-3xl p-8 md:p-14 mb-14 text-center"><div class="font-script text-3xl md:text-4xl text-champagne-light mb-3">${ssrInterpolate(unref(venueSection).label)}</div><h2 class="font-serif-display text-4xl md:text-5xl text-white mb-5">${ssrInterpolate(unref(venueSection).heading)}</h2><p class="font-serif-body text-lg md:text-xl text-white/90">${ssrInterpolate(unref(venueSection).supporting)}</p></header><div class="grid md:grid-cols-2 gap-8"><div class="card-bordered bg-warmWhite rounded-2xl overflow-hidden shadow-card"><img${ssrRenderAttr("src", unref(paco_default))} alt="Ceremony venue" loading="lazy" class="w-full h-56 object-cover"><div class="p-7"><h3 class="font-serif-display text-2xl text-text mb-1">${ssrInterpolate(unref(venues).ceremony.name)}</h3><div class="text-sans-small-caps text-gold mb-4">${ssrInterpolate(unref(venues).ceremony.time)}</div><div class="h-36 rounded-lg relative bg-gradient-to-br from-powderBlue-soft/80 via-primary-100/70 to-beige/70 border border-champagne/30 overflow-hidden mb-5"><svg class="absolute inset-0 w-full h-full" viewBox="0 0 400 144" xmlns="http://www.w3.org/2000/svg" fill="none"><g stroke="rgba(74,74,74,0.12)" stroke-width="1"><path d="M0,36 H400"></path><path d="M0,72 H400"></path><path d="M0,108 H400"></path><path d="M80,0 V144"></path><path d="M160,0 V144"></path><path d="M240,0 V144"></path><path d="M320,0 V144"></path></g><g stroke="rgba(74,74,74,0.08)" stroke-width="0.7" stroke-linecap="round"><path d="M40,20 C80,28 120,18 180,30"></path><path d="M200,90 C260,80 300,100 380,96"></path><path d="M60,110 C120,104 180,120 260,112"></path></g></svg><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-primary-600 drop-shadow"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.54 22.351a.75.75 0 0 0 .92 0C16.701 20.025 22 15.17 22 10.148 22 5.704 18.522 2 14.25 2 11.57 2 9.179 3.653 8 6.246 6.821 3.653 4.43 2 1.75 2-2.522 2 2 5.704 2 10.148c0 5.022 5.299 9.877 9.54 12.203Z" clip-rule="evenodd"></path><circle cx="12" cy="10" r="3" fill="#FFFDFC"></circle></svg></div></div>`);
			_push(ssrRenderComponent(_component_UButton, {
				block: "",
				variant: "solid",
				color: "neutral",
				class: "bg-primary-500 hover:bg-primary-600 text-white rounded-full",
				href: unref(venues).ceremony.mapsUrl,
				target: "_blank",
				rel: "noopener noreferrer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(venueSection).ceremonyButton)}`);
					else return [createTextVNode(toDisplayString(unref(venueSection).ceremonyButton), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="card-bordered bg-warmWhite rounded-2xl overflow-hidden shadow-card"><img${ssrRenderAttr("src", imgUrl("modern events place ballroom interior reception elegant manila", "landscape_4_3"))} alt="Reception venue" loading="lazy" class="w-full h-56 object-cover"><div class="p-7"><h3 class="font-serif-display text-2xl text-text mb-1">${ssrInterpolate(unref(venues).reception.name)}</h3><div class="text-sans-small-caps text-gold mb-4">${ssrInterpolate(unref(venues).reception.time)}</div><div class="h-36 rounded-lg relative bg-gradient-to-br from-beige/80 via-champagne-light/60 to-warmWhite/70 border border-champagne/30 overflow-hidden mb-5"><svg class="absolute inset-0 w-full h-full" viewBox="0 0 400 144" xmlns="http://www.w3.org/2000/svg" fill="none"><g stroke="rgba(74,74,74,0.12)" stroke-width="1"><path d="M0,30 H400"></path><path d="M0,72 H400"></path><path d="M0,114 H400"></path><path d="M100,0 V144"></path><path d="M200,0 V144"></path><path d="M300,0 V144"></path></g><g stroke="rgba(74,74,74,0.08)" stroke-width="0.7" stroke-linecap="round"><path d="M20,60 C80,50 140,70 200,58"></path><path d="M160,120 C240,110 300,130 400,118"></path><path d="M40,20 C100,30 160,10 260,24"></path></g></svg><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-primary-600 drop-shadow"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.54 22.351a.75.75 0 0 0 .92 0C16.701 20.025 22 15.17 22 10.148 22 5.704 18.522 2 14.25 2 11.57 2 9.179 3.653 8 6.246 6.821 3.653 4.43 2 1.75 2-2.522 2 2 5.704 2 10.148c0 5.022 5.299 9.877 9.54 12.203Z" clip-rule="evenodd"></path><circle cx="12" cy="10" r="3" fill="#FFFDFC"></circle></svg></div></div>`);
			_push(ssrRenderComponent(_component_UButton, {
				block: "",
				variant: "solid",
				color: "neutral",
				class: "bg-primary-500 hover:bg-primary-600 text-white rounded-full",
				href: unref(venues).reception.mapsUrl,
				target: "_blank",
				rel: "noopener noreferrer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(venueSection).receptionButton)}`);
					else return [createTextVNode(toDisplayString(unref(venueSection).receptionButton), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/VenueSection.vue
var _sfc_setup$9 = VenueSection_vue_vue_type_script_setup_true_lang_default.setup;
VenueSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/VenueSection.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var VenueSection_default = Object.assign(VenueSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsVenueSection" });
//#endregion
//#region app/assets/image/dressCode.jpg
var dressCode_default = __buildAssetsURL("dressCode.CLHdwQG8.jpg");
//#endregion
//#region app/components/sections/DressCodeSection.vue?vue&type=script&setup=true&lang.ts
var DressCodeSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DressCodeSection",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		const { dressCode } = weddingInfo;
		ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "bg-warmWhite section-padding relative overflow-hidden"]
			}, _attrs))}><div class="relative z-10 max-w-3xl mx-auto"><h2 class="font-serif-display text-4xl md:text-5xl text-text text-center mb-10">${ssrInterpolate(unref(dressCode).heading)}</h2><div class="card-bordered p-5 md:p-7 shadow-card cursor-pointer group relative transition-transform duration-500 group-hover:scale-[1.01]"><div class="relative overflow-hidden rounded-xl"><img${ssrRenderAttr("src", unref(dressCode_default))} alt="Wedding dress code guide" loading="lazy" class="w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"><div class="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-lg px-4 py-3 text-center"><p class="font-serif-body text-lg md:text-xl text-text">${ssrInterpolate(unref(dressCode).note)}</p></div></div></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/DressCodeSection.vue
var _sfc_setup$8 = DressCodeSection_vue_vue_type_script_setup_true_lang_default.setup;
DressCodeSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/DressCodeSection.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var DressCodeSection_default = Object.assign(DressCodeSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsDressCodeSection" });
//#endregion
//#region app/components/sections/GiftsSection.vue?vue&type=script&setup=true&lang.ts
var GiftsSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "GiftsSection",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		const { gifts } = weddingInfo;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "relative section-padding overflow-hidden"]
			}, _attrs))}><div class="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700"></div><img${ssrRenderAttr("src", unref(corner_default))} alt="Floral corner decoration" class="z-5 pointer-events-none absolute -top-2 -left-2 h-40 w-40 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:top-0 sm:left-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><img${ssrRenderAttr("src", unref(corner_down_default))} alt="Floral corner decoration" class="z-5 pointer-events-none absolute -bottom-3 -right-3 h-44 w-44 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:bottom-0 sm:right-0 sm:h-60 sm:w-60 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><div class="relative z-10 max-w-3xl mx-auto"><div class="border border-champagne/40 bg-cream/5 backdrop-blur-sm rounded-2xl p-8 md:p-14 text-center"><div class="font-script text-3xl md:text-4xl text-champagne-light mb-3">${ssrInterpolate(unref(gifts).label)}</div><h2 class="font-serif-display text-3xl md:text-5xl text-white mb-6">${ssrInterpolate(unref(gifts).heading)}</h2><p class="font-serif-body text-lg md:text-xl text-white/90 leading-relaxed mb-12">${ssrInterpolate(unref(gifts).message)}</p></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/GiftsSection.vue
var _sfc_setup$7 = GiftsSection_vue_vue_type_script_setup_true_lang_default.setup;
GiftsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/GiftsSection.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var GiftsSection_default = Object.assign(GiftsSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsGiftsSection" });
//#endregion
//#region app/components/sections/RemindersSection.vue?vue&type=script&setup=true&lang.ts
var RemindersSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RemindersSection",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		const { reminders } = weddingInfo;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "bg-cream section-padding relative overflow-hidden"]
			}, _attrs))}><div class="max-w-6xl mx-auto"><header class="text-center max-w-2xl mx-auto mb-14"><div class="font-script text-3xl md:text-4xl text-gold mb-2">${ssrInterpolate(unref(reminders).label)}</div><h2 class="font-serif-display text-4xl md:text-5xl text-text mb-4">${ssrInterpolate(unref(reminders).heading)}</h2></header><div class="grid md:grid-cols-3 gap-6 lg:gap-8"><!--[-->`);
			ssrRenderList(unref(reminders).cards, (card, i) => {
				_push(`<div class="card-bordered p-7 md:p-8 bg-warmWhite shadow-soft hover:shadow-card transition"><div class="w-10 h-10 rounded-full bg-champagne/20 text-gold font-serif-display font-bold text-lg flex items-center justify-center mb-5">${ssrInterpolate(i + 1)}</div><h3 class="font-serif-display text-xl md:text-2xl text-text mb-3">${ssrInterpolate(card.title)}</h3><p class="font-serif-body text-base md:text-lg leading-relaxed text-text-soft">${ssrInterpolate(card.description)}</p></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/RemindersSection.vue
var _sfc_setup$6 = RemindersSection_vue_vue_type_script_setup_true_lang_default.setup;
RemindersSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/RemindersSection.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var RemindersSection_default = Object.assign(RemindersSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsRemindersSection" });
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/utils/form.js
function isSuperStructSchema(schema) {
	return "schema" in schema && typeof schema.coercer === "function" && typeof schema.validator === "function" && typeof schema.refiner === "function";
}
function isStandardSchema(schema) {
	return "~standard" in schema;
}
async function validateStandardSchema(state, schema) {
	const result = await schema["~standard"].validate(state);
	if (result.issues) return {
		errors: result.issues?.map((issue) => ({
			name: issue.path?.map((item) => typeof item === "object" ? item.key : item).join(".") || "",
			message: issue.message
		})) || [],
		result: null
	};
	return {
		errors: null,
		result: result.value
	};
}
async function validateSuperstructSchema(state, schema) {
	const [err, result] = schema.validate(state);
	if (err) return {
		errors: err.failures().map((error) => ({
			message: error.message,
			name: error.path.join(".")
		})),
		result: null
	};
	return {
		errors: null,
		result
	};
}
function validateSchema(state, _schema) {
	const schema = toRaw(_schema);
	if (isStandardSchema(schema)) return validateStandardSchema(state, schema);
	else if (isSuperStructSchema(schema)) return validateSuperstructSchema(state, schema);
	else throw new Error("Form validation failed: Unsupported form schema");
}
function getAtPath(data, path) {
	if (!path) return data;
	return path.split(".").reduce((value2, key) => value2?.[key], data);
}
function setAtPath(data, path, value) {
	if (!path) return Object.assign(data, value);
	if (!data) return data;
	const keys = path.split(".");
	let current = data;
	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (current[key] === void 0 || current[key] === null) {
			if (i + 1 < keys.length && !Number.isNaN(Number(keys[i + 1]))) current[key] = [];
			else current[key] = {};
		}
		current = current[key];
	}
	const lastKey = keys[keys.length - 1];
	current[lastKey] = value;
	return data;
}
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/types/form.js
var FormValidationException = class FormValidationException extends Error {
	formId;
	errors;
	constructor(formId, errors) {
		super("Form validation exception");
		this.formId = formId;
		this.errors = errors;
		Object.setPrototypeOf(this, FormValidationException.prototype);
	}
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fform.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_default = { "base": "" };
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Form.vue
var _sfc_main$2 = {
	__name: "UForm",
	__ssrInlineRender: true,
	props: {
		id: {
			type: [String, Number],
			required: false
		},
		schema: {
			type: null,
			required: false
		},
		state: {
			type: null,
			required: false
		},
		validate: {
			type: Function,
			required: false
		},
		validateOn: {
			type: Array,
			required: false,
			default() {
				return [
					"input",
					"blur",
					"change"
				];
			}
		},
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		validateOnInputDelay: {
			type: Number,
			required: false,
			default: 300
		},
		transform: {
			type: null,
			required: false,
			default: () => true
		},
		nested: {
			type: Boolean,
			required: false
		},
		loadingAuto: {
			type: Boolean,
			required: false,
			default: true
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		onSubmit: {
			type: Function,
			required: false
		}
	},
	emits: ["submit", "error"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const props = useComponentProps("form", _props);
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_default,
			...appConfig.ui?.form || {}
		}));
		const formId = props.id ?? useId();
		const formRef = useTemplateRef("formRef");
		const bus = /* @__PURE__ */ useEventBus(`form-${formId}`);
		const parentBus = props.nested === true && inject(formBusInjectionKey, void 0);
		const parentState = props.nested === true ? inject(formStateInjectionKey, void 0) : void 0;
		const state = computed(() => {
			if (parentState?.value) return props.name ? getAtPath(parentState.value, props.name) : parentState.value;
			return props.state;
		});
		provide(formBusInjectionKey, bus);
		provide(formStateInjectionKey, state);
		const nestedForms = ref(/* @__PURE__ */ new Map());
		const errors = ref([]);
		provide(formErrorsInjectionKey, errors);
		const inputs = ref({});
		provide(formInputsInjectionKey, inputs);
		const dirtyFields = reactive(/* @__PURE__ */ new Set());
		const touchedFields = reactive(/* @__PURE__ */ new Set());
		const blurredFields = reactive(/* @__PURE__ */ new Set());
		function resolveErrorIds(errs) {
			return errs.map((err) => ({
				...err,
				id: err?.name ? inputs.value[err.name]?.id : void 0
			}));
		}
		const transformedState = ref(null);
		async function getErrors() {
			let errs = props.validate ? await props.validate(state.value) ?? [] : [];
			if (props.schema) {
				const { errors: errors2, result } = await validateSchema(state.value, props.schema);
				if (errors2) errs = errs.concat(errors2);
				else transformedState.value = result;
			}
			return resolveErrorIds(errs);
		}
		async function _validate(opts = {
			silent: false,
			nested: false,
			transform: false
		}) {
			const names = opts.name && !Array.isArray(opts.name) ? [opts.name] : opts.name;
			let nestedResults = [];
			let nestedErrors = [];
			if (!names && opts.nested) {
				const validations = Array.from(nestedForms.value.values()).map((form) => validateNestedForm(form, opts));
				const results = await Promise.all(validations);
				nestedErrors = results.filter((r) => r.error).flatMap((r) => r.error.errors.map((e) => addFormPath(e, r.name)));
				nestedResults = results.filter((r) => r.output !== void 0);
			}
			const allErrors = [...await getErrors(), ...nestedErrors];
			if (names) errors.value = filterErrorsByNames(allErrors, names);
			else errors.value = allErrors;
			if (errors.value?.length) {
				if (opts.silent) return false;
				throw new FormValidationException(formId, errors.value);
			}
			if (opts.transform) {
				nestedResults.forEach((result) => {
					if (result.name) setAtPath(transformedState.value, result.name, result.output);
					else Object.assign(transformedState.value, result.output);
				});
				return transformedState.value ?? state.value;
			}
			return state.value;
		}
		const loading = ref(false);
		provide(formLoadingInjectionKey, readonly(loading));
		async function onSubmitWrapper(payload) {
			loading.value = !!props.loadingAuto;
			const event = payload;
			try {
				event.data = await _validate({
					nested: true,
					transform: props.transform
				});
				await props.onSubmit?.(event);
				dirtyFields.clear();
			} catch (error) {
				if (!(error instanceof FormValidationException)) throw error;
				const errorEvent = {
					...event,
					errors: error.errors
				};
				emits("error", errorEvent);
			} finally {
				loading.value = false;
			}
		}
		const disabled = computed(() => props.disabled || loading.value);
		provide(formOptionsInjectionKey, computed(() => ({
			disabled: disabled.value,
			validateOnInputDelay: props.validateOnInputDelay
		})));
		async function validateNestedForm(form, opts) {
			try {
				const result = await form.validate({
					...opts,
					silent: false
				});
				return {
					name: form.name,
					output: result
				};
			} catch (error) {
				if (!(error instanceof FormValidationException)) throw error;
				return {
					name: form.name,
					error
				};
			}
		}
		function addFormPath(error, formPath) {
			if (!formPath || !error.name) return error;
			return {
				...error,
				name: formPath + "." + error.name
			};
		}
		function stripFormPath(error, formPath) {
			const prefix = formPath + ".";
			const name = error?.name?.startsWith(prefix) ? error.name.substring(prefix.length) : error.name;
			return {
				...error,
				name
			};
		}
		function filterFormErrors(errors2, formPath) {
			if (!formPath) return errors2;
			return errors2.filter((e) => e?.name?.startsWith(formPath + ".")).map((e) => stripFormPath(e, formPath));
		}
		function getFormErrors(form) {
			return form.api.getErrors().map((e) => form.name ? {
				...e,
				name: form.name + "." + e.name
			} : e);
		}
		function matchesTarget(target, path) {
			if (!target || !path) return true;
			if (target instanceof RegExp) return target.test(path);
			return path === target || typeof target === "string" && target.startsWith(path + ".");
		}
		function getNestedTarget(target, formPath) {
			if (!target || target instanceof RegExp) return target;
			if (formPath === target) return void 0;
			if (typeof target === "string" && target.startsWith(formPath + ".")) return target.substring(formPath.length + 1);
			return target;
		}
		function filterErrorsByNames(allErrors, names) {
			const nameSet = new Set(names);
			const patterns = names.map((name) => inputs.value?.[name]?.pattern).filter(Boolean);
			const matchesNames = (error) => {
				if (!error.name) return false;
				if (nameSet.has(error.name)) return true;
				return patterns.some((pattern) => pattern.test(error.name));
			};
			const keepErrors = errors.value.filter((error) => !matchesNames(error));
			const newErrors = allErrors.filter(matchesNames);
			return [...keepErrors, ...newErrors];
		}
		function filterErrorsByTarget(currentErrors, target) {
			return currentErrors.filter((err) => target instanceof RegExp ? !(err.name && target.test(err.name)) : !err.name || err.name !== target);
		}
		function isLocalError(error) {
			return !error.name || !!inputs.value[error.name];
		}
		__expose({
			validate: _validate,
			errors,
			setErrors(errs, name) {
				const localErrors = resolveErrorIds(errs.filter(isLocalError));
				const nestedErrors = [];
				for (const form of nestedForms.value.values()) if (matchesTarget(name, form.name)) {
					const formErrors = filterFormErrors(errs, form.name);
					form.api.setErrors(formErrors, getNestedTarget(name, form.name || ""));
					nestedErrors.push(...getFormErrors(form));
				}
				if (name) {
					const keepErrors = filterErrorsByTarget(errors.value, name);
					errors.value = [
						...keepErrors,
						...localErrors,
						...nestedErrors
					];
				} else errors.value = [...localErrors, ...nestedErrors];
			},
			async submit() {
				if (formRef.value instanceof HTMLFormElement && formRef.value.reportValidity() === false) return;
				await onSubmitWrapper(new Event("submit"));
			},
			getErrors(name) {
				if (!name) return errors.value;
				return errors.value.filter((err) => name instanceof RegExp ? err.name && name.test(err.name) : err.name === name);
			},
			clear(name) {
				const localErrors = name ? errors.value.filter((err) => isLocalError(err) && (name instanceof RegExp ? !(err.name && name.test(err.name)) : err.name !== name)) : [];
				const nestedErrors = [];
				for (const form of nestedForms.value.values()) {
					if (matchesTarget(name, form.name)) form.api.clear(name instanceof RegExp ? void 0 : getNestedTarget(name, form.name || ""));
					nestedErrors.push(...getFormErrors(form));
				}
				errors.value = [...localErrors, ...nestedErrors];
			},
			disabled,
			loading,
			dirty: computed(() => !!dirtyFields.size),
			dirtyFields: readonly(dirtyFields),
			blurredFields: readonly(blurredFields),
			touchedFields: readonly(touchedFields)
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(parentBus) ? "div" : "form"), mergeProps({
				id: unref(formId),
				ref_key: "formRef",
				ref: formRef,
				name: unref(parentBus) ? void 0 : unref(props).name,
				method: unref(parentBus) ? void 0 : "post",
				class: ui.value({ class: [unref(props).ui?.base, unref(props).class] }),
				onSubmit: onSubmitWrapper
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {
						errors: errors.value,
						loading: loading.value
					}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {
						errors: errors.value,
						loading: loading.value
					})];
				}),
				_: 3
			}), _parent);
		};
	}
};
var _sfc_setup$5 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Form.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Finput.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Finput_default = {
	"slots": {
		"root": "relative inline-flex items-center",
		"base": ["w-full rounded-md border-0 appearance-none placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75", "transition-colors"],
		"leading": "absolute inset-y-0 start-0 flex items-center",
		"leadingIcon": "shrink-0 text-dimmed",
		"leadingAvatar": "shrink-0",
		"leadingAvatarSize": "",
		"trailing": "absolute inset-y-0 end-0 flex items-center",
		"trailingIcon": "shrink-0 text-dimmed"
	},
	"variants": {
		"fieldGroup": {
			"horizontal": {
				"root": "group has-focus-visible:z-[1]",
				"base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
			},
			"vertical": {
				"root": "group has-focus-visible:z-[1]",
				"base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
			}
		},
		"size": {
			"xs": {
				"base": "px-2 py-1 text-sm/4 gap-1",
				"leading": "ps-2",
				"trailing": "pe-2",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4"
			},
			"sm": {
				"base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
				"leading": "ps-2.5",
				"trailing": "pe-2.5",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4"
			},
			"md": {
				"base": "px-2.5 py-1.5 text-base/5 gap-1.5",
				"leading": "ps-2.5",
				"trailing": "pe-2.5",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5"
			},
			"lg": {
				"base": "px-3 py-2 text-base/5 gap-2",
				"leading": "ps-3",
				"trailing": "pe-3",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5"
			},
			"xl": {
				"base": "px-3 py-2 text-base gap-2",
				"leading": "ps-3",
				"trailing": "pe-3",
				"leadingIcon": "size-6",
				"leadingAvatarSize": "xs",
				"trailingIcon": "size-6"
			}
		},
		"variant": {
			"outline": "text-highlighted bg-default ring ring-inset ring-accented",
			"soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
			"subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
			"ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
			"none": "text-highlighted bg-transparent focus:outline-none"
		},
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"leading": { "true": "" },
		"trailing": { "true": "" },
		"loading": { "true": "" },
		"highlight": { "true": "" },
		"fixed": { "false": "" },
		"type": { "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none" }
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": ["outline", "subtle"],
			"class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
		},
		{
			"color": "secondary",
			"variant": ["outline", "subtle"],
			"class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
		},
		{
			"color": "success",
			"variant": ["outline", "subtle"],
			"class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
		},
		{
			"color": "info",
			"variant": ["outline", "subtle"],
			"class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
		},
		{
			"color": "warning",
			"variant": ["outline", "subtle"],
			"class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
		},
		{
			"color": "error",
			"variant": ["outline", "subtle"],
			"class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
		},
		{
			"color": "primary",
			"variant": ["soft", "ghost"],
			"class": "outline-primary/25 focus-visible:outline-3"
		},
		{
			"color": "secondary",
			"variant": ["soft", "ghost"],
			"class": "outline-secondary/25 focus-visible:outline-3"
		},
		{
			"color": "success",
			"variant": ["soft", "ghost"],
			"class": "outline-success/25 focus-visible:outline-3"
		},
		{
			"color": "info",
			"variant": ["soft", "ghost"],
			"class": "outline-info/25 focus-visible:outline-3"
		},
		{
			"color": "warning",
			"variant": ["soft", "ghost"],
			"class": "outline-warning/25 focus-visible:outline-3"
		},
		{
			"color": "error",
			"variant": ["soft", "ghost"],
			"class": "outline-error/25 focus-visible:outline-3"
		},
		{
			"color": "primary",
			"highlight": true,
			"class": "ring ring-inset ring-primary"
		},
		{
			"color": "secondary",
			"highlight": true,
			"class": "ring ring-inset ring-secondary"
		},
		{
			"color": "success",
			"highlight": true,
			"class": "ring ring-inset ring-success"
		},
		{
			"color": "info",
			"highlight": true,
			"class": "ring ring-inset ring-info"
		},
		{
			"color": "warning",
			"highlight": true,
			"class": "ring ring-inset ring-warning"
		},
		{
			"color": "error",
			"highlight": true,
			"class": "ring ring-inset ring-error"
		},
		{
			"color": "neutral",
			"variant": ["outline", "subtle"],
			"class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
		},
		{
			"color": "neutral",
			"variant": ["soft", "ghost"],
			"class": "outline-inverted/25 focus-visible:outline-3"
		},
		{
			"color": "neutral",
			"highlight": true,
			"class": "ring ring-inset ring-inverted"
		},
		{
			"leading": true,
			"size": "xs",
			"class": "ps-7"
		},
		{
			"leading": true,
			"size": "sm",
			"class": "ps-8"
		},
		{
			"leading": true,
			"size": "md",
			"class": "ps-9"
		},
		{
			"leading": true,
			"size": "lg",
			"class": "ps-10"
		},
		{
			"leading": true,
			"size": "xl",
			"class": "ps-11"
		},
		{
			"trailing": true,
			"size": "xs",
			"class": "pe-7"
		},
		{
			"trailing": true,
			"size": "sm",
			"class": "pe-8"
		},
		{
			"trailing": true,
			"size": "md",
			"class": "pe-9"
		},
		{
			"trailing": true,
			"size": "lg",
			"class": "pe-10"
		},
		{
			"trailing": true,
			"size": "xl",
			"class": "pe-11"
		},
		{
			"loading": true,
			"leading": true,
			"class": { "leadingIcon": "animate-spin" }
		},
		{
			"loading": true,
			"leading": false,
			"trailing": true,
			"class": { "trailingIcon": "animate-spin" }
		},
		{
			"fixed": false,
			"size": "xs",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "sm",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "md",
			"class": "md:text-sm"
		},
		{
			"fixed": false,
			"size": "lg",
			"class": "md:text-sm"
		}
	],
	"defaultVariants": {
		"size": "md",
		"color": "primary",
		"variant": "outline"
	}
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Input.vue
var _sfc_main$1 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UInput",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		type: {
			type: null,
			required: false,
			default: "text"
		},
		placeholder: {
			type: String,
			required: false
		},
		color: {
			type: null,
			required: false
		},
		variant: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		autocomplete: {
			type: [String, Object],
			required: false,
			default: "off"
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		autofocusDelay: {
			type: Number,
			required: false,
			default: 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		highlight: {
			type: Boolean,
			required: false
		},
		fixed: {
			type: Boolean,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelModifiers: {
			type: null,
			required: false
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
			required: false
		},
		leading: {
			type: Boolean,
			required: false
		},
		leadingIcon: {
			type: null,
			required: false
		},
		trailing: {
			type: Boolean,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"blur",
		"change"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("input", _props);
		const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
		const appConfig = useAppConfig();
		const { emitFormBlur, emitFormInput, emitFormChange, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, emitFormFocus, ariaAttrs } = useFormField(_props, { deferInputValidation: true });
		const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
		const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
		const color = computed(() => formFieldColor.value ?? props.color);
		const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
		const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size);
		const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Finput_default,
			...appConfig.ui?.input || {}
		})({
			type: props.type,
			color: color.value,
			variant: props.variant,
			size: size.value,
			loading: props.loading,
			highlight: highlight.value,
			fixed: props.fixed,
			leading: isLeading.value || !!props.avatar || !!slots.leading,
			trailing: isTrailing.value || !!slots.trailing,
			fieldGroup: orientation.value
		}));
		const inputRef = useTemplateRef("inputRef");
		function updateInput(value) {
			if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) value = value?.trim() ?? null;
			if (props.modelModifiers?.number || props.type === "number") value = looseToNumber(value);
			if (props.modelModifiers?.nullable && isEmpty(value)) value = null;
			if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null && isEmpty(value)) value = void 0;
			modelValue.value = value;
			emitFormInput();
		}
		function onInput(event) {
			if (!props.modelModifiers?.lazy) updateInput(event.target.value);
		}
		function onChange(event) {
			const value = event.target.value;
			if (props.modelModifiers?.lazy) updateInput(value);
			if (props.modelModifiers?.trim) event.target.value = value.trim();
			emitFormChange();
			emits("change", event);
		}
		function onBlur(event) {
			emitFormBlur();
			emits("blur", event);
		}
		let autofocusTimeoutId;
		onScopeDispose(() => clearTimeout(autofocusTimeoutId));
		__expose({ inputRef });
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				"data-slot": _ctx.$attrs["data-slot"] ?? "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<input${ssrRenderAttrs(mergeProps({
							id: unref(id),
							ref_key: "inputRef",
							ref: inputRef,
							type: unref(props).type,
							value: unref(modelValue),
							name: unref(name),
							placeholder: unref(props).placeholder,
							class: ui.value.base({ class: unref(props).ui?.base }),
							disabled: disabled.value,
							required: unref(props).required,
							autocomplete: unref(props).autocomplete
						}, {
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}, { "data-slot": "base" }))}${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push, _parent, _scopeId);
						if (unref(isLeading) || !!unref(props).avatar || !!slots.leading) {
							_push(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: unref(props).ui?.leading }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
								if (unref(isLeading) && unref(leadingIconName)) _push(ssrRenderComponent(_sfc_main$14, {
									name: unref(leadingIconName),
									"data-slot": "leadingIcon",
									class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
								}, null, _parent, _scopeId));
								else if (!!unref(props).avatar) _push(ssrRenderComponent(_sfc_main$11, mergeProps({ size: unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize() }, unref(props).avatar, {
									"data-slot": "leadingAvatar",
									class: ui.value.leadingAvatar({ class: unref(props).ui?.leadingAvatar })
								}), null, _parent, _scopeId));
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						} else _push(`<!---->`);
						if (unref(isTrailing) || !!slots.trailing) {
							_push(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(props).ui?.trailing }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
								if (unref(trailingIconName)) _push(ssrRenderComponent(_sfc_main$14, {
									name: unref(trailingIconName),
									"data-slot": "trailingIcon",
									class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						} else _push(`<!---->`);
					} else return [
						createVNode("input", mergeProps({
							id: unref(id),
							ref_key: "inputRef",
							ref: inputRef,
							type: unref(props).type,
							value: unref(modelValue),
							name: unref(name),
							placeholder: unref(props).placeholder,
							class: ui.value.base({ class: unref(props).ui?.base }),
							disabled: disabled.value,
							required: unref(props).required,
							autocomplete: unref(props).autocomplete
						}, {
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}, {
							"data-slot": "base",
							onInput,
							onBlur,
							onChange,
							onFocus: unref(emitFormFocus)
						}), null, 16, [
							"id",
							"type",
							"value",
							"name",
							"placeholder",
							"disabled",
							"required",
							"autocomplete",
							"onFocus"
						]),
						renderSlot(_ctx.$slots, "default", { ui: ui.value }),
						unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
							key: 0,
							"data-slot": "leading",
							class: ui.value.leading({ class: unref(props).ui?.leading })
						}, [renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$14, {
							key: 0,
							name: unref(leadingIconName),
							"data-slot": "leadingIcon",
							class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
						}, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$11, mergeProps({
							key: 1,
							size: unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
						}, unref(props).avatar, {
							"data-slot": "leadingAvatar",
							class: ui.value.leadingAvatar({ class: unref(props).ui?.leadingAvatar })
						}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
						unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
							key: 1,
							"data-slot": "trailing",
							class: ui.value.trailing({ class: unref(props).ui?.trailing })
						}, [renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$14, {
							key: 0,
							name: unref(trailingIconName),
							"data-slot": "trailingIcon",
							class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$4 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Input.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Ftextarea.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftextarea_default = {
	"slots": {
		"root": "relative inline-flex items-center",
		"base": ["w-full rounded-md border-0 appearance-none placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75", "transition-colors"],
		"leading": "absolute start-0 flex items-start",
		"leadingIcon": "shrink-0 text-dimmed",
		"leadingAvatar": "shrink-0",
		"leadingAvatarSize": "",
		"trailing": "absolute end-0 flex items-start",
		"trailingIcon": "shrink-0 text-dimmed"
	},
	"variants": {
		"fieldGroup": {
			"horizontal": {
				"root": "group has-focus-visible:z-[1]",
				"base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
			},
			"vertical": {
				"root": "group has-focus-visible:z-[1]",
				"base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
			}
		},
		"size": {
			"xs": {
				"base": "px-2 py-1 text-sm/4 gap-1",
				"leading": "ps-2 inset-y-1",
				"trailing": "pe-2 inset-y-1",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4"
			},
			"sm": {
				"base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
				"leading": "ps-2.5 inset-y-1.5",
				"trailing": "pe-2.5 inset-y-1.5",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4"
			},
			"md": {
				"base": "px-2.5 py-1.5 text-base/5 gap-1.5",
				"leading": "ps-2.5 inset-y-1.5",
				"trailing": "pe-2.5 inset-y-1.5",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5"
			},
			"lg": {
				"base": "px-3 py-2 text-base/5 gap-2",
				"leading": "ps-3 inset-y-2",
				"trailing": "pe-3 inset-y-2",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5"
			},
			"xl": {
				"base": "px-3 py-2 text-base gap-2",
				"leading": "ps-3 inset-y-2",
				"trailing": "pe-3 inset-y-2",
				"leadingIcon": "size-6",
				"leadingAvatarSize": "xs",
				"trailingIcon": "size-6"
			}
		},
		"variant": {
			"outline": "text-highlighted bg-default ring ring-inset ring-accented",
			"soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
			"subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
			"ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
			"none": "text-highlighted bg-transparent focus:outline-none"
		},
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"leading": { "true": "" },
		"trailing": { "true": "" },
		"loading": { "true": "" },
		"highlight": { "true": "" },
		"fixed": { "false": "" },
		"type": { "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none" },
		"autoresize": { "true": { "base": "resize-none" } }
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": ["outline", "subtle"],
			"class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
		},
		{
			"color": "secondary",
			"variant": ["outline", "subtle"],
			"class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
		},
		{
			"color": "success",
			"variant": ["outline", "subtle"],
			"class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
		},
		{
			"color": "info",
			"variant": ["outline", "subtle"],
			"class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
		},
		{
			"color": "warning",
			"variant": ["outline", "subtle"],
			"class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
		},
		{
			"color": "error",
			"variant": ["outline", "subtle"],
			"class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
		},
		{
			"color": "primary",
			"variant": ["soft", "ghost"],
			"class": "outline-primary/25 focus-visible:outline-3"
		},
		{
			"color": "secondary",
			"variant": ["soft", "ghost"],
			"class": "outline-secondary/25 focus-visible:outline-3"
		},
		{
			"color": "success",
			"variant": ["soft", "ghost"],
			"class": "outline-success/25 focus-visible:outline-3"
		},
		{
			"color": "info",
			"variant": ["soft", "ghost"],
			"class": "outline-info/25 focus-visible:outline-3"
		},
		{
			"color": "warning",
			"variant": ["soft", "ghost"],
			"class": "outline-warning/25 focus-visible:outline-3"
		},
		{
			"color": "error",
			"variant": ["soft", "ghost"],
			"class": "outline-error/25 focus-visible:outline-3"
		},
		{
			"color": "primary",
			"highlight": true,
			"class": "ring ring-inset ring-primary"
		},
		{
			"color": "secondary",
			"highlight": true,
			"class": "ring ring-inset ring-secondary"
		},
		{
			"color": "success",
			"highlight": true,
			"class": "ring ring-inset ring-success"
		},
		{
			"color": "info",
			"highlight": true,
			"class": "ring ring-inset ring-info"
		},
		{
			"color": "warning",
			"highlight": true,
			"class": "ring ring-inset ring-warning"
		},
		{
			"color": "error",
			"highlight": true,
			"class": "ring ring-inset ring-error"
		},
		{
			"color": "neutral",
			"variant": ["outline", "subtle"],
			"class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
		},
		{
			"color": "neutral",
			"variant": ["soft", "ghost"],
			"class": "outline-inverted/25 focus-visible:outline-3"
		},
		{
			"color": "neutral",
			"highlight": true,
			"class": "ring ring-inset ring-inverted"
		},
		{
			"leading": true,
			"size": "xs",
			"class": "ps-7"
		},
		{
			"leading": true,
			"size": "sm",
			"class": "ps-8"
		},
		{
			"leading": true,
			"size": "md",
			"class": "ps-9"
		},
		{
			"leading": true,
			"size": "lg",
			"class": "ps-10"
		},
		{
			"leading": true,
			"size": "xl",
			"class": "ps-11"
		},
		{
			"trailing": true,
			"size": "xs",
			"class": "pe-7"
		},
		{
			"trailing": true,
			"size": "sm",
			"class": "pe-8"
		},
		{
			"trailing": true,
			"size": "md",
			"class": "pe-9"
		},
		{
			"trailing": true,
			"size": "lg",
			"class": "pe-10"
		},
		{
			"trailing": true,
			"size": "xl",
			"class": "pe-11"
		},
		{
			"loading": true,
			"leading": true,
			"class": { "leadingIcon": "animate-spin" }
		},
		{
			"loading": true,
			"leading": false,
			"trailing": true,
			"class": { "trailingIcon": "animate-spin" }
		},
		{
			"fixed": false,
			"size": "xs",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "sm",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "md",
			"class": "md:text-sm"
		},
		{
			"fixed": false,
			"size": "lg",
			"class": "md:text-sm"
		}
	],
	"defaultVariants": {
		"size": "md",
		"color": "primary",
		"variant": "outline"
	}
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Textarea.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UTextarea",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		color: {
			type: null,
			required: false
		},
		variant: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		autofocusDelay: {
			type: Number,
			required: false,
			default: 0
		},
		autoresize: {
			type: Boolean,
			required: false
		},
		autoresizeDelay: {
			type: Number,
			required: false,
			default: 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		rows: {
			type: Number,
			required: false,
			default: 3
		},
		maxrows: {
			type: Number,
			required: false,
			default: 0
		},
		highlight: {
			type: Boolean,
			required: false
		},
		fixed: {
			type: Boolean,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		modelModifiers: {
			type: null,
			required: false
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
			required: false
		},
		leading: {
			type: Boolean,
			required: false
		},
		leadingIcon: {
			type: null,
			required: false
		},
		trailing: {
			type: Boolean,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"blur",
		"change"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("textarea", _props);
		const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
		const appConfig = useAppConfig();
		const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props, { deferInputValidation: true });
		const color = computed(() => formFieldColor.value ?? props.color);
		const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
		const size = computed(() => formFieldSize.value ?? props.size);
		const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
		const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftextarea_default,
			...appConfig.ui?.textarea || {}
		})({
			color: color.value,
			variant: props.variant,
			size: size.value,
			loading: props.loading,
			highlight: highlight.value,
			fixed: props.fixed,
			autoresize: props.autoresize,
			leading: isLeading.value || !!props.avatar || !!slots.leading,
			trailing: isTrailing.value || !!slots.trailing
		}));
		const textareaRef = useTemplateRef("textareaRef");
		function updateInput(value) {
			if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) value = value?.trim() ?? null;
			if (props.modelModifiers?.number) value = looseToNumber(value);
			if (props.modelModifiers?.nullable && isEmpty(value)) value = null;
			if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null && isEmpty(value)) value = void 0;
			modelValue.value = value;
			emitFormInput();
		}
		function onInput(event) {
			autoResize();
			if (!props.modelModifiers?.lazy) updateInput(event.target.value);
		}
		function onChange(event) {
			const value = event.target.value;
			if (props.modelModifiers?.lazy) updateInput(value);
			if (props.modelModifiers?.trim) event.target.value = value.trim();
			emitFormChange();
			emits("change", event);
		}
		function onBlur(event) {
			emitFormBlur();
			emits("blur", event);
		}
		function autoResize() {
			if (props.autoresize && textareaRef.value) {
				textareaRef.value.rows = props.rows;
				const overflow = textareaRef.value.style.overflow;
				textareaRef.value.style.overflow = "hidden";
				const styles = (void 0).getComputedStyle(textareaRef.value);
				const padding = Number.parseInt(styles.paddingTop) + Number.parseInt(styles.paddingBottom);
				const lineHeight = Number.parseInt(styles.lineHeight);
				const { scrollHeight } = textareaRef.value;
				const newRows = (scrollHeight - padding) / lineHeight;
				if (newRows > props.rows) textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
				textareaRef.value.style.overflow = overflow;
			}
		}
		watch(modelValue, () => {
			nextTick(autoResize);
		});
		let autofocusTimeoutId;
		let autoresizeTimeoutId;
		onScopeDispose(() => {
			clearTimeout(autofocusTimeoutId);
			clearTimeout(autoresizeTimeoutId);
		});
		__expose({
			textareaRef,
			autoResize
		});
		return (_ctx, _push, _parent, _attrs) => {
			let _temp0;
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				"data-slot": _ctx.$attrs["data-slot"] ?? "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
							id: unref(id),
							ref_key: "textareaRef",
							ref: textareaRef,
							value: unref(modelValue),
							name: unref(name),
							rows: unref(props).rows,
							placeholder: unref(props).placeholder,
							class: ui.value.base({ class: unref(props).ui?.base }),
							disabled: disabled.value,
							required: unref(props).required
						}, {
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}, { "data-slot": "base" }), "textarea")}${_scopeId}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
						ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push, _parent, _scopeId);
						if (unref(isLeading) || !!unref(props).avatar || !!slots.leading) {
							_push(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: unref(props).ui?.leading }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
								if (unref(isLeading) && unref(leadingIconName)) _push(ssrRenderComponent(_sfc_main$14, {
									name: unref(leadingIconName),
									"data-slot": "leadingIcon",
									class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
								}, null, _parent, _scopeId));
								else if (!!unref(props).avatar) _push(ssrRenderComponent(_sfc_main$11, mergeProps({ size: unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize() }, unref(props).avatar, {
									"data-slot": "leadingAvatar",
									class: ui.value.leadingAvatar({ class: unref(props).ui?.leadingAvatar })
								}), null, _parent, _scopeId));
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						} else _push(`<!---->`);
						if (unref(isTrailing) || !!slots.trailing) {
							_push(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(props).ui?.trailing }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
								if (unref(trailingIconName)) _push(ssrRenderComponent(_sfc_main$14, {
									name: unref(trailingIconName),
									"data-slot": "trailingIcon",
									class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						} else _push(`<!---->`);
					} else return [
						createVNode("textarea", mergeProps({
							id: unref(id),
							ref_key: "textareaRef",
							ref: textareaRef,
							value: unref(modelValue),
							name: unref(name),
							rows: unref(props).rows,
							placeholder: unref(props).placeholder,
							class: ui.value.base({ class: unref(props).ui?.base }),
							disabled: disabled.value,
							required: unref(props).required
						}, {
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}, {
							"data-slot": "base",
							onInput,
							onBlur,
							onChange,
							onFocus: unref(emitFormFocus)
						}), null, 16, [
							"id",
							"value",
							"name",
							"rows",
							"placeholder",
							"disabled",
							"required",
							"onFocus"
						]),
						renderSlot(_ctx.$slots, "default", { ui: ui.value }),
						unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
							key: 0,
							"data-slot": "leading",
							class: ui.value.leading({ class: unref(props).ui?.leading })
						}, [renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$14, {
							key: 0,
							name: unref(leadingIconName),
							"data-slot": "leadingIcon",
							class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
						}, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$11, mergeProps({
							key: 1,
							size: unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
						}, unref(props).avatar, {
							"data-slot": "leadingAvatar",
							class: ui.value.leadingAvatar({ class: unref(props).ui?.leadingAvatar })
						}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
						unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
							key: 1,
							"data-slot": "trailing",
							class: ui.value.trailing({ class: unref(props).ui?.trailing })
						}, [renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$14, {
							key: 0,
							name: unref(trailingIconName),
							"data-slot": "trailingIcon",
							class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$3 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Textarea.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region app/components/sections/RsvpForm.vue?vue&type=script&setup=true&lang.ts
var RsvpForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RsvpForm",
	__ssrInlineRender: true,
	props: { id: {} },
	setup(__props) {
		const { rootRef, visible } = useFadeOnScroll();
		const { rsvp } = weddingInfo;
		const _toast = useToast();
		const toast = new Proxy(_toast || {}, { get(target, prop) {
			const orig = target[prop];
			if (prop === "add" || prop === "update" || prop === "remove" || prop === "clear") return function(...args) {
				try {
					if (typeof orig === "function") return orig.apply(target, args);
					else {
						const alt = target.toasts?.value?.push;
						if (prop === "add" && typeof alt === "function") return target.toasts.value.push(args[0]);
						__dbgClientReport("F", "RsvpForm.vue:toast fallback", `[TOAST MISSING: ${String(prop)}]`, {
							args0: args[0] ? {
								title: args[0].title,
								color: args[0].color
							} : null,
							toastKeys: target ? Object.keys(target) : null
						});
						return args[0] ?? null;
					}
				} catch (e) {
					__dbgClientReport("F", "RsvpForm.vue:toast exception", `[TOAST FAILED: ${String(prop)}]`, { errMsg: e?.message });
					return args[0] ?? null;
				}
			};
			return orig;
		} });
		const form = reactive({
			name: "",
			attendance: "",
			message: ""
		});
		const errors = reactive({
			name: "",
			attendance: ""
		});
		const isSubmitting = ref(false);
		const serverError = ref("");
		const __dbgClientReport = (hypothesisId, location, msg, data = {}) => {
			try {
				const body = JSON.stringify({
					hypothesisId,
					location,
					msg,
					data,
					sessionId: "rsvp-email-not-received",
					runId: "post",
					ts: Date.now()
				});
				fetch("http://127.0.0.1:7778/event", {
					method: "POST",
					body
				}).catch(() => {});
			} catch (_) {}
		};
		const submit = async () => {
			serverError.value = "";
			errors.name = form.name.trim().length < 2 ? rsvp.errorName : "";
			errors.attendance = !form.attendance ? rsvp.errorAttendance : "";
			if (errors.name || errors.attendance) return;
			isSubmitting.value = true;
			__dbgClientReport("D", "RsvpForm.vue:submit()", "[DEBUG] client submitting form via /api/rsvp", {
				name: form.name.slice(0, 30),
				attendance: form.attendance,
				msgLen: form.message.length
			});
			try {
				const response = await $fetch$2("/api/rsvp", {
					method: "POST",
					body: {
						name: form.name.trim(),
						attendance: form.attendance,
						message: form.message.trim() || void 0
					}
				});
				if (response?.ok) {
					__dbgClientReport("D", "RsvpForm.vue:submit()", "[DEBUG] /api/rsvp response ok", {
						ok: response.ok,
						messageId: response.messageId,
						accepted: response.accepted
					});
					toast.add({
						title: rsvp.successTitle,
						description: rsvp.successDescription,
						color: "success",
						icon: "i-heroicons-check-circle-20-solid",
						timeout: 6e3
					});
					form.name = "";
					form.attendance = "";
					form.message = "";
				} else throw new Error("Unexpected response");
			} catch (err) {
				const message = err?.data?.statusMessage || err?.message || rsvp.submitError;
				serverError.value = message;
				__dbgClientReport("E", "RsvpForm.vue:submit()", "[DEBUG] /api/rsvp caught error in client", {
					status: err?.status,
					statusText: err?.statusText,
					statusMessage: err?.data?.statusMessage,
					errMsg: err?.message,
					errName: err?.name
				});
				toast.add({
					title: rsvp.errorTitle,
					description: message,
					color: "error",
					icon: "i-heroicons-exclamation-triangle-20-solid",
					timeout: 8e3
				});
			} finally {
				isSubmitting.value = false;
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UForm = _sfc_main$2;
			const _component_UFormGroup = resolveComponent("UFormGroup");
			const _component_UInput = _sfc_main$1;
			const _component_UTextarea = _sfc_main;
			const _component_UButton = _sfc_main$8;
			const _component_UIcon = _sfc_main$14;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: __props.id,
				ref_key: "rootRef",
				ref: rootRef,
				class: [{
					"is-visible": unref(visible),
					"fade-section": true
				}, "relative section-padding overflow-hidden"]
			}, _attrs))}><div class="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800"></div><img${ssrRenderAttr("src", unref(corner_default))} alt="Floral corner decoration" class="z-5 pointer-events-none absolute -top-2 -left-2 h-40 w-40 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:top-0 sm:left-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><img${ssrRenderAttr("src", unref(corner_down_default))} alt="Floral corner decoration" class="z-5 pointer-events-none absolute -bottom-3 -right-3 h-44 w-44 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:bottom-0 sm:right-0 sm:h-60 sm:w-60 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"><div class="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"><div class="text-white/95 text-center"><div class="font-script text-3xl md:text-4xl text-champagne-light mb-3">${ssrInterpolate(unref(rsvp).label)}</div><h2 class="font-serif-display text-5xl md:text-6xl text-white mb-6">${ssrInterpolate(unref(rsvp).heading)}</h2><p class="font-serif-body text-xl md:text-2xl text-white/85">${ssrInterpolate(unref(rsvp).note)}</p></div><div class="rsvp-card card-bordered bg-warmWhite rounded-2xl p-7 md:p-10 shadow-card">`);
			_push(ssrRenderComponent(_component_UForm, {
				onSubmit: submit,
				state: form
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UFormGroup, {
							"label-for": "name",
							"mb-6": ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<label for="name" class="text-text font-serif-body text-lg mb-2 block"${_scopeId}>${ssrInterpolate(unref(rsvp).nameLabel)}</label>`);
									_push(ssrRenderComponent(_component_UInput, {
										id: "name",
										modelValue: form.name,
										"onUpdate:modelValue": ($event) => form.name = $event,
										"data-rsvp-field": "name",
										size: "lg",
										rounded: "full",
										ui: {
											base: "border border-beige focus:ring focus:ring-champagne/40 bg-transparent shadow-none",
											input: "bg-transparent text-text font-serif-body text-base placeholder:text-text-light/70 caret-text",
											wrapper: "bg-transparent",
											placeholder: "text-text-light/70"
										},
										class: "bg-transparent",
										style: {
											color: "#4A4A4A",
											caretColor: "#4A4A4A"
										},
										"aria-invalid": !!errors.name,
										"aria-describedby": errors.name ? "name-error" : void 0
									}, null, _parent, _scopeId));
									if (errors.name) _push(`<p id="name-error" class="text-sm text-rose-600 mt-2"${_scopeId}>${ssrInterpolate(errors.name)}</p>`);
									else _push(`<!---->`);
								} else return [
									createVNode("label", {
										for: "name",
										class: "text-text font-serif-body text-lg mb-2 block"
									}, toDisplayString(unref(rsvp).nameLabel), 1),
									createVNode(_component_UInput, {
										id: "name",
										modelValue: form.name,
										"onUpdate:modelValue": ($event) => form.name = $event,
										"data-rsvp-field": "name",
										size: "lg",
										rounded: "full",
										ui: {
											base: "border border-beige focus:ring focus:ring-champagne/40 bg-transparent shadow-none",
											input: "bg-transparent text-text font-serif-body text-base placeholder:text-text-light/70 caret-text",
											wrapper: "bg-transparent",
											placeholder: "text-text-light/70"
										},
										class: "bg-transparent",
										style: {
											color: "#4A4A4A",
											caretColor: "#4A4A4A"
										},
										"aria-invalid": !!errors.name,
										"aria-describedby": errors.name ? "name-error" : void 0
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"aria-invalid",
										"aria-describedby"
									]),
									errors.name ? (openBlock(), createBlock("p", {
										key: 0,
										id: "name-error",
										class: "text-sm text-rose-600 mt-2"
									}, toDisplayString(errors.name), 1)) : createCommentVNode("", true)
								];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { "mb-6": "" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<label class="block font-serif-body text-lg mb-3 text-text"${_scopeId}>${ssrInterpolate(unref(rsvp).attendanceLabel)}</label><div role="radiogroup" aria-labelledby="attendance-label" aria-required="true" class="flex flex-row flex-wrap items-center gap-x-8 gap-y-2 font-serif-body text-base text-text"${_scopeId}><label class="flex items-center gap-2 cursor-pointer"${_scopeId}><input type="radio" name="attendance" value="accept"${ssrIncludeBooleanAttr(ssrLooseEqual(form.attendance, "accept")) ? " checked" : ""} class="h-4 w-4 appearance-none rounded-full border border-beige bg-transparent p-0 align-middle shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-0 checked:border-champagne checked:bg-[radial-gradient(circle,var(--wedding-champagne)_45%,transparent_48%)]"${ssrRenderAttr("aria-checked", form.attendance === "accept")}${_scopeId}><span class="${ssrRenderClass(form.attendance === "accept" ? "text-primary font-medium" : "")}"${_scopeId}>${ssrInterpolate(unref(rsvp).acceptOption)}</span></label><label class="flex items-center gap-2 cursor-pointer"${_scopeId}><input type="radio" name="attendance" value="decline"${ssrIncludeBooleanAttr(ssrLooseEqual(form.attendance, "decline")) ? " checked" : ""} class="h-4 w-4 appearance-none rounded-full border border-beige bg-transparent p-0 align-middle shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-0 checked:border-champagne checked:bg-[radial-gradient(circle,var(--wedding-champagne)_45%,transparent_48%)]"${ssrRenderAttr("aria-checked", form.attendance === "decline")}${_scopeId}><span class="${ssrRenderClass(form.attendance === "decline" ? "text-primary font-medium" : "")}"${_scopeId}>${ssrInterpolate(unref(rsvp).declineOption)}</span></label></div>`);
									if (errors.attendance) _push(`<p id="attendance-error" class="text-sm text-rose-600 mt-2"${_scopeId}>${ssrInterpolate(errors.attendance)}</p>`);
									else _push(`<!---->`);
								} else return [
									createVNode("label", { class: "block font-serif-body text-lg mb-3 text-text" }, toDisplayString(unref(rsvp).attendanceLabel), 1),
									createVNode("div", {
										role: "radiogroup",
										"aria-labelledby": "attendance-label",
										"aria-required": "true",
										class: "flex flex-row flex-wrap items-center gap-x-8 gap-y-2 font-serif-body text-base text-text"
									}, [createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [withDirectives(createVNode("input", {
										type: "radio",
										name: "attendance",
										value: "accept",
										"onUpdate:modelValue": ($event) => form.attendance = $event,
										class: "h-4 w-4 appearance-none rounded-full border border-beige bg-transparent p-0 align-middle shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-0 checked:border-champagne checked:bg-[radial-gradient(circle,var(--wedding-champagne)_45%,transparent_48%)]",
										"aria-checked": form.attendance === "accept"
									}, null, 8, ["onUpdate:modelValue", "aria-checked"]), [[vModelRadio, form.attendance]]), createVNode("span", { class: form.attendance === "accept" ? "text-primary font-medium" : "" }, toDisplayString(unref(rsvp).acceptOption), 3)]), createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [withDirectives(createVNode("input", {
										type: "radio",
										name: "attendance",
										value: "decline",
										"onUpdate:modelValue": ($event) => form.attendance = $event,
										class: "h-4 w-4 appearance-none rounded-full border border-beige bg-transparent p-0 align-middle shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-0 checked:border-champagne checked:bg-[radial-gradient(circle,var(--wedding-champagne)_45%,transparent_48%)]",
										"aria-checked": form.attendance === "decline"
									}, null, 8, ["onUpdate:modelValue", "aria-checked"]), [[vModelRadio, form.attendance]]), createVNode("span", { class: form.attendance === "decline" ? "text-primary font-medium" : "" }, toDisplayString(unref(rsvp).declineOption), 3)])]),
									errors.attendance ? (openBlock(), createBlock("p", {
										key: 0,
										id: "attendance-error",
										class: "text-sm text-rose-600 mt-2"
									}, toDisplayString(errors.attendance), 1)) : createCommentVNode("", true)
								];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { "mb-8": "" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<label class="block font-serif-body text-lg mb-2 text-text"${_scopeId}>${ssrInterpolate(unref(rsvp).messageLabel)} <span class="text-gold text-sm"${_scopeId}> (optional)</span></label>`);
									_push(ssrRenderComponent(_component_UTextarea, {
										modelValue: form.message,
										"onUpdate:modelValue": ($event) => form.message = $event,
										"data-rsvp-field": "message",
										rows: 5,
										size: "lg",
										rounded: "lg",
										ui: {
											base: "border border-beige focus:ring focus:ring-champagne/40 bg-cream/60 shadow-none w-full",
											textarea: "bg-cream/60 text-text font-serif-body text-base placeholder:text-text-light/70 caret-text min-h-[140px]",
											placeholder: "text-text-light/70"
										},
										class: "w-full",
										style: {
											color: "#4A4A4A",
											caretColor: "#4A4A4A"
										}
									}, null, _parent, _scopeId));
								} else return [createVNode("label", { class: "block font-serif-body text-lg mb-2 text-text" }, [createTextVNode(toDisplayString(unref(rsvp).messageLabel) + " ", 1), createVNode("span", { class: "text-gold text-sm" }, " (optional)")]), createVNode(_component_UTextarea, {
									modelValue: form.message,
									"onUpdate:modelValue": ($event) => form.message = $event,
									"data-rsvp-field": "message",
									rows: 5,
									size: "lg",
									rounded: "lg",
									ui: {
										base: "border border-beige focus:ring focus:ring-champagne/40 bg-cream/60 shadow-none w-full",
										textarea: "bg-cream/60 text-text font-serif-body text-base placeholder:text-text-light/70 caret-text min-h-[140px]",
										placeholder: "text-text-light/70"
									},
									class: "w-full",
									style: {
										color: "#4A4A4A",
										caretColor: "#4A4A4A"
									}
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						if (serverError.value) _push(`<p class="mb-6 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3" role="alert"${_scopeId}>${ssrInterpolate(serverError.value)}</p>`);
						else _push(`<!---->`);
						_push(ssrRenderComponent(_component_UButton, {
							type: "submit",
							variant: "solid",
							color: "neutral",
							loading: isSubmitting.value,
							disabled: isSubmitting.value,
							class: "w-full bg-champagne hover:bg-gold text-warmWhite rounded-full py-3 mt-6 text-sm tracking-widest uppercase disabled:opacity-70 disabled:cursor-not-allowed",
							block: "",
							size: "lg"
						}, createSlots({
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` ${ssrInterpolate(isSubmitting.value ? unref(rsvp).submittingLabel : unref(rsvp).submitLabel)}`);
								else return [createTextVNode(" " + toDisplayString(isSubmitting.value ? unref(rsvp).submittingLabel : unref(rsvp).submitLabel), 1)];
							}),
							_: 2
						}, [isSubmitting.value ? {
							name: "leading",
							fn: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UIcon, {
									name: "i-heroicons-arrow-path-20-solid",
									class: "animate-spin"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UIcon, {
									name: "i-heroicons-arrow-path-20-solid",
									class: "animate-spin"
								})];
							}),
							key: "0"
						} : void 0]), _parent, _scopeId));
					} else return [
						createVNode(_component_UFormGroup, {
							"label-for": "name",
							"mb-6": ""
						}, {
							default: withCtx(() => [
								createVNode("label", {
									for: "name",
									class: "text-text font-serif-body text-lg mb-2 block"
								}, toDisplayString(unref(rsvp).nameLabel), 1),
								createVNode(_component_UInput, {
									id: "name",
									modelValue: form.name,
									"onUpdate:modelValue": ($event) => form.name = $event,
									"data-rsvp-field": "name",
									size: "lg",
									rounded: "full",
									ui: {
										base: "border border-beige focus:ring focus:ring-champagne/40 bg-transparent shadow-none",
										input: "bg-transparent text-text font-serif-body text-base placeholder:text-text-light/70 caret-text",
										wrapper: "bg-transparent",
										placeholder: "text-text-light/70"
									},
									class: "bg-transparent",
									style: {
										color: "#4A4A4A",
										caretColor: "#4A4A4A"
									},
									"aria-invalid": !!errors.name,
									"aria-describedby": errors.name ? "name-error" : void 0
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"aria-invalid",
									"aria-describedby"
								]),
								errors.name ? (openBlock(), createBlock("p", {
									key: 0,
									id: "name-error",
									class: "text-sm text-rose-600 mt-2"
								}, toDisplayString(errors.name), 1)) : createCommentVNode("", true)
							]),
							_: 1
						}),
						createVNode(_component_UFormGroup, { "mb-6": "" }, {
							default: withCtx(() => [
								createVNode("label", { class: "block font-serif-body text-lg mb-3 text-text" }, toDisplayString(unref(rsvp).attendanceLabel), 1),
								createVNode("div", {
									role: "radiogroup",
									"aria-labelledby": "attendance-label",
									"aria-required": "true",
									class: "flex flex-row flex-wrap items-center gap-x-8 gap-y-2 font-serif-body text-base text-text"
								}, [createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [withDirectives(createVNode("input", {
									type: "radio",
									name: "attendance",
									value: "accept",
									"onUpdate:modelValue": ($event) => form.attendance = $event,
									class: "h-4 w-4 appearance-none rounded-full border border-beige bg-transparent p-0 align-middle shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-0 checked:border-champagne checked:bg-[radial-gradient(circle,var(--wedding-champagne)_45%,transparent_48%)]",
									"aria-checked": form.attendance === "accept"
								}, null, 8, ["onUpdate:modelValue", "aria-checked"]), [[vModelRadio, form.attendance]]), createVNode("span", { class: form.attendance === "accept" ? "text-primary font-medium" : "" }, toDisplayString(unref(rsvp).acceptOption), 3)]), createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [withDirectives(createVNode("input", {
									type: "radio",
									name: "attendance",
									value: "decline",
									"onUpdate:modelValue": ($event) => form.attendance = $event,
									class: "h-4 w-4 appearance-none rounded-full border border-beige bg-transparent p-0 align-middle shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-0 checked:border-champagne checked:bg-[radial-gradient(circle,var(--wedding-champagne)_45%,transparent_48%)]",
									"aria-checked": form.attendance === "decline"
								}, null, 8, ["onUpdate:modelValue", "aria-checked"]), [[vModelRadio, form.attendance]]), createVNode("span", { class: form.attendance === "decline" ? "text-primary font-medium" : "" }, toDisplayString(unref(rsvp).declineOption), 3)])]),
								errors.attendance ? (openBlock(), createBlock("p", {
									key: 0,
									id: "attendance-error",
									class: "text-sm text-rose-600 mt-2"
								}, toDisplayString(errors.attendance), 1)) : createCommentVNode("", true)
							]),
							_: 1
						}),
						createVNode(_component_UFormGroup, { "mb-8": "" }, {
							default: withCtx(() => [createVNode("label", { class: "block font-serif-body text-lg mb-2 text-text" }, [createTextVNode(toDisplayString(unref(rsvp).messageLabel) + " ", 1), createVNode("span", { class: "text-gold text-sm" }, " (optional)")]), createVNode(_component_UTextarea, {
								modelValue: form.message,
								"onUpdate:modelValue": ($event) => form.message = $event,
								"data-rsvp-field": "message",
								rows: 5,
								size: "lg",
								rounded: "lg",
								ui: {
									base: "border border-beige focus:ring focus:ring-champagne/40 bg-cream/60 shadow-none w-full",
									textarea: "bg-cream/60 text-text font-serif-body text-base placeholder:text-text-light/70 caret-text min-h-[140px]",
									placeholder: "text-text-light/70"
								},
								class: "w-full",
								style: {
									color: "#4A4A4A",
									caretColor: "#4A4A4A"
								}
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						serverError.value ? (openBlock(), createBlock("p", {
							key: 0,
							class: "mb-6 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3",
							role: "alert"
						}, toDisplayString(serverError.value), 1)) : createCommentVNode("", true),
						createVNode(_component_UButton, {
							type: "submit",
							variant: "solid",
							color: "neutral",
							loading: isSubmitting.value,
							disabled: isSubmitting.value,
							class: "w-full bg-champagne hover:bg-gold text-warmWhite rounded-full py-3 mt-6 text-sm tracking-widest uppercase disabled:opacity-70 disabled:cursor-not-allowed",
							block: "",
							size: "lg"
						}, createSlots({
							default: withCtx(() => [createTextVNode(" " + toDisplayString(isSubmitting.value ? unref(rsvp).submittingLabel : unref(rsvp).submitLabel), 1)]),
							_: 2
						}, [isSubmitting.value ? {
							name: "leading",
							fn: withCtx(() => [createVNode(_component_UIcon, {
								name: "i-heroicons-arrow-path-20-solid",
								class: "animate-spin"
							})]),
							key: "0"
						} : void 0]), 1032, ["loading", "disabled"])
					];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/sections/RsvpForm.vue
var _sfc_setup$2 = RsvpForm_vue_vue_type_script_setup_true_lang_default.setup;
RsvpForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/RsvpForm.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var RsvpForm_default = Object.assign(RsvpForm_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsRsvpForm" });
//#endregion
//#region app/components/sections/SiteFooter.vue?vue&type=script&setup=true&lang.ts
var SiteFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SiteFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const { footer } = weddingInfo;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden" }, _attrs))}><div class="min-h-[480px] md:min-h-[560px] relative flex items-center justify-center"><div class="absolute inset-0 bg-cover bg-center" style="${ssrRenderStyle({ backgroundImage: `url(${unref(JM11_default)})` })}"></div><div class="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-800/70 to-primary-700/65"></div><div class="relative z-10 px-6 text-center"><h2 class="font-script text-5xl md:text-7xl text-white mb-5">${ssrInterpolate(unref(footer).headline)}</h2><p class="font-serif-body text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">${ssrInterpolate(unref(footer).text)}</p><div class="text-sans-small-caps text-champagne-light">${ssrInterpolate(unref(footer).eventLabel)}</div></div></div><div class="bg-text/95 text-white/90 py-6 px-6 md:px-12"><div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"><div class="flex flex-wrap items-center gap-6"><!--[-->`);
			ssrRenderList(unref(footer).links, (link) => {
				_push(`<a${ssrRenderAttr("href", link.href)}${ssrRenderAttr("target", link.href.startsWith("http") ? "_blank" : void 0)}${ssrRenderAttr("rel", link.href.startsWith("http") ? "noopener noreferrer" : void 0)} class="font-serif-body text-base hover:text-champagne-light transition">${ssrInterpolate(link.label)}</a>`);
			});
			_push(`<!--]--></div><div class="font-serif-body text-sm text-white/70">${ssrInterpolate(unref(footer).copyright)}</div></div></div></footer>`);
		};
	}
});
//#endregion
//#region app/components/sections/SiteFooter.vue
var _sfc_setup$1 = SiteFooter_vue_vue_type_script_setup_true_lang_default.setup;
SiteFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SiteFooter.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var SiteFooter_default = Object.assign(SiteFooter_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsSiteFooter" });
//#endregion
//#region app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><header>`);
			_push(ssrRenderComponent(HeroSection_default, null, null, _parent));
			_push(`</header>`);
			_push(ssrRenderComponent(StickyNavigation_default, null, null, _parent));
			_push(`<main>`);
			_push(ssrRenderComponent(WeddingDetails_default, { id: "details" }, null, _parent));
			_push(ssrRenderComponent(CountdownTimer_default, { id: "countdown" }, null, _parent));
			_push(ssrRenderComponent(InvitationMessage_default, { id: "message" }, null, _parent));
			_push(ssrRenderComponent(QuoteBanner_default, null, null, _parent));
			_push(ssrRenderComponent(WeddingTimeline_default, { id: "schedule" }, null, _parent));
			_push(ssrRenderComponent(EntourageSection_default, { id: "entourage" }, null, _parent));
			_push(ssrRenderComponent(GallerySection_default, { id: "gallery" }, null, _parent));
			_push(ssrRenderComponent(VenueSection_default, { id: "venue" }, null, _parent));
			_push(ssrRenderComponent(DressCodeSection_default, { id: "dresscode" }, null, _parent));
			_push(ssrRenderComponent(GiftsSection_default, { id: "gifts" }, null, _parent));
			_push(ssrRenderComponent(RemindersSection_default, { id: "reminders" }, null, _parent));
			_push(ssrRenderComponent(RsvpForm_default, { id: "rsvp" }, null, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(SiteFooter_default, null, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-BPizcbH6.mjs.map
