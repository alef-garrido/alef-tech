import { supabase } from './supabase';
import { ConversationData, SavedMessage } from '../../types';

export const getConversation = async (flowId: string, sessionId: string): Promise<ConversationData | null> => {
  const { data, error } = await supabase
    .from('conversations')
    .select('flow_id, session_id, messages, last_updated')
    .eq('flow_id', flowId)
    .eq('session_id', sessionId)
    .limit(1);

  if (error) {
    console.error('Error getting conversation:', error);
    return null;
  }

  if (data && data.length > 0) {
    const conversation = data[0];
    return {
      flowId: conversation.flow_id,
      sessionId: conversation.session_id,
      messages: conversation.messages as SavedMessage[],
      lastUpdated: new Date(conversation.last_updated).getTime(),
    };
  }

  return null;
};

export const saveConversation = async (conversation: ConversationData): Promise<boolean> => {
  const { flowId, sessionId, messages, lastUpdated } = conversation;
  const { error } = await supabase
    .from('conversations')
    .upsert(
      {
        flow_id: flowId,
        session_id: sessionId,
        messages: messages as any, // Supabase expects JSONB, which is compatible with array of objects
        last_updated: new Date(lastUpdated).toISOString(),
      },
      { onConflict: 'flow_id,session_id' }
    );

  if (error) {
    console.error('Error saving conversation:', error);
    return false;
  }

  return true;
};

export const deleteConversation = async (flowId: string, sessionId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('flow_id', flowId)
    .eq('session_id', sessionId);

  if (error) {
    console.error('Error deleting conversation:', error);
    return false;
  }

  return true;
};