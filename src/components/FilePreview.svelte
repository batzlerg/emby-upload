<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let file: File;
	export let preview: string;

	const dispatch = createEventDispatcher();

	function removeFile(event: Event) {
		event.stopPropagation();
		dispatch('remove');
	}
</script>

<div class="file-preview">
	<img src={preview} alt={file.name} />
	<div class="file-name">{file.name}</div>
	<button on:click={removeFile}>Remove</button>
</div>

<style>
	.file-preview {
		display: flex;
		align-items: center;
		margin-top: 10px;
	}

	.file-preview img {
		max-width: 100px;
		max-height: 100px;
		margin-right: 10px;
		object-fit: cover;
	}

	.file-preview .file-name {
		flex-grow: 1;
	}
</style>
