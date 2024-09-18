import { Injectable } from '@nestjs/common'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ExerciseService {
	constructor(private prisma: PrismaService) {}

	create(createExerciseDto: CreateExerciseDto) {
		return this.prisma.exercise.create({ data: createExerciseDto })
	}

	findByTraining(id: number) {
		return this.prisma.exercise.findMany({ where: { trainingId: id } })
	}

	findByName(name: string) {
		return this.prisma.exercise.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
		})
	}

	update(id: number, updateExerciseDto: UpdateExerciseDto) {
		return this.prisma.exercise.update({ where: { id }, data: updateExerciseDto })
	}

	remove(id: number) {
		return this.prisma.exercise.delete({ where: { id } })
	}
}
