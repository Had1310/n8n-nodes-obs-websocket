import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ObsWebsocketApi implements ICredentialType {
	name = 'obsWebsocketApi';
	displayName = 'OBS WebSocket API';
	documentationUrl = 'https://github.com/obsproject/obs-websocket';
	properties: INodeProperties[] = [
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			default: 'localhost',
			placeholder: 'localhost, 192.168.1.100, or example.com',
			description: 'The hostname or IP address (without protocol)',
		},
		{
			displayName: 'Port',
			name: 'port',
			type: 'number',
			default: 4455,
			description: 'The WebSocket port (4455 for local, 443 for wss://)',
		},
		{
			displayName: 'Path',
			name: 'path',
			type: 'string',
			default: '',
			placeholder: '/obs or leave empty',
			description: 'Optional path for the WebSocket endpoint',
		},
		{
			displayName: 'Use Secure Connection (WSS)',
			name: 'secure',
			type: 'boolean',
			default: false,
			description: 'Whether to use WSS (secure WebSocket) instead of WS',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'The WebSocket server password (set in OBS)',
		},
	];
}