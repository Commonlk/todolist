import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto, LoginDto } from 'src/auth/dto';
import { UpdateUserDto } from 'src/user/dto';
import { CreateTodoDto, UpdateTodoDto } from 'src/todos/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if name empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ name: dto.name })
          .expectStatus(400);
      });

      it('should signup the user', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if wrong email', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: 'wrong@test.com', password: dto.password })
          .expectStatus(403);
      });

      it('should throw if wrong password', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email, password: 'wrongpassword' })
          .expectStatus(403);
      });

      it('should login the user', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email, password: dto.password })
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    it('should throw exception if wrong token', () => {
      return pactum
        .spec()
        .get('/user')
        .withHeaders(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        )
        .expectStatus(401);
    });

    describe('Get user', () => {
      it('should get the current log in user', () => {
        return pactum
          .spec()
          .get('/user')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectStatus(200);
      });
    });

    describe('Update user', () => {
      const dto: UpdateUserDto = {
        name: 'Updated',
        email: 'updated@test.com',
      };

      it('should throw exception if wrong token', () => {
        return pactum
          .spec()
          .post('/user')
          .withHeaders(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          )
          .withBody(dto)
          .expectStatus(401);
      });

      it('should update the user', () => {
        return pactum
          .spec()
          .post('/user')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .withBody(dto)
          .expectStatus(201);
      });

      it('should throw exception if name is empty string', () => {
        return pactum
          .spec()
          .post('/user')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .withBody({ name: '' })
          .expectStatus(400);
      });

      it('should throw exception if email is not email', () => {
        return pactum
          .spec()
          .post('/user')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .withBody({ email: '' })
          .expectStatus(400);
      });
    });
  });

  describe('Todo', () => {
    const dto: CreateTodoDto = {
      title: 'Test',
      description: 'Testing the creating of a new todo',
      important: true,
    };

    describe('Get empty todos', () => {
      it('Should get todos', () => {
        return pactum
          .spec()
          .get('/todos')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectBody([])
          .expectStatus(200);
      });
    });

    describe('Create todo', () => {
      it('should throw exception if wrong token', () => {
        return pactum
          .spec()
          .post('/todos')
          .withHeaders(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          )
          .withBody(dto)
          .expectStatus(401);
      });

      it('should create todo', () => {
        return pactum
          .spec()
          .post('/todos')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .withBody(dto)
          .stores('todoId', 'id')
          .expectStatus(201);
      });

      it('should throw exception if empty title', () => {
        return pactum
          .spec()
          .post('/todos')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .withBody({ title: '' })
          .expectStatus(400);
      });
    });

    describe('Get user todos by id', () => {
      it('should throw exception if wrong token', () => {
        return pactum
          .spec()
          .get('/todos')
          .withHeaders(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          )
          .expectStatus(401);
      });

      it('should get all the user todos', () => {
        return pactum
          .spec()
          .get('/todos')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectJsonLength(1)
          .expectStatus(200);
      });
    });
    describe('Get todo by id', () => {
      it('should get the todo matching the id', () => {
        return pactum
          .spec()
          .get('/todos/$S{todoId}')
          .expectStatus(200)
          .expectBodyContains('$S{todoId}');
      });

      it('should throw exception if wrong todo id', () => {
        return pactum.spec().get('/todos/-1').expectStatus(404);
      });
    });
    describe('Update todo', () => {
      const dto: UpdateTodoDto = {
        title: 'Updated',
        description: 'Updated description',
        completed: true,
        important: false,
      };

      it('should throw exception if wrong token', () => {
        return pactum
          .spec()
          .patch('/todos/$S{todoId}')
          .withHeaders(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          )
          .expectStatus(401);
      });

      it('should update the correct todo', () => {
        return pactum
          .spec()
          .patch('/todos/$S{todoId}')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .withBody(dto)
          .expectBodyContains(dto.title)
          .expectStatus(200);
      });

      it('should throw exception if wrong field type', () => {
        return pactum
          .spec()
          .patch('/todos/$S{todoId}')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .withBody({ title: 0, completed: 'true' })
          .expectStatus(400);
      });
    });
    describe('Delete todo', () => {
      it('should throw exception if wrong token', () => {
        return pactum
          .spec()
          .delete('/todos/$S{todoId}')
          .withHeaders(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          )
          .expectStatus(401);
      });

      it('should delete the correct todo', () => {
        return pactum
          .spec()
          .delete('/todos/$S{todoId}')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectStatus(200);
      });
    });
  });
});
