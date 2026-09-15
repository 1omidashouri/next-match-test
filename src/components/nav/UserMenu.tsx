'use client';
import { signOut } from '@/lib/auth-client';
import { Avatar, Dropdown, Label } from '@heroui/react';
import { User } from 'better-auth';

import { useRouter } from 'next/navigation';

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
            <Avatar.Image
              alt={user.name}
              src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
            />
            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
          </Avatar>
        </Dropdown.Trigger>
        <Dropdown.Popover>
          <Dropdown.Menu>
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <Label>Edit file</Label>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleSignOut} id="logout" textValue="Logout" variant="danger">
              <Label>Logout</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}
