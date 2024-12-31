export default defineNuxtPlugin(() => {
  if (import.meta.client && import.meta.dev && import.meta.hot) {
    const reload = () => {
      const iframe = document.querySelector<HTMLIFrameElement>("#__nuxt > iframe")
      if (iframe) {
        const target = iframe.contentWindow?.location.hash.match(/src=([^&]*)/)?.[1]
        if (target) {
          // @ts-expect-error
          iframe.contentWindow?.coreViewer.loadDocument(target);
          return;
        }
      }
      reloadNuxtApp({
        path: window.location.pathname,
        force: true,
      });
    }
    const socket = new WebSocket("ws://localhost:4000/ws");
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "update") reload();
    });
    import.meta.hot.on("vite:beforeUpdate", reload);
  }
});
