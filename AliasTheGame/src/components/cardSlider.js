const getPositionY = (event) =>
  event.type.includes("mouse") ? event.pageY : event.touches[0].clientY;

export const CardSlider = () => {
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let wordsPlayed = 0;
  const pixelsToCount = 200;

  const card = document.getElementById("game-card");
  const [firstCard, secondCard] =
    document.getElementsByClassName("background-card");
  console.log(firstCard, secondCard);
  const gameMenu = document.getElementById("game-menu-container");

  card.oncontextmenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  const hideCard = () => {
    card.style.display = "none";
    setTimeout(() => (card.style.display = "flex"), 300);
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
    console.log("end");
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -pixelsToCount || movedBy > pixelsToCount) {
      if (movedBy < -pixelsToCount) {
        console.log("GUESSED");
      } else if (movedBy > pixelsToCount) {
        console.log("SKIPPED");
      }

      wordsPlayed++;
      console.log(wordsPlayed);
      hideCard();
      shuffleCards();
    }

    currentTranslate = 0;

    setCardPosition();
    requestAnimationFrame(animation);

    card.classList.remove("grabbing");
  };

  const touchMove = (event) => {
    if (isDragging) {
      console.log("move");
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
  console.log(gameMenu);
};
