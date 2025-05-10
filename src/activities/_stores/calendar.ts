import dayjs, { type Dayjs } from 'dayjs';
import { create } from 'zustand';

import type { Shift } from '@entities/shift';

interface CalendarState {
  focusedDate: Dayjs;
  injectedShifts: Shift[];
  setFocusedDate: (date: Dayjs) => void;
  addInjectedShift: (shift: Shift) => void;
  removeInjectedShift: (id: number) => void;
  reset: () => void;
}

const useCalendarStore = create<CalendarState>()((set) => ({
  focusedDate: dayjs(),
  injectedShifts: [],
  setFocusedDate: (date) => set({ focusedDate: date }),
  addInjectedShift: (shift) =>
    set((state) => ({
      injectedShifts: state.injectedShifts.concat(shift)
    })),
  removeInjectedShift: (id: number) =>
    set((state) => ({
      injectedShifts: state.injectedShifts.filter(({ id: shiftId }) => shiftId !== id)
    })),
  reset: () => set({ focusedDate: dayjs(), injectedShifts: [] })
}));

export default useCalendarStore;
