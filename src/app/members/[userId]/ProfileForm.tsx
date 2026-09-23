'use client';

import { ProfileEditSchema, profileEditSchema } from '@/lib/schemas/profileEditSchema';
import { Member } from '../../../../generated/prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, FieldError, Input, Label, TextArea, TextField, toast } from '@heroui/react';
import { updateProfile } from '@/server/actions/members';
import { useRouter } from 'next/navigation';

type Props = {
  member: Member;
};

export default function ProfileForm({ member }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileEditSchema>({
    // resolver: zodResolver(profileEditSchema),
    mode: 'onTouched',
    defaultValues: {
      name: member.name ?? '',
      description: member.description ?? '',
      city: member.city ?? '',
      country: member.country ?? '',
    },
  });

  const onSubmit = async (data: ProfileEditSchema) => {
    // console.log(data);
    await updateProfile(data);
    toast.success('Profile has been updated');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <TextField defaultValue={member.name} aria-label="name" isInvalid={!!errors.name}>
        <Label>Display name</Label>
        <Input type="text" placeholder="enter your name" {...register('name')} />
        <FieldError>{errors.name?.message}</FieldError>
      </TextField>

      <TextField
        defaultValue={member.description}
        aria-label="description"
        isInvalid={!!errors.description}
      >
        <Label>Description</Label>
        <TextArea rows={4} placeholder="enter your description" {...register('description')} />
        <FieldError>{errors.description?.message}</FieldError>
      </TextField>

      <div className="flex items-center justify-between gap-3 w-full">
        <TextField
          className="w-full"
          defaultValue={member.city}
          aria-label="city"
          isInvalid={!!errors.city}
        >
          <Label>City</Label>
          <Input type="text" placeholder="enter your city" {...register('city')} />
          <FieldError>{errors.city?.message}</FieldError>
        </TextField>

        <TextField
          className="w-full"
          defaultValue={member.country}
          aria-label="country"
          isInvalid={!!errors.country}
        >
          <Label>Country</Label>
          <Input type="text" placeholder="enter your country" {...register('country')} />
          <FieldError>{errors.country?.message}</FieldError>
        </TextField>
      </div>

      <Button
        type="submit"
        className="flex self-end mt-3"
        isPending={isSubmitting}
        isDisabled={!isDirty}
      >
        update profile
      </Button>
    </form>
  );
}
