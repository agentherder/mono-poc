import { Schema as S } from '@triplit/client';

/**
 * Triplit DB schema
 * - Be careful with schema changes.
 * - Changes must be pushed to the Triplit server.
 * @see https://www.triplit.dev/docs/schemas
 */
export const schema = S.Collections({
  conversations: {
    schema: S.Schema({
      id: S.Id(),
      platform: S.Optional(S.String()),
      service: S.Optional(S.String()),
      url: S.Optional(S.String()),
      title: S.Optional(S.String()),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
  },
  messages: {
    schema: S.Schema({
      id: S.Id(),
      conversationId: S.Id(),
      role: S.String(),
      content: S.String(),
      source: S.Optional(S.String()),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
  },
});
