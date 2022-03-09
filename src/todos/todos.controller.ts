import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser('id') userId: number, @Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(userId, createTodoDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetUser('id') userId: number) {
    return this.todosService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') todoId: string,
    @GetUser('id') userId: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(+todoId, userId, updateTodoDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') todoId: string, @GetUser('id') userId: number) {
    return this.todosService.remove(+todoId, userId);
  }
}
