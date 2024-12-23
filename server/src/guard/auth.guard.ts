import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.cookies.access_token);
        console.log(request.cookies,"coookies");
        
        
        const token = request.cookies['access_token'];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}