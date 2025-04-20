import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Icon from '@shiflo/ui/Icon';
import Typography from '@shiflo/ui/Typography';

import useTime from '@activities/_providers/TimeProvider/useTime';

function Toolbar() {
  const { baseDate } = useTime();

  return (
    <Box
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      pl="400"
      pr="150"
      pt="200"
      pb="200"
    >
      <Typography as="h1" variant="heading1" fontWeight={700}>
        {baseDate.format('MMM')}
      </Typography>
      <Box display="flex" alignItems="center">
        <Button
          variant="text"
          css={{
            // TODO 우선 순위 이슈 수정 필요
            '& svg': {
              width: '24px !important',
              height: '24px !important'
            }
          }}
        >
          <Icon name="PenToSquareSolid" />
        </Button>
        <Button
          variant="text"
          css={{
            '& svg': {
              width: '24px !important',
              height: '24px !important'
            }
          }}
        >
          <Icon name="GearSolid" />
        </Button>
      </Box>
    </Box>
  );
}

export default Toolbar;
