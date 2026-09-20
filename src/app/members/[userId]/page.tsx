import { getCurrentUser } from '@/lib/auth';
import { getMemberByUserId } from '@/server/actions/members';
import { notFound } from 'next/navigation';
import ProfileForm from './ProfileForm';

export default async function MemeberDetailedPage(props: PageProps<'/members/[userId]'>) {
  const { userId } = await props.params;
  const user = await getCurrentUser();
  const member = await getMemberByUserId(userId);

  const isCurrentUser = member?.id === user?.id;

  if (!member) return notFound();

  return <div>{isCurrentUser ? <ProfileForm /> : <div> {member.description} </div>}</div>;
}
