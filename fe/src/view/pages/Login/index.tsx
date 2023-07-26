import Input from "../../components/Input";
import Button from "../../components/Button";
import AuthForm from "../../components/AuthForm";

export default function Login() {
  return (
    <AuthForm
      title='Entre em sua conta'
      subtitle={["Novo por aqui?", "Crie uma conta"]}
      linkTo='/register'
    >
      <form className='mt-[60px] flex flex-col gap-4 '>
        <Input type='email' placeholder='E-mail' name='email' />
        <Input type='password' placeholder='Senha' name='password' />

        <Button type='submit'>Entrar</Button>
      </form>
    </AuthForm>
  );
}
