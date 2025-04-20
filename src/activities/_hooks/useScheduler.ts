import { useState } from 'react';

import dayjs, { type Dayjs } from 'dayjs';

import { type CalendarWeek, type RenderedSchedule } from '@activities/_hooks/useCalendar';
import useTime from '@activities/_providers/TimeProvider/useTime';
import type { Schedule } from '@entities/schedule';
import type { Shift } from '@entities/shift';
import LRUCache from '@libraries/LRUCache';

export interface PositionedSchedule extends RenderedSchedule {
  columnIndex: number;
  totalColumns: number;
}

export interface InternalSchedule extends RenderedSchedule {
  _start: number;
  _end: number;
}

export interface UseSchedulerProps {
  hours?: number;
  shifts?: Shift[];
  schedules?: Schedule[];
}

export interface ScheduleWithRange extends Schedule {
  start: number;
  end: number;
}

const schedulerCache = new LRUCache<string, CalendarWeek>(100);

export default function useScheduler({
  hours = 24,
  shifts = [],
  schedules = []
}: UseSchedulerProps = {}) {
  const { baseDate, setOffset } = useTime();

  const [times] = useState(
    Array.from({ length: hours }).map((_, index) => {
      const hour = (index + 1) % 24;
      return dayjs().hour(hour).minute(0).format('A h시');
    })
  );

  const weeks = [
    generateFlatCalendarWeek(baseDate.subtract(1, 'week'), shifts, schedules),
    generateFlatCalendarWeek(baseDate, shifts, schedules),
    generateFlatCalendarWeek(baseDate.add(1, 'week'), shifts, schedules)
  ];

  const goToPrev = () => setOffset((prevState) => prevState - 1);

  const goToNext = () => setOffset((prevState) => prevState + 1);

  const getMinutesFromMidnight = (date: string) => {
    const day = dayjs(date);
    return day.hour() * 60 + day.minute();
  };

  const getDaySchedules = (schedules: RenderedSchedule[], date: Dayjs, isAllDay = false) => {
    return schedules.filter(
      (schedule) =>
        (isAllDay ? schedule.isAllDay : !schedule.isAllDay) &&
        dayjs(schedule.startDate).isBefore(date.endOf('day')) &&
        dayjs(schedule.endDate).isAfter(date.startOf('day'))
    );
  };

  // 특정 날짜 기준으로만 겹침을 판단하여 컬럼 분할 (서로 겹치는 그룹 내에서만 컬럼 분배)
  const resolvePositionedSchedulesForDate = (
    schedules: RenderedSchedule[],
    date: Dayjs
  ): PositionedSchedule[] => {
    const dayStart = date.startOf('day');
    const dayEnd = date.endOf('day');

    const slicedSchedules: InternalSchedule[] = schedules
      .filter(
        (schedule) =>
          dayjs(schedule.startDate).isBefore(dayEnd) && dayjs(schedule.endDate).isAfter(dayStart)
      )
      .map((schedule) => ({
        ...schedule,
        _start: Math.max(
          dayjs(schedule.startDate).minute() + dayjs(schedule.startDate).hour() * 60,
          dayStart.minute() + dayStart.hour() * 60
        ),
        _end: Math.min(
          dayjs(schedule.endDate).minute() + dayjs(schedule.endDate).hour() * 60,
          dayEnd.minute() + dayEnd.hour() * 60
        )
      }));

    const sortedSchedules = [...slicedSchedules].sort((a, b) => a._start - b._start);

    const positionedSchedules: PositionedSchedule[] = [];
    let overlappingGroup: InternalSchedule[] = [];
    let groupMaxEnd = -1;

    for (const currentSchedule of sortedSchedules) {
      if (overlappingGroup.length === 0 || currentSchedule._start < groupMaxEnd) {
        overlappingGroup.push(currentSchedule);
        groupMaxEnd = Math.max(groupMaxEnd, currentSchedule._end);
      } else {
        positionedSchedules.push(...assignColumnsToGroup(overlappingGroup));
        overlappingGroup = [currentSchedule];
        groupMaxEnd = currentSchedule._end;
      }
    }

    if (overlappingGroup.length > 0) {
      positionedSchedules.push(...assignColumnsToGroup(overlappingGroup));
    }

    return positionedSchedules;
  };

  return {
    weeks,
    times,
    goToPrev,
    goToNext,
    getMinutesFromMidnight,
    getDaySchedules,
    resolvePositionedSchedulesForDate
  };
}

function assignColumnsToGroup(group: InternalSchedule[]): PositionedSchedule[] {
  const columns: InternalSchedule[][] = [];
  const positionedGroup: PositionedSchedule[] = [];

  for (const schedule of group) {
    let placed = false;
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      const column = columns[columnIndex];
      const isConflict = column.some(
        (schedule) => !(schedule._end <= schedule._start || schedule._end <= schedule._start)
      );
      if (!isConflict) {
        column.push(schedule);
        positionedGroup.push({
          ...schedule,
          columnIndex: columnIndex,
          totalColumns: 0
        });
        placed = true;
        break;
      }
    }
    if (!placed) {
      columns.push([schedule]);
      positionedGroup.push({
        ...schedule,
        columnIndex: columns.length - 1,
        totalColumns: 0
      });
    }
  }

  const columnCount = columns.length;
  positionedGroup.forEach((schedule) => (schedule.totalColumns = columnCount));

  return positionedGroup;
}

export function generateFlatCalendarWeek(
  weekStartDate: Dayjs,
  shifts: Shift[] = [],
  schedules: Schedule[] = []
): CalendarWeek {
  const cacheKey = `${weekStartDate.format('YYYY-MM-DD')}-${JSON.stringify(shifts)}-${JSON.stringify(schedules)}`;
  const cached = schedulerCache.get(cacheKey);
  if (cached) return cached;

  const week = Array.from({ length: 7 }, (_, index) => weekStartDate.add(index, 'day'));
  const shiftMap = new Map<string, Shift>();
  for (const shift of shifts) {
    shiftMap.set(shift.date, shift);
  }

  const start = weekStartDate;
  const end = weekStartDate.add(6, 'day').endOf('day');

  const extended: ScheduleWithRange[] = schedules
    .map((sched) => {
      const schedStart = dayjs(sched.startDate);
      const schedEnd = dayjs(sched.endDate).endOf('day');
      const overlapStart = schedStart.isBefore(start) ? start : schedStart;
      const overlapEnd = schedEnd.isAfter(end) ? end : schedEnd;
      const startOffset = overlapStart.diff(start, 'day');
      const span = overlapEnd.diff(overlapStart, 'day') + 1;
      return {
        ...sched,
        start: startOffset,
        end: startOffset + span - 1
      };
    })
    .filter((sched) => sched.start <= 6 && sched.end >= 0);

  const days = week.map((date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const scheduleCount = extended.filter((s) => {
      const index = date.diff(start, 'day');
      return s.start <= index && index <= s.end;
    }).length;

    return {
      date,
      isCurrentMonth: date.isSame(weekStartDate, 'month'),
      shift: shiftMap.get(dateStr),
      scheduleCount
    };
  });

  schedulerCache.set(cacheKey, { days, schedules: extended });

  return { days, schedules: extended };
}
