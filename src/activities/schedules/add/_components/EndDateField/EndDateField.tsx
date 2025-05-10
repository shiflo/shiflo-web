import { useRef } from 'react';

import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Typography from '@shiflo/ui/Typography';

function EndDateField() {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputTimeRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.showPicker();

  const handleClickTimeButton = () => inputTimeRef.current?.showPicker();

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
        종료
      </Typography>
      <Box display="flex" alignItems="center" gap="100">
        <Button
          color="secondary"
          size="large"
          css={{
            position: 'relative'
          }}
          onClick={handleClick}
        >
          2025. 05. 10
          <input
            ref={inputRef}
            type="date"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              visibility: 'hidden'
            }}
          />
        </Button>
        <Button
          color="secondary"
          size="large"
          css={{
            position: 'relative'
          }}
          onClick={handleClickTimeButton}
        >
          09:00
          <input
            ref={inputTimeRef}
            type="time"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              visibility: 'hidden'
            }}
          />
        </Button>
      </Box>
    </Box>
  );
}

export default EndDateField;
