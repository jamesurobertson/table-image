document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const canvas = document.createElement("canvas");
  //   const loader = document.getElementById("loader");
  const ctx = canvas.getContext("2d");
  const worker = new Worker("worker.js");

  const createTable = async (data) => {
    const table = document.createElement("table");
    table.id = "table";
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
  };

  const postMessage = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    worker.postMessage(imageData);
  };

  worker.addEventListener("message", (e) => {
    createTable(e.data).then(() => {
      const loader = document.getElementById("loader");
      loader.parentNode.removeChild(loader);
    });
  });

  input.addEventListener("change", (e) => {
    const table = document.getElementById("table");
    if (table) {
      table.parentNode.removeChild(table);
    }
    const loader = document.createElement("div");
    loader.id = "loader";
    loader.innerHTML = "Loading...";
    document.body.appendChild(loader);

    const file = e.target.files[0];
    createImageBitmap(file).then((bitmap) => {
      canvas.height = bitmap.height;
      canvas.width = bitmap.width;
      ctx.drawImage(bitmap, 0, 0);
      postMessage();
    });
  });
});
