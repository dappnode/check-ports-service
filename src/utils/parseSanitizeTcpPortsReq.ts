import { Request } from 'express';
import { HttpError } from './httpError';

/**
 * 4 possible use cases:
 * 	1. Only tcpPorts
 * 	2. Only udpPorts
 * 	3. tcpPorts and udpPorts
 * 	4. Error
 */
export function parseSanitizePortsReq(req: Request): { tcpPorts?: number[]; udpPorts?: number[] } {
	return {
		tcpPorts: req.query.tcpPorts ? parseSanitizePortsArray(req.query.tcpPorts, 'tcpPorts') : [],
		udpPorts: req.query.udpPorts ? parseSanitizePortsArray(req.query.udpPorts, 'udpPorts') : [],
	};
}

function parseSanitizePortsArray(ports: unknown, argName: string): number[] {
	if (!ports) throw new HttpError(`${argName} not defined`, 400);
	if (typeof ports !== 'string') throw new HttpError(`${argName} must be string type`, 400);

	return ports.split(',').map((portStr) => {
		const port = parseInt(portStr);
		if (isNaN(port) || !port) throw new HttpError(`${argName}: "${portStr}" is not a number`, 400);
		return port;
	});
}

// rate limiting
