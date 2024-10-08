import { Injectable } from '@nestjs/common';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { readFileSync, writeFileSync } from 'node:fs';
import Handlebars from 'handlebars';
import { resolve, join } from 'node:path';
import { IUserDecorator } from 'src/decorators/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import puppeteer from 'puppeteer';
@Injectable()
export class ReportService {

  constructor(private prisma: PrismaService){}

  async currentMonth(user: IUserDecorator): Promise<Uint8Array> {

    const today = new Date();
  
    const startOfCurrentMonth = startOfMonth(today);
    const endOfCurrentMonth = endOfMonth(today);
    
    const data = await this.prisma.training.findMany({ include: { exercises: { select: { name: true, sets: true, id: true } } }, 
      orderBy: {
      day: 'desc'
    },
    where: {
      userId: user.id,
      day: {
        gte: startOfCurrentMonth,
        lte: endOfCurrentMonth,
      }
    } })

    const normalizedData = data.map((t) => {
      return {
        ...t,
        day: format(t.day, 'dd/MM/yyyy')
      }
    })

    const templatePath = resolve(__dirname, '..','..', '..', 'src', 'template', 'report.hbs');
    const templateFile = readFileSync(templatePath, 'utf-8');

    const template = Handlebars.compile(templateFile)
    const html = template({ data: normalizedData })

    // Usar o Puppeteer para gerar o PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Carregar o HTML gerado no Puppeteer
    await page.setContent(html);
    
    // Gerar o PDF
    const pdf = await page.pdf({ format: 'A4' });
    writeFileSync('output.pdf', pdf);
    
    await browser.close();
    return pdf;
  }

}
