import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private async validateRequest(request: any) {
    const tokenJWT = request.headers.authorization;
    const [type, token] = tokenJWT?.split(" ") ?? [];

    if (type !== "Bearer" || !token) {
      return false;
    }

    try{
      const payload = await this.jwtService.verifyAsync(token);

      request["user"] = payload;
      return true;
    }catch (e) {
      return false;
    }
  }
}
