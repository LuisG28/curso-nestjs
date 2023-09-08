import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './model/courses.scheme';
import { User, UserSchema } from '../users/model/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature(
      [
        { name: Course.name, schema: CourseSchema},
        { name: User.name, schema: UserSchema}
      ]
    ),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports:[CoursesService]
})
export class CoursesModule {}
