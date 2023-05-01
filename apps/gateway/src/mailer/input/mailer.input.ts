import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
@InputType()
export class SendPinCodeInput {
  @Field(() => String)
  @IsNotEmpty({
    message: 'Vùng lòng nhập email',
  })
  @IsEmail({
    message: 'Email không đúng định dạng',
  })
  email: string;

  @Field(() => String)
  @IsNotEmpty({
    message: 'Vùng lòng nhập code',
  })
  pinCode: string;
}
