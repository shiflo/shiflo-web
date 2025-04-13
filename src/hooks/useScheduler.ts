import { useState } from 'react';

import dayjs, { type Dayjs } from 'dayjs';

import useCalendar, { type RenderedSchedule, type UseCalendarProps } from '@hooks/useCalendar';

export interface PositionedSchedule extends RenderedSchedule {
  columnIndex: number;
  totalColumns: number;
}

export interface InternalSchedule extends RenderedSchedule {
  _start: number;
  _end: number;
}

export interface UseSchedulerProps extends UseCalendarProps {
  hours?: number;
}

export default function useScheduler({ hours = 24, ...props }: UseSchedulerProps) {
  const { calendar, ...rest } = useCalendar(props);

  const [times] = useState(
    Array.from({ length: hours }).map((_, index) => {
      const hour = (index + 1) % 24;
      return dayjs().hour(hour).minute(0).format('A h시');
    })
  );

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
    calendar,
    times,
    getMinutesFromMidnight,
    getDaySchedules,
    resolvePositionedSchedulesForDate,
    ...rest
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
