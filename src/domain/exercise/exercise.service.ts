import { Injectable } from '@nestjs/common'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { IUserDecorator } from 'src/decorators/user.decorator'

@Injectable()
export class ExerciseService {
	constructor(private prisma: PrismaService) {}

	create(createExerciseDto: CreateExerciseDto, user: IUserDecorator) {
		return this.prisma.exercise.create({ data: {...createExerciseDto, userId: user.id} })
	}

	findByTraining(id: number, user: IUserDecorator) {
		return this.prisma.exercise.findMany({ where: { trainingId: id, userId: user.id } })
	}

	findByName(name: string, user: IUserDecorator) {
		return this.prisma.exercise.findMany({
			where: { name: { contains: name, mode: 'insensitive' }, userId: user.id },
		})
	}

	update(id: number, updateExerciseDto: UpdateExerciseDto, user: IUserDecorator) {
		return this.prisma.exercise.update({ where: { id, userId: user.id }, data: {...updateExerciseDto, userId: user.id} })
	}

	remove(id: number, user: IUserDecorator) {
		return this.prisma.exercise.delete({ where: { id, userId: user.id } })
	}
}
