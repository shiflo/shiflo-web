import Box from '@shiflo/ui/Box';
import { AppScreen } from 'basic-navigation';

import { Calendar, Toolbar } from '@activities/_components';
import BottomNavigationBar from '@components/molecules/BottomNavigationBar';

function HomeActivity() {
  return (
    <AppScreen bottomNavigationBar={<BottomNavigationBar />} bottomNavigationBarHeight={72}>
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        css={{
          height: '100%'
        }}
      >
        <Toolbar />
        <Calendar />
      </Box>
    </AppScreen>
  );
}

export default HomeActivity;
