import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

describe('AuthService integration', () => {
  let prisma: PrismaService;
  let userService: UserService;
  let user: User;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);

    await prisma.cleanDb();

    user = await prisma.user.create({
      data: { email: 'test@test.com', name: 'Test', hash: '' },
    });
  });

  describe('update', () => {
    const dto: UpdateUserDto = {
      email: 'updatedTest@test.com',
      name: 'Updated Name',
    };

    it('should update the user', async () => {
      const updatedUser = await userService.update(user.id, dto);

      expect(updatedUser.email).toBe(dto.email);
      expect(updatedUser.name).toBe(dto.name);
    });
  });

  describe('delete', () => {
    it('should delete the user', async () => {
      await userService.delete(user.id);

      const deletedUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      expect(deletedUser).toBeNull();
    });
  });
});
