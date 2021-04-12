// 实现 Get 装饰器
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
    console.log('target', target);
    // 重新复制 routes 属性到目标对象上
    Reflect.defineMetadata(PATH, routes, target);
    console.log(Reflect.getMetadata(PATH, target));
  };
}
