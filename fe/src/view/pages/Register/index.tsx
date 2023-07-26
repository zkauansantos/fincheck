import Input from "../../components/Input";
import Button from "../../components/Button";
import AuthForm from "../../components/AuthForm";

import useRegisterController from "./useRegisterController";

export default function Login() {
  const { errors, isLoading, handleSubmit, register } = useRegisterController();

  return (
    <AuthForm
      title='Crie sua conta'
      subtitle={["Já possui uma conta ?", "Fazer Login"]}
      linkTo='/login'
    >
      <form className='mt-[60px] flex flex-col gap-4' onSubmit={handleSubmit}>
        <Input
          placeholder='Nome'
          {...register("name")}
          error={errors.name?.message}
        />

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
          Criar conta
        </Button>
      </form>
    </AuthForm>
  );
}
