"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Plotly = __importStar(require("plotly.js"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const af_1 = __importDefault(require("plotly.js/lib/locales/af"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const am_1 = __importDefault(require("plotly.js/lib/locales/am"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ar_dz_1 = __importDefault(require("plotly.js/lib/locales/ar-dz"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ar_eg_1 = __importDefault(require("plotly.js/lib/locales/ar-eg"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ar_1 = __importDefault(require("plotly.js/lib/locales/ar"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const az_1 = __importDefault(require("plotly.js/lib/locales/az"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const bg_1 = __importDefault(require("plotly.js/lib/locales/bg"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const bs_1 = __importDefault(require("plotly.js/lib/locales/bs"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ca_1 = __importDefault(require("plotly.js/lib/locales/ca"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const cs_1 = __importDefault(require("plotly.js/lib/locales/cs"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const cy_1 = __importDefault(require("plotly.js/lib/locales/cy"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const da_1 = __importDefault(require("plotly.js/lib/locales/da"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const de_ch_1 = __importDefault(require("plotly.js/lib/locales/de-ch"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const de_1 = __importDefault(require("plotly.js/lib/locales/de"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const el_1 = __importDefault(require("plotly.js/lib/locales/el"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const eo_1 = __importDefault(require("plotly.js/lib/locales/eo"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const es_ar_1 = __importDefault(require("plotly.js/lib/locales/es-ar"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const es_pe_1 = __importDefault(require("plotly.js/lib/locales/es-pe"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const es_1 = __importDefault(require("plotly.js/lib/locales/es"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const et_1 = __importDefault(require("plotly.js/lib/locales/et"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const eu_1 = __importDefault(require("plotly.js/lib/locales/eu"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const fa_1 = __importDefault(require("plotly.js/lib/locales/fa"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const fi_1 = __importDefault(require("plotly.js/lib/locales/fi"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const fo_1 = __importDefault(require("plotly.js/lib/locales/fo"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const fr_ch_1 = __importDefault(require("plotly.js/lib/locales/fr-ch"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const fr_1 = __importDefault(require("plotly.js/lib/locales/fr"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const gl_1 = __importDefault(require("plotly.js/lib/locales/gl"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const gu_1 = __importDefault(require("plotly.js/lib/locales/gu"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const he_1 = __importDefault(require("plotly.js/lib/locales/he"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const hi_in_1 = __importDefault(require("plotly.js/lib/locales/hi-in"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const hr_1 = __importDefault(require("plotly.js/lib/locales/hr"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const hu_1 = __importDefault(require("plotly.js/lib/locales/hu"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const hy_1 = __importDefault(require("plotly.js/lib/locales/hy"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const id_1 = __importDefault(require("plotly.js/lib/locales/id"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const is_1 = __importDefault(require("plotly.js/lib/locales/is"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const it_1 = __importDefault(require("plotly.js/lib/locales/it"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ja_1 = __importDefault(require("plotly.js/lib/locales/ja"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ka_1 = __importDefault(require("plotly.js/lib/locales/ka"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const km_1 = __importDefault(require("plotly.js/lib/locales/km"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ko_1 = __importDefault(require("plotly.js/lib/locales/ko"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const lt_1 = __importDefault(require("plotly.js/lib/locales/lt"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const lv_1 = __importDefault(require("plotly.js/lib/locales/lv"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const me_me_1 = __importDefault(require("plotly.js/lib/locales/me-me"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const me_1 = __importDefault(require("plotly.js/lib/locales/me"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const mk_1 = __importDefault(require("plotly.js/lib/locales/mk"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ml_1 = __importDefault(require("plotly.js/lib/locales/ml"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ms_1 = __importDefault(require("plotly.js/lib/locales/ms"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const mt_1 = __importDefault(require("plotly.js/lib/locales/mt"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const nl_be_1 = __importDefault(require("plotly.js/lib/locales/nl-be"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const nl_1 = __importDefault(require("plotly.js/lib/locales/nl"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const no_1 = __importDefault(require("plotly.js/lib/locales/no"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const pa_1 = __importDefault(require("plotly.js/lib/locales/pa"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const pl_1 = __importDefault(require("plotly.js/lib/locales/pl"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const pt_br_1 = __importDefault(require("plotly.js/lib/locales/pt-br"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const pt_pt_1 = __importDefault(require("plotly.js/lib/locales/pt-pt"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const rm_1 = __importDefault(require("plotly.js/lib/locales/rm"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ro_1 = __importDefault(require("plotly.js/lib/locales/ro"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ru_1 = __importDefault(require("plotly.js/lib/locales/ru"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const sk_1 = __importDefault(require("plotly.js/lib/locales/sk"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const sl_1 = __importDefault(require("plotly.js/lib/locales/sl"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const sq_1 = __importDefault(require("plotly.js/lib/locales/sq"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const sr_sr_1 = __importDefault(require("plotly.js/lib/locales/sr-sr"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const sr_1 = __importDefault(require("plotly.js/lib/locales/sr"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const sv_1 = __importDefault(require("plotly.js/lib/locales/sv"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const sw_1 = __importDefault(require("plotly.js/lib/locales/sw"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ta_1 = __importDefault(require("plotly.js/lib/locales/ta"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const th_1 = __importDefault(require("plotly.js/lib/locales/th"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const tr_1 = __importDefault(require("plotly.js/lib/locales/tr"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const tt_1 = __importDefault(require("plotly.js/lib/locales/tt"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const uk_1 = __importDefault(require("plotly.js/lib/locales/uk"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const ur_1 = __importDefault(require("plotly.js/lib/locales/ur"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const vi_1 = __importDefault(require("plotly.js/lib/locales/vi"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const zh_cn_1 = __importDefault(require("plotly.js/lib/locales/zh-cn"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const zh_hk_1 = __importDefault(require("plotly.js/lib/locales/zh-hk"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module
const zh_tw_1 = __importDefault(require("plotly.js/lib/locales/zh-tw"));
Plotly.register([
    af_1.default,
    am_1.default,
    ar_dz_1.default,
    ar_eg_1.default,
    ar_1.default,
    az_1.default,
    bg_1.default,
    bs_1.default,
    ca_1.default,
    cs_1.default,
    cy_1.default,
    da_1.default,
    de_ch_1.default,
    de_1.default,
    el_1.default,
    eo_1.default,
    es_ar_1.default,
    es_pe_1.default,
    es_1.default,
    et_1.default,
    eu_1.default,
    fa_1.default,
    fi_1.default,
    fo_1.default,
    fr_ch_1.default,
    fr_1.default,
    gl_1.default,
    gu_1.default,
    he_1.default,
    hi_in_1.default,
    hr_1.default,
    hu_1.default,
    hy_1.default,
    id_1.default,
    is_1.default,
    it_1.default,
    ja_1.default,
    ka_1.default,
    km_1.default,
    ko_1.default,
    lt_1.default,
    lv_1.default,
    me_me_1.default,
    me_1.default,
    mk_1.default,
    ml_1.default,
    ms_1.default,
    mt_1.default,
    nl_be_1.default,
    nl_1.default,
    no_1.default,
    pa_1.default,
    pl_1.default,
    pt_br_1.default,
    pt_pt_1.default,
    rm_1.default,
    ro_1.default,
    ru_1.default,
    sk_1.default,
    sl_1.default,
    sq_1.default,
    sr_sr_1.default,
    sr_1.default,
    sv_1.default,
    sw_1.default,
    ta_1.default,
    th_1.default,
    tr_1.default,
    tt_1.default,
    uk_1.default,
    ur_1.default,
    vi_1.default,
    zh_cn_1.default,
    zh_hk_1.default,
    zh_tw_1.default,
]);
