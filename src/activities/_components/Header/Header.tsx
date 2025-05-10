import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Icon from '@shiflo/ui/Icon';
import Typography from '@shiflo/ui/Typography';

import { useNavigation, useParams } from 'basic-navigation';

import dayjs from 'dayjs';

import useTime from '@activities/_providers/TimeProvider/useTime';

function Header() {
  const { baseDate } = useTime();
  const navigation = useNavigation();
  const { open } = useParams('HomeActivity');

  const handleClick = () => {
    if (open === 'toolbar') {
      navigation.back();
    } else {
      navigation.pushStack('HomeActivity', {
        open: 'toolbar'
      });
    }
  };

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
      <Box display="flex" alignItems="center" pr="250">
        <Button
          variant={open !== 'toolbar' ? 'ghost' : 'text'}
          startIcon={<Icon name="PlusSolid" />}
          onClick={handleClick}
          css={{
            transition: 'transform 0.2s',
            transform: baseDate.isBefore(dayjs(), 'dates') ? 'scale(0)' : 'scale(1)',
            '& svg': {
              transition: 'transform 0.2s',
              transform: open === 'toolbar' ? 'rotate(45deg)' : 'rotate(0deg)',
              width: '18px !important',
              height: '18px !important'
            }
          }}
        />
      </Box>
    </Box>
  );
}

export default Header;
