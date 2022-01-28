/* eslint-disable no-console */
/* eslint-disable no-alert */
import JsQR from 'jsqr';
import debounce from 'lodash.debounce';

async function requestUserMedia() {
  const mediaConstraints = {
    video: {
      facingMode: 'environment', // Front camera
    },
  };

  let stream = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
  } catch (error) {
    console.log('error');
    console.error(error);
    throw error;
    // if (error instanceof Error) {
    //   switch (error.name) {
    //     case 'NotAllowedError':
    //       alert('We need access to your device camera');
    //       break;
    //     default:
    //       alert('Something wrong happened :(');
    //       break;
    //   }
    // }
  }

  return stream;
}

/**
 * Scanner used to render user media devices on a canvas element and find
 * QR Codes in the video stream.
 * @see https://github.com/cozmo/jsQR/blob/master/docs/index.html
 */
class QrCodeScanner {
  /**
   * Canvas DOM element to render video frames
   * @type {DOMElement}
   */
  canvas: HTMLCanvasElement | null = null;

  /**
   * Video element created to stream user media device
   * @type {DOMElement}
   */
  video: HTMLVideoElement | null = null;

  /**
   * Config object used across methods
   * @type {Object}
   * @prop {number} successThrottle - Time to throttle success callback
   */
  config = {
    successThrottle: 500,
  };

  /**
   * Callback function for QR Code match
   * @type {Function}
   */
  onSuccess: (data: string) => unknown;

  /**
   * @param {string} canvasSelector - String used to find canvas DOM reference
   * @param {Function} onSuccess - Callback function for QR Code match. Thes
   * function will be throttled.
   * @param {Object} [customConfig] - Object used to overwrite default config
   */
  constructor(
    canvasSelector: string,
    onSuccess: (data: string) => unknown,
    customConfig = {},
  ) {
    this.config = {
      ...this.config,
      ...customConfig,
    };

    this.onSuccess = debounce(onSuccess, this.config.successThrottle, {
      leading: true,
      trailing: false,
    });

    // Get the canvas DOM reference
    this.canvas = document.querySelector(canvasSelector);

    // Creates a video element to receive webcam stream
    this.video = document.createElement('video');
    this.video.setAttribute('playsinline', 'true');
  }

  /**
   * Start the video stream rendered in a canvas element, as well as QR Code
   * pattern search.
   */
  async start() {
    // Get webcam stream
    const stream = await requestUserMedia();

    // Render the stream in a video element
    if (this.video) {
      this.video.srcObject = stream;
      this.video.play();

      // Stream tick function handler
      requestAnimationFrame(this.tick.bind(this));
    }
  }

  tick() {
    if (!this.video || !this.canvas) {
      console.error('CANVAS NOT FOUND');
      return;
    }
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      const { videoWidth: width, videoHeight: height } = this.video;

      if (this.canvas.height) this.canvas.height = height;
      if (this.canvas.width) this.canvas.width = width;

      const ctx = this.canvas.getContext('2d');
      if (!ctx) return;

      // Get a video frame as an ImageData object
      ctx.drawImage(this.video, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);

      // Try to identify a QR Code in the video snapshot
      const code = JsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        this.onSuccess(code.data);
      }
    }
    requestAnimationFrame(this.tick.bind(this));
  }

  stop() {
    this.video = null;
    this.canvas = null;
  }
}

export default QrCodeScanner;
