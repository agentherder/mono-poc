import { createFileRoute } from '@tanstack/react-router';
import { Shared } from '$/lib/shared';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h1>Welcome</h1>
      <Shared />
    </div>
  );
}
