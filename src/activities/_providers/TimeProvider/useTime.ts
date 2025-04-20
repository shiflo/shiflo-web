import { useContext } from 'react';

import TimeContext from '@activities/_providers/TimeProvider/TimeContext';

export default function useTime() {
  return useContext(TimeContext);
}
