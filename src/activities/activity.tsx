import BottomSheet from '@shiflo/ui/BottomSheet';
import { AppScreen } from 'basic-navigation';

import { Calendar, Toolbar } from '@activities/_components';
import { TimeProvider } from '@activities/_providers';
import BottomNavigationBar from '@components/molecules/BottomNavigationBar';

function HomeActivity() {
  return (
    <AppScreen
      statusBarHeight="var(--safe-area-inset-top, 0px)"
      systemBottomNavigationBarHeight="var(--safe-area-inset-bottom, 0px)"
      bottomNavigationBar={<BottomNavigationBar />}
      bottomNavigationBarHeight="72px"
    >
      <TimeProvider initialMode="month">
        <Toolbar />
        <Calendar />
        {/* <Scheduler /> */}
      </TimeProvider>
      <BottomSheet open onClose={() => {}}>
        BottomSheet
      </BottomSheet>
    </AppScreen>
  );
}

export default HomeActivity;
