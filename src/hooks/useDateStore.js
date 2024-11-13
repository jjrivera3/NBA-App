// useDateStore.js
import create from "zustand";
import { persist } from "zustand/middleware";

const useDateStore = create(
  persist(
    (set) => ({
      selectedDate: new Date(), // Initialize with today's date
      setSelectedDate: (date) => set({ selectedDate: date }),
    }),
    {
      name: "date-storage", // Name for localStorage persistence
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useDateStore;
