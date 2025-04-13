import type { CSSProperties, PropsWithChildren } from 'react';

import Box from '@shiflo/ui/Box';
import Button from '@shiflo/ui/Button';
import Typography from '@shiflo/ui/Typography';

interface TaskProps {
  color?: string;
  vertical?: boolean;
  style?: CSSProperties;
}

function Task({
  children = 'primary.main',
  color,
  vertical = false,
  style
}: PropsWithChildren<TaskProps>) {
  if (vertical) {
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
          flexDirection: 'column',
          justifyContent: 'flex-start',
          minWidth: '0px',
          backgroundColor: secondary.main
        })}
        style={style}
      >
        <Box
          br="200"
          backgroundColor={(color as 'primary.main') || 'primary.main'}
          css={{
            width: '100%',
            height: '2px'
          }}
        />
        <Typography as="p" variant="small2" fontWeight={700} color="text.primary" lineClamp={2}>
          {children}
        </Typography>
      </Button>
    );
  }

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
      style={style}
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
