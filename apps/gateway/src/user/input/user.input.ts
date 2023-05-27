import { Gender } from '@app/core';
import { regexEmail, regexPassword } from '@app/utils';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Matches, MaxLength } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

@InputType()
export class UpdateProfileInputDto {
  @Field(() => String, { nullable: true })
  @MaxLength(40, {
    message: 'Độ dài tối đa 40 ký tự',
  })
  @IsOptional()
  fullName: string;

  @Field(() => String, { nullable: true })
  @Matches(regexEmail, {
    message:
      'Email có độ dài 5-255, định dạng local part 5-65 ki tự không chưa kí tu đac biêt ngoài @ và dấu "."',
  })
  @IsOptional()
  email: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  birthday?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => String, { nullable: true })
  country?: string;

  //   @Field(() => Boolean, { nullable: true })
  //   twoFactorAuthenticationSecret: boolean;
}

@InputType()
export class UpdateAvatarInput {
  @Field(() => String, { nullable: true })
  @IsObjectId({ message: 'Id must be a ObjectId' })
  avatarId: string;
}
@InputType()
export class ChangePassWhenLoginInput {
  @Field(() => String)
  currentPassword: string;

  @Field(() => String)
  @Matches(regexPassword, {
    message:
      'Tối thiểu 8 và tối đa 15 ký tự, ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt',
  })
  @IsOptional()
  newPassword: string;
}
