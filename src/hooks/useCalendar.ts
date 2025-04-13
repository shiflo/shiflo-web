import { useState } from 'react';

import dayjs, { type Dayjs } from 'dayjs';

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

export type CalendarViewMode = 'month' | 'week' | '2days';

const calendarCache = new LRUCache<string, CalendarWeek[]>(100);
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export interface UseCalendarProps {
  initialDate?: Dayjs;
  weekStart?: 0 | 1;
  mode?: CalendarViewMode;
  shifts?: Shift[];
  schedules?: Schedule[];
}

export default function useCalendar({
  initialDate = dayjs(),
  weekStart = 0,
  mode = 'month',
  shifts = [],
  schedules = []
}: UseCalendarProps = {}) {
  const [offset, setOffset] = useState(0);

  let baseDate: Dayjs;
  if (mode === 'month') baseDate = initialDate.add(offset, 'month');
  else if (mode === 'week') baseDate = initialDate.add(offset * 7, 'day');
  else baseDate = initialDate.add(offset * 2, 'day');

  const calendar = generateCalendarDates(baseDate, mode, weekStart, shifts, schedules);

  const goToPrev = () => setOffset((prevState) => prevState - 1);

  const goToNext = () => setOffset((prevState) => prevState + 1);

  const reset = () => setOffset(0);

  return {
    baseDate,
    daysOfWeek,
    calendar,
    goToPrev,
    goToNext,
    reset,
    mode
  };
}

function generateCalendarDates(
  baseDate: Dayjs,
  mode: CalendarViewMode,
  weekStart: 0 | 1,
  shifts: Shift[] = [],
  schedules: Schedule[] = []
): CalendarWeek[] {
  const cacheKey = `${baseDate.format('YYYY-MM-DD')}-${mode}-${weekStart}`;
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
          isCurrentMonth: date.month() === baseDate.month(),
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
