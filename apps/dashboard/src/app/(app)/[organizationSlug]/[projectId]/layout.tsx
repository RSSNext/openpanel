import { FullPageEmptyState } from '@/components/full-page-empty-state';

import {
  getCurrentOrganizations,
  getCurrentProjects,
  getDashboardsByProjectId,
} from '@openpanel/db';

import LayoutContent from './layout-content';
import { LayoutSidebar } from './layout-sidebar';


interface AppLayoutProps {
  children: React.ReactNode;
  params: {
    organizationSlug: string;
    projectId: string;
  };
}

export default async function AppLayout({
  children,
  params: { organizationSlug, projectId },
}: AppLayoutProps) {
  const [organizations, projects, dashboards] = await Promise.all([
    getCurrentOrganizations(),
    getCurrentProjects(organizationSlug),
    getDashboardsByProjectId(projectId),
  ]);

  if (!organizations.find((item) => item.id === organizationSlug)) {
    return (
      <FullPageEmptyState title="Not found" className="min-h-screen">
        The organization you were looking for could not be found.
      </FullPageEmptyState>
    );
  }

  if (!projects.find((item) => item.id === projectId)) {
    return (
      <FullPageEmptyState title="Not found" className="min-h-screen">
        The project you were looking for could not be found.
      </FullPageEmptyState>
    );
  }

  return (
    <div id="dashboard">
      <LayoutSidebar
        {...{
          organizationSlug,
          projectId,
          organizations,
          projects,
          dashboards,
        }}
      />
      <LayoutContent>{children}</LayoutContent>

    </div>
  );
}
