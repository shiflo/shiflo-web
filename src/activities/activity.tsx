import { AppScreen, useParams } from 'basic-navigation';

import { Calendar, Header, Toolbar } from '@activities/_components';
import { TimeProvider } from '@activities/_providers';
import BottomNavigationBar from '@components/molecules/BottomNavigationBar';

function HomeActivity() {
  const { open } = useParams('HomeActivity');

  return (
    <AppScreen
      statusBarHeight="var(--safe-area-inset-top, 0px)"
      systemBottomNavigationBarHeight="var(--safe-area-inset-bottom, 0px)"
      bottomNavigationBar={<BottomNavigationBar hideBottomNavigationBar={open === 'toolbar'} />}
      bottomNavigationBarHeight={open === 'toolbar' ? '0px' : '69px'}
    >
      <TimeProvider initialMode="month">
        <Header />
        <Calendar />
        <Toolbar />
        {/* <Scheduler /> */}
      </TimeProvider>
    </AppScreen>
  );
}

export default HomeActivity;
