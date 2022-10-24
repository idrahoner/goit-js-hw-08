import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const playerEl = document.querySelector('#vimeo-player');

const PLAYBACK_TIME = 'videoplayer-current-time';

const player = new Player(playerEl);

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
