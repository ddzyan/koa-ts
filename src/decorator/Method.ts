import { Route } from './Router';
import { METHODS } from './RouteDefinition';

export function ALL(path: string) {
  return Route(path, METHODS.ALL);
}

export function GET(path: string) {
  return Route(path, METHODS.GET);
}

export function POST(path: string) {
  return Route(path, METHODS.POST);
}

export function PUT(path: string) {
  return Route(path, METHODS.PUT);
}

export function DEL(path: string) {
  return Route(path, METHODS.DEL);
}
