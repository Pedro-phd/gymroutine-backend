// id         Int       @id @default(autoincrement())
// name       String
// sets       Set[]
// training   Training? @relation(fields: [trainingId], references: [id])
// trainingId Int?

export class CreateExerciseDto {
  name: string
  trainingId: number
}
