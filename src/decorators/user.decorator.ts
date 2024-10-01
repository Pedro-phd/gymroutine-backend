import { createParamDecorator } from '@nestjs/common'

export interface IUserDecorator {
  id: string
}

export const User = createParamDecorator<IUserDecorator>((_, req) => {
	return { id: req.args[0].user.sub}
})