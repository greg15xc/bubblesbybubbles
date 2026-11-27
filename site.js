/* Shared by every page: bubbles, footer, and the inquiry form */
(function(){
  // floating bubbles
  const layer=document.createElement("div");layer.id="bubbles";layer.setAttribute("aria-hidden","true");
  const N=matchMedia("(max-width:760px)").matches?9:16;
  for(let i=0;i<N;i++){
    const b=document.createElement("i");b.className="bub";
    const s=28+Math.random()*Math.random()*190;
    b.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*96}%;--dx:${(Math.random()-.5)*120}px;--t:${16+Math.random()*22}s;--d:${-Math.random()*30}s;--y:${Math.random()*85}vh`;
    layer.appendChild(b);
  }
  document.body.prepend(layer);

  // footer bits
  const ig=document.getElementById("ig");if(ig)ig.href=INSTAGRAM_URL;
  const yr=document.getElementById("yr");if(yr)yr.textContent=new Date().getFullYear();

  // inquiry dialog
  const dlg=document.createElement("dialog");
  dlg.innerHTML=`<form method="dialog" id="frm"><h3>Inquire</h3><p class="for" id="for"></p>
  <label>Your name<input id="n" required autocomplete="name"></label>
  <label>Your email<input id="e" type="email" required autocomplete="email"></label>
  <label>Message<textarea id="m" placeholder="Tell me what you love about this piece and where it would be shipped."></textarea></label>
  <div class="actions"><button class="btn" type="submit">Send inquiry</button><button class="link" type="button" id="cancel">Cancel</button></div></form>`;
  document.body.appendChild(dlg);
  const f=dlg.querySelector("#for");
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-inquire]");
    if(b){f.textContent=b.dataset.inquire;dlg.showModal();dlg.querySelector("#n").focus()}
  });
  dlg.querySelector("#cancel").onclick=()=>dlg.close();
  dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
  dlg.querySelector("#frm").addEventListener("submit",()=>{
    const t=f.textContent,n=dlg.querySelector("#n").value,em=dlg.querySelector("#e").value,m=dlg.querySelector("#m").value;
    const subject=encodeURIComponent("Inquiry: "+t);
    const body=encodeURIComponent(`Dear Bubbles,\n\nI’m interested in: ${t}\n\n${m}\n\n${n}\n${em}`);
    location.href=`mailto:${ARTIST_EMAIL}?subject=${subject}&body=${body}`;
  });
})();
