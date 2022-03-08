import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createTodoDto: CreateTodoDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    try {
      const todo = await this.prisma.todo.create({
        data: { userId, ...createTodoDto },
      });
      return todo;
    } catch (error) {
      throw error;
    }
  }

  findAll(userId: number) {
    return this.prisma.todo.findMany({ where: { userId } });
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async update(todoId: number, userId: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.prisma.todo.findUnique({ where: { id: todoId } });

    if (!todo || todo.userId !== userId)
      throw new ForbiddenException('Access to resource denied');

    return this.prisma.todo.update({
      where: { id: todoId },
      data: { ...updateTodoDto },
    });
  }

  async remove(todoId: number, userId: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id: userId } });

    if (!todo || todo.userId !== userId)
      throw new ForbiddenException('Access to resource denied');

    return this.prisma.todo.delete({ where: { id: todoId } });
  }
}
