<script lang="ts">
	import UploadIcon from '../components/UploadIcon.svelte';

	let files: File[] = [];
	let isDragging = false;

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		const fileList = event.dataTransfer?.files;
		if (fileList) {
			files = Array.from(fileList);
		}
		isDragging = false;
	}

	function handleDragEnter(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
	}

	function handleBrowseClick() {
		const input = document.getElementById('file-input');
		input?.click();
	}

	function handleFileInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const fileList = input.files;
		if (fileList) {
			files = Array.from(fileList);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			handleBrowseClick();
		}
	}
</script>

<div
	class="drop-area {isDragging ? 'drag-over' : ''}"
	id="drop-area"
	on:drop={handleDrop}
	on:dragenter={handleDragEnter}
	on:dragleave={handleDragLeave}
	on:click={handleBrowseClick}
	on:keydown={handleKeyDown}
	tabindex="-1"
>
	{#if !isDragging}
		{#if !(files.length > 0)}
			<UploadIcon />
		{/if}
		<p>Drag and drop files here</p>
	{/if}
	{#each files as file (file.name)}
		<div class="file-name">{file}</div>
	{/each}
</div>

<input type="file" id="file-input" on:change={handleFileInput} multiple />

<style>
	.drop-area {
		border: 2px dashed #ccc;
		padding: 20px;
		text-align: center;
		cursor: pointer;
	}

	.file-name {
		margin-top: 10px;
	}

	.drop-area.drag-over {
		border-color: blue;
	}

	/* Hide the default file input style */
	input[type='file'] {
		display: none;
	}
</style>
