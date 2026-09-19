'use client';
import { toggleLikeMemeber } from '@/server/actions/likes';
import { useTransition } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { PiSpinnerGap } from 'react-icons/pi';

type LikeButtonProps = {
  targerUserId: string;
  hasLiked: boolean;
};

export default function LikeButton({ targerUserId, hasLiked }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  const toggleLike = () => {
    startTransition(async () => {
      await toggleLikeMemeber(targerUserId, hasLiked);
    });
  };
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        toggleLike();
      }}
      className="relative hover:opacity-70 transition cursor-pointer"
    >
      {!isPending ? (
        <>
          <AiOutlineHeart size={28} className="fill-white absolute -top-0.5 -right-0.5" />
          <AiFillHeart className={hasLiked ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        </>
      ) : (
        <PiSpinnerGap className="fill-white animate-spin" />
      )}
    </div>
  );
}
