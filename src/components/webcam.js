import Quagga from '@ericblade/quagga2';

const WebcamCapture = () => {
  const Quagga = require('@ericblade/quagga2').default;
  function startScanner() {
    let scanFlag = false;
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#camera'),
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment'
        }
      },
      decoder: {
        readers: ['upc_reader']
      }
    }, function(err) {
      if (err) {
        console.log(err);
        return;
      };
      console.log('initializing quagga . . .');
      Quagga.start();
      console.log('starting quagga . . .');
    });

    Quagga.onDetected(function(result) {
      const code = result.codeResult.code;
      console.log('found code ', code);
    });
  };

  return (
    <div>
      <script src='https://cdn.rawgit.com/serratus/quaggaJS/0420d5e0/dist/quagga.min.js'></script>
      <div id='camera' className='cam' style={{width: '100%'}}></div>
    </div>
  );
};
export default WebcamCapture;