import Box from '@shiflo/ui/Box';
import TextField from '@shiflo/ui/TextField';

function ContentField() {
  return (
    <Box as="section" display="flex" alignItems="center" gap="100" mt="200" pl="400" pr="400">
      <TextField fullWidth size="large" placeholder="일정 내용" />
    </Box>
  );
}

export default ContentField;
