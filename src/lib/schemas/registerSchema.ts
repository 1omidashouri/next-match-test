import z from 'zod';

export const resgisterSchema = z
  .object({
    name: z.string().min(1, { error: 'the name is requied' }),
    email: z.email(),
    password: z.string().min(3, { error: 'the password must be at least 3 character' }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'the password do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterSchema = z.infer<typeof resgisterSchema>;
