import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(persist(
  (set) => ({
    tareas: [],
    setTareas: (tareas) => set(() => ({ tareas })),
  }),
  {
    name: "tareas-storage", // nombre único de la clave de almacenamiento local
    getStorage: () => localStorage, // especifica que queremos usar localStorage
  }
));

export default useStore;