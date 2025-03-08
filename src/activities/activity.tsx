import { SlideScreen, useNavigation } from 'basic-navigation';

function HomeActivity() {
  const { push } = useNavigation();

  const handleClick = () => push('MyActivity');

  return (
    <SlideScreen>
      <h1
        style={{
          marginTop: 'env(safe-area-inset-top)'
        }}
      >
        Home Activity
      </h1>
      <button onClick={handleClick}>Go to MyActivity</button>
    </SlideScreen>
  );
}

export default HomeActivity;
