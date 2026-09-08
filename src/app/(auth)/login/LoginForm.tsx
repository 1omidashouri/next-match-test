'use client';

import { Button, Card, CardHeader, Input } from '@heroui/react';
import { GiPadlock } from 'react-icons/gi';
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log('the email and password', { data });
  };

  // const onSubmit = (data: any) => {
  //   console.log('the email and password', { data });
  // };

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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-6 py-4">
        <Input type="email" placeholder="enter your email" defaultValue="" {...register('email')} />
        <Input
          type="password"
          placeholder="enter your password"
          defaultValue=""
          {...register('password')}
        />
        <Button type="submit" className="w-full">
          submit
        </Button>
      </form>
    </Card>
  );
}
