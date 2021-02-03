import { Request, Response } from 'express';
import { HttpError } from '../Errors/httpError';

export function portsMiddleware(tcpPorts: number[]) {
	portsInRange(tcpPorts);
	limitNumberOfPorts(tcpPorts);
}

/**
 * Checks ports are in range
 */
function portsInRange(tcpPorts: number[]) {
	if (tcpPorts.some((port) => port < 0 || port > 65535)) throw new HttpError('Port must be > 0 and < 65535', 400);
}

/**
 * Checks limit of ports introduced
 */
function limitNumberOfPorts(tcpPorts: number[]) {
	if (tcpPorts.length > 20) throw new HttpError('Too many ports introduced, no more than 20', 400);
}
