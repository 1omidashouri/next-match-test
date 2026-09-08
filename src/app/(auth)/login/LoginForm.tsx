'use client';

import { Button, Card, CardHeader, Input } from '@heroui/react';
import { SyntheticEvent, useState } from 'react';
import { GiPadlock } from 'react-icons/gi';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(`the email and password: ${email}, ${password}`);
  };

  return (
    <Card className="w-md shadow-xl">
      <CardHeader className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-flow items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-xl font-semibold">Login</h1>
          </div>
          <p className="text-foreground/60">Welcome back</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-4">
        <Input
          type="email"
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">
          submit
        </Button>
      </form>
    </Card>
  );
}
