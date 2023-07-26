import { Link } from "react-router-dom";

interface AuthFormProps {
  title: string;
  subtitle: string[];
  children: React.ReactNode;
  linkTo: string;
}

export default function AuthForm({
  title,
  subtitle,
  children,
  linkTo,
}: AuthFormProps) {
  return (
    <>
      <header className='flex flex-col items-center gap-4 text-center'>
        <h1 className='text-2xl font-bold text-gray-900 tracking-[-1px]'>
          {title}
        </h1>

        <p className='space-x-2'>
          <span className='text-gray-700 tracking-[-0.5px]'>{subtitle[0]}</span>
          <Link
            to={linkTo}
            className='text-teal-900 font-medium tracking-[-0.5px]'
          >
            {subtitle[1]}
          </Link>
        </p>
      </header>

      {children}
    </>
  );
}
