'use client';

import { Key, Tabs } from '@heroui/react';
import { Member } from '../../../generated/prisma/client';
import MemberCard from '../members/MemberCard';
import { useTransition } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  members: Member[];
  likeIds: string[];
};

const tabs = [
  { id: 'target', label: 'Members I have liked' },
  { id: 'source', label: 'Members that like me' },
  { id: 'mutul', label: 'Mutual liks' },
];

export default function ListTabs({ members, likeIds }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('type') ?? 'target';
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('type', id.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col mt-10 gap-5 w-full">
      <Tabs onSelectionChange={(id) => handleTabChange(id)} selectedKey={currentTab}>
        <div className="flex items-center">
          <Tabs.ListContainer className="w-2xl flex">
            <Tabs.List aria-label="Like tabs">
              {tabs.map((tab) => (
                <Tabs.Tab
                  className={currentTab === tab.id ? 'text-white' : ''}
                  key={tab.id}
                  id={tab.id}
                >
                  {tab.label}
                  <Tabs.Indicator className="bg-accent" />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </div>
        {tabs.map((tab) => (
          <Tabs.Panel key={tab.id} id={tab.id}>
            {members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {members.map((member) => (
                  <MemberCard key={member.id} likeIds={likeIds} member={member} />
                ))}
              </div>
            ) : (
              <div>No member for this filter</div>
            )}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
