import { Module } from '@nestjs/common';
import { TrainingModule } from './domain/training/training.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExerciseModule } from './domain/exercise/exercise.module';
import { SetModule } from './domain/set/set.module';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './domain/report/report.module';

@Module({
  imports: [PrismaModule, TrainingModule, ExerciseModule, SetModule, AuthModule, ReportModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
