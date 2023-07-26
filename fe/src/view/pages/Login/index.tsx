import Input from "../../components/Input";
import Button from "../../components/Button";
import AuthForm from "../../components/AuthForm";
import useLoginController from "./useLoginController";

export default function Login() {
  const { handleSubmit, register, errors, isLoading } = useLoginController();

  return (
    <AuthForm
      title='Entre em sua conta'
      subtitle={["Novo por aqui?", "Crie uma conta"]}
      linkTo='/register'
    >
      <form className='mt-[60px] flex flex-col gap-4' onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='E-mail'
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type='password'
          placeholder='Senha'
          {...register("password")}
          error={errors.password?.message}
        />

        <Button type='submit' className='mt-2' isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </AuthForm>
  );
}
