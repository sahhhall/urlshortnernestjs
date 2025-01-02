import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { CreateUrlDTO } from './dto/create.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Response } from 'express';



@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Get(':shortId')
  async getShortUrl(@Param('shortId') shortId: string, @Res() res: Response) {
    const originalUrl = await this.urlService.get(shortId);
    return res.redirect(originalUrl);
  }

  //url
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createShortUrl(
    @Body() createUrlDto: CreateUrlDTO,
    @CurrentUser() user: any
  ) {
    return this.urlService.create(createUrlDto, user._id);
  }


}
