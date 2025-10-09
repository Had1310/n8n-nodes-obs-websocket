import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import OBSWebSocket from 'obs-websocket-js';

export class ObsWebsocket implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'OBS WebSocket',
		name: 'obsWebsocket',
		icon: 'file:obs.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"]}} - {{$parameter["operation"]}}',
		description: 'Control OBS Studio via WebSocket',
		defaults: {
			name: 'OBS WebSocket',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'obsWebsocketApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Streaming',
						value: 'streaming',
					},
					{
						name: 'Recording',
						value: 'recording',
					},
					{
						name: 'Virtual Camera',
						value: 'virtualCamera',
					},
					{
						name: 'Scene',
						value: 'scene',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
					{
						name: 'Filter',
						value: 'filter',
					},
					{
						name: 'Transition',
						value: 'transition',
					},
					{
						name: 'Media',
						value: 'media',
					},
					{
						name: 'Text Source',
						value: 'textSource',
					},
					{
						name: 'Hotkey',
						value: 'hotkey',
					},
					{
						name: 'Profile',
						value: 'profile',
					},
					{
						name: 'Screenshot',
						value: 'screenshot',
					},
					{
						name: 'General',
						value: 'general',
					},
				],
				default: 'streaming',
			},

			// ==================== STREAMING ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['streaming'],
					},
				},
				options: [
					{
						name: 'Get Status',
						value: 'getStatus',
						description: 'Get current streaming status',
						action: 'Get streaming status',
					},
					{
						name: 'Start Streaming',
						value: 'start',
						description: 'Start streaming',
						action: 'Start streaming',
					},
					{
						name: 'Stop Streaming',
						value: 'stop',
						description: 'Stop streaming',
						action: 'Stop streaming',
					},
					{
						name: 'Toggle Streaming',
						value: 'toggle',
						description: 'Toggle streaming on/off',
						action: 'Toggle streaming',
					},
				],
				default: 'getStatus',
			},

			// ==================== RECORDING ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['recording'],
					},
				},
				options: [
					{
						name: 'Get Status',
						value: 'getStatus',
						description: 'Get current recording status',
						action: 'Get recording status',
					},
					{
						name: 'Start Recording',
						value: 'start',
						description: 'Start recording',
						action: 'Start recording',
					},
					{
						name: 'Stop Recording',
						value: 'stop',
						description: 'Stop recording',
						action: 'Stop recording',
					},
					{
						name: 'Pause Recording',
						value: 'pause',
						description: 'Pause recording',
						action: 'Pause recording',
					},
					{
						name: 'Resume Recording',
						value: 'resume',
						description: 'Resume recording',
						action: 'Resume recording',
					},
					{
						name: 'Toggle Recording',
						value: 'toggle',
						description: 'Toggle recording on/off',
						action: 'Toggle recording',
					},
				],
				default: 'getStatus',
			},

			// ==================== VIRTUAL CAMERA ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['virtualCamera'],
					},
				},
				options: [
					{
						name: 'Get Status',
						value: 'getStatus',
						description: 'Get virtual camera status',
						action: 'Get virtual camera status',
					},
					{
						name: 'Start Virtual Camera',
						value: 'start',
						description: 'Start the virtual camera',
						action: 'Start virtual camera',
					},
					{
						name: 'Stop Virtual Camera',
						value: 'stop',
						description: 'Stop the virtual camera',
						action: 'Stop virtual camera',
					},
					{
						name: 'Toggle Virtual Camera',
						value: 'toggle',
						description: 'Toggle virtual camera on/off',
						action: 'Toggle virtual camera',
					},
				],
				default: 'getStatus',
			},

			// ==================== SCENE ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['scene'],
					},
				},
				options: [
					{
						name: 'Get Current Scene',
						value: 'getCurrent',
						description: 'Get the current active scene',
						action: 'Get current scene',
					},
					{
						name: 'List Scenes',
						value: 'list',
						description: 'Get a list of all scenes',
						action: 'List all scenes',
					},
					{
						name: 'Set Current Scene',
						value: 'setCurrent',
						description: 'Switch to a specific scene',
						action: 'Set current scene',
					},
				],
				default: 'getCurrent',
			},
			{
				displayName: 'Scene Name',
				name: 'sceneName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['scene'],
						operation: ['setCurrent'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the scene to switch to',
			},

			// ==================== SOURCE ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['source'],
					},
				},
				options: [
					{
						name: 'Get Settings',
						value: 'getSettings',
						description: 'Get settings of a source',
						action: 'Get source settings',
					},
					{
						name: 'Set Visibility',
						value: 'setVisibility',
						description: 'Show or hide a source',
						action: 'Set source visibility',
					},
					{
						name: 'List Sources',
						value: 'list',
						description: 'Get a list of all sources',
						action: 'List all sources',
					},
				],
				default: 'list',
			},
			{
				displayName: 'Source Name',
				name: 'sourceName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['source'],
						operation: ['getSettings', 'setVisibility'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the source',
			},
			{
				displayName: 'Visible',
				name: 'visible',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['source'],
						operation: ['setVisibility'],
					},
				},
				default: true,
				description: 'Whether to show or hide the source',
			},
			{
				displayName: 'Scene Name',
				name: 'sceneNameForSource',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['source'],
						operation: ['setVisibility'],
					},
				},
				default: '',
				description: 'The name of the scene containing the source (optional, uses current scene if empty)',
			},

			// ==================== AUDIO ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['audio'],
					},
				},
				options: [
					{
						name: 'Get Mute Status',
						value: 'getMuteStatus',
						description: 'Check if an audio source is muted',
						action: 'Get mute status',
					},
					{
						name: 'Mute',
						value: 'mute',
						description: 'Mute an audio source',
						action: 'Mute audio source',
					},
					{
						name: 'Unmute',
						value: 'unmute',
						description: 'Unmute an audio source',
						action: 'Unmute audio source',
					},
					{
						name: 'Toggle Mute',
						value: 'toggleMute',
						description: 'Toggle mute on/off',
						action: 'Toggle mute',
					},
					{
						name: 'Get Volume',
						value: 'getVolume',
						description: 'Get the volume of an audio source',
						action: 'Get volume',
					},
					{
						name: 'Set Volume',
						value: 'setVolume',
						description: 'Set the volume of an audio source',
						action: 'Set volume',
					},
				],
				default: 'getMuteStatus',
			},
			{
				displayName: 'Audio Source Name',
				name: 'audioSourceName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['audio'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the audio source (e.g., "Desktop Audio", "Mic/Aux")',
				placeholder: 'Desktop Audio',
			},
			{
				displayName: 'Volume',
				name: 'volume',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['audio'],
						operation: ['setVolume'],
					},
				},
				default: 100,
				typeOptions: {
					minValue: 0,
					maxValue: 100,
					numberStepSize: 1,
				},
				description: 'Volume level in percent (0-100)',
			},

			// ==================== FILTER ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['filter'],
					},
				},
				options: [
					{
						name: 'List Filters',
						value: 'list',
						description: 'Get all filters of a source',
						action: 'List filters',
					},
					{
						name: 'Enable Filter',
						value: 'enable',
						description: 'Enable a filter',
						action: 'Enable filter',
					},
					{
						name: 'Disable Filter',
						value: 'disable',
						description: 'Disable a filter',
						action: 'Disable filter',
					},
					{
						name: 'Toggle Filter',
						value: 'toggle',
						description: 'Toggle filter on/off',
						action: 'Toggle filter',
					},
				],
				default: 'list',
			},
			{
				displayName: 'Source Name',
				name: 'sourceNameForFilter',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['filter'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the source',
			},
			{
				displayName: 'Filter Name',
				name: 'filterName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['filter'],
						operation: ['enable', 'disable', 'toggle'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the filter',
			},

			// ==================== TRANSITION ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['transition'],
					},
				},
				options: [
					{
						name: 'Get Current Transition',
						value: 'getCurrent',
						description: 'Get the current transition',
						action: 'Get current transition',
					},
					{
						name: 'List Transitions',
						value: 'list',
						description: 'Get all available transitions',
						action: 'List transitions',
					},
					{
						name: 'Set Current Transition',
						value: 'setCurrent',
						description: 'Set the current transition',
						action: 'Set current transition',
					},
					{
						name: 'Trigger Transition',
						value: 'trigger',
						description: 'Trigger a studio mode transition',
						action: 'Trigger transition',
					},
				],
				default: 'getCurrent',
			},
			{
				displayName: 'Transition Name',
				name: 'transitionName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['transition'],
						operation: ['setCurrent'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the transition',
			},

			// ==================== MEDIA ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['media'],
					},
				},
				options: [
					{
						name: 'Get Status',
						value: 'getStatus',
						description: 'Get media source status',
						action: 'Get media status',
					},
					{
						name: 'Play',
						value: 'play',
						description: 'Play/unpause media',
						action: 'Play media',
					},
					{
						name: 'Pause',
						value: 'pause',
						description: 'Pause media',
						action: 'Pause media',
					},
					{
						name: 'Restart',
						value: 'restart',
						description: 'Restart media from beginning',
						action: 'Restart media',
					},
					{
						name: 'Stop',
						value: 'stop',
						description: 'Stop media',
						action: 'Stop media',
					},
					{
						name: 'Next',
						value: 'next',
						description: 'Skip to next media',
						action: 'Next media',
					},
					{
						name: 'Previous',
						value: 'previous',
						description: 'Go to previous media',
						action: 'Previous media',
					},
				],
				default: 'getStatus',
			},
			{
				displayName: 'Media Source Name',
				name: 'mediaSourceName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['media'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the media source',
			},

			// ==================== TEXT SOURCE ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['textSource'],
					},
				},
				options: [
					{
						name: 'Set Text',
						value: 'setText',
						description: 'Update text in a text source',
						action: 'Set text',
					},
					{
						name: 'Get Text',
						value: 'getText',
						description: 'Get current text from a text source',
						action: 'Get text',
					},
				],
				default: 'setText',
			},
			{
				displayName: 'Text Source Name',
				name: 'textSourceName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['textSource'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the text source (GDI+ or FreeType2)',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['textSource'],
						operation: ['setText'],
					},
				},
				default: '',
				required: true,
				typeOptions: {
					rows: 4,
				},
				description: 'The text to set',
			},

			// ==================== HOTKEY ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['hotkey'],
					},
				},
				options: [
					{
						name: 'Trigger Hotkey',
						value: 'trigger',
						description: 'Trigger a hotkey by name',
						action: 'Trigger hotkey',
					},
					{
						name: 'List Hotkeys',
						value: 'list',
						description: 'Get all available hotkeys',
						action: 'List hotkeys',
					},
				],
				default: 'trigger',
			},
			{
				displayName: 'Hotkey Name',
				name: 'hotkeyName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['hotkey'],
						operation: ['trigger'],
					},
				},
				default: '',
				required: true,
				placeholder: 'OBSBasic.StartStreaming',
				description: 'The name of the hotkey to trigger',
			},

			// ==================== PROFILE ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['profile'],
					},
				},
				options: [
					{
						name: 'Get Current Profile',
						value: 'getCurrent',
						description: 'Get the current profile',
						action: 'Get current profile',
					},
					{
						name: 'List Profiles',
						value: 'list',
						description: 'Get all available profiles',
						action: 'List profiles',
					},
					{
						name: 'Set Current Profile',
						value: 'setCurrent',
						description: 'Switch to a different profile',
						action: 'Set current profile',
					},
					{
						name: 'Get Scene Collection',
						value: 'getSceneCollection',
						description: 'Get the current scene collection',
						action: 'Get scene collection',
					},
					{
						name: 'List Scene Collections',
						value: 'listSceneCollections',
						description: 'Get all scene collections',
						action: 'List scene collections',
					},
					{
						name: 'Set Scene Collection',
						value: 'setSceneCollection',
						description: 'Switch scene collection',
						action: 'Set scene collection',
					},
				],
				default: 'getCurrent',
			},
			{
				displayName: 'Profile Name',
				name: 'profileName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['profile'],
						operation: ['setCurrent'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the profile',
			},
			{
				displayName: 'Scene Collection Name',
				name: 'sceneCollectionName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['profile'],
						operation: ['setSceneCollection'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the scene collection',
			},

			// ==================== SCREENSHOT ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['screenshot'],
					},
				},
				options: [
					{
						name: 'Take Screenshot',
						value: 'take',
						description: 'Take a screenshot of a source',
						action: 'Take screenshot',
					},
					{
						name: 'Save Screenshot',
						value: 'save',
						description: 'Take and save a screenshot to file',
						action: 'Save screenshot',
					},
				],
				default: 'take',
			},
			{
				displayName: 'Source Name',
				name: 'sourceNameForScreenshot',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['screenshot'],
					},
				},
				default: '',
				required: true,
				description: 'The name of the source to screenshot',
			},
			{
				displayName: 'Image Format',
				name: 'imageFormat',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['screenshot'],
					},
				},
				options: [
					{
						name: 'PNG',
						value: 'png',
					},
					{
						name: 'JPG',
						value: 'jpg',
					},
				],
				default: 'png',
				description: 'The image format',
			},
			{
				displayName: 'File Path',
				name: 'filePath',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['screenshot'],
						operation: ['save'],
					},
				},
				default: '',
				required: true,
				placeholder: '/path/to/screenshot.png',
				description: 'Full path where to save the screenshot',
			},
			{
				displayName: 'Image Width',
				name: 'imageWidth',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['screenshot'],
					},
				},
				default: 1920,
				description: 'Width of the screenshot (optional, -1 for source width)',
			},
			{
				displayName: 'Image Height',
				name: 'imageHeight',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['screenshot'],
					},
				},
				default: 1080,
				description: 'Height of the screenshot (optional, -1 for source height)',
			},

			// ==================== GENERAL ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['general'],
					},
				},
				options: [
					{
						name: 'Get Version',
						value: 'getVersion',
						description: 'Get OBS and WebSocket version info',
						action: 'Get version info',
					},
					{
						name: 'Get Stats',
						value: 'getStats',
						description: 'Get OBS stats (CPU, FPS, etc.)',
						action: 'Get statistics',
					},
					{
						name: 'Get Studio Mode Status',
						value: 'getStudioMode',
						description: 'Check if Studio Mode is enabled',
						action: 'Get studio mode status',
					},
					{
						name: 'Enable Studio Mode',
						value: 'enableStudioMode',
						description: 'Enable Studio Mode',
						action: 'Enable studio mode',
					},
					{
						name: 'Disable Studio Mode',
						value: 'disableStudioMode',
						description: 'Disable Studio Mode',
						action: 'Disable studio mode',
					},
				],
				default: 'getVersion',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('obsWebsocketApi');

		const obs = new OBSWebSocket();
		let host = credentials.host as string;
		const port = credentials.port as number;
		const password = credentials.password as string;
		const path = (credentials.path as string) || '';
		const secure = credentials.secure as boolean;

		// Clean host - remove any protocol or trailing slashes
		let cleanHost = host
			.replace(/^(wss?|https?):\/\//, '')
			.replace(/\/$/, '');

		// Determine protocol
		const protocol = secure ? 'wss' : 'ws';

		// Build WebSocket URL - don't add port for standard ports
		let wsUrl: string;
		if ((protocol === 'wss' && port === 443) || (protocol === 'ws' && port === 80)) {
			wsUrl = `${protocol}://${cleanHost}${path}`;
		} else {
			wsUrl = `${protocol}://${cleanHost}:${port}${path}`;
		}

		try {
			// Connect to OBS
			await obs.connect(wsUrl, password, {
				eventSubscriptions: 0,
			});

			// Process each input item
			for (let i = 0; i < items.length; i++) {
				try {
					const resource = this.getNodeParameter('resource', i) as string;
					const operation = this.getNodeParameter('operation', i) as string;

					let responseData: any = {};

					// ==================== STREAMING ====================
					if (resource === 'streaming') {
						if (operation === 'getStatus') {
							const status = await obs.call('GetStreamStatus');
							responseData = {
								streaming: status.outputActive,
								duration: status.outputDuration || 0,
								timecode: status.outputTimecode || '00:00:00',
								reconnecting: status.outputReconnecting || false,
								bytes: status.outputBytes || 0,
								skippedFrames: status.outputSkippedFrames || 0,
								totalFrames: status.outputTotalFrames || 0,
							};
						} else if (operation === 'start') {
							await obs.call('StartStream');
							responseData = { success: true, message: 'Stream started' };
						} else if (operation === 'stop') {
							await obs.call('StopStream');
							responseData = { success: true, message: 'Stream stopped' };
						} else if (operation === 'toggle') {
							await obs.call('ToggleStream');
							responseData = { success: true, message: 'Stream toggled' };
						}
					}

					// ==================== RECORDING ====================
					else if (resource === 'recording') {
						if (operation === 'getStatus') {
							const status = await obs.call('GetRecordStatus');
							responseData = {
								recording: status.outputActive,
								paused: status.outputPaused || false,
								duration: status.outputDuration || 0,
								timecode: status.outputTimecode || '00:00:00',
								bytes: status.outputBytes || 0,
							};
						} else if (operation === 'start') {
							await obs.call('StartRecord');
							responseData = { success: true, message: 'Recording started' };
						} else if (operation === 'stop') {
							await obs.call('StopRecord');
							responseData = { success: true, message: 'Recording stopped' };
						} else if (operation === 'pause') {
							await obs.call('PauseRecord');
							responseData = { success: true, message: 'Recording paused' };
						} else if (operation === 'resume') {
							await obs.call('ResumeRecord');
							responseData = { success: true, message: 'Recording resumed' };
						} else if (operation === 'toggle') {
							await obs.call('ToggleRecord');
							responseData = { success: true, message: 'Recording toggled' };
						}
					}

					// ==================== VIRTUAL CAMERA ====================
					else if (resource === 'virtualCamera') {
						if (operation === 'getStatus') {
							const status = await obs.call('GetVirtualCamStatus');
							responseData = {
								active: status.outputActive,
							};
						} else if (operation === 'start') {
							await obs.call('StartVirtualCam');
							responseData = { success: true, message: 'Virtual camera started' };
						} else if (operation === 'stop') {
							await obs.call('StopVirtualCam');
							responseData = { success: true, message: 'Virtual camera stopped' };
						} else if (operation === 'toggle') {
							await obs.call('ToggleVirtualCam');
							responseData = { success: true, message: 'Virtual camera toggled' };
						}
					}

					// ==================== SCENE ====================
					else if (resource === 'scene') {
						if (operation === 'getCurrent') {
							const scene = await obs.call('GetCurrentProgramScene');
							responseData = {
								currentScene: scene.currentProgramSceneName,
								sceneUuid: scene.currentProgramSceneUuid,
							};
						} else if (operation === 'list') {
							const scenes = await obs.call('GetSceneList');
							responseData = {
								currentScene: scenes.currentProgramSceneName,
								scenes: scenes.scenes.map((s: any) => ({
									name: s.sceneName,
									uuid: s.sceneUuid,
									index: s.sceneIndex,
								})),
							};
						} else if (operation === 'setCurrent') {
							const sceneName = this.getNodeParameter('sceneName', i) as string;
							await obs.call('SetCurrentProgramScene', { sceneName });
							responseData = { success: true, message: `Switched to scene: ${sceneName}` };
						}
					}

					// ==================== SOURCE ====================
					else if (resource === 'source') {
						if (operation === 'list') {
							const sources = await obs.call('GetInputList');
							responseData = {
								sources: sources.inputs.map((s: any) => ({
									name: s.inputName,
									uuid: s.inputUuid,
									kind: s.inputKind,
									unversionedKind: s.unversionedInputKind,
								})),
							};
						} else if (operation === 'getSettings') {
							const sourceName = this.getNodeParameter('sourceName', i) as string;
							const settings = await obs.call('GetInputSettings', { inputName: sourceName });
							responseData = {
								sourceName: sourceName,
								kind: settings.inputKind,
								settings: settings.inputSettings,
							};
						} else if (operation === 'setVisibility') {
							const sourceName = this.getNodeParameter('sourceName', i) as string;
							const visible = this.getNodeParameter('visible', i) as boolean;
							let sceneNameForSource = this.getNodeParameter('sceneNameForSource', i, '') as string;

							if (!sceneNameForSource) {
								const currentScene = await obs.call('GetCurrentProgramScene');
								sceneNameForSource = currentScene.currentProgramSceneName;
							}

							await obs.call('SetSceneItemEnabled', {
								sceneName: sceneNameForSource,
								sceneItemId: await getSceneItemId(obs, sceneNameForSource, sourceName),
								sceneItemEnabled: visible,
							});
							responseData = {
								success: true,
								message: `Source ${sourceName} ${visible ? 'shown' : 'hidden'} in scene ${sceneNameForSource}`,
							};
						}
					}

					// ==================== AUDIO ====================
					else if (resource === 'audio') {
						const audioSourceName = this.getNodeParameter('audioSourceName', i) as string;

						if (operation === 'getMuteStatus') {
							const muteStatus = await obs.call('GetInputMute', {
								inputName: audioSourceName,
							});
							responseData = {
								sourceName: audioSourceName,
								muted: muteStatus.inputMuted,
							};
						} else if (operation === 'mute') {
							await obs.call('SetInputMute', {
								inputName: audioSourceName,
								inputMuted: true,
							});
							responseData = {
								success: true,
								message: `Audio source "${audioSourceName}" muted`,
								sourceName: audioSourceName,
								muted: true,
							};
						} else if (operation === 'unmute') {
							await obs.call('SetInputMute', {
								inputName: audioSourceName,
								inputMuted: false,
							});
							responseData = {
								success: true,
								message: `Audio source "${audioSourceName}" unmuted`,
								sourceName: audioSourceName,
								muted: false,
							};
						} else if (operation === 'toggleMute') {
							await obs.call('ToggleInputMute', {
								inputName: audioSourceName,
							});
							const newState = await obs.call('GetInputMute', {
								inputName: audioSourceName,
							});
							responseData = {
								success: true,
								message: `Audio source "${audioSourceName}" mute toggled`,
								sourceName: audioSourceName,
								muted: newState.inputMuted,
							};
						} else if (operation === 'getVolume') {
							const volumeInfo = await obs.call('GetInputVolume', {
								inputName: audioSourceName,
							});
							const volumePercent = Math.round(volumeInfo.inputVolumeMul * 100);
							responseData = {
								sourceName: audioSourceName,
								volumePercent: volumePercent,
								volumeDb: volumeInfo.inputVolumeDb,
								volumeMultiplier: volumeInfo.inputVolumeMul,
							};
						} else if (operation === 'setVolume') {
							const volumePercent = this.getNodeParameter('volume', i) as number;
							const volumeMultiplier = volumePercent / 100;

							await obs.call('SetInputVolume', {
								inputName: audioSourceName,
								inputVolumeMul: volumeMultiplier,
							});

							responseData = {
								success: true,
								message: `Audio source "${audioSourceName}" volume set to ${volumePercent}%`,
								sourceName: audioSourceName,
								volumePercent: volumePercent,
								volumeMultiplier: volumeMultiplier,
							};
						}
					}

					// ==================== FILTER ====================
					else if (resource === 'filter') {
						const sourceNameForFilter = this.getNodeParameter('sourceNameForFilter', i) as string;

						if (operation === 'list') {
							const filters = await obs.call('GetSourceFilterList', {
								sourceName: sourceNameForFilter,
							});
							responseData = {
								sourceName: sourceNameForFilter,
								filters: filters.filters.map((f: any) => ({
									name: f.filterName,
									kind: f.filterKind,
									enabled: f.filterEnabled,
									index: f.filterIndex,
								})),
							};
						} else if (operation === 'enable' || operation === 'disable') {
							const filterName = this.getNodeParameter('filterName', i) as string;
							const enabled = operation === 'enable';

							await obs.call('SetSourceFilterEnabled', {
								sourceName: sourceNameForFilter,
								filterName: filterName,
								filterEnabled: enabled,
							});

							responseData = {
								success: true,
								message: `Filter "${filterName}" ${enabled ? 'enabled' : 'disabled'}`,
								sourceName: sourceNameForFilter,
								filterName: filterName,
								enabled: enabled,
							};
						} else if (operation === 'toggle') {
							const filterName = this.getNodeParameter('filterName', i) as string;

							// Get current state
							const currentFilter = await obs.call('GetSourceFilter', {
								sourceName: sourceNameForFilter,
								filterName: filterName,
							});

							const newState = !currentFilter.filterEnabled;

							await obs.call('SetSourceFilterEnabled', {
								sourceName: sourceNameForFilter,
								filterName: filterName,
								filterEnabled: newState,
							});

							responseData = {
								success: true,
								message: `Filter "${filterName}" toggled to ${newState ? 'enabled' : 'disabled'}`,
								sourceName: sourceNameForFilter,
								filterName: filterName,
								enabled: newState,
							};
						}
					}

					// ==================== TRANSITION ====================
					else if (resource === 'transition') {
						if (operation === 'getCurrent') {
							const transition = await obs.call('GetCurrentSceneTransition');
							responseData = {
								transitionName: transition.transitionName,
								transitionKind: transition.transitionKind,
								transitionFixed: transition.transitionFixed,
								transitionDuration: transition.transitionDuration,
							};
						} else if (operation === 'list') {
							const transitions = await obs.call('GetSceneTransitionList');
							responseData = {
								currentTransition: transitions.currentSceneTransitionName,
								transitions: transitions.transitions.map((t: any) => ({
									name: t.transitionName,
									kind: t.transitionKind,
									fixed: t.transitionFixed,
								})),
							};
						} else if (operation === 'setCurrent') {
							const transitionName = this.getNodeParameter('transitionName', i) as string;
							await obs.call('SetCurrentSceneTransition', { transitionName });
							responseData = {
								success: true,
								message: `Transition set to: ${transitionName}`,
							};
						} else if (operation === 'trigger') {
							await obs.call('TriggerStudioModeTransition');
							responseData = {
								success: true,
								message: 'Studio mode transition triggered',
							};
						}
					}

					// ==================== MEDIA ====================
					else if (resource === 'media') {
						const mediaSourceName = this.getNodeParameter('mediaSourceName', i) as string;

						if (operation === 'getStatus') {
							const status = await obs.call('GetMediaInputStatus', {
								inputName: mediaSourceName,
							});
							responseData = {
								sourceName: mediaSourceName,
								mediaState: status.mediaState,
								mediaDuration: status.mediaDuration,
								mediaCursor: status.mediaCursor,
							};
						} else if (operation === 'play') {
							await obs.call('SetMediaInputCursor', {
								inputName: mediaSourceName,
								mediaCursor: 0,
							});
							await obs.call('TriggerMediaInputAction', {
								inputName: mediaSourceName,
								mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY',
							});
							responseData = {
								success: true,
								message: `Media "${mediaSourceName}" playing`,
							};
						} else if (operation === 'pause') {
							await obs.call('TriggerMediaInputAction', {
								inputName: mediaSourceName,
								mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PAUSE',
							});
							responseData = {
								success: true,
								message: `Media "${mediaSourceName}" paused`,
							};
						} else if (operation === 'restart') {
							await obs.call('TriggerMediaInputAction', {
								inputName: mediaSourceName,
								mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART',
							});
							responseData = {
								success: true,
								message: `Media "${mediaSourceName}" restarted`,
							};
						} else if (operation === 'stop') {
							await obs.call('TriggerMediaInputAction', {
								inputName: mediaSourceName,
								mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_STOP',
							});
							responseData = {
								success: true,
								message: `Media "${mediaSourceName}" stopped`,
							};
						} else if (operation === 'next') {
							await obs.call('TriggerMediaInputAction', {
								inputName: mediaSourceName,
								mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_NEXT',
							});
							responseData = {
								success: true,
								message: `Media "${mediaSourceName}" skipped to next`,
							};
						} else if (operation === 'previous') {
							await obs.call('TriggerMediaInputAction', {
								inputName: mediaSourceName,
								mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PREVIOUS',
							});
							responseData = {
								success: true,
								message: `Media "${mediaSourceName}" went to previous`,
							};
						}
					}

					// ==================== TEXT SOURCE ====================
					else if (resource === 'textSource') {
						const textSourceName = this.getNodeParameter('textSourceName', i) as string;

						if (operation === 'setText') {
							const text = this.getNodeParameter('text', i) as string;

							const currentSettings = await obs.call('GetInputSettings', {
								inputName: textSourceName,
							});

							await obs.call('SetInputSettings', {
								inputName: textSourceName,
								inputSettings: {
									...currentSettings.inputSettings,
									text: text,
								},
							});

							responseData = {
								success: true,
								message: `Text updated in "${textSourceName}"`,
								sourceName: textSourceName,
								text: text,
							};
						} else if (operation === 'getText') {
							const settings = await obs.call('GetInputSettings', {
								inputName: textSourceName,
							});

							responseData = {
								sourceName: textSourceName,
								text: settings.inputSettings.text || '',
							};
						}
					}

					// ==================== HOTKEY ====================
					else if (resource === 'hotkey') {
						if (operation === 'trigger') {
							const hotkeyName = this.getNodeParameter('hotkeyName', i) as string;

							await obs.call('TriggerHotkeyByName', {
								hotkeyName: hotkeyName,
							});

							responseData = {
								success: true,
								message: `Hotkey "${hotkeyName}" triggered`,
								hotkeyName: hotkeyName,
							};
						} else if (operation === 'list') {
							const hotkeys = await obs.call('GetHotkeyList');
							responseData = {
								hotkeys: hotkeys.hotkeys,
							};
						}
					}

					// ==================== PROFILE ====================
					else if (resource === 'profile') {
						if (operation === 'getCurrent') {
							const profile = await obs.call('GetProfileParameter', {
								parameterCategory: 'General',
								parameterName: 'Name',
							});
							responseData = {
								currentProfile: profile.parameterValue,
							};
						} else if (operation === 'list') {
							const profiles = await obs.call('GetProfileList');
							responseData = {
								currentProfile: profiles.currentProfileName,
								profiles: profiles.profiles,
							};
						} else if (operation === 'setCurrent') {
							const profileName = this.getNodeParameter('profileName', i) as string;
							await obs.call('SetCurrentProfile', { profileName });
							responseData = {
								success: true,
								message: `Switched to profile: ${profileName}`,
							};
						} else if (operation === 'getSceneCollection') {
							const collection = await obs.call('GetSceneCollectionList');
							responseData = {
								currentSceneCollection: collection.currentSceneCollectionName,
							};
						} else if (operation === 'listSceneCollections') {
							const collections = await obs.call('GetSceneCollectionList');
							responseData = {
								currentSceneCollection: collections.currentSceneCollectionName,
								sceneCollections: collections.sceneCollections,
							};
						} else if (operation === 'setSceneCollection') {
							const sceneCollectionName = this.getNodeParameter('sceneCollectionName', i) as string;
							await obs.call('SetCurrentSceneCollection', { sceneCollectionName });
							responseData = {
								success: true,
								message: `Switched to scene collection: ${sceneCollectionName}`,
							};
						}
					}

					// ==================== SCREENSHOT ====================
					else if (resource === 'screenshot') {
						const sourceNameForScreenshot = this.getNodeParameter('sourceNameForScreenshot', i) as string;
						const imageFormat = this.getNodeParameter('imageFormat', i) as string;
						const imageWidth = this.getNodeParameter('imageWidth', i) as number;
						const imageHeight = this.getNodeParameter('imageHeight', i) as number;

						if (operation === 'take') {
							const screenshot = await obs.call('GetSourceScreenshot', {
								sourceName: sourceNameForScreenshot,
								imageFormat: imageFormat,
								imageWidth: imageWidth > 0 ? imageWidth : undefined,
								imageHeight: imageHeight > 0 ? imageHeight : undefined,
							});

							responseData = {
								success: true,
								sourceName: sourceNameForScreenshot,
								imageData: screenshot.imageData,
								format: imageFormat,
							};
						} else if (operation === 'save') {
							const filePath = this.getNodeParameter('filePath', i) as string;

							await obs.call('SaveSourceScreenshot', {
								sourceName: sourceNameForScreenshot,
								imageFormat: imageFormat,
								imageFilePath: filePath,
								imageWidth: imageWidth > 0 ? imageWidth : undefined,
								imageHeight: imageHeight > 0 ? imageHeight : undefined,
							});

							responseData = {
								success: true,
								message: `Screenshot saved to: ${filePath}`,
								sourceName: sourceNameForScreenshot,
								filePath: filePath,
								format: imageFormat,
							};
						}
					}

					// ==================== GENERAL ====================
					else if (resource === 'general') {
						if (operation === 'getVersion') {
							const version = await obs.call('GetVersion');
							responseData = {
								obsVersion: version.obsVersion,
								obsWebSocketVersion: version.obsWebSocketVersion,
								platform: version.platform,
								platformDescription: version.platformDescription,
							};
						} else if (operation === 'getStats') {
							const stats = await obs.call('GetStats');
							responseData = {
								cpuUsage: stats.cpuUsage,
								memoryUsage: stats.memoryUsage,
								availableDiskSpace: stats.availableDiskSpace,
								activeFps: stats.activeFps,
								averageFrameRenderTime: stats.averageFrameRenderTime,
								renderSkippedFrames: stats.renderSkippedFrames,
								renderTotalFrames: stats.renderTotalFrames,
								outputSkippedFrames: stats.outputSkippedFrames,
								outputTotalFrames: stats.outputTotalFrames,
								webSocketSessionIncomingMessages: stats.webSocketSessionIncomingMessages,
								webSocketSessionOutgoingMessages: stats.webSocketSessionOutgoingMessages,
							};
						} else if (operation === 'getStudioMode') {
							const studioMode = await obs.call('GetStudioModeEnabled');
							responseData = {
								studioModeEnabled: studioMode.studioModeEnabled,
							};
						} else if (operation === 'enableStudioMode') {
							await obs.call('SetStudioModeEnabled', { studioModeEnabled: true });
							responseData = {
								success: true,
								message: 'Studio Mode enabled',
							};
						} else if (operation === 'disableStudioMode') {
							await obs.call('SetStudioModeEnabled', { studioModeEnabled: false });
							responseData = {
								success: true,
								message: 'Studio Mode disabled',
							};
						}
					}

					returnData.push({
						json: responseData,
						pairedItem: { item: i },
					});
				} catch (error) {
					if (this.continueOnFail()) {
						const errorMessage = error instanceof Error ? error.message : String(error);
						returnData.push({
							json: {
								error: errorMessage,
							},
							pairedItem: { item: i },
						});
						continue;
					}
					throw new NodeOperationError(
						this.getNode(),
						error instanceof Error ? error : new Error(String(error)),
					);
				}
			}

			await obs.disconnect();
			return [returnData];
		} catch (error) {
			await obs.disconnect();
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new NodeOperationError(
				this.getNode(),
				`OBS WebSocket connection failed: ${errorMessage}`,
			);
		}
	}
}

// Helper function to get scene item ID
async function getSceneItemId(
	obs: OBSWebSocket,
	sceneName: string,
	sourceName: string,
): Promise<number> {
	const items = await obs.call('GetSceneItemList', { sceneName });
	const item = items.sceneItems.find((i: any) => i.sourceName === sourceName);
	if (!item || item.sceneItemId === null || item.sceneItemId === undefined) {
		throw new Error(`Source "${sourceName}" not found in scene "${sceneName}"`);
	}
	return item.sceneItemId as number;
}