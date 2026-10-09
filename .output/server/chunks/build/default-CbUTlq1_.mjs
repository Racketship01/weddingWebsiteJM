import { x as useSeoMeta$1, y as useHead$1 } from '../virtual/entry.mjs';
import { w as weddingInfo } from './wedding-CPT_lFsD.mjs';
import { defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
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

//#region app/layouts/default.vue?vue&type=script&setup=true&lang.ts
var default_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "default",
	__ssrInlineRender: true,
	setup(__props) {
		useSeoMeta$1({
			title: weddingInfo.seo.title,
			ogTitle: weddingInfo.seo.title,
			description: weddingInfo.seo.description,
			ogDescription: weddingInfo.seo.description,
			ogImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=630&fit=crop",
			ogType: "website",
			twitterCard: "summary_large_image"
		});
		useHead$1({ bodyAttrs: { class: "bg-warmWhite text-text" } });
		const showBackToTop = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`<button aria-label="Back to top" class="${ssrRenderClass([[showBackToTop.value ? "opacity-100 visible" : "opacity-0 invisible"], "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-champagne text-white shadow-lg flex items-center justify-center transition-all duration-300 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10"])}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg></button><!--]-->`);
		};
	}
});
//#endregion
//#region app/layouts/default.vue
var _sfc_setup = default_vue_vue_type_script_setup_true_lang_default.setup;
default_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = default_vue_vue_type_script_setup_true_lang_default;

export { default_default as default };
//# sourceMappingURL=default-CbUTlq1_.mjs.map
