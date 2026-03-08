import { useEffect, useRef } from 'react';
import Quagga from '@ericblade/quagga2';

function BarcodeScanner({ onDetected }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scannerRef.current,
        constraints: {
          audio: 'false',
          width: '640',
          height: '480',
          facingMode: 'environment',
        },
      },
      decoder: {
        readers: ['upc_reader'],
      },
      locate: true,
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
    <div
      ref={scannerRef}
      style={{
        position: 'relative',
      }}
    />
  );
}

export default BarcodeScanner;



/*
import Quagga from '@ericblade/quagga2';

const Scanner = () => {
  Quagga.init({
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: document.querySelector('#cam')
    },
    decoder: {
      readers: ['upc_reader']
    }
  }, function (err) {
    if (err) {
      console.log(err);
      return;
    };
    console.log('Quagga has initialized.');
    Quagga.start();
  });

  Quagga.onDetected(function (data) {
    
    console.log(data);
  });

  return (
    <div id='cam'></div>
  );
};
export default Scanner;
*/