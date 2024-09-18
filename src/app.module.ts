import { Module } from '@nestjs/common';
import { TrainingModule } from './domain/training/training.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExerciseModule } from './domain/exercise/exercise.module';
import { SetModule } from './domain/set/set.module';

@Module({
  imports: [PrismaModule, TrainingModule, ExerciseModule, SetModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
