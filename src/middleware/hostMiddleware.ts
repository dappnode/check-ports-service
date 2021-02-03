import { Request, Response } from 'express';
import ipRegex from 'ip-regex';
import { HttpError } from '../Errors/httpError';

export function hostMiddleware(host: string) {
	const isIpAddress = ipRegex({ exact: true }).test(host);

	if (!isIpAddress) {
		throw new HttpError('Public ip not valid', 400);
	}
}
