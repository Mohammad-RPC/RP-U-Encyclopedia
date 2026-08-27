const list = document.getElementById("characterList");

const page = document.getElementById("characterPage");

const search = document.getElementById("search");

let currentCharacter=null;

function createButtons(data){

list.innerHTML="";

data.forEach((c,index)=>{

const btn=document.createElement("button");

btn.className="characterButton";

btn.innerHTML="👤 "+c.name;

btn.onclick=()=>showCharacter(c,index);

list.appendChild(btn);

});

}

createButtons(characters);

function searchCharacters(){

const text = search.value.trim();

const itemFilter = document.getElementById("itemFilter").value;

const vehicleFilter = document.getElementById("vehicleFilter").value;

const typeFilter = document.getElementById("typeFilter").value;

const result = characters.filter(c=>{

const textMatch =

c.name.includes(text) ||

c.job.includes(text) ||

c.type.includes(text) ||

c.level.includes(text) ||

c.workplace.includes(text) ||

c.vehicle.includes(text) ||

c.items.join(" ").includes(text) ||

c.description.includes(text);

const itemMatch =

itemFilter=="all" ||

(itemFilter=="yes" && c.items.length>0) ||

(itemFilter=="no" && c.items.length==0);

const vehicleMatch =

vehicleFilter=="all" ||

(vehicleFilter=="yes" && c.vehicle!="ندارد") ||

(vehicleFilter=="no" && c.vehicle=="ندارد");

const typeMatch =

typeFilter=="all" ||

c.type==typeFilter;

return textMatch && itemMatch && vehicleMatch && typeMatch;

});

createButtons(result);

const noResult=document.getElementById("noResult");

if(result.length==0){

noResult.style.display="block";

}else{

noResult.style.display="none";

}

}

function showCharacter(c,index){

currentCharacter=c;

list.style.display="none";
search.parentElement.style.display="none";
document.getElementById("filters").style.display="none";

page.classList.remove("hidden");

document.getElementById("charImage").src = c.image;

document.getElementById("charName").innerHTML="👤 "+c.name;

document.getElementById("charJob").innerHTML=c.job;

const type=document.getElementById("charType");

let color="#666";

switch(c.type){

case "عادی":
color="#FFFDD0";
break;

case "معمولی":
color="#848482";
break;

case "کمیاب":
color="#00A86B";
break;

case "حماسی":
color="#BF00FF";
break;

case "افسانه‌ای":
color="#E6B31E";
break;

}

type.innerHTML=
`<span style="
background:${color};
color:white;
padding:5px 12px;
border-radius:10px;
font-weight:bold;
display:inline-block;
">
${c.type}
</span>`;

document.getElementById("charLevel").innerHTML=c.level;

document.getElementById("charPlace").innerHTML=c.workplace;

document.getElementById("charVehicle").innerHTML=c.vehicle;

const items=document.getElementById("charItems");

items.innerHTML="";

if(c.items.length==0){

items.innerHTML="<li>ندارد</li>";

}else{

c.items.forEach(i=>{

let item = i.replace(
"🫥",
'<img src="omelet.png" style="width:24px;height:24px;vertical-align:middle;object-fit:contain;">'
);

items.innerHTML+="<li>"+item+"</li>";

});

}

document.getElementById("charDescription").innerHTML=
c.description=="" ? "ندارد" : c.description;

list.style.display="none";

search.parentElement.style.display="none";

page.classList.remove("hidden");

const colors=[

"#FFE0B2",

"#E3F2FD",

"#F3E5F5",

"#E8F5E9",

"#FFF3E0",

"#FCE4EC",

"#E0F7FA",

"#F9FBE7",

"#EDE7F6",

"#FFF8E1"

];

document.body.style.background=colors[index%colors.length];

document.getElementById("backBtn").style.display = "block";

}

function goBack(){

document.getElementById("noResult").style.display="none";

page.classList.add("hidden");

list.style.display="grid";

search.parentElement.style.display="block";

document.getElementById("filters").style.display="block";

document.body.style.background="linear-gradient(135deg,#bfefff,#b8f5c7)";

document.getElementById("backBtn").style.display = "none";

}

function copyCharacter(){

if(!currentCharacter)return;

let text=
`👤 نام: ${currentCharacter.name}

💼 شغل: ${currentCharacter.job}

🎭 نوع اسکین: ${currentCharacter.type}

⭐ سطح موردنیاز: ${currentCharacter.level}

📍 محل کار: ${currentCharacter.workplace}

🚗 وسیله نقلیه: ${currentCharacter.vehicle}

🎒 آیتم ها:
${currentCharacter.items.length?currentCharacter.items.join("\n"):"ندارد"}

📝 توضیحات:
${currentCharacter.description==""?"ندارد":currentCharacter.description}
`;

navigator.clipboard.writeText(text);

alert("اطلاعات "+currentCharacter.name+" کپی شد! ✔️");

}
