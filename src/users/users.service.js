import { prisma } from '../utils/prisma.js';

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(userData) {
  return prisma.user.create({
    data: userData,
  });
}

export async function listUsers() {
  return prisma.user.findMany();
}

export async function getUsersById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}
// https://www.prisma.io/docs/orm/prisma-client/queries/crud#read
