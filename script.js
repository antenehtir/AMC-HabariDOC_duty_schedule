// --- Night Shift Pattern from April ---
// April pattern for 30 days as provided.
const aprilPattern = [
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },   // April 1
  { opd: "Dr. Dawit", ward: "Dr. Eden" },      // April 2
  { opd: "Dr. Genet", ward: "Dr. Helina" },     // April 3
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },      // April 4
  { opd: "Dr. Eden", ward: "Dr. Dawit" },       // April 5
  { opd: "Dr. Helina", ward: "Dr. Genet" },     // April 6
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },      // April 7
  { opd: "Dr. Eden", ward: "Dr. Dawit" },       // April 8
  { opd: "Dr. Helina", ward: "Dr. Genet" },     // April 9
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },      // April 10
  { opd: "Dr. Dawit", ward: "Dr. Eden" },       // April 11
  { opd: "Dr. Genet", ward: "Dr. Helina" },     // April 12
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },      // April 13
  { opd: "Dr. Dawit", ward: "Dr. Eden" },       // April 14
  { opd: "Dr. Genet", ward: "Dr. Helina" },     // April 15
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },      // April 16
  { opd: "Dr. Eden", ward: "Dr. Dawit" },       // April 17
  { opd: "Dr. Helina", ward: "Dr. Genet" },     // April 18
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },      // April 19
  { opd: "Dr. Eden", ward: "Dr. Dawit" },       // April 20
  { opd: "Dr. Helina", ward: "Dr. Genet" },     // April 21
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },      // April 22
  { opd: "Dr. Dawit", ward: "Dr. Eden" },       // April 23
  { opd: "Dr. Genet", ward: "Dr. Helina" },     // April 24
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },      // April 25
  { opd: "Dr. Dawit", ward: "Dr. Eden" },       // April 26
  { opd: "Dr. Genet", ward: "Dr. Helina" },     // April 27
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },      // April 28
  { opd: "Dr. Eden", ward: "Dr. Dawit" },       // April 29
  { opd: "Dr. Helina", ward: "Dr. Genet" }      // April 30
];

// For any given date, use the April pattern repeatedly.
// (Use day-of-month modulo 30; if day is 31, it wraps to index 0.)
function getNightDuty(date) {
  const day = date.getDate();
  const index = (day - 1) % 30;
  return aprilPattern[index];
}

// Fixed Day Shift for Weekdays
// Current assignment:
//   OPD and ER: Dr. Genet
//   Ward and ICU: Dr. Miftah
function getDayShiftDuty(date) {
  return { opd: "Dr. Genet", ward: "Dr. Miftah" };
}

// If current time is before 8 AM, use the previous day's night duty.
function getEffectiveNightDate(date) {
  const effective = new Date(date);
  if (date.getHours() < 8) {
    effective.setDate(effective.getDate() - 1);
  }
  return effective;
}

// --- Tab Switching ---
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

// Check if a date is weekend (Saturday or Sunday)
function isWeekend(date) {
  const day = date.getDay();
  return (day === 0 || day === 6);
}

// --- Display Today's Duty in Table Format ---
function displayTodayDuty() {
  const now = new Date();
  const display = document.getElementById("todayDisplay");
  let html = `<p><strong>Date:</strong> ${now.toLocaleDateString()}</p>`;
  
  // Build a table for duty display
  html += `<table class="duty-table">
    <tr>
      <th>Shift</th>
      <th>OPD and ER</th>
      <th>Ward and ICU</th>
    </tr>`;
  
  if (now.getHours() < 8) {
    // Before 8 AM: show previous day's night shift.
    const effectiveDate = getEffectiveNightDate(now);
    const duty = getNightDuty(effectiveDate);
    html += `<tr>
      <td>Night Shift</td>
      <td>${duty.opd} <button onclick="callDoctor('${duty.opd}')">Call</button></td>
      <td>${duty.ward} <button onclick="callDoctor('${duty.ward}')">Call</button></td>
    </tr>
    <tr><td colspan="3"><em>(Effective Date: ${effectiveDate.toLocaleDateString()})</em></td></tr>`;
  } else {
    if (isWeekend(now)) {
      // Weekends: show only night shift.
      const duty = getNightDuty(now);
      html += `<tr>
        <td>Night Shift</td>
        <td>${duty.opd} <button onclick="callDoctor('${duty.opd}')">Call</button></td>
        <td>${duty.ward} <button onclick="callDoctor('${duty.ward}')">Call</button></td>
      </tr>`;
    } else {
      // Weekdays: show both day and night shifts.
      const dayDuty = getDayShiftDuty(now);
      const nightDuty = getNightDuty(now);
      html += `<tr>
        <td>Day Shift</td>
        <td>${dayDuty.opd} <button onclick="callDoctor('${dayDuty.opd}')">Call</button></td>
        <td>${dayDuty.ward} <button onclick="callDoctor('${dayDuty.ward}')">Call</button></td>
      </tr>
      <tr>
        <td>Night Shift</td>
        <td>${nightDuty.opd} <button onclick="callDoctor('${nightDuty.opd}')">Call</button></td>
        <td>${nightDuty.ward} <button onclick="callDoctor('${nightDuty.ward}')">Call</button></td>
      </tr>`;
    }
  }
  html += `</table>`;
  display.innerHTML = html;
}

// --- Call Action ---
function callDoctor(doctor) {
  const numbers = {
    "Dr. Dawit": "+251920192199",
    "Dr. Eden": "+251932689445",
    "Dr. Ribka": "+251923800544",
    "Dr. Genet": "+251921931429",
    "Dr. Helina": "+251913110147",
    "Dr. Lewam": "+251934343144",
    "Dr. Miftah": "+251912280307"
  };
  const num = numbers[doctor];
  if (num) {
    window.location.href = `tel:${num}`;
  } else {
    alert("Phone number not available.");
  }
}

// --- Select Date Form ---
document.getElementById("dateForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const dateVal = document.getElementById("dateInput").value;
  const shift = document.getElementById("shiftSelect").value;
  const display = document.getElementById("selectedDisplay");
  if (dateVal) {
    const date = new Date(dateVal);
    let html = `<p><strong>Date:</strong> ${date.toLocaleDateString()}</p>`;
    html += `<table class="duty-table">
      <tr>
        <th>Shift</th>
        <th>OPD and ER</th>
        <th>Ward and ICU</th>
      </tr>`;
    if (isWeekend(date)) {
      const duty = getNightDuty(date);
      html += `<tr>
        <td>Night Shift</td>
        <td>${duty.opd} <button onclick="callDoctor('${duty.opd}')">Call</button></td>
        <td>${duty.ward} <button onclick="callDoctor('${duty.ward}')">Call</button></td>
      </tr>`;
    } else {
      if (shift === "day") {
        const duty = getDayShiftDuty(date);
        html += `<tr>
          <td>Day Shift</td>
          <td>${duty.opd} <button onclick="callDoctor('${duty.opd}')">Call</button></td>
          <td>${duty.ward} <button onclick="callDoctor('${duty.ward}')">Call</button></td>
        </tr>`;
      } else {
        const duty = getNightDuty(date);
        html += `<tr>
          <td>Night Shift</td>
          <td>${duty.opd} <button onclick="callDoctor('${duty.opd}')">Call</button></td>
          <td>${duty.ward} <button onclick="callDoctor('${duty.ward}')">Call</button></td>
        </tr>`;
      }
    }
    html += `</table>`;
    display.innerHTML = html;
  }
});

// --- Populate Month Dropdown ---
const monthSelect = document.getElementById("monthSelect");
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
monthNames.forEach((month, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.text = month;
  monthSelect.appendChild(option);
});

// --- PDF Export for Night Shift Schedule ---
// Exports a PDF table using jsPDF based on the repeating pattern (April pattern) for any month.
document.getElementById("downloadForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const month = parseInt(document.getElementById("monthSelect").value);
  const year = document.getElementById("yearSelect").value;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  let pdfContent = `Night Shift Schedule for ${monthNames[month]} ${year}\n\n`;
  pdfContent += "Date\tOPD and ER\tWard and ICU\n";
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const duty = getNightDuty(date);
    pdfContent += `${year}-${month+1}-${day}\t${duty.opd}\t${duty.ward}\n`;
  }
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(pdfContent, 180);
  doc.text(lines, 10, 10);
  doc.save(`NightShiftSchedule_${year}_${month+1}.pdf`);
});

// --- Initialize Today's Duty Display ---
displayTodayDuty();
