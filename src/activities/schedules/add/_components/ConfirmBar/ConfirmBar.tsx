import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import { useNavigation } from 'basic-navigation';

function ConfirmBar() {
  const navigation = useNavigation();

  const handleClick = () => navigation.back();

  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      gap="100"
      p="400"
      css={({
        theme: {
          palette: { common }
        }
      }) => ({
        marginTop: 'auto',
        position: 'sticky',
        bottom: 0,
        backgroundColor: common.background,
        boxShadow: `${common.background} 0px -24px 24px 0px`
      })}
    >
      <Button
        color="secondary"
        size="large"
        onClick={handleClick}
        css={{
          flex: 1
        }}
      >
        취소
      </Button>
      <Button
        size="large"
        onClick={handleClick}
        css={{
          flex: 1
        }}
      >
        등록
      </Button>
    </Box>
  );
}

export default ConfirmBar;
