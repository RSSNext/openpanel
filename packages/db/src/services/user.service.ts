

import { db } from '../prisma-client';

export async function getCurrentUser() {
  return getUserById();
}

export async function getUserById() {
  const user = await db.user.findFirst();
  if (!user) {
    await db.user.create({
      data: {
        email: 'admin@test.com',
        lastName: "admin",
        id: "1"
      },
    });
  }

  return db.user.findFirstOrThrow();
}
