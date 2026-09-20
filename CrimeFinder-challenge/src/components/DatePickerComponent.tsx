import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface datePickerProps {
  datePickerValue: dayjs.Dayjs | null
  onChange: (value: dayjs.Dayjs | null) => void
}

export function DatePickerComponent({ datePickerValue, onChange}: datePickerProps) {
  
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            openTo="month"
            views={['year', 'month']}
            value={datePickerValue}
            onChange={onChange}
          />
      </LocalizationProvider>

      {datePickerValue && datePickerValue.isAfter(dayjs()) &&
        <p>This date is in the future and precrime was only a thing in Minority Report.</p>
      }
    </>
  );
}
