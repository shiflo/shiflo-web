import BottomSheet from '@shiflo/ui/BottomSheet';
import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Icon from '@shiflo/ui/Icon';
import Tag, { type TagProps } from '@shiflo/ui/Tag';
import { useNavigation, useParams } from 'basic-navigation';

import dayjs from 'dayjs';

import useTime from '@activities/_providers/TimeProvider/useTime';
import useCalendarStore from '@activities/_stores/calendar';
import type { Shift } from '@entities/shift';

import shifts from '../../../database/shifts';

function Toolbar() {
  const { open } = useParams('HomeActivity');
  const navigation = useNavigation();
  const { baseDate, setOffset } = useTime();

  const focusedDate = useCalendarStore((state) => state.focusedDate);
  const setFocusedDate = useCalendarStore((state) => state.setFocusedDate);
  const addInjectedShift = useCalendarStore((state) => state.addInjectedShift);
  const removeInjectedShift = useCalendarStore((state) => state.removeInjectedShift);
  const reset = useCalendarStore((state) => state.reset);

  const handleClick = (shift: Shift) => () => {
    if (baseDate.endOf('month').isSame(focusedDate, 'dates')) {
      setOffset((offset) => offset + 1);
    }

    addInjectedShift({
      ...shift,
      id: focusedDate.unix(),
      date: focusedDate.format('YYYY-MM-DD')
    });
    setFocusedDate(focusedDate.add(1, 'day'));
  };

  const handleClickRemove = (id: number) => () => {
    if (focusedDate.isBefore(dayjs(), 'dates')) {
      removeInjectedShift(id);
      return;
    }

    if (baseDate.startOf('month').isSame(focusedDate, 'dates')) {
      setOffset((offset) => offset - 1);
    }

    removeInjectedShift(id);
    setFocusedDate(focusedDate.subtract(1, 'day'));
  };

  const handleClickReset = () => {
    reset();
    setOffset(0);
  };

  const handleClose = () => navigation.back();

  const handleClickComplete = () => navigation.back();

  return (
    <BottomSheet
      open={open === 'toolbar'}
      onClose={handleClose}
      maxWidth="fit-content"
      hideDragHandleBar
      hideOverlay
      css={({
        theme: {
          palette: { primary },
          radius
        }
      }) => ({
        borderRadius: radius['400'],
        boxShadow: `0 0 4px 0 ${primary.alpha['30']}`
      })}
    >
      <Box display="flex" alignItems="center">
        <Box
          flexGrow={1}
          display="flex"
          alignItems="center"
          gap="150"
          pl="200"
          css={{
            overflowX: 'auto'
          }}
        >
          {shifts.map(({ id, style, label, ...props }) => (
            <Button
              key={`toolbar-shift-${id}`}
              variant="text"
              onClick={handleClick({ id, style, label, ...props })}
              css={{ padding: 0, whiteSpace: 'nowrap' }}
            >
              <Tag color={style.color as TagProps['color']}>{label}</Tag>
            </Button>
          ))}
          <Box
            display="flex"
            alignItems="center"
            gap="150"
            pr="200"
            css={({ theme: { spacing } }) => ({
              position: 'sticky',
              right: 0,
              marginTop: spacing['100'],
              marginBottom: spacing['100'],
              paddingLeft: spacing['150'],
              marginLeft: 'auto'
            })}
          >
            <Button
              color="secondary"
              onClick={handleClickReset}
              startIcon={<Icon name="RotateRightSolid" />}
            />
            <Button
              color="secondary"
              onClick={handleClickRemove(focusedDate.unix())}
              startIcon={<Icon name="MinusSolid" />}
              css={({
                theme: {
                  palette: { feedback }
                }
              }) => ({
                color: feedback.error.dark
              })}
            />
            <Button
              color="secondary"
              onClick={handleClickComplete}
              startIcon={<Icon name="CheckSolid" />}
              css={({
                theme: {
                  palette: { feedback }
                }
              }) => ({
                color: feedback.success.dark
              })}
            />
          </Box>
        </Box>
      </Box>
    </BottomSheet>
  );
}

export default Toolbar;
