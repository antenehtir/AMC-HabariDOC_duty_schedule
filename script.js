// May 2025 night-shift pattern (31 days)
const mayPattern = [
  { opd:"Dr. Lewam", ward:"Dr. Ribka" },    // May 1
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // May 2
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // May 3
  { opd:"Dr. Lewam", ward:"Dr. Ribka" },    // May 4
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // May 5
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // May 6
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // May 7
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // May 8
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // May 9
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // May 10
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // May 11
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // May 12
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // May 13
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // May 14
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // May 15
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // May 16
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // May 17
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // May 18
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // May 19
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // May 20
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // May 21
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // May 22
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // May 23
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // May 24
  { opd:"Dr. Lewam", ward:"Dr. Ribka" },    // May 25
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // May 26
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // May 27
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // May 28
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // May 29
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // May 30
  { opd:"Dr. Dawit", ward:"Dr. Eden" }      // May 31
];

function getNightDuty(date) {
  const idx = (date.getDate()-1) % mayPattern.length;
  return mayPattern[idx];
}
function getDayShiftDuty() {
  return { opd:"Dr. Miftah", ward:"Dr. Genet" };
}
function effectiveDate(d) {
  let e=new Date(d);
  if(d.getHours()<8) e.setDate(e.getDate()-1);
  return e;
}
function isWeekend(d) {
  const wd=d.getDay(); return wd===0||wd===6;
}

function openTab(evt,name){
  document.querySelectorAll('.tabcontent').forEach(tc=>tc.style.display='none');
  document.querySelectorAll('.tablinks').forEach(tb=>tb.classList.remove('active'));
  document.getElementById(name).style.display='block';
  evt.currentTarget.classList.add('active');
}
document.getElementById('defaultOpen').click();

function renderTable(rows){
  let html=`<table class="duty-table"><tr>
    <th>Shift</th><th>OPD & ER</th><th>Ward & ICU</th>
  </tr>`;
  rows.forEach(r=>{
    html+=`<tr>
      <td>${r.shift}</td>
      <td>${r.opd}<button class="call-btn" onclick="callDoctor('${r.opd}')"> ☎ </button></td>
      <td>${r.ward}<button class="call-btn" onclick="callDoctor('${r.ward}')"> ☎ </button></td>
    </tr>`;
  });
  return html+'</table>';
}

function displayTodayDuty(){
  const now=new Date(), disp=document.getElementById('todayDisplay');
  let rows=[];
  if(now.getHours()<8){
    const ed=effectiveDate(now), d=getNightDuty(ed);
    rows.push({shift:'Night Shift',opd:d.opd,ward:d.ward});
  } else if(isWeekend(now)){
    const d=getNightDuty(now);
    rows.push({shift:'Night Shift',opd:d.opd,ward:d.ward});
  } else {
    rows.push(Object.assign({shift:'Day Shift'},getDayShiftDuty()));
    const d=getNightDuty(now);
    rows.push({shift:'Night Shift',opd:d.opd,ward:d.ward});
  }
  disp.innerHTML=`<p><strong>Date:</strong> ${now.toLocaleDateString()}</p>`+renderTable(rows);
}
displayTodayDuty();

function callDoctor(n){
  const nums={
    "Dr. Dawit":"+251920192199","Dr. Eden":"+251932689445",
    "Dr. Ribka":"+251923800544","Dr. Genet":"+251921931429",
    "Dr. Helina":"+251913110147","Dr. Lewam":"+251934343144",
    "Dr. Miftah":"+251912280307"
  };
  if(nums[n]) window.location.href=`tel:${nums[n]}`;
  else alert('Number not available');
}

document.getElementById('dateForm').addEventListener('submit',e=>{
  e.preventDefault();
  const d=new Date(document.getElementById('dateInput').value),
        s=document.getElementById('shiftSelect').value,
        disp=document.getElementById('selectedDisplay');
  let rows=[];
  if(isWeekend(d)||s==='night'){
    let nd=getNightDuty(d);
    rows.push({shift:'Night Shift',opd:nd.opd,ward:nd.ward});
  }
  if(!isWeekend(d)&&s==='day'){
    rows.push(Object.assign({shift:'Day Shift'},getDayShiftDuty()));
  }
  disp.innerHTML=`<p><strong>Date:</strong> ${d.toLocaleDateString()}</p>`+renderTable(rows);
});

const moSel=document.getElementById('monthSelect'),
      monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
monthNames.forEach((m,i)=>{ let o=document.createElement('option');o.value=i;o.text=m;moSel.add(o); });

document.getElementById('downloadForm').addEventListener('submit',e=>{
  e.preventDefault();
  const m=parseInt(moSel.value), y=document.getElementById('yearSelect').value,
        days=new Date(y,m+1,0).getDate(),
        { jsPDF }=window.jspdf,
        doc=new jsPDF();
  let txt=`Night Shift Schedule for ${monthNames[m]} ${y}\n\nDate\tOPD & ER\tWard & ICU\n`;
  for(let d=1;d<=days;d++){
    const dt=new Date(y,m,d),
          nd=getNightDuty(dt);
    txt+=`${y}-${m+1}-${d}\t${nd.opd}\t${nd.ward}\n`;
  }
  const lines=doc.splitTextToSize(txt,180);
  doc.setFontSize(12);
  doc.text(lines,10,10);
  doc.save(`NightShift_${y}_${m+1}.pdf`);
});
