import { checkPortStatus } from 'portscanner';
import { TcpPortScan } from '../types/types';

export async function tcpPortsScan({
	ports,
	host,
}: {
	ports: number[];
	host: string;
}): Promise<TcpPortScan[]> {
	return Promise.all(ports.map(async (port) => await tcpPortScan({ port, host })));
}

async function tcpPortScan({ port, host }: { port: number; host: string }): Promise<TcpPortScan> {
	try {
		const status = await checkPortStatus(port, { host: host });
		return {
			port: port,
			status: status,
		};
	} catch (e) {
		console.log(e);
		return {
			port: port,
			status: 'error',
			message: e.message,
		};
	}
}
