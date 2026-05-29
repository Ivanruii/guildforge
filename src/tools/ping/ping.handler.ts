import { toolText } from '#/commons/tool-response.helpers';

export async function pingHandler() {
	return toolText('pong');
}
