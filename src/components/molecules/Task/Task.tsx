import type { PropsWithChildren } from 'react';

import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Typography from '@shiflo/ui/Typography';

interface TaskProps {
  start: number;
  end: number;
  color?: string;
}

function Task({ children, color, start = 0, end = 1 }: PropsWithChildren<TaskProps>) {
  return (
    <Button
      variant="text"
      size="xSmall"
      color="secondary"
      css={({
        theme: {
          palette: { secondary }
        }
      }) => ({
        justifyContent: 'flex-start',
        minWidth: '0px',
        backgroundColor: secondary.main
      })}
      style={{
        gridColumn: `${start + 1} / span ${end}`
      }}
    >
      <Box
        br="200"
        backgroundColor={(color as 'primary.main') || 'primary.main'}
        css={{
          width: '2px',
          minWidth: '2px',
          height: '100%'
        }}
      />
      <Typography as="p" variant="small2" fontWeight={700} color="text.primary" noWrap>
        {children}
      </Typography>
    </Button>
  );
}

export default Task;
