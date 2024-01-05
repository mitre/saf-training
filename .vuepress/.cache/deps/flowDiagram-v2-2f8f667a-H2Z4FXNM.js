import {
  flowRendererV2,
  flowStyles
} from "./chunk-CGPJAAKM.js";
import "./chunk-6ESK7MQZ.js";
import {
  flowDb,
  parser$1
} from "./chunk-THAGWN3R.js";
import "./chunk-ULQHWUKP.js";
import "./chunk-C55JCHDM.js";
import "./chunk-TQDBUXIK.js";
import {
  require_dayjs_min,
  require_dist,
  setConfig
} from "./chunk-MILIJ3F3.js";
import {
  __toESM
} from "./chunk-3EJPJMEH.js";

// node_modules/mermaid/dist/flowDiagram-v2-2f8f667a.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-2f8f667a-H2Z4FXNM.js.map
