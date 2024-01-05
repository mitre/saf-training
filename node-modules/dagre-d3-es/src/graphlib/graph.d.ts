export class Graph {
  constructor(opts?: {});
  _isDirected: any;
  _isMultigraph: any;
  _isCompound: any;
  _label: any;
  _defaultNodeLabelFn: () => any;
  _defaultEdgeLabelFn: () => any;
  _nodes: {};
  _parent: {};
  _children: {};
  _in: {};
  _preds: {};
  _out: {};
  _sucs: {};
  _edgeObjs: {};
  _edgeLabels: {};
  isDirected(): any;
  isMultigraph(): any;
  isCompound(): any;
  setGraph(label: any): Graph;
  graph(): any;
  setDefaultNodeLabel(newDefault: any): Graph;
  nodeCount(): number;
  nodes(): string[];
  sources(): string[];
  sinks(): string[];
  setNodes(vs: any, value: any, ...args: any[]): Graph;
  setNode(v: any, value: any, ...args: any[]): Graph;
  node(v: any): any;
  hasNode(v: any): boolean;
  removeNode(v: any): Graph;
  setParent(v: any, parent: any): Graph;
  _removeFromParentsChildList(v: any): void;
  parent(v: any): any;
  children(v: any): string[];
  predecessors(v: any): string[];
  successors(v: any): string[];
  neighbors(v: any): string[];
  isLeaf(v: any): boolean;
  filterNodes(filter: any): any;
  setDefaultEdgeLabel(newDefault: any): Graph;
  edgeCount(): number;
  edges(): any[];
  setPath(vs: any, value: any, ...args: any[]): Graph;
  setEdge(...args: any[]): Graph;
  edge(v: any, w: any, name: any, ...args: any[]): any;
  hasEdge(v: any, w: any, name: any, ...args: any[]): boolean;
  removeEdge(v: any, w: any, name: any, ...args: any[]): Graph;
  inEdges(v: any, u: any): any[];
  outEdges(v: any, w: any): any[];
  nodeEdges(v: any, w: any): any[];
  _nodeCount: number;
  _edgeCount: number;
}
