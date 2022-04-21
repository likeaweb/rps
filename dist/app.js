"use strict";var userChoice,userChoiceValue,userChoiceResults,winUser="You win",winComputer="Computer wins",winAll="It's a tie! Everyone Wins!",userChoiceDisplay=document.getElementById("userChoiceDisplay"),computerChoiceDisplay=document.getElementById("computerChoiceDisplay"),resultDisplay=document.getElementById("resultDisplay"),btnPossibleChoices=document.querySelectorAll(".buttonChoice"),choices=[{name:"rock",image:"✊",key:"a",value:"rock",type:"traditional",index:0},{name:"paper",image:"✋",key:"s",value:"paper",type:"traditional",index:1},{name:"scissors",image:"✌️",key:"d",value:"scissors",type:"traditional",index:2}];function computerChoice(){var e=Math.random();return Math.floor(e*btnPossibleChoices.length)}function fetchUserChoice(){choices.forEach((function(e){if(userChoiceValue.includes(e.name||e.key)){userChoice=e.image;var t=e.index;return userChoiceResults=[userChoice,t]}return userChoiceResults}))}var roundResultInsert=document.createElement("p"),roundResult=function(e,t){e===t?(roundResultInsert.textContent=winAll,resultDisplay.appendChild(roundResultInsert)):(e+1)%3===t?(roundResultInsert.textContent=winComputer,resultDisplay.appendChild(roundResultInsert)):(roundResultInsert.textContent=winUser,resultDisplay.appendChild(roundResultInsert))},playRound=function(){var e=document.createElement("p"),t=document.createElement("p"),s=choices[computerChoice()],i=[s.image,s.index],n=i[1];return e.textContent=userChoice,e.classList.add("card__choice-result__choice"),t.textContent=choices[n].image,t.classList.add("card__choice-result__choice"),userChoiceDisplay.insertBefore(e,userChoiceDisplay.firstChild),computerChoiceDisplay.insertBefore(t,computerChoiceDisplay.firstChild),resultDisplay.textContent="".concat(userChoiceResults[0]," vs ").concat(i[0]),roundResult(userChoiceResults[1],i[1])};btnPossibleChoices.forEach((function(e){return e.addEventListener("click",(function(e){userChoiceValue=e.target.value,fetchUserChoice(),playRound()}))}));
//# sourceMappingURL=app.js.map