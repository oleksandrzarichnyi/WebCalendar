import { create } from 'zustand'

export const useEventStore = create((set, get) => ({
  storedMonthIndex: null,

  setStoredMonthIndex: (index) => {
    set({
      storedMonthIndex: index,
    });
  },

  date: {
    year: '',
    month: '',
  },

  setPrevMonth: () => {
    set((state) => ({
      storedMonthIndex: state.storedMonthIndex === 0 ? 11 : state.storedMonthIndex - 1,
      date: {
        ...state.date,
        year: state.storedMonthIndex === 0 ? state.date.year - 1 : state.date.year,
      }
    }));
  },

  setNextMonth: () => {
    set((state) => ({
      storedMonthIndex: state.storedMonthIndex === 11 ? 0 : state.storedMonthIndex + 1,
      date: {
        ...state.date,
        year: state.storedMonthIndex === 11 ? state.date.year + 1 : state.date.year,
      },
    }));
  },

  setYear: (year) => {
    set((state) => ({
      date: {
        ...state.date,
        year: year,
      }
    }));
  },

  setMonth: (month) => {
    set((state) => ({
      date: {
        ...state.date,
        month: month,
      }
    }));
  },

  storedEventDate: '',

  setStoredEventDate: (day) => {
    set({
      storedEventDate: day,
    });
  },
}));