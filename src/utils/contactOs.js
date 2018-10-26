const webAction = (args) => {
  try {
    window.webkit.messageHandlers.webAction.postMessage(args);
  } catch (error) {
    console.log(`window.webkit.messageHandlers.hello.postMessage('${args}')`);
    console.log('WKWebView post message');
  }
};

const OsAction = (args) => args;

export {webAction, OsAction};
