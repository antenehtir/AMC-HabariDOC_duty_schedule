// May 2025 night-shift pattern (31 days)
const mayPattern = [
  { opd:"Dr. Lewam", ward:"Dr. Ribka" },    // 1
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // 2
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // 3
  { opd:"Dr. Lewam", ward:"Dr. Ribka" },    // 4
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // 5
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // 6
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // 7
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // 8
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // 9
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // 10
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // 11
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // 12
  { opd:"Dr. Lewam", ward:"Dr. Ribka" },    // 13
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // 14
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // 15
  { opd:"Dr. Lewam", ward:"Dr. Ribka" },    // 16
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // 17
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // 18
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // 19
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // 20
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // 21
  { opd:"Dr. Ribka", ward:"Dr. Lewam" },    // 22
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // 23
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // 24
  { opd:"Dr. Lewam", ward:"Dr. Ribka" },    // 25
  { opd:"Dr. Eden", ward:"Dr. Dawit" },     // 26
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // 27
  { opd:"Dr. Lewam", ward:"Dr. Ribka" },    // 28
  { opd:"Dr. Dawit", ward:"Dr. Eden" },     // 29
  { opd:"Dr. Genet", ward:"Dr. Helina" },   // 30
  { opd:"Dr. Ribka", ward:"Dr. Lewam" }      // 31
];

// Helpers
function getNightDuty(date) {
  const idx = (date.getDate() - 1) % mayPattern.length;
  return mayPattern[idx];
}
function getDayShiftDuty() {
  return { opd:"Dr. Miftah", ward:"Dr. Genet" };
}
function effectiveDate(d) {
  let e = new Date(d);
  if (d.getHours() < 8) e.setDate(e.getDate() - 1);
  return e;
}
function isWeekend(d) {
  const wd = d.getDay();
  return wd === 0 || wd === 6;
}

// Tab logic
function openTab(evt,name){
  document.querySelectorAll('.tabcontent').forEach(tc=>tc.style.display='none');
  document.querySelectorAll('.tablinks').forEach(tb=>tb.classList.remove('active'));
  document.getElementById(name).style.display='block';
  evt.currentTarget.classList.add('active');
}
document.getElementById('defaultOpen').click();

// Render table
function renderTable(rows){
  let html = `<table class="duty-table">
    <tr><th>Shift</th><th>OPD & ER</th><th>Ward & ICU</th></tr>`;
  rows.forEach(r=>{
    html += `<tr>
      <td>${r.shift}</td>
      <td>${r.opd}<button class="call-btn" onclick="callDoctor('${r.opd}')">Call</button></td>
      <td>${r.ward}<button class="call-btn" onclick="callDoctor('${r.ward}')">Call</button></td>
    </tr>`;
  });
  return html + `</table>`;
}

// Today's duty
function displayTodayDuty(){
  const now = new Date(), disp = document.getElementById('todayDisplay');
  let rows = [];
  if (now.getHours() < 8) {
    const ed = effectiveDate(now), d = getNightDuty(ed);
    rows.push({shift:'Night Shift',opd:d.opd,ward:d.ward});
  } else if (isWeekend(now)) {
    const d = getNightDuty(now);
    rows.push({shift:'Night Shift',opd:d.opd,ward:d.ward});
  } else {
    rows.push(Object.assign({shift:'Day Shift'}, getDayShiftDuty()));
    const d = getNightDuty(now);
    rows.push({shift:'Night Shift',opd:d.opd,ward:d.ward});
  }
  disp.innerHTML = `<p><strong>Date:</strong> ${now.toLocaleDateString()}</p>` + renderTable(rows);
}
displayTodayDuty();

// Call action
function callDoctor(name){
  const nums = {
    "Dr. Dawit":"+251920192199","Dr. Eden":"+251932689445",
    "Dr. Ribka":"+251923800544","Dr. Genet":"+251921931429",
    "Dr. Helina":"+251913110147","Dr. Lewam":"+251934343144",
    "Dr. Miftah":"+251912280307"
  };
  if (nums[name]) window.location.href=`tel:${nums[name]}`;
  else alert('Number not available');
}

// Select date
document.getElementById('dateForm').addEventListener('submit', e=>{
  e.preventDefault();
  const d = new Date(document.getElementById('dateInput').value),
        s = document.getElementById('shiftSelect').value,
        disp = document.getElementById('selectedDisplay');
  let rows = [];
  if (isWeekend(d) || s === 'night') {
    const nd = getNightDuty(d);
    rows.push({shift:'Night Shift',opd:nd.opd,ward:nd.ward});
  }
  if (!isWeekend(d) && s === 'day') {
    rows.push(Object.assign({shift:'Day Shift'}, getDayShiftDuty()));
  }
  disp.innerHTML = `<p><strong>Date:</strong> ${d.toLocaleDateString()}</p>` + renderTable(rows);
});

// Populate months
const moSel = document.getElementById('monthSelect'),
      monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
monthNames.forEach((m,i)=>{ let o=document.createElement('option'); o.value=i; o.text=m; moSel.add(o); });

// PDF export
document.getElementById('downloadForm').addEventListener('submit', e=>{
  e.preventDefault();
  const m = parseInt(moSel.value), y = document.getElementById('yearSelect').value,
        days = new Date(y,m+1,0).getDate(),
        { jsPDF } = window.jspdf, doc = new jsPDF();
  let txt = `Night Shift Schedule for ${monthNames[m]} ${y}\n\nDate\tOPD & ER\tWard & ICU\n`;
  for (let d=1; d<=days; d++){
    let dt=new Date(y,m,d), nd=getNightDuty(dt);
    txt += `${y}-${m+1}-${d}\t${nd.opd}\t${nd.ward}\n`;
  }
  const lines = doc.splitTextToSize(txt,180);
  doc.setFontSize(12);
  doc.text(lines,10,10);
  doc.save(`NightShift_${y}_${m+1}.pdf`);
});
