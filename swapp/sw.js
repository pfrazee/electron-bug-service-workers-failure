self.addEventListener('install', () => {
  console.log('installed')
})

self.addEventListener('fetch', e => {
  console.log('fetch', e)
  e.respondWith(new Response('Hello, world!'))
})