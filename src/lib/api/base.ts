export class APIBase {
	baseUrl = '/api';

	get = async (endpoint: string) => {
		const response = await fetch(this.baseUrl + endpoint);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	};

	post = async (endpoint: string, json: unknown) => {
		const response = await fetch(this.baseUrl + endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(json)
		});
		return response.json();
	};
}
