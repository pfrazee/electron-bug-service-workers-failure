window.addEventListener('load', function() {
  navigator.serviceWorker.register('/sw.js', {scope: '/sw/'}).then(async (registration) => {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);

    // Fetch from the sw.js
    var res = await fetch('/sw/foo')
    console.log(await res.json())
  }, (err) => {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
});