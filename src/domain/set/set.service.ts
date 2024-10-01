import { Injectable } from '@nestjs/common';
import { UpdateSetDto } from './dto/update-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserDecorator } from 'src/decorators/user.decorator';


@Injectable()
export class SetService {

  constructor(private prisma: PrismaService){}

  async upinsert(data: UpdateSetDto, user: IUserDecorator) {

    const newId = data.id ?? await this.prisma.set.count() + 1

    return this.prisma.set.upsert({
      where: {
        id: newId,
        userId: user.id
      },
      create: {
        reps: data.reps,
        weight: data.weight,
        exerciseId: data.exerciseId,
        description: data.description,
        type: data.type,
        userId: user.id
      },
      update: {
        ...data,
        userId: user.id
      }
    });
  }

  findAllByExercise(id: number, user:IUserDecorator) {
    return this.prisma.set.findMany({ where: { exerciseId: id, userId: user.id } });
  }

  remove(id: number, user:IUserDecorator) {
    return this.prisma.set.delete({ where: { id, userId: user.id } });
  }
}
