import { Shared } from '$/lib/shared';
import { ConversationList } from '$/components/conversations';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold text-red-500">Welcome</h1>
      <Shared />
      <ConversationList />
    </div>
  );
}
