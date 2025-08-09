// // admin.module.ts
// import { Module } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

// const DEFAULT_ADMIN = {
//   email: 'admin@example.com',
//   password: 'password',
// };

// const authenticate = async (email, password) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };

// @Module({
//   imports: [
//     // Dynamic import for AdminJS ESM packages
//     import('@adminjs/nestjs').then(async ({ AdminModule }) => {
//       const AdminJS = (await import('adminjs')).default;
//       const { Database, Resource } = await import('@adminjs/prisma');
//       AdminJS.registerAdapter({ Database, Resource });

//       return AdminModule.createAdminAsync({
//         inject: [PrismaService],
//         useFactory: async (prisma: PrismaService) => {
//           // For Prisma v5+, get models via the DMMF
//           const dmmf = (prisma as any)._baseDmmf;
//           return {
//             adminJsOptions: {
//               rootPath: '/admin',
//               resources: [
//                 {
//                   resource: { model: dmmf.modelMap['Article'], client: prisma },
//                   options: {},
//                 },
//                 {
//                   resource: { model: dmmf.modelMap['Topic'], client: prisma },
//                   options: {},
//                 },
//                 {
//                   resource: {
//                     model: dmmf.modelMap['ArticleTopic'],
//                     client: prisma,
//                   },
//                   options: {},
//                 },
//                 {
//                   resource: {
//                     model: dmmf.modelMap['Internship'],
//                     client: prisma,
//                   },
//                   options: {},
//                 },
//                 {
//                   resource: {
//                     model: dmmf.modelMap['InternAchievement'],
//                     client: prisma,
//                   },
//                   options: {},
//                 },
//               ],
//             },
//             auth: {
//               authenticate,
//               cookieName: 'adminjs',
//               cookiePassword: 'supersecret',
//             },
//             sessionOptions: {
//               resave: true,
//               saveUninitialized: true,
//               secret: 'supersecret',
//             },
//           };
//         },
//       });
//     }),
//   ],
//   providers: [PrismaService],
// })
// export class AdminModule {}
