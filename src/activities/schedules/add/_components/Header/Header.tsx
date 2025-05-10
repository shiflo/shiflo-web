import Box from '@shiflo/ui/Box';
import Typography from '@shiflo/ui/Typography';

function Header() {
  return (
    <Box as="header" p="400">
      <Typography as="h1" variant="heading3" fontWeight={700}>
        새 일정
      </Typography>
    </Box>
  );
}

export default Header;
