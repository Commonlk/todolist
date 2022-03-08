import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from 'src/todos/dto';
import { TodosService } from 'src/todos/todos.service';
import { UpdateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

describe('TodosService integration', () => {
  let prisma: PrismaService;
  let userService: UserService;
  let todosService: TodosService;

  let user: User;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);
    todosService = moduleRef.get(TodosService);

    await prisma.cleanDb();

    user = await prisma.user.create({
      data: { email: 'test@test.com', name: 'Test', hash: '' },
    });
  });

  describe('create todo', () => {
    const dto: CreateTodoDto = {
      title: 'Test',
      description: 'Testing the creating of a new todo',
      important: true,
    };

    it('should create todo', async () => {
      const todo = await todosService.create(user.id, dto);

      expect(todo.title).toBe(dto.title);
      expect(todo.description).toBe(dto.description);
      expect(todo.important).toBe(dto.important);
    });
  });

  describe('update todo', () => {
    it.todo('should update todo');
  });

  describe('get todos by user id', () => {
    it.todo('should get todos');
  });

  describe('get todo by todo id', () => {
    it.todo('should get todo');
  });

  describe('delete todo', () => {
    it.todo('should delete todo');
  });
});
