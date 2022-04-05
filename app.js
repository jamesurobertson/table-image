document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const canvas = document.getElementById("canvas");
  const canvasCtx = canvas.getContext("2d");
  const worker = new Worker("worker.js");

  const postMessage = () => {
    const imageData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);
    worker.postMessage(imageData);
  };

  const createTable = (data) => {
    const table = document.createElement("table");
    table.cellSpacing = 0;
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (let y = 0; y < data.length; y++) {
      const row = document.createElement("tr");
      tbody.appendChild(row);
      for (let x = 0; x < data[y].length; x++) {
        const cell = document.createElement("td");
        cell.classList.add("cell");
        cell.style.backgroundColor = `rgba(${data[x][y].r}, ${data[x][y].g}, ${data[x][y].b}, ${data[x][y].a})`;
        row.appendChild(cell);
      }
    }
    document.body.appendChild(table);
    return table;
  };

  worker.addEventListener("message", (e) => {
    createTable(e.data.data);
  });

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];

    createImageBitmap(file).then((bitmap) => {
      canvas.height = bitmap.height;
      canvas.width = bitmap.width;
      canvasCtx.drawImage(bitmap, 0, 0);
      postMessage();
    });
  });
});
