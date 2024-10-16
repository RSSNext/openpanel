
import type { Organization, Prisma, ProjectAccess } from '../prisma-client';
import { db } from '../prisma-client';

export type IServiceOrganization = ReturnType<typeof transformOrganization>;
export type IServiceInvite = Prisma.MemberGetPayload<{
  include: { user: true };
}>;
export type IServiceMember = Prisma.MemberGetPayload<{
  include: { user: true };
}> & { access: ProjectAccess[] };
export type IServiceProjectAccess = ProjectAccess;

export function transformOrganization(org: Organization) {
  return {
    id: org.id,
    slug: org.id,
    name: org.name,
    createdAt: org.createdAt,
  };
}

export async function getCurrentOrganizations() {
  const organizations = await db.organization.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return organizations.map(transformOrganization);
}

export function getOrganizationBySlug(slug: string) {
  return db.organization.findUnique({
    where: {
      id: slug,
    },
  });
}

export async function getOrganizationByProjectId(projectId: string) {
  const project = await db.project.findUniqueOrThrow({
    where: {
      id: projectId,
    },
    include: {
      organization: true,
    },
  });

  if (!project.organization) {
    return null;
  }

  return transformOrganization(project.organization);
}

export async function getInvites(organizationSlug: string) {
  return db.member.findMany({
    where: {
      organizationId: organizationSlug,
      userId: null,
    },
    include: {
      user: true,
    },
  });
}

export async function getMembers(organizationSlug: string) {
  const [members, access] = await Promise.all([
    db.member.findMany({
      where: {
        organizationId: organizationSlug,
        userId: {
          not: null,
        },
      },
      include: {
        user: true,
      },
    }),
    db.projectAccess.findMany({
      where: {
        organizationSlug,
      },
    }),
  ]);

  return members.map((member) => ({
    ...member,
    access: access.filter((a) => a.userId === member.userId),
  }));
}

export async function getMember(organizationSlug: string, userId: string) {
  return db.member.findFirst({
    where: {
      organizationId: organizationSlug,
      userId,
    },
  });
}
