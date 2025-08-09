import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  // Setup NestJS
  const { default: AdminJS } = await import('adminjs');
  const { Database, Resource } = await import('@adminjs/prisma');
  const AdminJSExpress = await import('@adminjs/express');

  // Register the Prisma Adapter
  AdminJS.registerAdapter({ Database, Resource });

  // Retrieve the Singleton Prisma Service
  const prisma = new PrismaService();
  const admin = new AdminJS({
    rootPath: '/admin',
    resources: [
      { resource: { model: prisma.article, client: prisma }, options: {} },
      { resource: { model: prisma.topic, client: prisma }, options: {} },
      { resource: { model: prisma.internship, client: prisma }, options: {} },
      {
        resource: { model: prisma.internAchievement, client: prisma },
        options: {},
      },
    ],
  });

  const router = AdminJSExpress.default.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        if (email === 'admin@example.com' && password === 'password') {
          return { email: 'admin@example.com' };
        }
        return null;
      },
      cookieName: 'adminjs',
      cookiePassword: 'secret',
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret: 'secret',
    },
  );
  app.use(admin.options.rootPath, router);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
