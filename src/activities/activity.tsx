import { AppScreen } from 'basic-navigation';

import { Scheduler, Toolbar } from '@activities/_components';
import BottomNavigationBar from '@components/molecules/BottomNavigationBar';

function HomeActivity() {
  return (
    <AppScreen bottomNavigationBar={<BottomNavigationBar />} bottomNavigationBarHeight={72}>
      <Toolbar />
      <Scheduler />
    </AppScreen>
  );
}

export default HomeActivity;
