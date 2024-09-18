import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SetService } from './set.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Set')
@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Post()
  upinsert(@Body() data: UpdateSetDto) {
    return this.setService.upinsert(data);
  }

  @Get(':id')
  findAllByExercise(@Param('id') id: string) {
    return this.setService.findAllByExercise(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setService.remove(+id);
  }
}
