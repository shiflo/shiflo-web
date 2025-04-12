import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Tag, { type TagProps } from '@shiflo/ui/Tag';
import Typography from '@shiflo/ui/Typography';

import Task from '@components/molecules/Task/Task';
import useCalendar from '@hooks/useCalendar';

import schedules from '../../../database/schedules';
import shifts from '../../../database/shifts';

function Calendar() {
  const { daysOfWeek, calendar } = useCalendar({
    shifts,
    schedules
  });

  return (
    <Box
      as="section"
      display="flex"
      flexDirection="column"
      flexGrow={1}
      css={{
        overflowY: 'auto',
        overscrollBehavior: 'none'
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        p="400"
        css={({
          theme: {
            palette: { common }
          }
        }) => ({
          position: 'sticky',
          top: 0,
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
        display="grid"
        flexGrow={1}
        pl="400"
        pr="400"
        css={{
          gridTemplateRows: 'repeat(6, 1fr)'
        }}
      >
        {calendar.map(({ days, schedules }) => (
          <Box
            key={days[0].date.toISOString()}
            display="grid"
            gap="50"
            css={{
              gridTemplateColumns: 'repeat(7, 1fr)'
            }}
          >
            {days.map(({ date, isCurrentMonth, shift, scheduleCount }) => (
              <Button
                key={date.toISOString()}
                variant="text"
                disabled={!isCurrentMonth}
                css={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                  borderWidth: '0px'
                }}
                style={
                  schedules.length > 0 && scheduleCount === 0
                    ? {
                        gridRow: `auto / span ${schedules.length + 1}`
                      }
                    : undefined
                }
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
              <Task key={id} color={style.color} start={start} end={end}>
                {title}
              </Task>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Calendar;
