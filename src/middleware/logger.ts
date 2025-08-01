export const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  const log = {
    type: action.type,
    payload: action.payload,
    timestamp: new Date().toISOString(),
  };
  // Store or display logs in a custom logger (not console)
  // Save to localStorage as an example
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(log);
  localStorage.setItem('logs', JSON.stringify(logs));

  return next(action);
}; 