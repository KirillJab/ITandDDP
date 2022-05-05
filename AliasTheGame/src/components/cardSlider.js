const getPositionY = (event) =>
  event.type.includes("mouse") ? event.pageY : event.touches[0].clientY;

export const CardSlider = (
  swipeCard,
  getNewWord,
  roundTime,
  isLastWordForAll,
  FinishRound
) => {
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let wordsPlayed = 0;
  let up = 0;
  let down = 0;
  const pixelsToCount = 200;

  let timeLeft = roundTime;
  let timeIsOut = false;

  const upCounter = document.getElementById("earned-points");
  const downCounter = document.getElementById("lost-points");
  const card = document.getElementById("game-card");
  const cardWord = card.getElementsByTagName("span")[0];

  const timerElement = document.getElementById("turn-timer");

  const [firstCard, secondCard] =
    document.getElementsByClassName("background-card");
  const gameMenu = document.getElementById("game-menu-container");

  cardWord.textContent = getNewWord();
  upCounter.textContent = `+${up}`;
  downCounter.textContent = `-${down}`;
  timerElement.textContent = timeLeft;

  const timer = setInterval(() => {
    timeLeft -= 10;
    if (timeLeft === 0) {
      clearInterval(timer);
      if (!isLastWordForAll) {
        FinishRound();
      } else {
        timeIsOut = true;
      }
    }
    timerElement.textContent = timeLeft;
  }, 1000);

  card.oncontextmenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  const hideCard = () => {
    card.style.display = "none";
    setTimeout(() => (card.style.display = "flex"), 300);
  };

  const updateCounters = (guessed) => {
    if (guessed) {
      upCounter.textContent = `+${++up}`;
    } else {
      downCounter.textContent = `-${++down}`;
    }
  };

  const shuffleCards = () => {
    const [first, second] =
      wordsPlayed % 2 ? [firstCard, secondCard] : [secondCard, firstCard];

    first.classList.remove("second-card");
    first.classList.add("first-card");
    second.classList.remove("first-card");
    second.classList.add("second-card");
  };

  const touchStart = (event) => {
    startPos = getPositionY(event);

    isDragging = true;
    animationID = requestAnimationFrame(animation);

    card.classList.add("grabbing");
  };

  const touchEnd = () => {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -pixelsToCount || movedBy > pixelsToCount) {
      const guessed = movedBy < -pixelsToCount;
      wordsPlayed++;

      swipeCard(guessed);

      if (timeIsOut) {
        FinishRound();
      } else {
        updateCounters(guessed);
        hideCard();
        shuffleCards();
        cardWord.textContent = getNewWord();
      }
    }

    currentTranslate = 0;

    setCardPosition();
    requestAnimationFrame(animation);

    card.classList.remove("grabbing");
  };

  const touchMove = (event) => {
    if (isDragging) {
      const currentPosition = getPositionY(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  };

  const animation = () => {
    setCardPosition();
    if (isDragging) requestAnimationFrame(animation);
  };

  const setCardPosition = () => {
    card.style.transform = `translateY(${currentTranslate}px)`;
  };

  card.addEventListener("touchstart", touchStart);
  card.addEventListener("touchend", touchEnd);
  card.addEventListener("touchmove", touchMove);

  card.addEventListener("mousedown", touchStart);
  card.addEventListener("mouseup", touchEnd);
  card.addEventListener("mousemove", touchMove);
  gameMenu.addEventListener("mouseleave", touchEnd);
};
