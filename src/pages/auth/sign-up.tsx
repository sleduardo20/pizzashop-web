import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signUpForm = z.object({
  restourantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();
  const methods = useForm<SignUpForm>();

  async function handleSignUp(data: SignUpForm) {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Restaurante cadastrado com sucesso.', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      });
    } catch {
      toast.error('Erro ao cadastrar restaurante.');
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <Button variant="outline" asChild className="absolute right-8 top-8">
        <Link to="/sign-in" className="">
          Fazer login
        </Link>
      </Button>
      <div className="p-8">
        <div className="flex w-[350] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Criar conta gratis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form
            onSubmit={methods.handleSubmit(handleSignUp)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="restourantName">Nome do estabelecimento</Label>
              <Input
                id="restourantName"
                type="text"
                {...methods.register('restourantName')}
              ></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...methods.register('managerName')}
              ></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input
                id="email"
                type="email"
                {...methods.register('email')}
              ></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input
                id="phone"
                type="tel"
                {...methods.register('phone')}
              ></Input>
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={methods.formState.isSubmitting}
            >
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, voce concorda com o nosso{' '}
              <a className="underline underline-offset-1" href="#">
                termo de servico
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-1" href="#">
                politicas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
