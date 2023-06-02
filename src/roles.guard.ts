import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesHandler = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const rolesClass = this.reflector.get<string[]>(
      'roles',
      context.getClass(),
    );
    const rolesOverride = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(), //order matters here!!! - if handler first, then return value is 'admin' - returns first not undefined
      context.getClass(), //order matters here!!! - if handler first, then return value is 'user' - returns first not undefined
    ]);
    const rolesMerge = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log("here's the handler (method): ", context.getHandler());
    console.log("here's the class (controller): ", context.getClass());
    console.log("here's the roles from the handler: ", rolesHandler);
    console.log("here's the roles from the class: ", rolesClass);
    console.log(
      "here's the overwritten roles from the handler and class (order matters in the second argument array of the getAllAndOverride method): ",
      rolesOverride,
    );
    console.log(
      "here's the merged roles from the handler and class: ",
      rolesMerge,
    );
    console.log(
      "we'll let them through - not really guarding anything right now",
    );
    return true;
  }
}
