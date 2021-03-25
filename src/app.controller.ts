import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home(@Req() req, @Res() res) {
    // 이렇게 하면 express로 달라붙음 근데 추천은 안함 왜?
    // nestjs가 express나 festify 두개의 프레임워크를 왓다갓다 가능하기에
    return `Welcome to my API`;
  }
}
