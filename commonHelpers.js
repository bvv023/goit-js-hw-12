import{a as f,i as n}from"./assets/vendor-b9f84ab9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();async function p(r,t=1){const l="https://pixabay.com/api/",a="43225826-209ae09ba096a17ea4e8a3ec3";try{const e=await f.get(l,{params:{key:a,q:r,lang:"en",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}});if(!e.data.hits.length)throw new Error("No images found for the specified query.");return e.data}catch(e){throw console.error(e),new Error("Failed to fetch images. Please try again.")}}function $(){const r=document.querySelector(".gallery");r.innerHTML=""}function q(r){$();const t=document.querySelector(".gallery"),l=r.map(({webformatURL:a,largeImageURL:e,tags:s,likes:o,views:y,comments:u,downloads:d})=>`<li class="gallery-item">
          <a class="gallery-link" href="${e}">
            <img
              src="${a}"
              data-source="${e}"
              alt="${s}"
            />
            <ul class="gallery-description">
              <li class="gallery-dscr_item"><h3>Likes</h3><p>${o}</p></li>
              <li class="gallery-dscr_item"><h3>Views</h3><p>${y}</p></li>
              <li class="gallery-dscr_item"><h3>Comments</h3><p>${u}</p></li>
              <li class="gallery-dscr_item"><h3>Downloads</h3><p>${d}</p></li>
            </ul>
          </a>
        </li>`).join("");t.innerHTML=l}function w(r){const t=document.querySelector(".gallery"),l=r.map(({webformatURL:a,largeImageURL:e,tags:s,likes:o,views:y,comments:u,downloads:d})=>`<li class="gallery-item">
          <a class="gallery-link" href="${e}">
            <img
              src="${a}"
              data-source="${e}"
              alt="${s}"
            />
            <ul class="gallery-description">
              <li class="gallery-dscr_item"><h3>Likes</h3><p>${o}</p></li>
              <li class="gallery-dscr_item"><h3>Views</h3><p>${y}</p></li>
              <li class="gallery-dscr_item"><h3>Comments</h3><p>${u}</p></li>
              <li class="gallery-dscr_item"><h3>Downloads</h3><p>${d}</p></li>
            </ul>
          </a>
        </li>`).join("");t.innerHTML+=l}const m=document.querySelector(".form");document.querySelector(".gallery");const i=document.querySelector(".loader"),c=document.querySelector(".load-more");i.style.display="none";let g=1,h="";m.addEventListener("submit",async r=>{r.preventDefault();const t=m.querySelector('[name="search"]').value.trim();if(t){i.style.display="flex";try{const l=await p(t,1);l.hits.length||n.error({message:"Sorry, there are no images matching your search query. Please, try again!",close:!0}),h=t,g=1,q(l.hits),l.totalHits>g*15?c.style.display="block":c.style.display="none"}catch(l){console.error(l.message),n.error({message:"Failed to fetch images. Please try again.",close:!0})}finally{i.style.display="none"}}r.target.reset()});c.addEventListener("click",async()=>{i.style.display="flex";try{const r=await p(h,++g);if(!r.hits.length){n.info({message:"You have reached the end of search results.",close:!0}),c.style.display="none";return}w(r.hits);const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}catch(r){console.error(r.message),n.error({message:"Failed to fetch images. Please try again.",close:!0})}finally{i.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
