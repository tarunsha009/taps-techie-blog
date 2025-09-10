// src/lib/github.ts - GitHub API integration
export interface GitHubFile {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    content?: string;
    encoding?: string;
}

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // Optional for public repos
const GITHUB_OWNER = 'tarunsha009'; // Your GitHub username
const GITHUB_REPO = 'taps-techie-blog'; // Your repo name
const POSTS_PATH = 'public/content/posts'; // Path to your posts

class GitHubCMS {
    private baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
    private headers: HeadersInit;

    constructor() {
        this.headers = {
            'Accept': 'application/vnd.github.v3+json',
            ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
        };
    }

    // Get all markdown files from the posts directory
    async getPostFiles(): Promise<GitHubFile[]> {
        try {
            const response = await fetch(`${this.baseUrl}/contents/${POSTS_PATH}`, {
                headers: this.headers,
                next: { revalidate: 60 } // Cache for 1 minute
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const files: GitHubFile[] = await response.json();
            return files.filter(file => file.name.endsWith('.md'));
        } catch (error) {
            console.error('Error fetching post files:', error);
            return [];
        }
    }

    // Get the content of a specific file
    async getFileContent(path: string): Promise<string | null> {
        try {
            const response = await fetch(`${this.baseUrl}/contents/${path}`, {
                headers: this.headers,
                next: { revalidate: 300 } // Cache for 5 minutes
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const file: GitHubFile = await response.json();

            if (file.content && file.encoding === 'base64') {
                return atob(file.content);
            }

            // Fallback to download_url for larger files
            if (file.download_url) {
                const contentResponse = await fetch(file.download_url);
                return await contentResponse.text();
            }

            return null;
        } catch (error) {
            console.error('Error fetching file content:', error);
            return null;
        }
    }

    // Get all posts with their content
    async getAllPosts() {
        const files = await this.getPostFiles();
        const posts = await Promise.all(
            files.map(async (file) => {
                const content = await this.getFileContent(file.path);
                if (!content) return null;

                return {
                    slug: file.name.replace('.md', ''),
                    content,
                    lastModified: new Date().toISOString(), // GitHub doesn't provide this in the basic API
                    path: file.path
                };
            })
        );

        return posts.filter(Boolean);
    }

    // Get a single post by slug
    async getPostBySlug(slug: string) {
        const content = await this.getFileContent(`${POSTS_PATH}/${slug}.md`);
        if (!content) return null;

        return {
            slug,
            content,
            lastModified: new Date().toISOString()
        };
    }
}

export const githubCMS = new GitHubCMS();