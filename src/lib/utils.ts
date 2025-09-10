// src/lib/utils.ts - Utility functions
export function cleanTitle(title: string): string {
    // Remove emoji and clean up title for display
    return title
        .replace(/^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // Remove emojis
        .replace(/^[^\w\s]+/, '') // Remove leading non-word characters
        .trim(); // Remove extra whitespace
}

export function extractEmoji(title: string): string | null {
    // Extract emoji from the beginning of title
    const emojiMatch = title.match(/^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u);
    return emojiMatch ? emojiMatch[0] : null;
}

export function formatTitle(title: string): { cleanTitle: string; emoji: string | null } {
    return {
        cleanTitle: cleanTitle(title),
        emoji: extractEmoji(title)
    };
}