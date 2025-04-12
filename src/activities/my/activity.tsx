import { AppScreen } from 'basic-navigation';

import BottomNavigationBar from '@components/molecules/BottomNavigationBar';

function MyActivity() {
  return (
    <AppScreen bottomNavigationBar={<BottomNavigationBar />} bottomNavigationBarHeight={72}>
      <h1
        style={{
          marginTop: 'env(safe-area-inset-top)'
        }}
      >
        My Activity
      </h1>
    </AppScreen>
  );
}

export default MyActivity;
