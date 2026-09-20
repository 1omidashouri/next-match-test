'use Client';

import { Button, Tabs } from '@heroui/react';
import { Member } from '../../../generated/prisma/client';

type Props = {
  members: Member[];
  likeIds: string[];
};

const tabs = [
  { id: 'source', label: 'Members I have liked' },
  { id: 'target', label: 'Members that like me' },
  { id: 'mutul', label: 'Mutual liks' },
];

export default function ListTabs({ members, likeIds }: Props) {
  return (
    <div className="flex flex-col mt-10 gap-5 w-full">
      <Button className="bg-accent">Accent Button</Button>
      <Tabs>
        <div className="flex items-center">
          <Tabs.ListContainer className="w-2xl flex">
            <Tabs.List aria-label="Like tabs">
              {tabs.map((tab) => (
                <Tabs.Tab key={tab.id} id={tab.id}>
                  {tab.label}
                  <Tabs.Indicator className="bg-accent" />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </div>
      </Tabs>
    </div>
  );
}
