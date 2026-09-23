'use server';
import { getCurrentUser, requireAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { profileEditSchema, ProfileEditSchema } from '@/lib/schemas/profileEditSchema';
import { ActionResult } from '@/lib/types/lib';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';
import { Member } from '../../../generated/prisma/client';

export async function getMembers() {
  // throw new Error('test error...!');
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  try {
    return await prisma.member.findMany({
      where: {
        NOT: { userId: currentUser?.id },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export const getMemberByUserId = cache((userId: string) => {
  try {
    return prisma.member.findUnique({ where: { userId } });
  } catch (error) {
    console.log(error);
  }
});

export async function updateProfile(data: ProfileEditSchema): Promise<ActionResult<Member>> {
  try {
    const user = await requireAuthUser();
    const validated = profileEditSchema.safeParse(data);

    if (!validated.success) {
      return { status: 'error', error: validated.error.issues };
    }

    const { name, description, city, country } = validated.data;

    const member = await prisma.member.update({
      where: { userId: user.id },
      data: {
        name: name,
        description: description,
        city: city,
        country: country,
        user: {
          update: {
            name: data.name,
          },
        },
      },
    });

    revalidatePath('/members');
    revalidatePath(`/members/${member.userId}`);

    return { status: 'success', data: member };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { status: 'error', error: error.message };
    } else {
      return { status: 'error', error: 'some error happend!' };
    }
  }
}
