// eslint-disable-next-line import/prefer-default-export
export const createFramesFromPlaintext = (plaintext) => {
  let txt = plaintext;
  const frames = [];
  let frameCounter = -1;
  while (txt.indexOf('digraph') !== -1) {
    frameCounter += 1;
    txt = txt.trim();
    const nextDigraph = txt.substring(1).indexOf('digraph');
    if (nextDigraph === -1) {
      frames.push({ name: `Frame ${frameCounter}`, graph: txt.trim() });
      break;
    }
    frames.push({ name: `Frame ${frameCounter}`, graph: txt.substring(0, nextDigraph + 1).trim() });
    txt = txt.substring(nextDigraph + 1);
  }
  return frames;
};
