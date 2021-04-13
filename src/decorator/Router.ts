// 实现 Router 装饰器，此装饰器直接使用在 class 内部方法上
import { RouteDefinition, METHODS, PATH } from './RouteDefinition';

export function Route(path: string, method: METHODS): MethodDecorator {
  // target 目标对象  property 对象方法  descriptor 对象方法配置
  return (target: Function, property: string, descriptor): void => {
    const routes: Array<RouteDefinition> = Reflect.getMetadata(PATH, target) || [];

    routes.push({
      requestMethod: method,
      path,
      property,
    });
    // 重新复制 routes 属性到目标对象上
    Reflect.defineMetadata(PATH, routes, target);
  };
}
