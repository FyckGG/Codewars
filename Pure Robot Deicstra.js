// getCommands("T.S.", 5); // -> ['f'], because he just has to move forward
// getCommands("S.......T", 10); // -> ['r', 'f', 'f', 'r', 'f', 'f']
// getCommands("S.......T", 5); // -> [], because he needs at least 6 units of power
// getCommands("S#.##...T", 20); // => [], because the target can not be reached (with an arbitrary amount of power)

// T.
// S.

// S..
// ...
// ..T
function turn(direction, cor_y, cor_x) {
  let moves = "";
  if (direction == "north") {
    if (cor_y == -1 && cor_x == 0) return [moves, direction];
    if (cor_y == 1 && cor_x == 0) {
      moves += "rr";
      direction = "south";
      return [moves, direction];
    }
    if (cor_y == 0 && cor_x == -1) {
      moves += "l";
      direction = "west";
      return [moves, direction];
    }
    if (cor_y == 0 && cor_x == 1) {
      moves += "r";
      direction = "east";
      return [moves, direction];
    }
  }
  if (direction == "south") {
    if (cor_y == 1 && cor_x == 0) return [moves, direction];
    if (cor_y == -1 && cor_x == 0) {
      moves += "rr";
      direction = "north";
      return [moves, direction];
    }
    if (cor_y == 0 && cor_x == -1) {
      moves += "r";
      direction = "west";
      return [moves, direction];
    }
    if (cor_y == 0 && cor_x == 1) {
      moves += "l";
      direction = "east";
      return [moves, direction];
    }
  }
  if (direction == "west") {
    if (cor_y == 0 && cor_x == -1) return [moves, direction];
    if (cor_y == 0 && cor_x == 1) {
      moves += "rr";
      direction = "east";
      return [moves, direction];
    }
    if (cor_y == -1 && cor_x == 0) {
      moves += "r";
      direction = "north";
      return [moves, direction];
    }
    if (cor_y == 1 && cor_x == 0) {
      moves += "l";
      direction = "south";
      return [moves, direction];
    }
  }
  if (direction == "east") {
    if (cor_y == 0 && cor_x == 1) return [moves, direction];
    if (cor_y == 0 && cor_x == -1) {
      moves += "rr";
      direction = "east";
      return [moves, direction];
    }
    if (cor_y == -1 && cor_x == 0) {
      moves += "l";
      direction = "north";
      return [moves, direction];
    }
    if (cor_y == 1 && cor_x == 0) {
      moves += "r";
      direction = "south";
      return [moves, direction];
    }
  }
}

class coordinates {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

function two_dimen_arr(n, content, l) {
  n = [];
  for (let i = 0; i < l; i++) {
    n[i] = [];
    for (let j = 0; j < l; j++) {
      n[i][j] = content;
    }
  }
  return n;
}

function FindLowestCost(d, used, line) {
  let lowestCost = 1000000000;
  let lowestPoint = new coordinates();
  for (let i = 0; i < line; i++) {
    for (let j = 0; j < line; j++) {
      let cost = d[i][j];
      if (cost < lowestCost && used[i][j] == false) {
        lowestCost = cost;
        lowestPoint.height = i;
        lowestPoint.width = j;
      }
    }
  }
  return lowestPoint;
}

function getCommands(field, power) {
  const line = Math.sqrt(field.length);
  var lab = [];

  let delta_x = [0, 0, 1, -1];
  let delta_y = [-1, 1, 0, 0];

  var w = 0,
    h = 0;

  var start = new coordinates(0, 0);
  var finish = new coordinates(0, 0);

  for (let i = 0; i < line; i++) {
    lab[i] = [];
    for (let j = 0; j < line; j++) {
      lab[i][j] = " ";
    }
  }
  for (let c = 0; c < field.length; c++) {
    lab[h][w] = field[c];
    w++;
    if (w >= line) {
      w = 0;
      h++;
    }
  }

  for (let i = 0; i < line; i++) {
    for (let j = 0; j < line; j++) {
      if (lab[i][j] == "S") {
        start.height = i;
        start.width = j;
      } else if (lab[i][j] == "T") {
        finish.height = i;
        finish.width = j;
      }
    }
  }

  var d = two_dimen_arr(d, 100000000000000, line);
  var used = two_dimen_arr(used, false, line);

  var ways = two_dimen_arr(ways, "", line);

  var directions = two_dimen_arr(directions, "", line);

  directions[start.height][start.width] = "north";
  d[start.height][start.width] = 0;
  used[start.height][start.width] = true;

  var nx = [];
  var ny = [];

  for (let i = 0; i < 4; i++) {
    nx[i] = start.width + delta_x[i];
    ny[i] = start.height + delta_y[i];

    if (
      0 <= nx[i] &&
      nx[i] < line &&
      0 <= ny[i] &&
      ny[i] < line &&
      lab[ny[i]][nx[i]] !== "#"
    ) {
      let from_turn = turn(
        directions[start.height][start.width],
        delta_y[i],
        delta_x[i]
      );

      directions[ny[i]][nx[i]] = from_turn[1];
      d[ny[i]][nx[i]] = d[start.height][start.width] + 1 + from_turn[0].length;
      ways[ny[i]][nx[i]] = ways[start.height][start.width] + from_turn[0] + "f";
    }
  }

  let point = FindLowestCost(d, used, line);

  while (point.height != undefined || point.width != undefined) {
    for (let i = 0; i < 4; i++) {
      nx[i] = point.width + delta_x[i];
      ny[i] = point.height + delta_y[i];

      if (
        0 <= nx[i] &&
        nx[i] < line &&
        0 <= ny[i] &&
        ny[i] < line &&
        lab[ny[i]][nx[i]] != "#" &&
        (nx[i] != start.width || ny[i] != start.height)
      ) {
        let from_turn = turn(
          directions[point.height][point.width],
          delta_y[i],
          delta_x[i]
        );

        let newCost = d[point.height][point.width] + 1 + from_turn[0].length;

        if (newCost < d[ny[i]][nx[i]]) {
          d[ny[i]][nx[i]] = newCost;
          directions[ny[i]][nx[i]] = from_turn[1];
          ways[ny[i]][nx[i]] =
            ways[point.height][point.width] + from_turn[0] + "f";
        }
      }
    }

    used[point.height][point.width] = true;
    point = FindLowestCost(d, used, line);
  }

  if (
    d[finish.height][finish.width] == 100000000000000 ||
    ways[finish.height][finish.width].length > power
  )
    ways[finish.height][finish.width] = "";

  return ways[finish.height][finish.width].split("");
}

const test_0 = "S..T";
const test_1 = "S..###.........T";
const test_2 = "S.T##....";
const test_3 = "T.S##....";
const test_4 = "S.#.####T";
const test_5 = "T..##.S..";
//console.log(getCommands("S###...##..........###...#.....##..T", 100));

console.log(getCommands(test_5, 100));
