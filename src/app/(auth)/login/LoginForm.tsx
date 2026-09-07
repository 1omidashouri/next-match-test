import { Button, Card, CardHeader, Input } from '@heroui/react';
import { GiPadlock } from 'react-icons/gi';

export default function LoginForm() {
  return (
    <Card className="w-md shadow-xl">
      <CardHeader className="flex flex-col justify-center items-center">
        <div className='flex flex-col gap-2 items-center'>
          <div className='flex flex-flow items-center gap-3'>
            <GiPadlock size={30} />
            <h1 className="text-xl font-semibold">Login</h1>
          </div>
          <p className="text-foreground/60">Welcome back</p>
        </div>
      </CardHeader>
      <form className="flex flex-col gap-4 px-6 py-4">
        <Input type="email" placeholder="enter your email" />
        <Input type="password" placeholder="enter your password" />
        <Button type="submit" className="w-full">
          submit
        </Button>
      </form>
    </Card>
  );
}
