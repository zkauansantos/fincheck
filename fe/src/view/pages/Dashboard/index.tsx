import useAuth from "../../../app/hooks/useAuth";
import Button from "../../components/Button";

export default function Dashboard() {
  const { signout } = useAuth();

  return (
    <div>
      <p>Dashboard</p>

      <Button onClick={signout}>Sair</Button>
    </div>
  );
}
