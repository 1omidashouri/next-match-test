import { CldUploadButton } from 'next-cloudinary';
import { HiPhoto } from 'react-icons/hi2';

export default function PhotoUpload() {
  return (
    <CldUploadButton
      options={{
        maxFiles: 1,
        folder: 'nm16-demo',
      }}
      onSuccess={async (result) => {
        console.log(result);
      }}
      signatureEndpoint="/api/sign-image"
      className="flex items-center bg-accent text-white gap-2 rounded-lg py-2 px-4 hover:bg-accent/70 cursor-pointer"
    >
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  );
}
