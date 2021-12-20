import { useState, useCallback } from "react";
import { checkCollision, STAGE_WIDTH } from "../gamehelpers";

import { TETROMINOS, randomTetromino } from "../tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (tetrominoMatrix, direction) => {
    // Make the rows into cols
    const rotatedTetromino = tetrominoMatrix.map((_, index) =>
      tetrominoMatrix.map((col) => col[index])
    );
    // Reverse each row to get a rotated tetromino
    if (direction > 0) return rotatedTetromino.map((row) => row.reverse());
    return rotatedTetromino.reverse();
  };

  const playerRotate = (stage, direction) => {
    const playerCopy = JSON.parse(JSON.stringify(player));

    playerCopy.tetromino = rotate(playerCopy.tetromino, direction);

    const position = playerCopy.pos.x;
    let offset = 1;

    while (checkCollision(playerCopy, stage, { x: 0, y: 0 })) {
      playerCopy.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > playerCopy.tetromino[0].length) {
        rotate(playerCopy.tetromino, -direction);
        playerCopy.pos.x = position;
        return;
      }
    }
    setPlayer(playerCopy);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
