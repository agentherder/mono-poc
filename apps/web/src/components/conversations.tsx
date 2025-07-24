import { triplit } from '$/triplit/client';
import { useState } from 'react';
import { useQuery } from '@triplit/react';

export function ConversationList() {
  const [text, setText] = useState('');

  const convQuery = useQuery(
    triplit,
    triplit.query('conversations').Order('createdAt', 'DESC'),
  );

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    await triplit.insert('conversations', { title: text });
    setText('');
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Conversations</h2>
      <ul>
        {convQuery.results?.map((conv) => (
          <li key={conv.id}>{conv.title}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a title"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={!text}>
          Create
        </button>
      </form>
    </div>
  );
}
