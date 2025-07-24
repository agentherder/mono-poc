import { useQuery } from '@triplit/react';
import React from 'react';
import { triplit } from '../triplit/client';

export function ConversationList() {
  const [text, setText] = React.useState('');

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            // TODO: fix this weird type error workaround
            setText((e.target as unknown as { value: string }).value)
          }
        />
        <button type="submit" disabled={!text}>
          Create
        </button>
      </form>
    </div>
  );
}
