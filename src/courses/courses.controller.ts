import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { title } from 'process';
import { SlugPipe } from './pipes/slug.pipe';
import { BroserAgentGuard } from 'src/guards/broser-agent/broser-agent.guard';

@ApiTags('courses')
@Controller('courses')
@UseGuards(BroserAgentGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(201)
  createCourse (@Body() create : CreateCourseDto) { 
    return this.coursesService.create(create);
  } 

  // @Get(':id')
  // getDetail(@Param('id', 
  //   new ParseIntPipe({
  //     errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  //   }))id : number){
  //   return this.coursesService.findOne(id);
  // }

  @Get()
  getAll(){
    return this.coursesService.findAll();
  }

  @Get(':tittle')
  getDetail(@Param('tittle', new SlugPipe()) title : string){
    console.log(title)
    return this.coursesService.findOne(1);
  }

}
