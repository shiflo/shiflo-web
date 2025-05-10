import { type PropsWithChildren, useState } from 'react';

import dayjs, { type Dayjs } from 'dayjs';

import TimeContext from '@activities/_providers/TimeProvider/TimeContext';

interface TimeProviderProps {
  initialDate?: Dayjs;
  initialMode?: 'month' | 'week';
}

export default function TimeProvider({
  initialDate = dayjs(),
  initialMode = 'month',
  children
}: PropsWithChildren<TimeProviderProps>) {
  const [offset, setOffset] = useState(0);
  const [mode, setMode] = useState<'month' | 'week'>(initialMode);

  const baseDate = initialDate.add(offset, mode);

  return (
    <TimeContext.Provider value={{ baseDate, mode, setOffset, setMode }}>
      {children}
    </TimeContext.Provider>
  );
}
