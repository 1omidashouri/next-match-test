'use client';

import { Button, Card, CardHeader, FieldError, Input, TextField } from '@heroui/react';
import { GiPadlock } from 'react-icons/gi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, resgisterSchema } from '@/lib/schemas/registerSchema';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(resgisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          router.push('/members');
        },
        onError: (ctx) => {
          console.log(ctx.error.message);
        },
      }
    );
  };

  return (
    <Card className="w-md shadow-xl">
      <CardHeader className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-flow items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-xl font-semibold">Register</h1>
          </div>
          <p className="text-foreground/60">Sign up for new account</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-6 py-4">
        <TextField defaultValue="" aria-label="name" isInvalid={!!errors.name}>
          <Input type="name" placeholder="enter your name" {...register('name')} />
          <FieldError>{errors.name?.message}</FieldError>
        </TextField>

        <TextField defaultValue="" aria-label="email" isInvalid={!!errors.email}>
          <Input type="email" placeholder="enter your email" {...register('email')} />
          <FieldError>{errors.email?.message}</FieldError>
        </TextField>

        <TextField defaultValue="" aria-label="password" isInvalid={!!errors.password}>
          <Input type="password" placeholder="enter your password" {...register('password')} />
          <FieldError>{errors.password?.message}</FieldError>
        </TextField>

        <TextField
          defaultValue=""
          aria-label="confirmPassword"
          isInvalid={!!errors.confirmPassword}
        >
          <Input
            type="password"
            placeholder="enter your confirmPassword"
            {...register('confirmPassword')}
          />
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </TextField>

        <Button isPending={isSubmitting} type="submit" className="w-full">
          Register
        </Button>
      </form>
    </Card>
  );
}
