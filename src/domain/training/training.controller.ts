import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators/user.decorator';

@ApiTags('Training')
@Controller('training')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  create(@Body() createTrainingDto: CreateTrainingDto, @User() user) {
    return this.trainingService.create(createTrainingDto, user);
  }

  @Get()
  findAll(@User() user) {
    return this.trainingService.findAll(user);
  }

  @Get(':name')
  findByName(@Param('name') name: string, @User() user) {
    return this.trainingService.findByName(name, user);
  }

  // @Get(':date')
  // findByDate(@Param('date') date: string) {
  //   return this.trainingService.findByDate(date);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto, @User() user) {
    return this.trainingService.update(+id, updateTrainingDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.trainingService.remove(+id, user);
  }
}
