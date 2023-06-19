<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let file: File;
	export let preview: string;

	const dispatch = createEventDispatcher();
	let showFullFilename = false;

	function removeFile() {
		dispatch('remove');
	}

	function toggleFullFilename() {
		showFullFilename = !showFullFilename;
	}
</script>

<div>
	<div class="image-container">
		<img src={preview} alt={file.name} />
		<div class="overlay" on:mouseenter={toggleFullFilename} on:mouseleave={toggleFullFilename}>
			<div class="filename" class:show-full={showFullFilename}>{file.name}</div>
			<button class="remove-button" on:click={removeFile}>
				<span class="remove-icon">&#10005;</span>
			</button>
		</div>
	</div>
</div>

<style>
	.image-container {
		position: relative;
		display: inline-block;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		overflow: hidden;
		transition: background-color 0.2s;
	}

	.filename {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 1rem;
		margin-bottom: 0.2rem;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 0.2rem;
	}

	.show-full {
		white-space: normal;
		text-overflow: initial;
	}

	.remove-button {
		position: absolute;
		top: 0;
		right: 0;
		width: 2rem;
		height: 2rem;
		background-color: darkred;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		cursor: pointer;
	}

	.remove-icon {
		color: white;
		font-size: 1.2rem;
		line-height: 0;
		font-weight: bold;
	}
</style>
