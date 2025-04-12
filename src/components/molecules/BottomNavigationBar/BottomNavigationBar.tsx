import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Icon from '@shiflo/ui/Icon';
import Typography from '@shiflo/ui/Typography';

import { useNavigation } from 'basic-navigation';

import { StyledBottomNavigationBar } from '@components/molecules/BottomNavigationBar/BottomNavigationBar.styles';

function BottomNavigationBar() {
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
    <StyledBottomNavigationBar>
      <Button variant="text" size="large" onClick={handleClick}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="200"
          css={{
            '& svg': {
              width: '24px !important',
              height: '24px !important'
            }
          }}
        >
          <Icon name="CalendarLine" color="text.primary" />
          <Typography as="p" variant="small2" color="text.primary">
            일정
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
              width: '24px !important',
              height: '24px !important'
            }
          }}
        >
          <Icon name="Grid2Solid" />
          <Typography as="p" variant="small2">
            더 보기
          </Typography>
        </Box>
      </Button>
    </StyledBottomNavigationBar>
  );
}

export default BottomNavigationBar;
