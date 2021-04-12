// 实现 Get 装饰器
import { RouteDefinition, METHODS, PATH } from './RouteDefinition';

function getMyPropertyDecoratorPropertyKeys(ctor: { prototype: any }, metadataKey: string) {
  return (Reflect.getMetadata('keys:' + metadataKey, ctor.prototype) || []) as string[];
}

function getMyPropertyDecorator(ctor: { prototype: any }, metadataKey: string, propertyKey: string) {
  return Reflect.getMetadata('data:' + metadataKey, ctor.prototype, propertyKey);
}

function getMyPropertyDecorators(ctor: { prototype: any }, metadataKey: string) {
  const ret: Record<string, any> = {};
  for (let propertyKey of getMyPropertyDecoratorPropertyKeys(ctor, metadataKey)) {
    ret[propertyKey] = getMyPropertyDecorator(ctor, metadataKey, propertyKey);
  }
  return ret;
}

export function getMyPropertyDecoratorValues(ctor: { prototype: any }, metadataKey: string) {
  const myPropertyDecorators = getMyPropertyDecorators(ctor, metadataKey);
  return Object.keys(myPropertyDecorators).map((propertyKey) => myPropertyDecorators[propertyKey]);
}

export function Route(path: string, method: METHODS): MethodDecorator {
  // target 目标对象  property 对象方法  descriptor 对象方法配置
  return (target: Function, property: string, descriptor): void => {
    const routes: Array<RouteDefinition> = Reflect.getMetadata(PATH, target) || [];

    routes.push({
      requestMethod: method,
      path,
      property,
    });
    console.log('target', target);
    // 重新复制 routes 属性到目标对象上
    Reflect.defineMetadata(PATH, routes, target);
    console.log(Reflect.getMetadata(PATH, target));
  };
}
