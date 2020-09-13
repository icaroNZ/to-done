type FunctionVoid = () => void;
async function onSignal(signal: number, callback: FunctionVoid) {
  for await (const _ of Deno.signal(signal)) {
    callback();
  }
}

function startListeningForTerminationSignal(controller: any) {
  onSignal(Deno.Signal.SIGINT, () => {
    controller.abort();
  });
  onSignal(Deno.Signal.SIGTERM, () => {
    controller.abort();
  });
  onSignal(Deno.Signal.SIGQUIT, () => {
    controller.abort();
  });
}

export default startListeningForTerminationSignal;
