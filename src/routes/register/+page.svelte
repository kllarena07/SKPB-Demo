<script>
	import { enhance } from '$app/forms';
	import toast, { Toaster } from 'svelte-french-toast';

  const handleRegister = () => {
    return async ({ result, update }) => {
      console.log(result)
      switch(result.type) {
        case "success":
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
</script>

<Toaster />
<main>
  <form method="POST" action="?/register" use:enhance={handleRegister}>
    <div>
      <h1>Register</h1>
      <p>Create an account</p>
    </div>
    <input required id="name" name="name" type="text" placeholder="Name" />
    <input required id="email" name="email" type="email" placeholder="Email" />
    <input required id="password" name="password" type="password" placeholder="Password" />
    <input required id="passwordConfirm" name="passwordConfirm" type="password" placeholder="Confirm password" />
    <button type="submit">REGISTER</button>
  </form>
  <p>Already an account? <a href='/'>Sign in</a></p>
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

  input {
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