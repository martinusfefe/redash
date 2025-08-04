"use strict";

var Plotly = _interopRequireWildcard(require("plotly.js"));
var _af = _interopRequireDefault(require("plotly.js/lib/locales/af"));
var _am = _interopRequireDefault(require("plotly.js/lib/locales/am"));
var _arDz = _interopRequireDefault(require("plotly.js/lib/locales/ar-dz"));
var _arEg = _interopRequireDefault(require("plotly.js/lib/locales/ar-eg"));
var _ar = _interopRequireDefault(require("plotly.js/lib/locales/ar"));
var _az = _interopRequireDefault(require("plotly.js/lib/locales/az"));
var _bg = _interopRequireDefault(require("plotly.js/lib/locales/bg"));
var _bs = _interopRequireDefault(require("plotly.js/lib/locales/bs"));
var _ca = _interopRequireDefault(require("plotly.js/lib/locales/ca"));
var _cs = _interopRequireDefault(require("plotly.js/lib/locales/cs"));
var _cy = _interopRequireDefault(require("plotly.js/lib/locales/cy"));
var _da = _interopRequireDefault(require("plotly.js/lib/locales/da"));
var _deCh = _interopRequireDefault(require("plotly.js/lib/locales/de-ch"));
var _de = _interopRequireDefault(require("plotly.js/lib/locales/de"));
var _el = _interopRequireDefault(require("plotly.js/lib/locales/el"));
var _eo = _interopRequireDefault(require("plotly.js/lib/locales/eo"));
var _esAr = _interopRequireDefault(require("plotly.js/lib/locales/es-ar"));
var _esPe = _interopRequireDefault(require("plotly.js/lib/locales/es-pe"));
var _es = _interopRequireDefault(require("plotly.js/lib/locales/es"));
var _et = _interopRequireDefault(require("plotly.js/lib/locales/et"));
var _eu = _interopRequireDefault(require("plotly.js/lib/locales/eu"));
var _fa = _interopRequireDefault(require("plotly.js/lib/locales/fa"));
var _fi = _interopRequireDefault(require("plotly.js/lib/locales/fi"));
var _fo = _interopRequireDefault(require("plotly.js/lib/locales/fo"));
var _frCh = _interopRequireDefault(require("plotly.js/lib/locales/fr-ch"));
var _fr = _interopRequireDefault(require("plotly.js/lib/locales/fr"));
var _gl = _interopRequireDefault(require("plotly.js/lib/locales/gl"));
var _gu = _interopRequireDefault(require("plotly.js/lib/locales/gu"));
var _he = _interopRequireDefault(require("plotly.js/lib/locales/he"));
var _hiIn = _interopRequireDefault(require("plotly.js/lib/locales/hi-in"));
var _hr = _interopRequireDefault(require("plotly.js/lib/locales/hr"));
var _hu = _interopRequireDefault(require("plotly.js/lib/locales/hu"));
var _hy = _interopRequireDefault(require("plotly.js/lib/locales/hy"));
var _id = _interopRequireDefault(require("plotly.js/lib/locales/id"));
var _is = _interopRequireDefault(require("plotly.js/lib/locales/is"));
var _it = _interopRequireDefault(require("plotly.js/lib/locales/it"));
var _ja = _interopRequireDefault(require("plotly.js/lib/locales/ja"));
var _ka = _interopRequireDefault(require("plotly.js/lib/locales/ka"));
var _km = _interopRequireDefault(require("plotly.js/lib/locales/km"));
var _ko = _interopRequireDefault(require("plotly.js/lib/locales/ko"));
var _lt = _interopRequireDefault(require("plotly.js/lib/locales/lt"));
var _lv = _interopRequireDefault(require("plotly.js/lib/locales/lv"));
var _meMe = _interopRequireDefault(require("plotly.js/lib/locales/me-me"));
var _me = _interopRequireDefault(require("plotly.js/lib/locales/me"));
var _mk = _interopRequireDefault(require("plotly.js/lib/locales/mk"));
var _ml = _interopRequireDefault(require("plotly.js/lib/locales/ml"));
var _ms = _interopRequireDefault(require("plotly.js/lib/locales/ms"));
var _mt = _interopRequireDefault(require("plotly.js/lib/locales/mt"));
var _nlBe = _interopRequireDefault(require("plotly.js/lib/locales/nl-be"));
var _nl = _interopRequireDefault(require("plotly.js/lib/locales/nl"));
var _no = _interopRequireDefault(require("plotly.js/lib/locales/no"));
var _pa = _interopRequireDefault(require("plotly.js/lib/locales/pa"));
var _pl = _interopRequireDefault(require("plotly.js/lib/locales/pl"));
var _ptBr = _interopRequireDefault(require("plotly.js/lib/locales/pt-br"));
var _ptPt = _interopRequireDefault(require("plotly.js/lib/locales/pt-pt"));
var _rm = _interopRequireDefault(require("plotly.js/lib/locales/rm"));
var _ro = _interopRequireDefault(require("plotly.js/lib/locales/ro"));
var _ru = _interopRequireDefault(require("plotly.js/lib/locales/ru"));
var _sk = _interopRequireDefault(require("plotly.js/lib/locales/sk"));
var _sl = _interopRequireDefault(require("plotly.js/lib/locales/sl"));
var _sq = _interopRequireDefault(require("plotly.js/lib/locales/sq"));
var _srSr = _interopRequireDefault(require("plotly.js/lib/locales/sr-sr"));
var _sr = _interopRequireDefault(require("plotly.js/lib/locales/sr"));
var _sv = _interopRequireDefault(require("plotly.js/lib/locales/sv"));
var _sw = _interopRequireDefault(require("plotly.js/lib/locales/sw"));
var _ta = _interopRequireDefault(require("plotly.js/lib/locales/ta"));
var _th = _interopRequireDefault(require("plotly.js/lib/locales/th"));
var _tr = _interopRequireDefault(require("plotly.js/lib/locales/tr"));
var _tt = _interopRequireDefault(require("plotly.js/lib/locales/tt"));
var _uk = _interopRequireDefault(require("plotly.js/lib/locales/uk"));
var _ur = _interopRequireDefault(require("plotly.js/lib/locales/ur"));
var _vi = _interopRequireDefault(require("plotly.js/lib/locales/vi"));
var _zhCn = _interopRequireDefault(require("plotly.js/lib/locales/zh-cn"));
var _zhHk = _interopRequireDefault(require("plotly.js/lib/locales/zh-hk"));
var _zhTw = _interopRequireDefault(require("plotly.js/lib/locales/zh-tw"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module

Plotly.register([_af.default, _am.default, _arDz.default, _arEg.default, _ar.default, _az.default, _bg.default, _bs.default, _ca.default, _cs.default, _cy.default, _da.default, _deCh.default, _de.default, _el.default, _eo.default, _esAr.default, _esPe.default, _es.default, _et.default, _eu.default, _fa.default, _fi.default, _fo.default, _frCh.default, _fr.default, _gl.default, _gu.default, _he.default, _hiIn.default, _hr.default, _hu.default, _hy.default, _id.default, _is.default, _it.default, _ja.default, _ka.default, _km.default, _ko.default, _lt.default, _lv.default, _meMe.default, _me.default, _mk.default, _ml.default, _ms.default, _mt.default, _nlBe.default, _nl.default, _no.default, _pa.default, _pl.default, _ptBr.default, _ptPt.default, _rm.default, _ro.default, _ru.default, _sk.default, _sl.default, _sq.default, _srSr.default, _sr.default, _sv.default, _sw.default, _ta.default, _th.default, _tr.default, _tt.default, _uk.default, _ur.default, _vi.default, _zhCn.default, _zhHk.default, _zhTw.default]);
//# sourceMappingURL=locales.js.map