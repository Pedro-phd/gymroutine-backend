// id          Int       @id @default(autoincrement())
// type        String?
// weight      Int
// reps        Int
// description String?
// exercise    Exercise? @relation(fields: [exerciseId], references: [id])
// exerciseId  Int?

export class CreateSetDto {
  type: string
  weight: number
  reps: number
  description: string
  exerciseId: number
}
