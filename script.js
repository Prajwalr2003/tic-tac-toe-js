let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

let count=0;
let isWinner=false;

const resetGame = () => {
  turn = true;
  isWinner=false;
  enableBoxes();
  msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
  box.addEventListener("click", ()=>{
    count++;
    console.log(count);
    if(turn){
      box.innerText = "X";
      turn=false;
    }else{
      box.innerText = "O";
      turn=true;
    }
    box.disabled = true;
    checkWinner();
  })
});

const checkWinner = () => {
  for(let pattern of winPatterns){
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
      if(pos1Val === pos2Val && pos2Val === pos3Val){
        disableBoxes();
        showWinner(pos1Val);
        isWinner=true;
      }
    }
  }
  if(count===9 && !isWinner){
    draw();
  }
};

const disableBoxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
}

const draw = () => {
  count=0;
  isWinner=false;
  msg.innerText = "It's a draw! No winner this time.";
  msgContainer.classList.remove("hide");
}

const showWinner = (winner) => {
  count=0;
  isWinner=false;
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);