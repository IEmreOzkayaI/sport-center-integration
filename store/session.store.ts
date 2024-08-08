import { create } from "zustand";

const sessionStore = create((set) => ({
    session: {
        id: null,
        name: null,
        role: null,
    } as Session,
    setSession: (session: Session) => set({ session }),
    clearSession: () => set({ session: null }),
}));

export default sessionStore;

type Session = {
    id: number | null;
    name: string | null;
    role: string | null
};
