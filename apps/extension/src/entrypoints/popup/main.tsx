import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { toggleSidePanel } from '../../utils/sidepanel';
import { Hello } from '@/components/hello';
import { HelloShared } from '$/hello-shared';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <div className="flex flex-col gap-4 p-4">
      <div>Hello popup!</div>
      <Hello />
      <HelloShared />
      <button onClick={toggleSidePanel}>Toggle Sidepanel</button>
    </div>
  </StrictMode>
);
