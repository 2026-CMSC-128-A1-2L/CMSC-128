function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form action="/api/v1/auth/google/student" method="GET">
        <button type="submit">Login with Google</button>
      </form>
    </div>
  );
}

export default Login;
