import fp from 'fastify-plugin';
import { FastifyPluginAsync, fastify } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaClientInstance: { prismaClient: PrismaClient } = {
  prismaClient: null,
};

export const prismaClientAssign = () => {
  if (!prismaClientInstance.prismaClient) {
    prismaClientInstance.prismaClient = new PrismaClient();
  }
  return prismaClientInstance.prismaClient;
};

export const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = prismaClientAssign();
  await prisma.$connect();

  server.decorate('prisma', prisma);

  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});
