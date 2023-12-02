<script>
	import { enhance } from "$app/forms";
	import { toast, Toaster } from "svelte-french-toast";

  const handlePasswordReset = () => {
    return async ({ result, update }) => {
      console.log(result)
      switch(result.type) {
        case "success":
            toast.success("An email has been sent to reset your password.")
            await update()
        break

        case "error":
        case "failure":
            console.log(result)
            toast.error(result.data)
            await update()
          break

        default:
          await update()
      }
    }
  }
</script>

<Toaster />
<main>
  <form method="POST" action="?/resetPassword" use:enhance={handlePasswordReset}>
    <div>
      <h1>Password reset</h1>
      <p>Request a password reset</p>
    </div>
    <input required id="email" name="email" type="email" placeholder="Email" />
    <button type="submit">REQUEST RESET PASSWORD</button>
    <a href='/'>Back to Sign in</a>
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

  #email {
    width: 300px;
    padding: .5rem;
  }

  form a {
    color: black;
    text-align: center;
    text-decoration: none;
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