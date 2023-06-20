<script>
	import { redirect } from '@sveltejs/kit';

	export function load() {
		throw redirect(302, '/upload');
	}
</script>
