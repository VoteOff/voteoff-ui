class TokenStorage {
	localStorageKey: string;

	constructor(localStorageKey: string) {
		this.localStorageKey = localStorageKey;
	}

	tokens(): Record<string, string> | null {
		const existingTokensString = localStorage.getItem(this.localStorageKey);
		if (!existingTokensString) return null;

		const existingHostTokens: Record<string, string> = JSON.parse(existingTokensString);
		return existingHostTokens;
	}

	saveToken(eventID: number, token: string) {
		const existingTokensString = localStorage.getItem(this.localStorageKey);
		const existingTokens: Record<string, string> = existingTokensString
			? JSON.parse(existingTokensString)
			: {};
		existingTokens[eventID] = token;
		localStorage.setItem(this.localStorageKey, JSON.stringify(existingTokens));
	}

	getToken(eventID: number): string {
		const tokens = this.tokens();
		if (!tokens) return '';
		return tokens[eventID] || '';
	}
}

export const hostTokenStorage = new TokenStorage('host-tokens');
export const voterTokenStorage = new TokenStorage('voter-tokens');
