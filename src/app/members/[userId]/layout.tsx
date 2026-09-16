import { calculateAge } from '@/lib/util';
import { getMemberByUserId } from '@/server/actions/members';
import { buttonVariants, Card, Link, Separator } from '@heroui/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <Card className="w-full mt-10 items-center h-[80vh]">
          <Image
            alt={member.name}
            width={500}
            height={500}
            loading="eager"
            sizes="(max-width: 768px) 100vw, 33vw"
            src={member?.image || '/image/user.png'}
            className="aspect-square object-cover relative rounded-xl"
          />
          <Card.Content>
            <div className="flex flex-col items-center">
              <div className="text-2xl">
                {member.name} , {calculateAge(member.dateOfBirth)}
              </div>
              <div className="text-sm text-foreground/50">
                {member.city} , {member.country}
              </div>
            </div>
            <Separator />
            <div>member nav goes here</div>
          </Card.Content>
          <Card.Footer className="w-full">
            <Link
              href="/member"
              className={buttonVariants({ variant: 'primary', className: 'w-full' })}
            >
              Go Back
            </Link>
          </Card.Footer>
        </Card>
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10 h-[80vh]">
          <Card.Header>Section title</Card.Header>
          <Separator />
          <Card.Content>{children}</Card.Content>
        </Card>
      </div>
    </div>
  );
}
