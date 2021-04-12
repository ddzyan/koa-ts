// RouteDefinition.ts
export interface RouteDefinition {
  path: string;
  requestMethod: 'get' | 'post' | 'del' | 'options' | 'put' | 'all';
  property: string;
}

export enum METHODS {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DEL = 'del',
  ALL = 'all',
  OPTIONS = 'options',
}

export const PATH = 'DEC_PATH';
export const PREFIX = 'DEC_prefix';
