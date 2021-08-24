const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('jquery', () => {
  const script = document.createElement('script');
  document.body.appendChild(script);
  script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
});

contextBridge.exposeInMainWorld('popper', () => {
  const script = document.createElement('script');
  document.body.appendChild(script);
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js";
});

contextBridge.exposeInMainWorld('bootstrap', () => {
  const script = document.createElement('script');
  document.body.appendChild(script);
  script.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js";
});