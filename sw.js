self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
	// This event is required to make the service worker functional
});

// Background sync logic
self.addEventListener('sync', (event) => {
	if (event.tag === 'increment-count') {
		event.waitUntil(incrementCount());
	}
});

async function incrementCount() {
	// Find all clients (open pages) and send a message to increment the count
	const allClients = await self.clients.matchAll({ includeUncontrolled: true });
	for (const client of allClients) {
		client.postMessage({ type: 'UPDATE_COUNT' });
	}
}

// Periodic background task
setInterval(() => {
	incrementCount();
}, 1000);
