import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('home')
  @Get()
  public index() {
    return {  };
  }
}
