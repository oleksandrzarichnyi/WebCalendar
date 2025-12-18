import { create } from 'zustand'
import { MONTHS } from '../ui-kit/DatePicker/MONTHS';

export const useDateStore = create((set, get) => ({
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
      }
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

  storedSelectedDate: '',

  setStoredSelectedDate: (day) => {
    set({
      storedSelectedDate: day,
    });
  },

  setNextDay: () => {
    set((state) => {
      if (!state.storedSelectedDate) return {
        ...state
      }

      const currentDay = Number(state.storedSelectedDate.split('-')[1]);
      const daysInMonth = MONTHS[state.storedMonthIndex].days.length;

      let nextDay = currentDay + 1;
      let nextMonthIndex = state.storedMonthIndex;
      let nextYear = state.date.year;

      if (nextDay > daysInMonth) {
        nextDay = 1;
        nextMonthIndex = state.storedMonthIndex === 11 ? 0 : state.storedMonthIndex + 1;

        if (state.storedMonthIndex === 11) {
          nextYear += 1;
        }
      }

      return {
        storedMonthIndex: nextMonthIndex,
        storedSelectedDate: `${MONTHS[nextMonthIndex].name}-${nextDay}-${nextYear}`,
        date: {
          ...state.date,
          year: nextYear,
          month: MONTHS[nextMonthIndex].name,
        },
      };
    });
  },

  setPrevDay: () => {
    set((state) => {
      if (!state.storedSelectedDate) return {
        ...state
      }

      const currentDay = Number(state.storedSelectedDate.split('-')[1]);

      let prevDay = currentDay - 1;
      let prevMonthIndex = state.storedMonthIndex;
      let prevYear = state.date.year;

      if (prevDay < 1) {
        prevMonthIndex = state.storedMonthIndex === 0 ? 11 : state.storedMonthIndex - 1;

        if (state.storedMonthIndex === 0) {
          prevYear -= 1;
        }

        prevDay = MONTHS[prevMonthIndex].days.length;
      }

      return {
        storedMonthIndex: prevMonthIndex,
        storedSelectedDate: `${MONTHS[prevMonthIndex].name}-${prevDay}-${prevYear}`,
        date: {
          ...state.date,
          year: prevYear,
          month: MONTHS[prevMonthIndex].name,
        },
      };
    });
  }
}));