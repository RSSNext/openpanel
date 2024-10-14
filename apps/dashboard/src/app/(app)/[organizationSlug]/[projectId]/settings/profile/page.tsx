import { Padding } from '@/components/ui/padding';

import EditProfile from './edit-profile';

export default async function Page() {
  const profile = {
    id: '1',
    email: 'follow@team.com',
    firstName: 'Follow',
    lastName: 'Team',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  return (
    <Padding>
      <h1 className="mb-4 text-2xl font-bold">Profile</h1>
      <EditProfile profile={profile} />
    </Padding>
  );
}
