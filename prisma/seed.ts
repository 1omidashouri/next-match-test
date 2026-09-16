import { auth } from '@/lib/auth';
import { membersData } from './memeber';
import { prisma } from '@/lib/prisma';

async function seedUsers() {
  for (const member of membersData) {
    //create user account
    const result = await auth.api.signUpEmail({
      body: {
        email: member.email,
        password: '123456789',
        name: member.name,
        image: member.image,
      },
    });
    //create member
    const userId = result.user.id;
    await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: true,
        member: {
          create: {
            dateOfBirth: new Date(member.dateOfBirth),
            gender: member.gender,
            name: member.name,
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            city: member.city,
            country: member.country,
            image: member.image,
            photos: {
              create: [{ url: member.image }],
            },
          },
        },
      },
    });
  }
}

async function main() {
  await seedUsers();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
