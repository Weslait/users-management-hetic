import { prisma } from '../utils/prisma.js';

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

//Voir Selected fields : https://www.prisma.io/docs/orm/prisma-client/queries/crud

export async function createUser(userData) {
  return prisma.user.create({
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
    data: userData,
  });
}

export async function listUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getUsersById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function deleteUser(id) {
  return prisma.user.delete({
    where: { id },
  });
}

export async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    select: {
      email: true,
      name: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
    data,
  });
}

export async function countUsers() {
  return prisma.user.count();
}

// https://www.prisma.io/docs/orm/prisma-client/queries/crud#read
