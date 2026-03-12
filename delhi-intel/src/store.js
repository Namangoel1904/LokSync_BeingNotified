import { create } from 'zustand';

const useStore = create((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  activeLayer: null,
  setActiveLayer: (layer) =>
    set((state) => ({
      activeLayer: state.activeLayer === layer ? null : layer,
    })),
  tenderCollisionVisible: false,
  showTenderCollision: () => set({ tenderCollisionVisible: true }),
  hideTenderCollision: () => set({ tenderCollisionVisible: false }),
  pushNotifState: null, // null | 'sending' | 'sent'
  triggerPushNotif: () => {
    set({ pushNotifState: 'sending' });
    setTimeout(() => set({ pushNotifState: 'sent' }), 1800);
    setTimeout(() => set({ pushNotifState: null }), 5000);
  },
}));

export default useStore;
