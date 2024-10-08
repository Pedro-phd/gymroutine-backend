import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { Response } from 'express';

@ApiTags('Report')
@Controller('report')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async generateReportCurrentMonth(@User() user, @Res() res: Response) {
    const pdf = await this.reportService.currentMonth(user);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="report.pdf"',
      'Content-Length': pdf.length,
    });

    res.end(pdf);
  }
}


