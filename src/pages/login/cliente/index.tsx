import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { signInCliente } = useAuth();

  async function handleSignIn(data: any) {
    await signInCliente(data)
  }

  return (
    <>
      <Head>
        Login
      </Head>
      <div className="flex h-screen bg-gray-200">
        <div className="m-auto w-96 bg-white rounded p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Login Cliente</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  {...register('email')}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register('senha')}
                  id="password"
                  name="senha"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-4">
            <p className="text-gray-700 text-sm">
              Ainda não tem uma conta?{' '}
              <Link
                className='text-blue-500'
                href={'/cadastro'}
              >
                Cadastre-se aqui
              </Link>
            </p>
            <p className="text-gray-700 text-sm mt-2">
              É um funcionário?{' '}
              <Link
                className='text-blue-500'
                href={'/login/funcionario'}
              >
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
