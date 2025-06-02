// -----------------------------
// === Departmental (AMC) ===
// -----------------------------
// June 2025 “night‐shift” pattern (30 days)
const deptPattern = [
  { opd:"Dr. Eden",   ward:"Dr. Dawit" },   // Jun 1
  { opd:"Dr. Genet",  ward:"Dr. Helina" },  // Jun 2
  { opd:"Dr. Ribka",  ward:"Dr. Lewam" },   // Jun 3
  { opd:"Dr. Dawit",  ward:"Dr. Eden" },    // Jun 4
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // Jun 5
  { opd:"Dr. Lewam",  ward:"Dr. Ribka" },   // Jun 6
  { opd:"Dr. Dawit",  ward:"Dr. Eden" },    // Jun 7
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // Jun 8
  { opd:"Dr. Lewam",  ward:"Dr. Ribka" },   // Jun 9
  { opd:"Dr. Eden",   ward:"Dr. Dawit" },   // Jun 10
  { opd:"Dr. Genet",  ward:"Dr. Helina" },  // Jun 11
  { opd:"Dr. Ribka",  ward:"Dr. Lewam" },   // Jun 12
  { opd:"Dr. Eden",   ward:"Dr. Dawit" },   // Jun 13
  { opd:"Dr. Genet",  ward:"Dr. Helina" },  // Jun 14
  { opd:"Dr. Ribka",  ward:"Dr. Lewam" },   // Jun 15
  { opd:"Dr. Dawit",  ward:"Dr. Eden" },    // Jun 16
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // Jun 17
  { opd:"Dr. Lewam",  ward:"Dr. Ribka" },   // Jun 18
  { opd:"Dr. Dawit",  ward:"Dr. Eden" },    // Jun 19
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // Jun 20
  { opd:"Dr. Lewam",  ward:"Dr. Ribka" },   // Jun 21
  { opd:"Dr. Eden",   ward:"Dr. Dawit" },   // Jun 22
  { opd:"Dr. Genet",  ward:"Dr. Helina" },  // Jun 23
  { opd:"Dr. Ribka",  ward:"Dr. Lewam" },   // Jun 24
  { opd:"Dr. Eden",   ward:"Dr. Dawit" },   // Jun 25
  { opd:"Dr. Genet",  ward:"Dr. Helina" },  // Jun 26
  { opd:"Dr. Ribka",  ward:"Dr. Lewam" },   // Jun 27
  { opd:"Dr. Dawit",  ward:"Dr. Eden" },    // Jun 28
  { opd:"Dr. Helina", ward:"Dr. Genet" },   // Jun 29
  { opd:"Dr. Lewam",  ward:"Dr. Ribka" }    // Jun 30
];

// Repeat for any month:
function getDeptNightDuty(date) {
  const idx = (date.getDate() - 1) % deptPattern.length;
  return deptPattern[idx];
}
// Weekday day‐shift always Dr Genet:
function getDeptDayDuty() {
  return { opd:"Dr. Genet", ward:"Dr. Genet" };
}

// If before 08:00, previous night:
function getEffectiveDeptDate(now) {
  let e = new Date(now);
  if (now.getHours() < 8) e.setDate(e.getDate() - 1);
  return e;
}
function isWeekend(date) {
  const wd = date.getDay(); // 0=Sun,6=Sat
  return wd === 0 || wd === 6;
}

// -----------------------------
// === Call‐Center GPs ===
// -----------------------------
// Corrected June 2025 patterns:
const ccDayPattern   = [
  "Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden",
  "Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden",
  "Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden",
  "Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden",
  "Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden"
];
const ccNightPattern = [
  "Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes",
  "Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes",
  "Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes",
  "Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes",
  "Dr. Eden","Dr. Miraf","Dr. Mekdes","Dr. Eden","Dr. Miraf","Dr. Mekdes"
];

function getCCDayDuty(date) {
  const idx = (date.getDate() - 1) % ccDayPattern.length;
  return ccDayPattern[idx];
}
function getCCNightDuty(date) {
  const idx = (date.getDate() - 1) % ccNightPattern.length;
  return ccNightPattern[idx];
}

// Phone numbers
const phoneBook = {
  "Dr. Dawit":  "+251920192199",
  "Dr. Eden":   "+251932689445",
  "Dr. Ribka":  "+251923800544",
  "Dr. Genet":  "+251921931429",
  "Dr. Helina": "+251913110147",
  "Dr. Lewam":  "+251934343144",
  "Dr. Miraf":  "+251929040370",
  "Dr. Mekdes": "+251931521741"
};

// ==============================
// === TAB & DISPLAY LOGIC  ===
// ==============================
function openTab(evt, tabName) {
  document.querySelectorAll(".tabcontent").forEach(tc => tc.style.display = "none");
  document.querySelectorAll(".tablinks").forEach(tb => tb.classList.remove("active"));
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}
document.getElementById("defaultOpen").click();

// Show/hide shift dropdowns based on category:
document.getElementById("formCategory").addEventListener("change", e => {
  const cat = e.target.value;
  if (cat === "amc") {
    document.getElementById("amcControls").style.display = "";
    document.getElementById("habariControls").style.display = "none";
  } else {
    document.getElementById("amcControls").style.display = "none";
    document.getElementById("habariControls").style.display = "";
  }
});

// Render a “Call” button:
function callButton(gpName) {
  const num = phoneBook[gpName] || "";
  return `<button class="call-btn" onclick="window.location.href='tel:${num}'">Call</button>`;
}

// Render AMC departmental table:
function renderAMCTable(title, rows) {
  if (!rows.length) return "";
  let html = `<div class="table-section"><h3>${title}</h3>
    <table class="duty-table">
      <tr><th>Shift</th><th>OPD & ER</th><th>Ward & ICU</th></tr>`;
  rows.forEach(r => {
    html += `<tr>
      <td>${r.shift}</td>
      <td>${r.opd} ${callButton(r.opd)}</td>
      <td>${r.ward} ${callButton(r.ward)}</td>
    </tr>`;
  });
  html += `</table></div>`;
  return html;
}

// Render HabariDOC call-center table:
function renderHabariTable(title, rows) {
  if (!rows.length) return "";
  let html = `<div class="table-section"><h3>${title}</h3>
    <table class="duty-table">
      <tr><th>Shift</th><th>GP</th></tr>`;
  rows.forEach(r => {
    html += `<tr>
      <td>${r.shift}</td>
      <td>${r.gp} ${callButton(r.gp)}</td>
    </tr>`;
  });
  html += `</table></div>`;
  return html;
}

// === Display “Today’s Duty” ===
function displayToday() {
  const now = new Date();

  // AMC Departmental
  let deptRows = [];
  if (now.getHours() < 8) {
    const eff = getEffectiveDeptDate(now);
    const d = getDeptNightDuty(eff);
    if (isWeekend(eff)) {
      // Weekend 24h duty
      deptRows.push({ shift: "24 Hr Duty", opd: d.opd, ward: d.ward });
    } else {
      // Weekday
      const dayD = getDeptDayDuty();
      deptRows.push({ shift: "Day Shift", opd: dayD.opd, ward: dayD.ward });
      deptRows.push({ shift: "Night Shift", opd: d.opd, ward: d.ward });
    }
  } else {
    if (isWeekend(now)) {
      const d = getDeptNightDuty(now);
      deptRows.push({ shift: "24 Hr Duty", opd: d.opd, ward: d.ward });
    } else {
      const dayD = getDeptDayDuty();
      deptRows.push({ shift: "Day Shift", opd: dayD.opd, ward: dayD.ward });
      const n = getDeptNightDuty(now);
      deptRows.push({ shift: "Night Shift", opd: n.opd, ward: n.ward });
    }
  }
  document.getElementById("todayDepartment").innerHTML =
    `<p><strong>Date:</strong> ${now.toLocaleDateString()}</p>` +
    renderAMCTable("AMC GP Schedule", deptRows);

  // HabariDOC Call-Center
  let ccRows = [];
  if (now.getHours() < 8) {
    const eff = getEffectiveDeptDate(now);
    const gpN = getCCNightDuty(eff);
    ccRows.push({ shift: "Night Shift", gp: gpN });
  } else {
    // Always show both Day and Night (weekdays & weekends alike)
    const gpD = getCCDayDuty(now);
    const gpN = getCCNightDuty(now);
    ccRows.push({ shift: "Day Shift", gp: gpD });
    ccRows.push({ shift: "Night Shift", gp: gpN });
  }
  document.getElementById("todayCallCenter").innerHTML =
    renderHabariTable("HabariDOC Call Center GPs Schedule", ccRows);
}
displayToday();

// === “Select Date” Form ===
document.getElementById("dateForm").addEventListener("submit", e => {
  e.preventDefault();
  const cat = document.getElementById("formCategory").value;
  const sel = document.getElementById("dateInput").value;
  if (!sel) return;
  const dt = new Date(sel);

  // AMC
  if (cat === "amc") {
    let deptRows = [];
    if (isWeekend(dt)) {
      // Weekend always 24 Hr Duty
      const d = getDeptNightDuty(dt);
      deptRows.push({ shift: "24 Hr Duty", opd: d.opd, ward: d.ward });
    } else {
      // Weekday branches
      if (document.getElementById("deptShiftSelect").value === "day") {
        const dayD = getDeptDayDuty();
        deptRows.push({ shift: "Day Shift", opd: dayD.opd, ward: dayD.ward });
      }
      if (document.getElementById("deptShiftSelect").value === "night") {
        const d = getDeptNightDuty(dt);
        deptRows.push({ shift: "Night Shift", opd: d.opd, ward: d.ward });
      }
    }
    document.getElementById("selectedDept").innerHTML =
      `<p><strong>Date:</strong> ${dt.toLocaleDateString()}</p>` +
      renderAMCTable("AMC GP Schedule", deptRows);
    document.getElementById("selectedCallCenter").innerHTML = "";
  }
  // HabariDOC
  else {
    let ccRows = [];
    if (document.getElementById("ccShiftSelect").value === "day") {
      const gpD = getCCDayDuty(dt);
      ccRows.push({ shift: "Day Shift", gp: gpD });
    }
    if (document.getElementById("ccShiftSelect").value === "night") {
      const gpN = getCCNightDuty(dt);
      ccRows.push({ shift: "Night Shift", gp: gpN });
    }
    document.getElementById("selectedCallCenter").innerHTML =
      `<p><strong>Date:</strong> ${dt.toLocaleDateString()}</p>` +
      renderHabariTable("HabariDOC Call Center GPs Schedule", ccRows);
    document.getElementById("selectedDept").innerHTML = "";
  }
});

// === Reset Button ===
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("dateForm").reset();
  document.getElementById("selectedDept").innerHTML = "";
  document.getElementById("selectedCallCenter").innerHTML = "";
  // Reset visible controls
  document.getElementById("amcControls").style.display = "";
  document.getElementById("habariControls").style.display = "none";
});

// === “Download Schedule” Tab ===
(function populateMonthDropdown() {
  const moSel = document.getElementById("monthSelect");
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  monthNames.forEach((m, i) => {
    const o = document.createElement("option");
    o.value = i;
    o.text = m;
    moSel.appendChild(o);
  });
})();

document.getElementById("downloadForm").addEventListener("submit", e => {
  e.preventDefault();
  const category = document.getElementById("categorySelect").value;
  const month = parseInt(document.getElementById("monthSelect").value);
  const year = document.getElementById("yearSelect").value;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  if (category === "amc") {
    // Columns: Date, Shift, OPD & ER, Ward & ICU
    const columns = ["Date", "Shift", "OPD & ER", "Ward & ICU"];
    const rows = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(year, month, d);
      if (dt.getDay() === 0 || dt.getDay() === 6) {
        // Weekend: single 24 Hr Duty
        const duty = getDeptNightDuty(dt);
        rows.push([
          `${year}-${month+1}-${d}`,
          "24 Hr Duty",
          duty.opd,
          duty.ward
        ]);
      } else {
        // Weekday: list Day + Night
        const dayD = getDeptDayDuty();
        rows.push([
          `${year}-${month+1}-${d}`,
          "Day Shift",
          dayD.opd,
          dayD.ward
        ]);
        const duty = getDeptNightDuty(dt);
        rows.push([
          `${year}-${month+1}-${d}`,
          "Night Shift",
          duty.opd,
          duty.ward
        ]);
      }
    }
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20
    });
    doc.text(`AMC GP Schedule — ${document.getElementById("monthSelect").selectedOptions[0].text} ${year}`, 14, 12);
    doc.save(`AMC_Schedule_${year}_${month+1}.pdf`);
  } else {
    // HabariDOC: Columns: Date, Shift, GP
    const columns = ["Date", "Shift", "GP"];
    const rows = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(year, month, d);
      // Weekday & Weekend: list Day + Night
      const gpD = getCCDayDuty(dt);
      rows.push([`${year}-${month+1}-${d}`, "Day Shift", gpD]);
      const gpN = getCCNightDuty(dt);
      rows.push([`${year}-${month+1}-${d}`, "Night Shift", gpN]);
    }
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20
    });
    doc.text(`HabariDOC Call Center GPs — ${document.getElementById("monthSelect").selectedOptions[0].text} ${year}`, 14, 12);
    doc.save(`HabariDOC_CallCenter_${year}_${month+1}.pdf`);
  }
});
