import { PageTabs, PageTabsLink } from '@/components/page-tabs';
import { Padding } from '@/components/ui/padding';
import { notFound } from 'next/navigation';
import { parseAsStringEnum } from 'nuqs';

import { db } from '@openpanel/db';

import EditOrganization from './edit-organization';
import InvitesServer from './invites';
import MembersServer from './members';

interface PageProps {
  params: {
    organizationSlug: string;
  };
  searchParams: Record<string, string>;
}

export default async function Page({
  params: { organizationSlug },
  searchParams,
}: PageProps) {
  const tab = parseAsStringEnum(['org', 'members', 'invites'])
    .withDefault('org')
    .parseServerSide(searchParams.tab);

  const organization = await db.organization.findUnique({
    where: {
      id: organizationSlug,
    },
    include: {
      members: {
        select: {
          role: true,
          userId: true,
        },
      },
    },
  });

  if (!organization) {
    return notFound();
  }


  return (
    <Padding>
      <PageTabs className="mb-4">
        <PageTabsLink href={'?tab=org'} isActive={tab === 'org'}>
          Organization
        </PageTabsLink>
        <PageTabsLink href={'?tab=members'} isActive={tab === 'members'}>
          Members
        </PageTabsLink>
        <PageTabsLink href={'?tab=invites'} isActive={tab === 'invites'}>
          Invites
        </PageTabsLink>
      </PageTabs>

      {tab === 'org' && <EditOrganization organization={organization} />}
      {tab === 'members' && (
        <MembersServer organizationSlug={organizationSlug} />
      )}
      {tab === 'invites' && (
        <InvitesServer organizationSlug={organizationSlug} />
      )}
    </Padding>
  );
}
