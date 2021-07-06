function nextScreen() {
  const id = $(this).data('next');
  $(this)
    .closest('.screen')
    .fadeOut(function () {
      console.log(id);
      $(id).fadeIn();
      if ($(id).find('.anim-sequence')) {
        animate(
          $(id),
          $(id).find('.anim-sequence').data('total-frames'),
          $(id).find('.anim-sequence').data('duration')
        );
      }
    });
}

$('[data-next]').click(nextScreen);

function animate(parent, totalFrames, animationDuration = 1500) {
  const timePerFrame = animationDuration / totalFrames;
  let timeWhenLastUpdate;
  let timeFromLastUpdate;
  let frameNumber = 1;

  // 'step' function will be called each time browser rerender the content
  // we achieve that by passing 'step' as a parameter to 'requestAnimationFrame' function
  function step(startTime) {
    // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
    // first of all we calculate how much time has passed from the last time when frame was update
    if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;
    timeFromLastUpdate = startTime - timeWhenLastUpdate;

    // then we check if it is time to update the frame
    if (timeFromLastUpdate > timePerFrame) {
      // hide all frames
      parent.find('.anim-sequence img').css('opacity', 0);
      // and show the required one
      parent.find(`.seq-${frameNumber}`).css('opacity', 1);
      // reset the last update time
      timeWhenLastUpdate = startTime;

      // then increase the frame number or reset it if it is the last frame
      if (frameNumber >= totalFrames) {
        frameNumber = 1;
      } else {
        frameNumber = frameNumber + 1;
      }
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
