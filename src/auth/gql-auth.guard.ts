import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        request.body = ctx.getRequest().body.loginUserInput;
        return request;
    }
}