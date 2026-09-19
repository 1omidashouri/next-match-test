import { Card, Link } from '@heroui/react';
import { Member } from '../../../generated/prisma/client';
import Image from 'next/image';
import { calculateAge } from '@/lib/util';
import LikeButton from '@/components/LikeButton';

type MemberProps = {
  member: Member;
  likeIds?: string[];
};

export default function MemberCard({ member, likeIds }: MemberProps) {
  const hasLiked = likeIds?.includes(member.userId);

  return (
    <Link href={`/members/${member.userId}`}>
      <Card className="p-0 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <Image
          alt={member.name}
          width={500}
          height={500}
          loading="eager"
          sizes="(max-width: 768px) 100vw, 33vw"
          src={member?.image || '/image/user.png'}
          className="aspect-square object-cover relative"
        />
        <div className="absolute top-3 right-3 z-50">
          <LikeButton targerUserId={member.userId} hasLiked={hasLiked} />
        </div>
        <Card.Footer className="flex w-full z-10 justify-start absolute bottom-0 overflow-hidden bg-linear-to-t from-black">
          <Card.Content className="flex flex-col text-white p-2">
            <span className="font-semibold">
              {member.name} , {calculateAge(member.dateOfBirth)}
            </span>
            <span className="text-sm">{member.city}</span>
          </Card.Content>
        </Card.Footer>
      </Card>
    </Link>
  );
}
