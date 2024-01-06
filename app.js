let width = 7;
let height = 6;
let bs = 100;
let factor = 9 / 10;
let player = 1;
let finished = 0;
let result;
let resultP;
let depth = 5;

let board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

let scores = {
  1: Infinity,
  2: -Infinity,
};

function isMobile() {
  // check media query]
  if (window.matchMedia("(max-width: 700px)").matches) {
    return true;
  } else {
    return false;
  }
}

function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  let tempI;

  for (let j = 0; j < width; j++) {
    // Is the spot available?

    tempI = nextSpace(j);

    if (tempI >= 0) {
      if (move == null) {
        move = j;
      }

      board[tempI][j] = 1;

      let score = minimax(board, depth, false, 1, -Infinity, Infinity);

      board[tempI][j] = 0;

      if (score > bestScore) {
        bestScore = score;
        move = j;
      }
    }
  }

  player = 2;
  return move;
}

function score_position(player, oponent_player, number_of_moves) {
  //heuristic could be more in depth, using
  let score = 0;

  for (i = 1; i < height; i++) {
    for (j = 1; j < width; j++) {
      // if number of pieces in a row is 3 and there is an empty space, score is 1000
      if (
        (getCountOfPiece(i, j, i + 4, j, player) == 3 &&
          getCountOfPiece(i, j, i + 4, j, 0) == 1) ||
        (getCountOfPiece(i, j, i, j + 4, player) == 3 &&
          getCountOfPiece(i, j, i, j + 4, 0) == 1) ||
        (countDiagonal(i, j, 0, player) == 3 &&
          countDiagonal(i, j, 0, 0) == 1) ||
        (countDiagonal(i, j, 1, player) == 3 && countDiagonal(i, j, 1, 0) == 1)
      ) {
        score += 1000;
      }

      // if number of pieces in a row is 2 and there is an empty space, score is 10
      if (
        (getCountOfPiece(i, j, i + 4, j, player) == 2 &&
          getCountOfPiece(i, j, i + 4, j, 0) == 2) ||
        (getCountOfPiece(i, j, i, j + 4, player) == 2 &&
          getCountOfPiece(i, j, i, j + 4, 0) == 2) ||
        (countDiagonal(i, j, 0, player) == 2 &&
          countDiagonal(i, j, 0, 0) == 2) ||
        (countDiagonal(i, j, 1, player) == 2 && countDiagonal(i, j, 1, 0) == 2)
      ) {
        score += 10;
      }

      // if number of pieces in a row is 1 and there is an empty space, score is 1
      if (
        (getCountOfPiece(i, j, i + 4, j, player) == 1 &&
          getCountOfPiece(i, j, i + 4, j, 0) == 3) ||
        (getCountOfPiece(i, j, i, j + 4, player) == 1 &&
          getCountOfPiece(i, j, i, j + 4, 0) == 3) ||
        (countDiagonal(i, j, 0, player) == 1 &&
          countDiagonal(i, j, 0, 0) == 3) ||
        (countDiagonal(i, j, 1, player) == 1 && countDiagonal(i, j, 1, 0) == 3)
      ) {
        score += 1;
      }

      // if number of pieces in a row is 3 for the opponent and there is an empty space, score is -1000
      if (
        (getCountOfPiece(i, j, i + 4, j, oponent_player) == 3 &&
          getCountOfPiece(i, j, i + 4, j, 0) == 1) ||
        (getCountOfPiece(i, j, i, j + 4, oponent_player) == 3 &&
          getCountOfPiece(i, j, i, j + 4, 0) == 1) ||
        (countDiagonal(i, j, 0, oponent_player) == 3 &&
          countDiagonal(i, j, 0, 0) == 1) ||
        (countDiagonal(i, j, 1, oponent_player) == 3 &&
          countDiagonal(i, j, 1, 0) == 1)
      ) {
        score -= 1000;
      }

      // if number of pieces in a row is 2 for the opponent and there is an empty space, score is -10
      if (
        (getCountOfPiece(i, j, i + 4, j, oponent_player) == 2 &&
          getCountOfPiece(i, j, i + 4, j, 0) == 2) ||
        (getCountOfPiece(i, j, i, j + 4, oponent_player) == 2 &&
          getCountOfPiece(i, j, i, j + 4, 0) == 2) ||
        (countDiagonal(i, j, 0, oponent_player) == 2 &&
          countDiagonal(i, j, 0, 0) == 2) ||
        (countDiagonal(i, j, 1, oponent_player) == 2 &&
          countDiagonal(i, j, 1, 0) == 2)
      ) {
        score -= 10;
      }

      // if number of pieces in a row is 1 for the opponent and there is an empty space, score is -1
      if (
        (getCountOfPiece(i, j, i + 4, j, oponent_player) == 1 &&
          getCountOfPiece(i, j, i + 4, j, 0) == 3) ||
        (getCountOfPiece(i, j, i, j + 4, oponent_player) == 1 &&
          getCountOfPiece(i, j, i, j + 4, 0) == 3) ||
        (countDiagonal(i, j, 0, oponent_player) == 1 &&
          countDiagonal(i, j, 0, 0) == 3) ||
        (countDiagonal(i, j, 1, oponent_player) == 1 &&
          countDiagonal(i, j, 1, 0) == 3)
      ) {
        score -= 1;
      }
    }
  }

  return score;
}

function getCountOfPiece(i, j, i2, j2, player) {
  let pieces = 0;

  for (i; i < i2; i++) {
    for (j; j < j2; j++) {
      if (board[i][j] == player) {
        pieces += 1;
      }
    }
  }
  return pieces;
}

function countDiagonal(i, j, direction, player) {
  let pieces = 0;

  for (x = 0; x < 4; x++) {
    if (direction == 1) {
      if (i + x < height && j + x < width) {
        if (board[i + x][j + x] == player) {
          pieces += 1;
        }
      }
    } else {
      if (i + x < height && j - x < width && j - x > 0) {
        if (board[i + x][j - x] == player) {
          pieces += 1;
        }
      }
    }
  }
  return pieces;
}

function minimax(board, depth, is_maximizing, number_of_moves, alpha, beta) {
  let result = getWinner();
  if (result > 0) {
    return scores[result] - 20 * number_of_moves;
  }

  if (result == -1) {
    return 0 - 50 * number_of_moves;
  }

  if (depth == 0) {
    return score_position(1, 2, number_of_moves);
  }

  if (is_maximizing) {
    let bestScore = -Infinity;
    for (let j = 0; j < width; j++) {
      let tempI = nextSpace(j);

      if (tempI < height && tempI > -1) {
        board[tempI][j] = 1;

        let score = minimax(
          board,
          depth - 1,
          false,
          number_of_moves + 1,
          alpha,
          beta
        );

        board[tempI][j] = 0;

        bestScore = max(score, bestScore);

        alpha = max(bestScore, alpha);
        if (alpha >= beta) {
          break;
        }
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let j = 0; j < width; j++) {
      // Is the spot available?
      let tempI = nextSpace(j);

      if (tempI < height && tempI > -1) {
        board[tempI][j] = 2;

        let score = minimax(
          board,
          depth - 1,
          true,
          number_of_moves + 1,
          alpha,
          beta
        );

        board[tempI][j] = 0;

        bestScore = min(score, bestScore);

        beta = min(bestScore, beta);
        if (alpha >= beta) {
          break;
        }
      }
    }

    return bestScore;
  }
}

function setup() {
  if (isMobile()) {
    // get the width of the screen
    let windowWidth = window.innerWidth;
    bs = windowWidth / 7;
  }

  if (resultP == null) {
    resultP = createP("");
    resultP.style("font-size", "20px");
  }

  createCanvas(700, 600);
  frameRate(60);
  ellipseMode(CORNER); //draw circles from their top left point

  player = 1;
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      board[y][x] = 0;
      finished = 0;
      resultP.html("");
    }
  }
}

function p(y, x) {
  return y < 0 || x < 0 || y >= height || x >= width ? 0 : board[y][x];
}

function getWinner() {
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      if (
        p(y, x) != 0 &&
        p(y, x) == p(y, x + 1) &&
        p(y, x) == p(y, x + 2) &&
        p(y, x) == p(y, x + 3)
      ) {
        return p(y, x);
      }

      if (
        p(y, x) != 0 &&
        p(y, x) == p(y + 1, x) &&
        p(y, x) == p(y + 2, x) &&
        p(y, x) == p(y + 3, x)
      ) {
        return p(y, x);
      }

      for (d = -1; d <= 1; d += 2) {
        if (
          p(y, x) != 0 &&
          p(y, x) == p(y + 1 * d, x + 1) &&
          p(y, x) == p(y + 2 * d, x + 2) &&
          p(y, x) == p(y + 3 * d, x + 3)
        ) {
          return p(y, x);
        }
      }
    }
  }

  for (y = 0; y < height; y++)
    for (x = 0; x < width; x++) if (p(y, x) == 0) return 0;
  return -1; //tie
}

function nextSpace(x) {
  //finds the next space (from the bottom)
  for (y = height - 1; y >= 0; y--) {
    if (board[y][x] == 0) {
      return y;
    }
  }
  return -1;
}

function mousePressed() {
  if (player == 2) {
    if (getWinner() == 0) {
      let x = floor(mouseX / bs),
        y = nextSpace(x);
      if (y >= 0) {
        board[y][x] = player;
        player = 1;
      }
    }
  }
}

function draw() {
  if (player == 1 && getWinner() == 0) {
    result = bestMove();

    board[nextSpace(result)][result] = 1;
  }

  for (j = 0; j < height; j++)
    for (i = 0; i < width; i++) {
      fill(100);
      stroke(80);
      rect(i * bs, j * bs, bs, bs);
      stroke(100);
      if (board[j][i] > 0) {
        fill(board[j][i] == 1 ? 255 : 0, board[j][i] == 2 ? 255 : 0, 0);
        ellipse(
          i * bs + ((1 - factor) / 2) * bs,
          j * bs + ((1 - factor) / 2) * bs,
          bs * factor,
          bs * factor
        );
      }
    }

  if (getWinner() != 0 && finished == 0) {
    let result = getWinner();
    let text;

    if (result == -1) {
      text = "You tied the AI!";
    } else {
      text = `${result == 1 ? "The AI" : "You"} won. `;
    }

    text += " Press space to retry!";
    resultP.html(text);
    finished = 1;
  }
}

function keyPressed() {
  if (getWinner() != 0 && key == " ") {
    setup();
  }
}
