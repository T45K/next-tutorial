import { format, parseISO } from 'date-fns';

interface DateProps {
  dateString: string;
}

const Date = (dateProps: DateProps) => {
  const { dateString } = dateProps;
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};

export default Date;
