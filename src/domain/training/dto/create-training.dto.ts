// id          Int        @id @default(autoincrement())
// name        String
// day         DateTime   @default(now())
// exercises   Exercise[]
// description String?

export class CreateTrainingDto  {
  name: string
  day: Date
  description?: string
}
