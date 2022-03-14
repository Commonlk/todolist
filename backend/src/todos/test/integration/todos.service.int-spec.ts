import { Test } from '@nestjs/testing';
import { Todo, User } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto, UpdateTodoDto } from 'src/todos/dto';
import { TodosService } from 'src/todos/todos.service';

describe('TodosService integration', () => {
  let prisma: PrismaService;
  let todosService: TodosService;

  let user: User;
  let todo: Todo;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
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
      todo = await todosService.create(user.id, dto);

      expect(todo.title).toBe(dto.title);
      expect(todo.description).toBe(dto.description);
      expect(todo.important).toBe(dto.important);
    });

    it('should throw exception if wrong userid', async () => {
      await todosService
        .create(-1, dto)
        .then((todo) => expect(todo).toBeUndefined())
        .catch((error) => expect(error.status).toBe(404));
    });
  });

  describe('update todo', () => {
    const dto: UpdateTodoDto = {
      title: 'Updated',
      description: 'Testing updating of a todo',
      completed: true,
    };

    it('should update todo', async () => {
      todo = await todosService.update(todo.id, user.id, dto);

      expect(todo.title).toBe(dto.title);
      expect(todo.description).toBe(dto.description);
      expect(todo.completed).toBe(dto.completed);
    });

    it('should throw exception if non authorized user', async () => {
      await todosService
        .update(todo.id, -1, dto)
        .then((todo) => expect(todo).toBeUndefined())
        .catch((error) => expect(error.status).toBe(403));
    });
  });

  describe('get todos by userid', () => {
    it('should get todos', async () => {
      const todos = await todosService.findAll(user.id);

      expect(todos).toHaveLength(1);
    });

    it('should throw exception if wrong userid', async () => {
      await todosService
        .findAll(999)
        .then((todos) => expect(todos).toBeUndefined())
        .catch((error) => expect(error.status).toBe(404));
    });
  });

  describe('get todo by todo id', () => {
    it('should get todo', async () => {
      const foundTodo = await todosService.findOne(todo.id);

      expect(foundTodo).toMatchObject<Todo>(todo);
    });

    it('should throw exception if wrong todoid', async () => {
      await todosService
        .findOne(-1)
        .then((todo) => expect(todo).toBeUndefined())
        .catch((error) => expect(error.status).toBe(404));
    });
  });

  describe('delete todo', () => {
    it('should delete todo', async () => {
      await todosService.remove(todo.id, user.id);
      await todosService
        .findOne(todo.id)
        .then((todo) => expect(todo).toBeNull())
        .catch((error) => expect(error.status).toBe(404));
    });

    it('should throw exception if wrong todoid', async () => {
      await todosService
        .findOne(-1)
        .then((todo) => expect(todo).toBeUndefined())
        .catch((error) => expect(error.status).toBe(404));
    });

    it('should throw exception if non authorized user', async () => {
      const dto: CreateTodoDto = {
        title: 'Test',
        description: 'Testing the creating of a new todo',
        important: true,
      };

      todo = await todosService.create(user.id, dto);

      await todosService
        .remove(todo.id, -1)
        .then((todo) => expect(todo).toBeNull())
        .catch((error) => expect(error.status).toBe(403));
    });
  });
});
