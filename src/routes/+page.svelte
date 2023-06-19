<script lang="ts">
	import FilePreview from '../components/FilePreview.svelte';
	import UploadIcon from '../components/UploadIcon.svelte';
	import generateImagePreview from '../utils/generateImagePreview';

	let files: File[] = [];
	let imagePreviews: string[] = [];
	let isDragging = false;

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		const fileList = event.dataTransfer?.files;
		if (fileList) {
			files = [...files, ...Array.from(fileList)];
			generateImagePreviews();
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
			files = [...files, ...Array.from(fileList)];
			generateImagePreviews();
		}
	}

	function generateImagePreviews() {
		const filePromises = files.map(generateImagePreview);
		Promise.all(filePromises)
			.then((previews) => {
				imagePreviews = previews;
			})
			.catch((error) => {
				console.error('Failed to generate image previews:', error);
			});
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			handleBrowseClick();
		}
	}

	function handleRemoveFile(index: number) {
		files = files.filter((_, i) => i !== index);
		imagePreviews = imagePreviews.filter((_, i) => i !== index);
	}
</script>

<div class="container">
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
			<UploadIcon />
			<p>Drag and drop or select files</p>
		{/if}
	</div>

	<div class="image-grid">
		{#each files as file, i}
			<FilePreview {file} preview={imagePreviews[i]} on:remove={() => handleRemoveFile(i)} />
		{/each}
	</div>
</div>

<input type="file" id="file-input" on:change={handleFileInput} multiple />

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.drop-area {
		border: 2px dashed #ccc;
		padding: 20px;
		text-align: center;
		cursor: pointer;
		width: 100%;
	}

	.drop-area.drag-over {
		border-color: blue;
	}

	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
		grid-gap: 20px;
		padding: 20px;
		margin: 20px;
		width: 100%;
	}

	/* Hide the default file input style */
	input[type='file'] {
		display: none;
	}
</style>
