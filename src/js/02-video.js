import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const playerEl = document.querySelector('#vimeo-player');

const PLAYBACK_TIME = 'videoplayer-current-time';

const player = new Player(playerEl);

player.on('play', onStartVideo);

function onStartVideo() {
  const lastTime = localStorage.getItem(PLAYBACK_TIME);
  if (lastTime) {
    player.setCurrentTime(lastTime);
  }
  player.on('timeupdate', throttle(onPlayVideo, 1000));
}

function onPlayVideo() {
  player.getCurrentTime().then(time => {
    localStorage.setItem(PLAYBACK_TIME, time);
  });
}

// test git
