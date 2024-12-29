export default defineNuxtPlugin(() => {
  if (import.meta.client && import.meta.dev && import.meta.hot) {
    const reload = () =>
      reloadNuxtApp({
        path: window.location.pathname,
        force: true,
      });
    const socket = new WebSocket("ws://localhost:4000/ws");
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "update") reload();
    });
    import.meta.hot.on("vite:beforeUpdate", reload);
  }
});
