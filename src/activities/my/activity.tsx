import { AppScreen } from 'basic-navigation';

import BottomNavigationBar from '@components/molecules/BottomNavigationBar';

function MyActivity() {
  return (
    <AppScreen
      statusBarHeight="var(--safe-area-inset-top, 0px)"
      systemBottomNavigationBarHeight="var(--safe-area-inset-bottom, 0px)"
      bottomNavigationBar={<BottomNavigationBar />}
      bottomNavigationBarHeight="72px"
    >
      <h1>My Activity</h1>
    </AppScreen>
  );
}

export default MyActivity;
