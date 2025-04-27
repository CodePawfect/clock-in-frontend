import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function HeaderCard() {
  return (
    <>
      <Card className="@container/card">
        <div className="flex flex-row justify-between items-center">
          <CardHeader className="flex-1">
            <CardDescription>Your Worktimes</CardDescription>
            <CardTitle className="@[250px]/card:text-2xl @[500px]/card:text-3xl">
              2025
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row flex-1">
            <ChevronLeftIcon className="h-5 w-5" />
            <span>cw 14</span>
            <ChevronRightIcon className="h-5 w-5" />
          </CardContent>
          <CardFooter>
            <Button>Add</Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
