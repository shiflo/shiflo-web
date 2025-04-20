import { AppScreen } from 'basic-navigation';

import { Scheduler, Toolbar } from '@activities/_components';
import { TimeProvider } from '@activities/_providers';
import BottomNavigationBar from '@components/molecules/BottomNavigationBar';

function HomeActivity() {
  return (
    <AppScreen bottomNavigationBar={<BottomNavigationBar />} bottomNavigationBarHeight={72}>
      <TimeProvider initialMode="week">
        <Toolbar />
        {/* <Calendar /> */}
        <Scheduler />
      </TimeProvider>
    </AppScreen>
  );
}

export default HomeActivity;
