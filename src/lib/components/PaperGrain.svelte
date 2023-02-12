<div class="paper-scrollable">
	<div class="paper-container">
		<slot />
		<div class="paper-overlay" />
	</div>
</div>

<style>
	.paper-scrollable {
		overflow-y: auto;
		height: 100vh;
		height: 100dvh;
	}
	.paper-container {
		position: relative;
		min-height: 100%;
	}
</style>
