import { PermissionsBitField } from 'discord.js';
import { toolText } from '#/commons/tool-response.helpers';

export async function listPermissionFlagsHandler() {
	const flags = Object.keys(PermissionsBitField.Flags);
	return toolText(JSON.stringify(flags));
}
