import { useRef } from 'react';

import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Tag, { type TagProps } from '@shiflo/ui/Tag';
import Typography from '@shiflo/ui/Typography';

import { useNavigation, useParams } from 'basic-navigation';

import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';

import useCalendar from '@activities/_hooks/useCalendar';
import useTime from '@activities/_providers/TimeProvider/useTime';
import useCalendarStore from '@activities/_stores/calendar';
import Task from '@components/molecules/Task/Task';
import useSwipe from '@hooks/useSwipe';

import schedules from '../../../database/schedules';
// import shifts from '../../../database/shifts';

function Calendar() {
  const { open } = useParams('HomeActivity');
  const injectedShifts = useCalendarStore((state) => state.injectedShifts);
  const { daysOfWeek, calendars, goToPrev, goToNext } = useCalendar({
    shifts: injectedShifts,
    schedules: open === 'toolbar' ? [] : schedules
  });
  const { baseDate } = useTime();
  const navigation = useNavigation();

  const focusedDate = useCalendarStore((state) => state.focusedDate);
  const setFocusedDate = useCalendarStore((state) => state.setFocusedDate);

  const ref = useRef<HTMLDivElement>(null);

  const isEditable = open === 'toolbar';

  const handleClick = (date: Dayjs) => () => {
    if (isEditable) {
      setFocusedDate(date);
    } else {
      navigation.push(
        'AddScheduleActivity',
        {},
        {
          animationType: 'sheet'
        }
      );
    }
  };

  useSwipe({
    target: ref,
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
    disableSwipeRight: isEditable && baseDate.isSame(dayjs(), 'month')
  });

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        p="400"
        css={({
          theme: {
            palette: { common }
          }
        }) => ({
          backgroundColor: common.background,
          textAlign: 'center'
        })}
      >
        {daysOfWeek.map((day) => (
          <Typography key={day} as="p" variant="body1" fontWeight={500} flexGrow={1}>
            {day}
          </Typography>
        ))}
      </Box>
      <Box
        flexGrow={1}
        css={{
          overflow: 'hidden'
        }}
      >
        <Box
          ref={ref}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          css={{
            height: '100%',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {calendars.map((calendar) => (
            <Box
              key={calendar[0].days[0].date.toISOString()}
              display="flex"
              css={{
                minWidth: '100%',
                height: '100%',
                overflowY: 'auto'
              }}
            >
              <Box className="calendar" display="grid" flexGrow={1} pl="400" pr="400">
                {calendar.map(({ days, schedules }) => (
                  <Box
                    key={`calendar-${days[0].date.toISOString()}`}
                    display="grid"
                    gap="50"
                    pb="200"
                    css={{
                      gridTemplateColumns: 'repeat(7, 1fr)'
                    }}
                  >
                    {days.map(({ date, isCurrentMonth, shift, scheduleCount }) => (
                      <Button
                        key={date.toISOString()}
                        variant="text"
                        onClick={handleClick(date)}
                        disabled={
                          !isCurrentMonth || (isEditable && date.isBefore(dayjs(), 'dates'))
                        }
                        css={({
                          theme: {
                            palette: { primary, common }
                          }
                        }) => ({
                          width: '100%',
                          height: '100%',
                          minHeight: schedules.length > 0 ? '0px' : '100px',
                          paddingLeft: '0px',
                          paddingRight: '0px',
                          borderWidth: '0px',
                          backgroundColor:
                            isEditable && date.isSame(focusedDate, 'date')
                              ? primary.alpha['10']
                              : common.background
                        })}
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          flexDirection: 'column',
                          ...(schedules.length > 0 && scheduleCount === 0
                            ? {
                                gridRow: `auto / span ${schedules.length + 1}`
                              }
                            : undefined)
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="flex-start"
                          justifyContent="center"
                          gap="200"
                          flexWrap="wrap"
                        >
                          {date.date()}
                          {shift && (
                            <Tag
                              color={shift.style.color as TagProps['color']}
                              css={{
                                marginTop: '-2px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {shift.label}
                            </Tag>
                          )}
                        </Box>
                      </Button>
                    ))}
                    {schedules.map(({ id, title, style, start, end }) => (
                      <Task
                        key={id}
                        color={style.color}
                        style={{
                          gridColumn: `${start + 1} / span ${end}`,
                          gridRow: 'auto / span 1' // 세로 방향으로도 확장
                        }}
                      >
                        {title}
                      </Task>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Calendar;
