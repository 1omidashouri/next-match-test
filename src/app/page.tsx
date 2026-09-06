import { Button, Link } from '@heroui/react';

import { CiAirportSign1 } from 'react-icons/ci';

export default function Home() {
  return (
    <div>
      <div className="text-2xl text-red-500">hello</div>
      <Button className="rounded-xl bg-slate-500 text-blue-50">
        <CiAirportSign1 />
        click me
      </Button>
      <div className="border-t-4 m-2 p-2">
        <h3 className="text-2xl">this will be members page</h3>
        <Link className="cursor-cell" href="/members">
          click me
        </Link>
      </div>
    </div>
  );
}
