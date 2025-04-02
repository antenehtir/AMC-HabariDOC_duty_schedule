// --- April Night Shift Pattern ---
// This array holds the night shift assignment for April (30 days) as given.
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

// For any given date, use the April pattern by taking the day-of-month modulo 30.
// (For days 1–30, use the corresponding index; for day 31, wrap to index 0.)
function getNightDuty(date) {
  let day = date.getDate();
  let index = (day - 1) % 30; 
  return aprilPattern[index];
}

// Fixed Day Shift for Weekdays
// Current assignment (for the current 2-month period):
//   OPD and ER: Dr. Genet
//   Ward and ICU: Dr. Miftah
function getDayShiftDuty(date) {
  return { opd: "Dr. Genet", ward: "Dr. Miftah" };
}

// To handle the night shift display: if the current time is before 8 AM, show the previous day’s night duty.
function getEffectiveNightDate(date) {
  let effective = new Date(date);
  if (date.getHours() < 8) {
    effective.setDate(effective.getDate() - 1);
  }
  return effective;
}

// --- Tab Switching ---
function openTab(evt, tabName) {
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

// Check if a date is weekend (Saturday or Sunday)
function isWeekend(date) {
  let day = date.getDay();
  return (day === 0 || day === 6);
}

// --- Display Today's Duty ---
function displayTodayDuty() {
  const now = new Date();
  const display = document.getElementById("todayDisplay");
  let html = `<p><strong>Date:</strong> ${now.toLocaleDateString()}</p>`;
  
  if (now.getHours() < 8) {
    // Before 8 AM, show previous day’s night shift
    const effectiveDate = getEffectiveNightDate(now);
    const duty = getNightDuty(effectiveDate);
    html += `
      <div class="duty-section">
        <h3>Night Shift</h3>
        <p><strong>OPD and ER:</strong> ${duty.opd} 
          <button onclick="callDoctor('${duty.opd}')">Call</button>
        </p>
        <p><strong>Ward and ICU:</strong> ${duty.ward} 
          <button onclick="callDoctor('${duty.ward}')">Call</button>
        </p>
        <p><em>(Effective Date: ${effectiveDate.toLocaleDateString()})</em></p>
      </div>`;
  } else {
    if (isWeekend(now)) {
      // Weekends: only show Night Shift
      const duty = getNightDuty(now);
      html += `
        <div class="duty-section">
          <h3>Night Shift</h3>
          <p><strong>OPD and ER:</strong> ${duty.opd} 
            <button onclick="callDoctor('${duty.opd}')">Call</button>
          </p>
          <p><strong>Ward and ICU:</strong> ${duty.ward} 
            <button onclick="callDoctor('${duty.ward}')">Call</button>
          </p>
        </div>`;
    } else {
      // Weekdays: show both Day and Night Shifts
      const dayDuty = getDayShiftDuty(now);
      const nightDuty = getNightDuty(now);
      html += `
        <div class="duty-section">
          <h3>Day Shift</h3>
          <p><strong>OPD and ER:</strong> ${dayDuty.opd} 
            <button onclick="callDoctor('${dayDuty.opd}')">Call</button>
          </p>
          <p><strong>Ward and ICU:</strong> ${dayDuty.ward} 
            <button onclick="callDoctor('${dayDuty.ward}')">Call</button>
          </p>
        </div>
        <div class="duty-section">
          <h3>Night Shift</h3>
          <p><strong>OPD and ER:</strong> ${nightDuty.opd} 
            <button onclick="callDoctor('${nightDuty.opd}')">Call</button>
          </p>
          <p><strong>Ward and ICU:</strong> ${nightDuty.ward} 
            <button onclick="callDoctor('${nightDuty.ward}')">Call</button>
          </p>
        </div>`;
    }
  }
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
  let num = numbers[doctor];
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
    if (isWeekend(date)) {
      const duty = getNightDuty(date);
      html += `<p><strong>Shift:</strong> Night Shift</p>
               <p><strong>OPD and ER:</strong> ${duty.opd} 
                 <button onclick="callDoctor('${duty.opd}')">Call</button>
               </p>
               <p><strong>Ward and ICU:</strong> ${duty.ward} 
                 <button onclick="callDoctor('${duty.ward}')">Call</button>
               </p>`;
    } else {
      if (shift === "day") {
        const duty = getDayShiftDuty(date);
        html += `<p><strong>Shift:</strong> Day Shift</p>
                 <p><strong>OPD and ER:</strong> ${duty.opd} 
                   <button onclick="callDoctor('${duty.opd}')">Call</button>
                 </p>
                 <p><strong>Ward and ICU:</strong> ${duty.ward} 
                   <button onclick="callDoctor('${duty.ward}')">Call</button>
                 </p>`;
      } else {
        const duty = getNightDuty(date);
        html += `<p><strong>Shift:</strong> Night Shift</p>
                 <p><strong>OPD and ER:</strong> ${duty.opd} 
                   <button onclick="callDoctor('${duty.opd}')">Call</button>
                 </p>
                 <p><strong>Ward and ICU:</strong> ${duty.ward} 
                   <button onclick="callDoctor('${duty.ward}')">Call</button>
                 </p>`;
      }
    }
    display.innerHTML = html;
  }
});

// --- Populate Month Dropdown ---
const monthSelect = document.getElementById("monthSelect");
monthNames = [
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
// We now export a PDF using jsPDF. The PDF will show a table for the chosen month and year,
// using the repeating night shift pattern (from the April pattern) for each day.
document.getElementById("downloadForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const month = parseInt(document.getElementById("monthSelect").value);
  const year = document.getElementById("yearSelect").value;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  let pdfContent = `Night Shift Schedule for ${monthNames[month]} ${year}\n\n`;
  pdfContent += "Date\tOPD and ER\tWard and ICU\n";
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    let duty = getNightDuty(date);
    pdfContent += `${year}-${month+1}-${day}\t${duty.opd}\t${duty.ward}\n`;
  }
  
  // Use jsPDF to generate the PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(pdfContent, 180);
  doc.text(lines, 10, 10);
  doc.save(`NightShiftSchedule_${year}_${month+1}.pdf`);
});

// --- Initialize Today's Duty Display ---
displayTodayDuty();
