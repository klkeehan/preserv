const WebcamCapture = () => {
  const Quagga = require('@ericblade/quagga2').default;
  Quagga.init({
    inputStream: {
      type: 'LiveStream',
      target: document.querySelector('#camera'),
      constraints: {
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

  return (
    <div>
      <div id='camera' className='cam' style={{width: '100%'}}></div>
      <script src='<script src="https://cdn.jsdelivr.net/npm/@ericblade/quagga2/dist/quagga.js'></script>
    </div>
  );
};
export default WebcamCapture;