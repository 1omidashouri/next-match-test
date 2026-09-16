'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import { sections } from './MemberNav';

export default function SectionTitle() {
  const active = useSelectedLayoutSegment();
  console.log(active);
  const title = sections.find((x) => x.segment === active)?.name ?? '';

  return (
    <div>
      <h2 className="text-2xl capitalize font-semibold text-accent">{title}</h2>
    </div>
  );
}
