import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signInForm = z.object({
  email: z.string().email(),
});

type SigInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const methods = useForm<SigInForm>();

  async function handleSignIn(data: SigInForm) {
    console.log(data);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Eviamos um link de autenticacao para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      });
    } catch {
      toast.error('Credenciais invalidas.');
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[350] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form
            onSubmit={methods.handleSubmit(handleSignIn)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input
                id="email"
                type="email"
                {...methods.register('email')}
              ></Input>
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={methods.formState.isSubmitting}
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
