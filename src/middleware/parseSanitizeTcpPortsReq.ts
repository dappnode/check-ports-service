import { Console } from 'console';
import { Request } from 'express';
import { HttpError } from '../Errors/httpError';

export function parseSanitizeTcpPortsReq(req: Request) {
	if (req.query.tcpPorts && typeof req.query.tcpPorts === 'string') {
		const tcpPortsSanitized = tcpPortsIsArrayOfNumbers(req.query.tcpPorts.split(','));
		return tcpPortsSanitized;
	}
	throw new HttpError('Bad query parameters', 400);
}

function tcpPortsIsArrayOfNumbers(tcpPorts: string[]) {
	const tcpPortsSanitized = tcpPorts.map((tcpPort) => parseInt(tcpPort));
	if (tcpPortsSanitized.some((tcpPort) => isNaN(tcpPort))) throw new HttpError('Ports must be numbers', 400);

	return tcpPortsSanitized;
}
