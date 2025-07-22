import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { toggleSidePanel } from '../../utils/sidepanel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <div className="flex flex-col gap-4 p-4">
      {/* Changed this text to be specific to the side panel */}
      <div>Hello from the side panel!</div>
      <button onClick={toggleSidePanel}>Toggle Sidepanel</button>
    </div>
  </StrictMode>,
);
