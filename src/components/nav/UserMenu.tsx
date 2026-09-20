'use client';
import { signOut } from '@/lib/auth-client';
import { Avatar, Dropdown, Label, Separator } from '@heroui/react';
import { User } from 'better-auth';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

type UserProps = {
  user: User;
};

export default function UserMenu({ user }: UserProps) {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
      },
    });
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
          <Avatar>
            <Avatar.Image alt={user.name} src={user.image || '/images/use.png'} />
            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
          </Avatar>
        </Dropdown.Trigger>
        <Dropdown.Popover>
          <Dropdown.Menu disabledKeys={['signed-in-as']}>
            <Dropdown.Section>
              <Dropdown.Item id="signed-in-as">Signed as {user.name}</Dropdown.Item>
            </Dropdown.Section>
            <Separator className="my-1" />
            <Dropdown.Section>
              <Dropdown.Item
                id="edit-file"
                textValue="Edit file"
                render={(props) => <Link {...(props as ComponentProps<typeof Link>)} />}
                href={`/members/${user.id}`}
              >
                <Label>Edit file</Label>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleSignOut}
                id="logout"
                textValue="Logout"
                variant="danger"
              >
                <Label>Logout</Label>
              </Dropdown.Item>
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}
