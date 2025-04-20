import dayjs, { type Dayjs } from 'dayjs';

import useTime from '@activities/_providers/TimeProvider/useTime';

import type { Schedule } from '@entities/schedule';
import type { Shift } from '@entities/shift';
import LRUCache from '@libraries/LRUCache';

export interface CalendarDate {
  date: Dayjs;
  isCurrentMonth: boolean;
  shift?: Shift;
  scheduleCount: number;
}

export interface CalendarWeek {
  days: CalendarDate[];
  schedules: RenderedSchedule[];
}

export interface RenderedSchedule extends Omit<Schedule, 'createdAt' | 'updatedAt'> {
  start: number;
  end: number;
}

const calendarCache = new LRUCache<string, CalendarWeek[]>(100);
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export interface UseCalendarProps {
  initialDate?: Dayjs;
  weekStart?: 0 | 1;
  shifts?: Shift[];
  schedules?: Schedule[];
}

export default function useCalendar({
  weekStart = 0,
  shifts = [],
  schedules = []
}: UseCalendarProps = {}) {
  const { baseDate, setOffset } = useTime();

  const calendars = [
    generateCalendarDates(baseDate.subtract(1, 'month'), weekStart, shifts, schedules),
    generateCalendarDates(baseDate, weekStart, shifts, schedules),
    generateCalendarDates(baseDate.add(1, 'month'), weekStart, shifts, schedules)
  ];

  const goToPrev = () => setOffset((prevState) => prevState - 1);

  const goToNext = () => setOffset((prevState) => prevState + 1);

  const reset = () => setOffset(0);

  return {
    baseDate,
    daysOfWeek,
    calendars,
    goToPrev,
    goToNext,
    reset
  };
}

function generateCalendarDates(
  baseDate: Dayjs,
  weekStart: 0 | 1,
  shifts: Shift[] = [],
  schedules: Schedule[] = []
): CalendarWeek[] {
  const cacheKey = `${baseDate.format('YYYY-MM-DD')}-${weekStart}-${JSON.stringify(shifts)}-${JSON.stringify(schedules)}`;
  const cached = calendarCache.get(cacheKey);
  if (cached) return cached;

  const shiftMap = new Map<string, Shift>();
  for (const shift of shifts) {
    shiftMap.set(shift.date, shift);
  }

  const startOfMonth = baseDate.startOf('month');
  const startWeekday = startOfMonth.day();
  const offset = (startWeekday - weekStart + 7) % 7;
  const calendarStartDate = startOfMonth.subtract(offset, 'day');
  const dates: Dayjs[] = [];
  for (let i = 0; i < 42; i++) {
    dates.push(calendarStartDate.add(i, 'day'));
  }

  const weeks: Dayjs[][] = Array.from({ length: 6 }, (_, index) =>
    dates.slice(index * 7, index * 7 + 7)
  );
  const calendar: CalendarWeek[] = [];

  for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
    const week = weeks[weekIndex];
    const start = week[0];
    const end = week[6].endOf('day');

    let rendered: RenderedSchedule[] = [];

    for (const schedule of schedules) {
      const schedStart = dayjs(schedule.startDate);
      const schedEnd = dayjs(schedule.endDate).endOf('day');
      const overlapStart = schedStart.isBefore(start) ? start : schedStart;
      const overlapEnd = schedEnd.isAfter(end) ? end : schedEnd;
      if (overlapEnd.isBefore(overlapStart)) continue;

      const span = overlapEnd.diff(overlapStart, 'day') + 1;
      const startOffset = overlapStart.diff(start, 'day');

      rendered.push({
        id: schedule.id,
        title: schedule.title,
        content: schedule.content,
        style: schedule.style,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        isAllDay: schedule.isAllDay,
        start: startOffset,
        end: span
      });
    }

    rendered = rendered.sort((a, b) => {
      if (b.end !== a.end) return b.end - a.end;
      if (a.start !== b.start) return a.start - b.start;
      return a.title.localeCompare(b.title);
    });

    const weekCalendar: CalendarWeek = {
      days: week.map((date) => {
        const dateStr = date.format('YYYY-MM-DD');
        const scheduleCount = rendered.filter((schedule) => {
          const dayIndex = date.diff(start, 'day');
          return schedule.start <= dayIndex && dayIndex < schedule.start + schedule.end;
        }).length;

        return {
          date,
          isCurrentMonth: date.isSame(baseDate, 'month'),
          shift: shiftMap.get(dateStr),
          scheduleCount
        };
      }),
      schedules: rendered
    };

    calendar.push(weekCalendar);
  }

  calendarCache.set(cacheKey, calendar);

  return calendar;
}
