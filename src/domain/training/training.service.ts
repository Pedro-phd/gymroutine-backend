import { Injectable, UseGuards } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserDecorator } from 'src/decorators/user.decorator';

@Injectable()
export class TrainingService {

  constructor(private prisma: PrismaService){}

  create(createTrainingDto: CreateTrainingDto, user: IUserDecorator) {
    return this.prisma.training.create({
      data: {
        ...createTrainingDto,
        day: createTrainingDto.day ?? new Date() ,
        userId: user.id
      }
    });
  }

  async findAll(user: IUserDecorator) {
    console.log(user)
    return this.prisma.training.findMany({ include: { exercises: { select: { name: true, sets: true, id: true } } }, 
      orderBy: {
      day: 'desc'
    },
  where: {
    userId: user.id
  } });
  }

  findByName(name: string, user: IUserDecorator) {
    return this.prisma.training.findMany({ where: {
      name: {
        mode: 'insensitive',
        contains: name
      },
        userId: user.id
    },include: { exercises: { select: { name: true, sets: true, id: true } } }  });
  }

  findByDate(param: string, user: IUserDecorator) {
    const date = new Date(param)
    return this.prisma.training.findMany({ where: { day: date, userId: user.id}, include: { exercises: { select: { name: true, sets: true, id: true } } }  })
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto, user: IUserDecorator) {
    return this.prisma.training.update({
      where: {
        id: id,
        userId: user.id
      },
      data: {...updateTrainingDto, userId: user.id},
    });
  }

  remove(id: number, user: IUserDecorator) {
    return this.prisma.training.delete({ where: { id, userId: user.id } });
  }
}
