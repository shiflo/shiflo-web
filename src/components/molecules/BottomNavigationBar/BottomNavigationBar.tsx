import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Icon from '@shiflo/ui/Icon';
import Typography from '@shiflo/ui/Typography';

import { useNavigation } from 'basic-navigation';

import { Inner } from '@components/molecules/BottomNavigationBar/BottomNavigationBar.styles';

interface BottomNavigationBarProps {
  hideBottomNavigationBar?: boolean;
}

function BottomNavigationBar({ hideBottomNavigationBar }: BottomNavigationBarProps) {
  const navigation = useNavigation();

  const handleClick = () =>
    navigation.replace(
      'HomeActivity',
      {},
      {
        animationType: 'breath'
      }
    );

  const handleClickMy = () =>
    navigation.replace(
      'MyActivity',
      {},
      {
        animationType: 'breath'
      }
    );

  return (
    <Box
      as="nav"
      style={{
        transition: 'transform 0.2s ease-in-out',
        transform: hideBottomNavigationBar ? 'translateY(100%)' : 'translateY(0)'
      }}
      css={({
        theme: {
          palette: { common }
        }
      }) => ({
        backgroundColor: common.background
      })}
    >
      <Inner>
        <Button variant="text" size="large" onClick={handleClick}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="200"
            css={{
              '& svg': {
                width: '20px !important',
                height: '20px !important'
              }
            }}
          >
            <Icon name="CalendarLine" color="primary.main" />
            <Typography as="p" variant="small2" color="primary.main" fontWeight={700}>
              월간
            </Typography>
          </Box>
        </Button>
        <Button variant="text" size="large" onClick={handleClick}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="200"
            css={{
              '& svg': {
                width: '20px !important',
                height: '20px !important'
              }
            }}
          >
            <Icon name="ChartSimpleHorizontalSolid" />
            <Typography as="p" variant="small2" fontWeight={700}>
              주간
            </Typography>
          </Box>
        </Button>
        <Button variant="text" size="large" onClick={handleClick}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="200"
            css={{
              '& svg': {
                width: '20px !important',
                height: '20px !important'
              }
            }}
          >
            <Icon name="BriefcaseBlankSolid" />
            <Typography as="p" variant="small2" fontWeight={700}>
              근무
            </Typography>
          </Box>
        </Button>
        <Button variant="text" size="large" onClick={handleClick}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="200"
            css={{
              '& svg': {
                width: '20px !important',
                height: '20px !important'
              }
            }}
          >
            <Icon name="ClockDeskSolid" />
            <Typography as="p" variant="small2" fontWeight={700}>
              알람
            </Typography>
          </Box>
        </Button>
        <Button variant="text" size="large" onClick={handleClickMy}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="200"
            css={{
              '& svg': {
                width: '20px !important',
                height: '20px !important'
              }
            }}
          >
            <Icon name="Grid2Solid" />
            <Typography as="p" variant="small2" fontWeight={700}>
              더 보기
            </Typography>
          </Box>
        </Button>
      </Inner>
    </Box>
  );
}

export default BottomNavigationBar;
