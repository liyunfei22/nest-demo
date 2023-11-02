import { PartialType } from '@nestjs/mapped-types';
import { CreateFooDto } from './create-foo.dto';

export class UpdateFooDto extends PartialType(CreateFooDto) {}
