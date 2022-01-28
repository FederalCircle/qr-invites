import React, { useEffect } from 'react';
import QrCodeScanner from '@/libs/QrCodeScanner';

export interface ScannerProps extends React.HTMLProps<HTMLCanvasElement> {
  id: string;
  onSuccess: (data: string) => unknown;
}

const Scanner = React.forwardRef<HTMLCanvasElement, ScannerProps>(
  ({ id, onSuccess, ...props }, ref) => {
    useEffect(() => {
      const scanner = new QrCodeScanner(`#${id}`, onSuccess);

      scanner.start();

      return () => {
        scanner.stop();
      };
    }, []);

    return <canvas id={id} ref={ref} {...props} />;
  },
);

export default Scanner;
