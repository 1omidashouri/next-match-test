'use server';

import { requireAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function toggleLikeMemeber(targetUserId: string, isLiked?: boolean) {
  try {
    const user = await requireAuthUser();

    if (isLiked) {
      //delete like
      await prisma.like.delete({
        where: {
          sourceUserId_targerUderId: {
            sourceUserId: user.id,
            targerUderId: targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: user.id,
          targerUderId: targetUserId,
        },
      });
    }
    revalidatePath('/members');
    revalidatePath(`members/${targetUserId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCurrentUserLikeIds() {
  try {
    const user = await requireAuthUser();
    const likes = await prisma.like.findMany({
      where: {
        sourceUserId: user.id,
      },
      select: {
        targerUderId: true,
      },
    });

    return likes.map((like) => like.targerUderId);
  } catch (error) {
    console.log(error);
  }
}
