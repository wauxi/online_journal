const createScratchCard = (canvasId, imageSrc) => {
    let canvas = document.getElementById(canvasId);
    let context = canvas.getContext("2d");

    const card = document.getElementById("card");
    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;

    const init = () => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    };

    let isDragging = false;

    const scratch = (x,y) => {
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x,y,24,0,2 * Math.PI);
        context.fill();
    };

    canvas.addEventListener("mousedown", (event) => {
        isDragging = true;
        scratch(event.offsetX, event.offsetY);
    });

    canvas.addEventListener("mousemove", (event) => {
        if (isDragging){
            scratch(event.offsetX, event.offsetY);
        }
    });

    canvas.addEventListener("mouseup", (event) => {
        isDragging = false;
    });

    canvas.addEventListener("mouseleave", (event) => {
        isDragging = false;
    });

    init();
};

createScratchCard("scratch-card1", "cards-img/Scratch.png");
createScratchCard("scratch-card2", "cards-img/Scratch.png");
createScratchCard("scratch-card3", "cards-img/Scratch.png");
createScratchCard("scratch-card4", "cards-img/Scratch.png");
createScratchCard("scratch-card5", "cards-img/Scratch.png");
createScratchCard("scratch-card6", "cards-img/Scratch.png");