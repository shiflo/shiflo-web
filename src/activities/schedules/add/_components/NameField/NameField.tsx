import Box from '@shiflo/ui/Box';
import TextField from '@shiflo/ui/TextField';

function NameField() {
  return (
    <Box as="section" display="flex" alignItems="center" gap="100" mt="200" pl="400" pr="400">
      <TextField autoFocus fullWidth size="large" placeholder="일정명" />
    </Box>
  );
}

export default NameField;
