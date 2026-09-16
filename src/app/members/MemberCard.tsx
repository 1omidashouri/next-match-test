import { Card, CardFooter, Link } from '@heroui/react';
import { Member } from '../../../generated/prisma/client';
import Image from 'next/image';

type MemberProps = {
  member: Member;
};

export default function MemberCard({ member }: MemberProps) {
  return (
    <Link href={`/members/${member.userId}`}>
      <Card className="transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <Image
          alt={member.name}
          width={500}
          height={500}
          sizes="(max-width: 768px) 100vw, 33vw"
          src={member?.image || '/image/user.png'}
          className="aspect-square object-cover relative"
        />
        <CardFooter className="flex w-full justify-start absolute bottom-0 overflow-hidden bg-linear-to-t from-black">
          <div className="flex flex-col text-white p-2">
            <span className="font-semibold">{member.name} , 42</span>
            <span className="text-sm">{member.city}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
