addEventListener("message", (d) => {
  const imageData = d.data;
  const width = imageData.width;
  const height = imageData.height;
  const data = [];
  for (let x = 0; x < width; x++) {
    const row = [];
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      const red = imageData.data[index];
      const green = imageData.data[index + 1];
      const blue = imageData.data[index + 2];
      const alpha = imageData.data[index + 3];
      row.push({ r: red, g: green, b: blue, a: alpha });
    }
    data.push(row);
  }
  postMessage({ data });
});
