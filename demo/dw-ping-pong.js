onmessage = (e) => {
  console.log(`Worker: Received message - ${e.data}`);
  setTimeout(() => {
    let worker = new Worker("dw-sub-ping-pong.js");
    worker.onmessage = (e) =>
      console.log(`Worker: Received from sub worker - ${e.data}`);
    worker.postMessage("PING");
  }, 1000);
  postMessage("PONG");
};
