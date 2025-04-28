import { Card, CardHeader } from '@/components/ui/card.tsx';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';

export default function HeaderCard() {
  const [date, setDate] = useState<Date>();

  return (
    <>
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] w-50 justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button>Add</Button>
        </CardHeader>
      </Card>
    </>
  );
}
