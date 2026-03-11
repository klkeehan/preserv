import { useEffect, useRef } from 'react';
import Quagga from '@ericblade/quagga2';

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scannerRef.current,
        constraints: {
          audio: 'false',
          width: {min: 720},
          height: {min: 360},
          facingMode: 'environment'
        },
      },
      numOfWorkers: 4,
      locate: true,
      decoder: {
        locate: true,
        readers: ['upc_reader'],
      },
      locator: {
        halfSample: true,
        patchSize: 'small'
      }
    }, (err) => {
      if (err) {
        console.error('something went wrong :(', err);
        return;
      };
      Quagga.start();
      console.log('quagga started');
    });

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      if (onDetected) {onDetected(code)};
      console.log(code, 'was found');
    });

    return () => {
      Quagga.stop();
      Quagga.offDetected();
    };
  }, [onDetected]);

  return (
    <div ref={scannerRef} style={{position: 'relative', width: '100%'}}></div>
  );
}

export default BarcodeScanner;