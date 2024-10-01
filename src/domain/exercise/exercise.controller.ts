import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Exercise')
@Controller('exercise')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto, @User() user) {
    return this.exerciseService.create(createExerciseDto, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto, @User() user) {
    return this.exerciseService.update(+id, updateExerciseDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.exerciseService.remove(+id, user);
  }
}
