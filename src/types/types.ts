export interface PortsScan {
	tcpPorts?: TcpPortScan[];

	udpPorts?: UdpPortScan[];
}

export interface TcpPortScan {
	port: number;
	status: 'open' | 'closed' | 'error' | 'unknown';
	message?: string;
}

export interface UdpPortScan {
	port: number;
	status: 'open' | 'closed' | 'error' | 'unknown';
	message?: string;
}
