'use client';

import { Button, Card, CardHeader, FieldError, Input, TextField } from '@heroui/react';
import { GiPadlock } from 'react-icons/gi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
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
        <TextField defaultValue="" aria-label="email" isInvalid={!!errors.email}>
          <Input type="email" placeholder="enter your email" {...register('email')} />
          <FieldError>{errors.email?.message}</FieldError>
        </TextField>

        <TextField defaultValue="" aria-label="password" isInvalid={!!errors.password}>
          <Input type="password" placeholder="enter your password" {...register('password')} />
          <FieldError>{errors.password?.message}</FieldError>
        </TextField>

        <Button type="submit" className="w-full">
          submit
        </Button>
      </form>
    </Card>
  );
}
