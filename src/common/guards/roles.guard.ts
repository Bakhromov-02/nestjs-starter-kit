import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable
  } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
  
import { RolesEnum } from "../enums";
import { ROLES_KEY } from "../constants";
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();

      try {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
          ROLES_KEY,
          [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
          return true;
        }

        return (
          requiredRoles.includes(req.user.role) ||
          req.user.role === RolesEnum.SUPERADMIN
        );
      } catch (e) {
        console.log(e);
        throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
      }
    }
  }