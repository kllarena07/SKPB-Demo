<script>
	import { enhance } from '$app/forms';
	import toast, { Toaster } from 'svelte-french-toast';

  const handleLogin = () => {
    return async ({ result, update }) => {
      console.log(result)
      switch(result.type) {
        case "success":
            if(result.data.notVerified) {
              toast.error("You must verify your account first.")
              toast("Make sure to check your spam.", {
	              icon: '💡',
              });
              await update({ reset: false })
              break
            }

            toast.success(result.data.message)
            await update({ reset: false })
        break

        case "error":
        case "failure":
            console.log(result)
            toast.error(result.data)
            await update({ reset: false })
          break

        default:
          await update({ reset: false })
      }
    }
  }

  let showPassword = false
</script>

<Toaster />
<main>
  <form method="POST" action="?/login" use:enhance={handleLogin}>
    <div>
      <h1>Sign in</h1>
      <p>Login to get the full app experience</p>
    </div>
    <input id="email" name="email" type="email" placeholder="Email" />
    <div id="password-container">
      <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Password" />
      <a href='/reset-password'>Forgot password?</a>
    </div>
    <div>
      <input id="show-password" name="show-password" type="checkbox" bind:checked={showPassword} />
      <label for="show-password">Show password</label>
    </div>
    <button type="submit">SIGN IN</button>
  </form>
  <p>Don't have an account? <a href='/register'>Register</a></p>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100dvh;
    gap: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    gap: 1rem;
    box-shadow: 0 1px 3px 3px hsla(206, 6%, 25%, 0.149);
    border-radius: .25rem;
  }

  #password-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  #email, #password {
    width: 300px;
    padding: .5rem;
  }

  button[type="submit"] {
    cursor: pointer;
    padding: .75rem 1rem;
    border-radius: 3rem;
    border: none;
    color: white;
    font-weight: bold;
    background-color: hsl(251, 75%, 50%);
  }
</style>