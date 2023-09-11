import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { Trainer } from './entities/trainer.entity';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { infinityPagination } from '../utils/infinity-pagination';
import { NullableType } from '../utils/types/nullable.type';
import { UpdateTrainerPersonalInformationDto } from './dto/update-trainer-personal-information.dto';
import { UpdateTrainerProfessionalInformationDto } from './dto/update-trainer-professional-information.dto';
import { UpdateTrainerContactDto } from './dto/update-trainer-contact.dto';
import { UpdateTrainerPhotoDto } from './dto/update-trainer-photo.dto';
import { UpdateTrainerVideoDto } from './dto/update-trainer-video.dto';
import { UpdateTrainerGroupSessionDto } from './dto/update-trainer-group-session.dto';

@ApiBearerAuth()
@Roles(RoleEnum.CLIENT)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Trainers')
@Controller({
  path: 'trainers',
  version: '1',
})
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrainer: CreateTrainerDto): Promise<Trainer> {
    return this.trainerService.create(createTrainer);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Trainer>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.trainerService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Trainer>> {
    return this.trainerService.findOne({ id: +id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updatePersonalInformation(
    @Param('id') id: number,
    @Body()
    updateTrainerPersonalInformationDto: UpdateTrainerPersonalInformationDto,
  ): Promise<Trainer> {
    return this.trainerService.update(id, updateTrainerPersonalInformationDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateProfessionalInformation(
    @Param('id') id: number,
    @Body()
    updateTrainerProfessionalInformationDto: UpdateTrainerProfessionalInformationDto,
  ): Promise<Trainer> {
    return this.trainerService.update(
      id,
      updateTrainerProfessionalInformationDto,
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateContact(
    @Param('id') id: number,
    @Body()
    updateTrainerContactDto: UpdateTrainerContactDto,
  ): Promise<Trainer> {
    return this.trainerService.update(id, updateTrainerContactDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updatePhoto(
    @Param('id') id: number,
    @Body()
    updateTrainerPhotoDto: UpdateTrainerPhotoDto,
  ): Promise<Trainer> {
    return this.trainerService.update(id, updateTrainerPhotoDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateVideo(
    @Param('id') id: number,
    @Body()
    updateTrainerVideoDto: UpdateTrainerVideoDto,
  ): Promise<Trainer> {
    return this.trainerService.update(id, updateTrainerVideoDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateGroupSession(
    @Param('id') id: number,
    @Body()
    updateTrainerGroupSessionDto: UpdateTrainerGroupSessionDto,
  ): Promise<Trainer> {
    return this.trainerService.update(id, updateTrainerGroupSessionDto);
  }

  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) remove(
    @Param('id') id: number,
  ): Promise<void> {
    return this.trainerService.softDelete(id);
  }
}
