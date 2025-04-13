import Box from '@shiflo/ui/Box';

import Button from '@shiflo/ui/Button';
import Tag, { type TagProps } from '@shiflo/ui/Tag';
import Typography from '@shiflo/ui/Typography';

import Task from '@components/molecules/Task';

import useScheduler from '@hooks/useScheduler';

import schedules from '../../../database/schedules';
import shifts from '../../../database/shifts';

const viewType = 'week';

function Scheduler() {
  const {
    calendar,
    times,
    getMinutesFromMidnight,
    getDaySchedules,
    resolvePositionedSchedulesForDate
  } = useScheduler({
    shifts,
    schedules
  });

  return (
    <>
      <Box
        display="grid"
        css={({
          theme: {
            palette: { common }
          }
        }) => ({
          marginLeft: '64px',
          position: 'sticky',
          top: 0,
          gridTemplateColumns: viewType === 'week' ? 'repeat(7, 1fr)' : '1fr',
          backgroundColor: common.background,
          zIndex: 1
        })}
      >
        {calendar[2].days.map(({ date, shift }) => (
          <Button
            key={date.day()}
            variant="text"
            color="secondary"
            css={({ theme: { spacing } }) => ({
              minWidth: '0px',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: spacing['100']
            })}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="200"
              css={{
                maxHeight: '16px'
              }}
            >
              <Typography variant="small1" fontWeight={400} color="text.secondary">
                {date.format('ddd')}
              </Typography>
              {shift && (
                <Tag
                  color={shift.style.color as TagProps['color']}
                  css={{
                    whiteSpace: 'nowrap'
                  }}
                >
                  {shift.label}
                </Tag>
              )}
            </Box>
            {date.format('D일')}
          </Button>
        ))}
        {calendar[2].days.map(({ date }) => {
          const daySchedules = getDaySchedules(calendar[2].schedules, date, true);

          return (
            <Box
              key={`${date.toISOString()}-all-day`}
              css={{
                maxHeight: '50px',
                overflowX: 'hidden',
                overflowY: 'auto'
              }}
            >
              {daySchedules.map(({ id, title, style }) => (
                <Task
                  key={`schedule-${id}-all-day`}
                  color={style.color}
                  style={{
                    width: '100%',
                    height: '25px'
                  }}
                >
                  {title}
                </Task>
              ))}
            </Box>
          );
        })}
      </Box>
      <Box display="flex" flex={1}>
        <Box
          display="flex"
          flexDirection="column"
          css={{
            width: '64px',
            height: '100%'
          }}
        >
          {times.map((time) => (
            <Box
              key={time}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-start"
              pr="100"
              css={{
                height: '60px',
                transform: 'translateY(-8px)'
              }}
            >
              <Typography variant="small1" fontWeight={400} color="text.secondary">
                {time}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box flex={1}>
          <Box
            display="grid"
            flex={1}
            css={{
              gridTemplateColumns: viewType === 'week' ? 'repeat(7, 1fr)' : '1fr'
            }}
          >
            {calendar[2].days.map(({ date }) => {
              const daySchedules = getDaySchedules(calendar[2].schedules, date);
              const positioned = resolvePositionedSchedulesForDate(daySchedules, date);

              return (
                <Box
                  key={date.toISOString()}
                  css={({
                    theme: {
                      palette: { border }
                    }
                  }) => ({
                    borderLeft: `1px solid ${border.light}`
                  })}
                >
                  <Box
                    display="grid"
                    css={{ position: 'relative', gridTemplateRows: 'repeat(24, 60px)' }}
                  >
                    {times.map((time) => (
                      <Box
                        key={`${time}-block`}
                        css={({
                          theme: {
                            palette: { border }
                          }
                        }) => ({ borderTop: `1px solid ${border.light}`, height: '60px' })}
                      />
                    ))}
                    {positioned.map(
                      ({ id, startDate, endDate, style, totalColumns, columnIndex, title }) => {
                        const startMin = getMinutesFromMidnight(startDate);
                        const endMin = getMinutesFromMidnight(endDate);

                        const top = (startMin / 60) * 60; // px
                        const height = ((endMin - startMin) / 60) * 60;

                        const width = 100 / totalColumns;
                        const left = columnIndex * width;

                        return (
                          <Task
                            key={id}
                            vertical
                            color={style?.color}
                            style={{
                              position: 'absolute',
                              top: `${top + 1}px`,
                              height: `${height - 1}px`,
                              width: `${width}%`,
                              left: `${left}%`
                            }}
                          >
                            {title}
                          </Task>
                        );
                      }
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Scheduler;
