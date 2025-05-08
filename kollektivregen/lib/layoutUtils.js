const IMAGE_WIDTH = 87;
const IMAGE_HEIGHT = 108;
const OFFSET_Y = 54;
const COLUMNS = 4;

export function generatePositions(count) {
    const positions = [];
  
    // Setze das erste Cover an die erste Position in der Reihe
    if (count > 0) {
      positions.push({
        left: 0,
        top: 0,
      });
    }
  
    // Setze das zweite Cover an die letzte Position in der Reihe
    if (count > 1) {
      positions.push({
        left: (COLUMNS - 1) * IMAGE_WIDTH,
        top: 0,
      });
    }
  
    // Positioniere die restlichen Covers
    for (let i = 2; i < count; i++) {
      const col = i % COLUMNS;
      const row = Math.floor(i / COLUMNS);
      const offsetY = (col % 2 === 1) ? OFFSET_Y : 0;
  
      positions.push({
        left: col * IMAGE_WIDTH,
        top: row * OFFSET_Y * 2 + offsetY,
      });
    }
  
    return positions;
  }
  