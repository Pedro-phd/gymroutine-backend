import { Injectable } from '@nestjs/common';
import { UpdateSetDto } from './dto/update-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class SetService {

  constructor(private prisma: PrismaService){}

  async upinsert(data: UpdateSetDto) {

    const newId = data.id ?? await this.prisma.set.count() + 1

    return this.prisma.set.upsert({
      where: {
        id: newId
      },
      create: {
        reps: data.reps,
        weight: data.weight,
        exerciseId: data.exerciseId,
        description: data.description,
        type: data.type
      },
      update: {
        ...data
      }
    });
  }

  findAllByExercise(id: number) {
    return this.prisma.set.findMany({ where: { exerciseId: id } });
  }

  remove(id: number) {
    return this.prisma.set.delete({ where: { id } });
  }
}
