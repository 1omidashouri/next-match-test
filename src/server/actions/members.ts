import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function getMembers() {
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

export async function getMemberByUserId(userId: string) {
  try {
    return prisma.member.findUnique({ where: { userId } });
  } catch (error) {
    console.log(error);
  }
}
