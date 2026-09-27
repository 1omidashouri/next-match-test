import { getMemberByUserId, getMemberPhotosByUserId } from '@/server/actions/members';
import Image from 'next/image';

export default async function PhotoPage(props: PageProps<'/members/[userId]/photos'>) {
  const { userId } = await props.params;
  const photos = await getMemberPhotosByUserId(userId);

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
        </div>
      ))}
    </div>
  );
}
