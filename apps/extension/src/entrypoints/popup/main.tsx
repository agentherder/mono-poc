import { Shared } from '$/lib/shared';
import { Hello } from '@/components/hello';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { toggleSidePanel } from '../../utils/sidepanel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <div className="flex flex-col gap-4 p-4">
      <div>Hello popup!</div>
      <Hello />
      <Shared />
      <button onClick={toggleSidePanel}>Toggle Sidepanel</button>
    </div>
  </StrictMode>,
);
