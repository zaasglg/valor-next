import { verifyEmailToken } from '@/lib/api';

type Props = { params: { token: string } };

export default async function VerifyEmailPage({ params }: Props) {
  const token = params.token;

  const { ok, status, data } = await verifyEmailToken(token);

  const title = ok ? 'Email verificado' : 'No se pudo verificar el email';
  const message = ok
    ? 'Tu email fue verificado con éxito. Ya puedes iniciar sesión.'
    : (data?.error as string) ||
      (data?.message as string) ||
      `Error al verificar el email (código ${status}).`;

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-10">
      {/* Optional auto-redirect to /login after 3s on success */}
      {ok && (
        // Note: meta refresh is acceptable here for a lightweight redirect.
        // Alternatively, switch to a client component and use useRouter().push('/login').
        <meta httpEquiv="refresh" content="3; url=/login" />
      )}
      <div className="w-full max-w-xl rounded-lg bg-white shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-gray-700">{message}</p>
        <div className="mt-6">
          <a href="/login" className="text-blue-600 underline">
            Ir a iniciar sesión
          </a>
        </div>
      </div>
    </main>
  );
}
