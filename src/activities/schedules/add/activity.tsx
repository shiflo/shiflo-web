import { AppScreen } from 'basic-navigation';

import AllDayField from '@activities/schedules/add/_components/AllDayField/AllDayField';
import ConfirmBar from '@activities/schedules/add/_components/ConfirmBar/ConfirmBar';
import ContentField from '@activities/schedules/add/_components/ContentField/ContentField';
import EndDateField from '@activities/schedules/add/_components/EndDateField/EndDateField';
import Header from '@activities/schedules/add/_components/Header/Header';
import NameField from '@activities/schedules/add/_components/NameField/NameField';
import StartDateField from '@activities/schedules/add/_components/StartDateField/StartDateField';

function AddScheduleActivity() {
  return (
    <AppScreen>
      <Header />
      <NameField />
      <ContentField />
      <StartDateField />
      <EndDateField />
      <AllDayField />
      <ConfirmBar />
    </AppScreen>
  );
}

export default AddScheduleActivity;
