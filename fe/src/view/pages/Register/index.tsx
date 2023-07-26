import Input from "../../components/Input";
import Button from "../../components/Button";
import AuthForm from "../../components/AuthForm";

export default function Login() {
  return (
    <AuthForm
      title='Crie sua conta'
      subtitle={["Já possui uma conta ?", "Fazer Login"]}
      linkTo='/login'
    >
      <form className='mt-[60px] flex flex-col gap-4 '>
        <Input placeholder='Nome' name='name' />
        <Input type='email' placeholder='E-mail' name='email' />
        <Input type='password' placeholder='Senha' name='password' />

        <Button type='submit'>Criar conta</Button>
      </form>
    </AuthForm>
  );
}
