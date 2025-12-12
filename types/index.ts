export type project = {
    title: string;
    description: string;
    tech: string[];
    src: string;
    image: string;
    featured: boolean;
    videoUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    color: string;
};

export interface SavedMessage {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: number;
}

export interface ConversationData {
    flowId: string;
    messages: SavedMessage[];
    lastUpdated: number;
    sessionId: string;
}