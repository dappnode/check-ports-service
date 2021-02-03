import { checkPortStatus } from 'portscanner';
import { HttpError } from '../Errors/httpError';
import { TcpPortScan } from '../types/types';

export async function scanPort({ tcpPort, host }: { tcpPort: number; host: string }): Promise<TcpPortScan> {
	try {
		const status = await checkPortStatus(tcpPort, { host: host });
		console.log(`port: ${tcpPort}, status: ${status}`);
		return {
			tcpPort: tcpPort,
			status: status,
		};
	} catch (e) {
		throw new HttpError(`Error scanning tcpPort: ${tcpPort}. ${e}`, 500);
	}
}
