import { getMembers } from '@/server/actions/members';
import Link from 'next/link';

export default async function MembersPage() {
  const members = await getMembers();
  return (
    <div>
      <h3 className="text-3xl">this is memeber page</h3>
      <Link href={'/'}> Go back</Link>
      <ul>{members && members.map((member) => <li key={member.id}>{member.name}</li>)}</ul>
    </div>
  );
}
