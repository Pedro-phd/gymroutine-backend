import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SetService } from './set.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators/user.decorator';

@ApiTags('Set')
@Controller('set')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Post()
  upinsert(@Body() data: UpdateSetDto, @User() user) {
    return this.setService.upinsert(data, user);
  }

  @Get(':id')
  findAllByExercise(@Param('id') id: string, @User() user) {
    return this.setService.findAllByExercise(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.setService.remove(+id, user);
  }
}
