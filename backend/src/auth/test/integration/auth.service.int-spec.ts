import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto, LoginDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface IPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

describe('AuthService integration', () => {
  let prisma: PrismaService;
  let authService: AuthService;
  let config: ConfigService;

  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    authService = moduleRef.get(AuthService);
    config = moduleRef.get(ConfigService);

    jwt = new JwtService({ secret: config.get('JWT_SECRET') });

    await prisma.cleanDb();
  });

  describe('signup', () => {
    const dto: AuthDto = {
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    };

    it('should signup the user', async () => {
      const token = await authService.signup(dto);
      const payload = jwt.decode(token.token, { json: true });
      const data: IPayload = JSON.parse(JSON.stringify(payload));

      expect(token).toBeDefined();
      expect(data.email).toBe(dto.email);
    });

    it('should throw exception if taken credentials', async () => {
      await authService
        .signup(dto)
        .then((token) => expect(token).toBeUndefined())
        .catch((error) => expect(error.status).toBe(403));
    });
  });

  describe('signin', () => {
    const dto: LoginDto = {
      email: 'test@test.com',
      password: '123456',
    };
    it('should signin the user', async () => {
      const token = await authService.signin(dto);
      const payload = jwt.decode(token.token, { json: true });
      const data: IPayload = JSON.parse(JSON.stringify(payload));

      expect(data.email).toBe(dto.email);
    });
    it('should throw exception if wrong password', async () => {
      try {
        await authService.signin({
          email: 'test@test.com',
          password: 'wrongpassword',
        });
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });
    it('should throw exception if wrong email', async () => {
      try {
        await authService.signin({
          email: 'test2@test.com',
          password: '123456',
        });
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });
  });
});
