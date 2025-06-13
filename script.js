const canvas = document.getElementById("flyerCanvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const downloadBtn = document.getElementById("downloadBtn");

// Load flyer background
const background = new Image();
background.src = "flyer.png"; // Make sure this matches your flyer filename

background.onload = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
};

upload.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.onload = function (event) {
    const userImg = new Image();
    userImg.src = event.target.result;

    userImg.onload = () => {
      // Redraw flyer background
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      // Image box position and size (smaller to prevent overlap)
      const boxX = 50;
      const boxY = 210;
      const boxWidth = 240;
      const boxHeight = 320;

      // Fit image inside box while preserving aspect ratio
      const aspectRatio = userImg.width / userImg.height;
      let drawWidth = boxWidth;
      let drawHeight = boxWidth / aspectRatio;

      if (drawHeight > boxHeight) {
        drawHeight = boxHeight;
        drawWidth = boxHeight * aspectRatio;
      }

      const drawX = boxX + (boxWidth - drawWidth) / 2;
      const drawY = boxY + (boxHeight - drawHeight) / 2;

      // Add rounded border background
      const radius = 20;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(drawX + radius, drawY);
      ctx.lineTo(drawX + drawWidth - radius, drawY);
      ctx.quadraticCurveTo(drawX + drawWidth, drawY, drawX + drawWidth, drawY + radius);
      ctx.lineTo(drawX + drawWidth, drawY + drawHeight - radius);
      ctx.quadraticCurveTo(drawX + drawWidth, drawY + drawHeight, drawX + drawWidth - radius, drawY + drawHeight);
      ctx.lineTo(drawX + radius, drawY + drawHeight);
      ctx.quadraticCurveTo(drawX, drawY + drawHeight, drawX, drawY + drawHeight - radius);
      ctx.lineTo(drawX, drawY + radius);
      ctx.quadraticCurveTo(drawX, drawY, drawX + radius, drawY);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(userImg, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();

      // Optional: draw border
      ctx.beginPath();
      ctx.strokeStyle = "#ffffff"; // white border
      ctx.lineWidth = 4;
      ctx.roundRect(drawX, drawY, drawWidth, drawHeight, 20);
      ctx.stroke();
    };
  };
  reader.readAsDataURL(e.target.files[0]);
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "Grand_Gala_Flyer.png";
  link.href = canvas.toDataURL();
  link.click();
});
