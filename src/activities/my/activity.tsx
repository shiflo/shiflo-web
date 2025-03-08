import { SlideScreen, useNavigation } from 'basic-navigation';

function MyActivity() {
  const { back } = useNavigation();

  const handleClick = () => back();

  return (
    <SlideScreen>
      <h1
        style={{
          marginTop: 'env(safe-area-inset-top)'
        }}
      >
        My Activity
      </h1>
      <button onClick={handleClick}>Back to HomeActivity</button>
    </SlideScreen>
  );
}

export default MyActivity;
