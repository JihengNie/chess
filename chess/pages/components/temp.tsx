let moveDown = true
let downCounter = 0
while (moveDown) {
  downCounter++
  if (checkCordsWithinBoard(yDirection + downCounter, xDirection)) {
    if (board![yDirection + downCounter][xDirection].split('-')[0] === 'Empty') {
      potentialSpaces.push([yDirection + downCounter, xDirection])
    } else if (piece === 'b-queen' && board![yDirection + downCounter][xDirection].split('-')[0] === 'b') {
      moveDown = false
    } else if (piece === 'w-queen' && board![yDirection + downCounter][xDirection].split('-')[0] === 'w') {
      moveDown = false
    } else if (piece === 'b-queen' && board![yDirection + downCounter][xDirection].split('-')[0] === 'w') {
      potentialSpaces.push([yDirection + downCounter, xDirection])
      moveDown = false
    } else if (piece === 'w-queen' && board![yDirection + downCounter][xDirection].split('-')[0] === 'b') {
      potentialSpaces.push([yDirection + downCounter, xDirection])
      moveDown = false
    }
  } else {
    moveDown = false
  }
}

let moveUp = true
let upCounter = 0
while (moveUp) {
  upCounter++
  if (checkCordsWithinBoard(yDirection - upCounter, xDirection)) {
    if (board![yDirection - upCounter][xDirection].split('-')[0] === 'Empty') {
      potentialSpaces.push([yDirection - upCounter, xDirection])
    } else if (piece === 'b-queen' && board![yDirection - upCounter][xDirection].split('-')[0] === 'b') {
      moveUp = false
    } else if (piece === 'w-queen' && board![yDirection - upCounter][xDirection].split('-')[0] === 'w') {
      moveUp = false
    } else if (piece === 'b-queen' && board![yDirection - upCounter][xDirection].split('-')[0] === 'w') {
      potentialSpaces.push([yDirection - upCounter, xDirection])
      moveUp = false
    } else if (piece === 'w-queen' && board![yDirection - upCounter][xDirection].split('-')[0] === 'b') {
      potentialSpaces.push([yDirection - upCounter, xDirection])
      moveUp = false
    }
  } else {
    moveUp = false
  }
}

let moveRight = true
let rightCounter = 0
while (moveRight) {
  rightCounter++
  if (checkCordsWithinBoard(yDirection, xDirection + rightCounter)) {
    if (board![yDirection][xDirection + rightCounter].split('-')[0] === 'Empty') {
      potentialSpaces.push([yDirection, xDirection + rightCounter])
    } else if (piece === 'b-queen' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'b') {
      moveRight = false
    } else if (piece === 'w-queen' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'w') {
      moveRight = false
    } else if (piece === 'b-queen' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'w') {
      potentialSpaces.push([yDirection, xDirection + rightCounter])
      moveRight = false
    } else if (piece === 'w-queen' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'b') {
      potentialSpaces.push([yDirection, xDirection + rightCounter])
      moveRight = false
    }
  } else {
    moveRight = false
  }
}

let moveLeft = true
let leftCounter = 0
while (moveLeft) {
  leftCounter++
  if (checkCordsWithinBoard(yDirection, xDirection - leftCounter)) {
    if (board![yDirection][xDirection - leftCounter].split('-')[0] === 'Empty') {
      potentialSpaces.push([yDirection, xDirection - leftCounter])
    } else if (piece === 'b-queen' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'b') {
      moveLeft = false
    } else if (piece === 'w-queen' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'w') {
      moveLeft = false
    } else if (piece === 'b-queen' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'w') {
      potentialSpaces.push([yDirection, xDirection - leftCounter])
      moveLeft = false
    } else if (piece === 'w-queen' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'b') {
      potentialSpaces.push([yDirection, xDirection - leftCounter])
      moveLeft = false
    }
  } else {
    moveLeft = false
  }
}
