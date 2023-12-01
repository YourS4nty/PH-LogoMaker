document.getElementById("case").addEventListener("input", () => {
  let casex = document.getElementById("case");
  if (casex.innerHTML == "")
    casex.setAttribute("style", "border: 3px dashed red;");
  else casex.setAttribute("style", "");
});

var mp = (multiplier = 10); // Number to mulitply all variables used in creating the image with for a higher res
var iM = (imageMargin = 30);

function draw(
  casex = document.getElementById("case").innerHTML,
  hub = document.getElementById("hub").innerHTML
) {
  const canvas = document.getElementsByTagName("canvas")[0];
  const caseDiv = document.getElementById("case");
  const hubDiv = document.getElementById("hub");

  canvas.width = (iM * 2 + caseDiv.offsetWidth + hubDiv.offsetWidth) * mp;
  canvas.height = (iM * 2 + caseDiv.offsetHeight) * mp;

  const { width, height } = canvas;
  const ctx = canvas.getContext("2d");
  ctx.font = `bold ${100 * mp}px Arial`;
  const caseWidth = ctx.measureText(casex).width;
  const hubWidth = ctx.measureText(hub).width;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillText(casex, iM * mp, iM * mp + 92 * mp); //92 is the magic number

  let borderRadius = 20;
  ctx.strokeStyle = "orange";
  ctx.fillStyle = "orange";
  ctx.lineJoin = "round";
  ctx.lineWidth = borderRadius * mp;
  ctx.strokeRect(
    iM * mp + caseWidth + (borderRadius / 2) * mp + 5 * mp,
    iM * mp + (borderRadius / 2) * mp,
    hubWidth,
    -iM * 2 * mp + height - borderRadius * mp
  );
  ctx.fillRect(
    iM * mp + caseWidth + borderRadius * mp + 5 * mp - 1 * mp,
    iM * mp + borderRadius * mp,
    hubWidth + 2 * mp - borderRadius * mp,
    -iM * 2 * mp + height - borderRadius * 2 * mp
  );

  ctx.fillStyle = "black";
  ctx.fillText(hub, iM * mp + caseWidth + 10 * mp, iM * mp + 92 * mp);

  save();
}

function save() {
  casex = document.getElementById("case").innerHTML;
  hub = document.getElementById("hub").innerHTML;

  let link = document.createElement("a");
  let canvas = document.getElementsByTagName("canvas")[0];
  link.setAttribute("download", casex + hub + ".png");
  link.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );

    link.dispatchEvent(e);
  } else if (link.fireEvent) {
    link.fireEvent("onclick");
  }
}
