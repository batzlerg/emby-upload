<script lang="ts">
	import FilePreview from '../components/FilePreview.svelte';
	import UploadIcon from '../components/UploadIcon.svelte';

	let files: File[] = [];
	let imagePreviews: string[] = [];
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
			// Generate image previews
			const filePromises = Array.from(fileList).map((file) => {
				return new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = () => {
						resolve(reader.result as string);
					};
					reader.onerror = reject;
					reader.readAsDataURL(file);
				});
			});
			Promise.all(filePromises)
				.then((previews) => {
					imagePreviews = previews;
				})
				.catch((error) => {
					console.error('Failed to generate image previews:', error);
				});
		}
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
			<p>Drag and drop files here</p>
		{/if}
	{/if}
	{#each files as file, i}
		<FilePreview {file} preview={imagePreviews[i]} on:remove={() => handleRemoveFile(i)} />
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
