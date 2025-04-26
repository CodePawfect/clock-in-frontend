import { useAuth } from './security/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';

const signInSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  // Initialize the form with react-hook-form
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: SignInSchema) {
    try {
      await handleLogin(values);
      navigate('/worktimes');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error', error);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-9 items-center justify-center pb-20">
      <Label className="text-5xl font-extrabold text-center text-gray-800">
        Clock:In
      </Label>
      <Card className="w-70 md:w-70 lg:w-90 p-7 shadow-lg rounded-2xl">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-1xl">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-1xl">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-3">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
