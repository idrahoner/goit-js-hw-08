import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const PLAYBACK_TIME = 'videoplayer-current-time';
const previousTime = localStorage.getItem(PLAYBACK_TIME);

const playerEl = document.querySelector('#vimeo-player');
const player = new Player(playerEl);

if (previousTime) {
  player.setCurrentTime(previousTime);
}

player.on('timeupdate', throttle(onPlayVideo, 1000));

function onPlayVideo() {
  player.getCurrentTime().then(time => {
    localStorage.setItem(PLAYBACK_TIME, time);
  });
}
