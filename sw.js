const page = './index.html';
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const promiseChain = self.registration.showNotification(data.title, data.option).then(()=>{
    console.log('push success');
  }).catch(() => {
    console.log('push fail');
  });
  event.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', function(event) {
  if (event.action) {
    console.log(`Action clicked: '${event.action}'`);
  }else{
    console.log('Notification Click.');
  }

  const promiseChain = clients.openWindow(page);
  event.waitUntil(promiseChain);

});

self.addEventListener('notificationclose', function(event) {
  console.log('Notification Close.');

  const promiseChain = clients.openWindow(page);
  event.waitUntil(promiseChain);
});