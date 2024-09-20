import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainingService {

  constructor(private prisma: PrismaService){}

  create(createTrainingDto: CreateTrainingDto) {
    return this.prisma.training.create({
      data: {
        ...createTrainingDto,
        day: createTrainingDto.day ?? new Date() 
      }
    });
  }

  findAll() {
    return this.prisma.training.findMany({ include: { exercises: { select: { name: true, sets: true, id: true } } }, 
      orderBy: {
      day: 'desc'
    } });
  }

  findByName(name: string) {
    return this.prisma.training.findMany({ where: {
      name: {
        mode: 'insensitive',
        contains: name
      }
    },include: { exercises: { select: { name: true, sets: true, id: true } } }  });
  }

  findByDate(param: string) {
    const date = new Date(param)
    return this.prisma.training.findMany({ where: { day: date }, include: { exercises: { select: { name: true, sets: true, id: true } } }  })
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return this.prisma.training.update({
      where: {
        id: id
      },
      data: updateTrainingDto,
    });
  }

  remove(id: number) {
    return this.prisma.training.delete({ where: { id } });
  }
}
