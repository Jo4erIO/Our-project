export async function login(email: string, password: string) {
  console.log('[login] email:', email, 'password:', password); // временно, чтобы избежать ошибки
  await new Promise(r => setTimeout(r, 300));
  return { token: 'fake', user: { id: 1, email } };
}

export async function register(email: string, password: string) {
  console.log('[register] email:', email, 'password:', password);
  await new Promise(r => setTimeout(r, 500));
  return { token: 'fake-jwt-token', user: { id: 2, email } };
}

export function logout() {
  localStorage.removeItem('token');
}