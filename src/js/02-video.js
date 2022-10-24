import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const playerEl = document.querySelector('#vimeo-player');

const PLAYBACK_TIME = 'videoplayer-current-time';

const player = new Player(playerEl);

// version 1.0;

player.on('play', onStartVideo);
player.on('timeupdate', throttle(onPlayVideo, 1000));

function onStartVideo() {
  const previousTime = localStorage.getItem(PLAYBACK_TIME);
  if (previousTime) {
    player.setCurrentTime(previousTime);
  }
}

function onPlayVideo() {
  player.getCurrentTime().then(time => {
    localStorage.setItem(PLAYBACK_TIME, time);
  });
}

// version 2.0

// player.on('play', onStartVideo);
// player.on('pause', onEndVideo);

// function onStartVideo() {
//   console.log('onStartVideo()');
//   const previousTime = localStorage.getItem(PLAYBACK_TIME);
//   if (previousTime) {
//     player.setCurrentTime(previousTime);
//   }
// }

// function onPlayVideo() {
//   console.log('onPlayVideo()');
//   player.getCurrentTime().then(time => {
//     localStorage.setItem(PLAYBACK_TIME, time);
//   });
//   player.on('timeupdate', setPlaybackTime);
// }

// function setPlaybackTime() {
//   console.log('setPlaybackTime()');
//   throttle(onPlayVideo, 1000);
// }

// function onEndVideo() {
//   console.log('onEndVideo()');
//   localStorage.removeItem(PLAYBACK_TIME);
//   player.off('timeupdate', setPlaybackTime);
// }
