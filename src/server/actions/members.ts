'use server';
import { getCurrentUser, requireAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { profileEditSchema, ProfileEditSchema } from '@/lib/schemas/profileEditSchema';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';

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

export async function updateProfile(data: ProfileEditSchema) {
  try {
    const user = await requireAuthUser();
    const validated = profileEditSchema.safeParse(data);

    if (!validated.success) throw new Error('failed validation');
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
  } catch (error) {
    console.log(error);
    throw error;
  }
}
