import { PartialType } from '@nestjs/mapped-types';
import { CreateKofiDto } from './create-kofi.dto';

export class UpdateKofiDto extends PartialType(CreateKofiDto) {}
