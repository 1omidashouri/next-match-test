import { fetchCurrentUserLikeIds, fetchLikesMembers } from '@/server/actions/likes';
import ListTabs from './ListTabs';

export default async function ListPage(props: PageProps<'/lists'>) {
  const { type } = await props.searchParams;

  const likeIds = await fetchCurrentUserLikeIds();
  const memebers = await fetchLikesMembers(type as string);

  return (
    <div className="mt-24 mx-10">
      <ListTabs likeIds={likeIds} members={memebers} />
    </div>
  );
}
