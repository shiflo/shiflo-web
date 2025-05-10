import ThemeProvider from '@shiflo/ui/theme/ThemeProvider';
import { Route, Router } from 'basic-navigation';

import dayjs from 'dayjs';

import isoWeek from 'dayjs/plugin/isoWeek';
import minMax from 'dayjs/plugin/minMax';

import HomeActivity from '@activities/activity';
import NotFoundActivity from '@activities/error/not-found/activity';
import MyActivity from '@activities/my/activity';
import AddScheduleActivity from '@activities/schedules/add/activity';
import 'dayjs/locale/ko';
import './App.css';

dayjs.locale('ko');
dayjs.extend(minMax);
dayjs.extend(isoWeek);

interface AppProps {
  initPath?: string;
}

function App({ initPath }: AppProps) {
  return (
    <ThemeProvider theme="light">
      <Router initPath={initPath}>
        <Route name="HomeActivity" path="/" activity={<HomeActivity />} />
        <Route name="MyActivity" path="/my" activity={<MyActivity />} />
        <Route
          name="AddScheduleActivity"
          path="/schedules/add"
          activity={<AddScheduleActivity />}
        />
        <Route name="NotFoundActivity" path="/*path" activity={<NotFoundActivity />} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
