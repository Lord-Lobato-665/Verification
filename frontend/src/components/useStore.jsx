import create from "zustand";

const useStore = create((set) => ({
  tareas: [],
  setTareas: (tareas) => set(() => ({ tareas })),
}));

export default useStore;
