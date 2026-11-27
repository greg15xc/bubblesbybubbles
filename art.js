/* Draws the gallery on work.html from the ART list in config.js */
const tones=[["#ffd0e5","#ff6fb2"],["#ffe3ef","#ff8fc2"],["#ffb3d5","#ff4fa0"],["#fff0f6","#ff9fcb"],["#ffc2dd","#e8197d"],["#ffdcea","#ff7ab8"]];
function placeholder(i){
  const [a,b]=tones[i%tones.length];let c="";
  for(let k=0;k<5;k++){const x=55+((i*37+k*61)%190),y=65+((i*29+k*83)%240),r=20+((i*13+k*29)%56);
    c+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" fill-opacity=".25" stroke="#fff" stroke-width="2.5"/><circle cx="${x-r*.35}" cy="${y-r*.4}" r="${r*.13}" fill="#fff"/>`}
  return `<svg viewBox="0 0 300 375" role="img" aria-label="Placeholder artwork"><defs><linearGradient id="l${i}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="300" height="375" fill="url(#l${i})"/>${c}</svg>`;
}
const grid=document.getElementById("grid");
ART.forEach((p,i)=>{
  const sold=p.status==="sold";
  const el=document.createElement("article");
  el.className="piece"+(sold?" is-sold":"");
  el.innerHTML=`<figure>${p.img?`<img src="${p.img}" alt="${p.title}, ${p.medium}" loading="lazy">`:placeholder(i)}</figure>
  <h3>${p.title}</h3><div class="meta">${p.medium}, ${p.size}</div>
  <div class="row">${sold?'<span class="sold">Sold</span>':`<span>${p.price||"Price on request"}</span><button class="link" data-inquire="${p.title}">Inquire</button>`}</div>`;
  grid.appendChild(el);
});
