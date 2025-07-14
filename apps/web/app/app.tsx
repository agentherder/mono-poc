import { Hello } from '@/hello';
import { HelloShared } from '$/hello-shared';

export function App() {
  return (
    <div>
      <div>Hello web!</div>
      <Hello />
      <HelloShared />
    </div>
  );
}

export default App;
