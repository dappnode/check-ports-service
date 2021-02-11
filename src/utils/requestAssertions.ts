import ipRegex from 'ip-regex';

/**
 * Checks if is valid publicIP
 */
export function isValidIp(host: string): boolean {
	return ipRegex({ exact: true }).test(host);
}

/**
 * Checks ports are in range
 */
export function arePortsInRange(ports: number[]): boolean {
	if (ports.some((port) => port < 0 || port > 65535)) return false;
	return true;
}

/**
 * Checks limit of ports introduced
 */
export function isInLimitNumberOfPorts(ports: number[]): boolean {
	if (ports.length > 20) return false;
	return true;
}
