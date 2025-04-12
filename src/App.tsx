import ThemeProvider from '@shiflo/ui/theme/ThemeProvider';
import { Route, Router } from 'basic-navigation';

import createBuilder from 'basic-styled/setup/createBuilder';

import HomeActivity from '@activities/activity';
import NotFoundActivity from '@activities/error/not-found/activity';
import MyActivity from '@activities/my/activity';

createBuilder({
  prefix: 'shiflo'
});

interface AppProps {
  initPath?: string;
}

function App({ initPath }: AppProps) {
  return (
    <ThemeProvider theme="light">
      <Router initPath={initPath}>
        <Route name="HomeActivity" path="/" activity={<HomeActivity />} />
        <Route name="MyActivity" path="/my" activity={<MyActivity />} />
        <Route name="NotFoundActivity" path="/*path" activity={<NotFoundActivity />} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
