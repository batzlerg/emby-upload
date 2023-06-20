<script lang="ts">
	import { setJWT } from '../../utils/jwt';
	import type { ActionData } from './$types';

	export let form: ActionData;

	console.log(form);

	if (form?.success) {
		setJWT(form.token);
	}
</script>

<div>
	<h1>Login</h1>
	{#if form?.success}
		<div>Loading...</div>
	{:else}
		<form method="POST">
			{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
			<label>
				Username:
				<input name="username" type="text" required />
			</label>
			<label>
				Password:
				<input name="password" type="password" required />
			</label>
			<button type="submit">Log In</button>
		</form>
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100px;
	}

	h1 {
		margin-bottom: 20px;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 10px;
	}

	input {
		margin-bottom: 10px;
	}
</style>
