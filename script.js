// Audio Context for sound generation
let audioContext = null;
let isAudioInitialized = false;

// Color palette for visual effects
const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52C3A0',
  '#FF85A2', '#FFD93D', '#6BCF7F', '#A29BFE', '#FD79A8'
];

// Emoji collection
const emojis = ['🎉', '🌟', '⭐', '🎈', '🎨', '🦄', '🌈', '💫', '✨',
  '🎪', '🎭', '🎸', '🎺', '🎷', '🎵', '🎶', '🔥', '💖',
  '🌺', '🌸', '🦋', '🐠', '🐡', '🦊', '🐨', '🐼', '🦁'];

// Shape types
const shapes = ['circle', 'square', 'star', 'heart', 'emoji'];

// Animation types
const animations = [
  'anim-bounce', 'anim-spin', 'anim-pulse', 'anim-wiggle',
  'anim-float', 'anim-rainbow', 'anim-bounce-spin', 'anim-pulse-wiggle'
];

// Initialize audio context on first interaction
function initAudio() {
  if (!isAudioInitialized) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    isAudioInitialized = true;
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

// Generate a random fun sound
function playSound() {
  if (!audioContext) return;

  const currentTime = audioContext.currentTime;

  // Create oscillator for the main sound
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  // Random frequency (musical note range for kids)
  const frequencies = [262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784];
  const frequency = frequencies[Math.floor(Math.random() * frequencies.length)];

  // Random wave type (avoid harsh sawtooth)
  const waveTypes = ['sine', 'triangle', 'square'];
  const waveType = waveTypes[Math.floor(Math.random() * waveTypes.length)];

  oscillator.type = waveType;
  oscillator.frequency.setValueAtTime(frequency, currentTime);

  // Add some frequency modulation for extra fun
  if (Math.random() > 0.5) {
    oscillator.frequency.exponentialRampToValueAtTime(
      frequency * 1.5,
      currentTime + 0.1
    );
  }

  // Volume envelope - quick attack, gradual release
  gainNode.gain.setValueAtTime(0, currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.3);

  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Play sound
  oscillator.start(currentTime);
  oscillator.stop(currentTime + 0.3);
}

// Create a visual effect
function createVisualEffect() {
  const container = document.getElementById('effects-container');
  const effect = document.createElement('div');
  effect.className = 'visual-effect';

  // Random shape type
  const shapeType = shapes[Math.floor(Math.random() * shapes.length)];

  // Random size
  const size = 50 + Math.random() * 100;
  effect.style.width = size + 'px';
  effect.style.height = size + 'px';

  // Random position within viewport
  const maxX = window.innerWidth - size;
  const maxY = window.innerHeight - size;
  effect.style.left = Math.random() * maxX + 'px';
  effect.style.top = Math.random() * maxY + 'px';

  // Random color
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Create shape based on type
  if (shapeType === 'emoji') {
    effect.className += ' shape-emoji';
    effect.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  } else if (shapeType === 'star') {
    effect.className += ' shape-star';
    effect.textContent = '⭐';
  } else if (shapeType === 'heart') {
    effect.className += ' shape-heart';
    effect.textContent = '❤️';
  } else {
    effect.className += ' shape-' + shapeType;
    effect.style.backgroundColor = color;
  }

  // Random animation
  const animation = animations[Math.floor(Math.random() * animations.length)];
  effect.className += ' ' + animation;

  // Add to container
  container.appendChild(effect);

  // Remove after animation completes
  setTimeout(() => {
    if (effect.parentNode) {
      effect.parentNode.removeChild(effect);
    }
  }, 3000);
}

// Handle keyboard events
document.addEventListener('keydown', function (event) {
  // Initialize audio on first keypress
  initAudio();

  // Prevent ALL default behaviors
  event.preventDefault();
  event.stopPropagation();

  // Play sound and create visual effect
  playSound();
  createVisualEffect();

  return false;
}, true);

// Also capture keyup and keypress to be thorough
document.addEventListener('keyup', function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}, true);

document.addEventListener('keypress', function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}, true);

// Prevent context menu (right-click)
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  return false;
});

// Prevent text selection
document.addEventListener('selectstart', function (event) {
  event.preventDefault();
  return false;
});

// Prevent beforeunload for accidental closure
window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  event.returnValue = '';
  return '';
});

// Exit function (mouse-only)
function exitPage() {
  // Remove beforeunload listener before closing
  window.removeEventListener('beforeunload', arguments.callee);

  if (confirm('Are you sure you want to exit? Click OK to exit.')) {
    // Close the window or go to a blank page
    window.open('about:blank', '_self');
    window.close();
  }
}

// Toggle fullscreen function
function toggleFullscreen() {
  const elem = document.documentElement;
  
  if (!document.fullscreenElement && !document.webkitFullscreenElement && 
      !document.mozFullScreenElement && !document.msFullscreenElement) {
    // Enter fullscreen
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

// Handle touch events for mobile devices
let touchActive = false;

document.addEventListener('touchstart', function(event) {
  // Don't trigger if touching buttons
  if (event.target.closest('.control-button')) {
    return;
  }
  
  // Initialize audio on first touch
  initAudio();
  
  // Prevent default touch behavior
  event.preventDefault();
  
  touchActive = true;
  
  // Play sound and create visual effect for each touch point
  for (let i = 0; i < event.touches.length; i++) {
    playSound();
    createVisualEffect();
  }
}, { passive: false });

document.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });

document.addEventListener('touchend', function(event) {
  if (!event.target.closest('.control-button')) {
    event.preventDefault();
  }
  touchActive = false;
}, { passive: false });

// Prevent F11 and other fullscreen toggles
window.addEventListener('keydown', function (event) {
  if (event.key === 'F11' ||
    event.keyCode === 122 ||
    (event.ctrlKey && event.key === 'w') ||
    (event.ctrlKey && event.key === 'r') ||
    (event.ctrlKey && event.key === 't') ||
    (event.metaKey && event.key === 'w') ||
    (event.metaKey && event.key === 'r') ||
    (event.metaKey && event.key === 't') ||
    event.key === 'F5') {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}, true);

// Initialize on load
window.addEventListener('load', function () {
  console.log('Keyboard Play Page Ready! Press any key to start the fun! 🎉');
});
