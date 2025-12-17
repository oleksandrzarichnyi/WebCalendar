import { create } from 'zustand'

export const useCalendarStore = create((set, get) => ({
  storedCalendars: [],

  setStoredCalendars: (calendarsData) => {
    set((state) => ({
      storedCalendars: calendarsData.map(calendar => {
        const existing = state.storedCalendars.find(c => c.id === calendar.id);
        return {
          ...calendar,
          isDisplayed: existing ? existing.isDisplayed : true
        };
      }),
    }))
  },

  handleDisplay: (calendarId) => {
    set((state) => ({
      storedCalendars: state.storedCalendars.map((calendar) => 
        calendar.id === calendarId
          ? { ...calendar, isDisplayed: !calendar.isDisplayed }
          : calendar
      )
    }));
  }
}));