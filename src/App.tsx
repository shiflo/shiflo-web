import { Navigate, Navigator } from 'basic-navigation';

import ResetStyle from 'basic-styled/setup/ResetStyle';

import HomeActivity from '@activities/activity';
import NotFoundActivity from '@activities/error/not-found/activity';
import MyActivity from '@activities/my/activity';

interface AppProps {
  initPath?: string;
}

function App({ initPath }: AppProps) {
  return (
    <>
      <ResetStyle />
      <Navigator initPath={initPath}>
        <Navigate name="HomeActivity" path="/">
          <HomeActivity />
        </Navigate>
        <Navigate name="MyActivity" path="/my">
          <MyActivity />
        </Navigate>
        <Navigate name="NotFoundActivity" path="/*path">
          <NotFoundActivity />
        </Navigate>
      </Navigator>
    </>
  );
}

export default App;
