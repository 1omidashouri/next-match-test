import DeleteButton from '@/components/DeleteButton';
import StarButton from '@/components/StarButton';
import { getCurrentUser } from '@/lib/auth';
import { getMemberByUserId, getMemberPhotosByUserId } from '@/server/actions/members';
import Image from 'next/image';

export default async function PhotoPage(props: PageProps<'/members/[userId]/photos'>) {
  const { userId } = await props.params;
  const photos = await getMemberPhotosByUserId(userId);
  const currentUser = await getCurrentUser();
  const isOwner = currentUser?.id === userId;

  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos?.map((photo) => (
        <div key={photo.id} className="relative">
          <Image
            alt="member photo"
            width={500}
            height={500}
            loading="eager"
            sizes="(max-width:768px) 100vw,33vw"
            src={photo.url}
            className="aspect-square object-cover rounded-xl relative"
          />
          {isOwner && (
            <>
              <div className="absolute top-3 left-3 z-50">
                <StarButton selected={false} loading={false} />
              </div>
              <div className="absolute top-3 right-3 z-50">
                <DeleteButton loading={false} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
