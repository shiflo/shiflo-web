import Box from '@shiflo/ui/Box';
import Switch from '@shiflo/ui/Switch';
import Typography from '@shiflo/ui/Typography';

function AllDayField() {
  return (
    <Box
      as="section"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="100"
      mt="200"
      pl="400"
      pr="400"
    >
      <Typography variant="body1" fontWeight={500}>
        하루 종일
      </Typography>
      <Switch size="large" />
    </Box>
  );
}

export default AllDayField;
