import { create } from 'zustand';

interface NavigationStore {
  activePanel: string;
  activeProjectId: string | null;

  setActivePanel: (panelId: string) => void;
  openProjectDetail: (projectId: string) => void;
  closeProjectDetail: () => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  activePanel: 'about-me',
  activeProjectId: null,

  setActivePanel: (panelId: string) =>
    set({ activePanel: panelId, activeProjectId: null }),

  openProjectDetail: (projectId: string) =>
    set({ activeProjectId: projectId }),

  closeProjectDetail: () =>
    set({ activeProjectId: null }),
}));
