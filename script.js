// March 2025 schedule for night shifts (index 0 = Mar 1, index 30 = Mar 31)
const marchSchedule = [
  { opd: "Dr. Helina", ward: "Dr. Genet" }, // Mar 1 (Saturday)
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },   // Mar 2 (Sunday)
  { opd: "Dr. Eden",   ward: "Dr. Dawit" },    // Mar 3 (Monday)
  { opd: "Dr. Helina", ward: "Dr. Genet" },    // Mar 4 (Tuesday)
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },     // Mar 5 (Wednesday)
  { opd: "Dr. Dawit",  ward: "Dr. Eden" },      // Mar 6 (Thursday)
  { opd: "Dr. Genet",  ward: "Dr. Helina" },    // Mar 7 (Friday)
  { opd: "Dr. Ribka",  ward: "Dr. Lewam" },     // Mar 8 (Saturday)
  { opd: "Dr. Dawit",  ward: "Dr. Eden" },      // Mar 9 (Sunday)
  { opd: "Dr. Genet",  ward: "Dr. Helina" },    // Mar 10 (Monday)
  { opd: "Dr. Ribka",  ward: "Dr. Lewam" },     // Mar 11 (Tuesday)
  { opd: "Dr. Eden",   ward: "Dr. Dawit" },      // Mar 12 (Wednesday)
  { opd: "Dr. Helina", ward: "Dr. Genet" },      // Mar 13 (Thursday)
  { opd: "Dr. Lewam",  ward: "Dr. Ribka" },      // Mar 14 (Friday)
  { opd: "Dr. Eden",   ward: "Dr. Dawit" },       // Mar 15 (Saturday)
  { opd: "Dr. Helina", ward: "Dr. Genet" },       // Mar 16 (Sunday)
  { opd: "Dr. Lewam",  ward: "Dr. Ribka" },       // Mar 17 (Monday)
  { opd: "Dr. Dawit",  ward: "Dr. Eden" },        // Mar 18 (Tuesday)
  { opd: "Dr. Genet",  ward: "Dr. Helina" },       // Mar 19 (Wednesday)
  { opd: "Dr. Ribka",  ward: "Dr. Lewam" },        // Mar 20 (Thursday)
  { opd: "Dr. Dawit",  ward: "Dr. Eden" },         // Mar 21 (Friday)
  { opd: "Dr. Genet",  ward: "Dr. Helina" },        // Mar 22 (Saturday)
  { opd: "Dr. Ribka",  ward: "Dr. Lewam" },         // Mar 23 (Sunday)
  { opd: "Dr. Eden",   ward: "Dr. Dawit" },          // Mar 24 (Monday)
  { opd: "Dr. Helina", ward: "Dr. Genet" },          // Mar 25 (Tuesday)
  { opd: "Dr. Lewam",  ward: "Dr. Ribka" },          // Mar 26 (Wednesday)
  { opd: "Dr. Eden",   ward: "Dr. Dawit" },           // Mar 27 (Thursday)
  { opd: "Dr. Helina", ward: "Dr. Genet" },           // Mar 28 (Friday)
  { opd: "Dr. Lewam",  ward: "Dr. Ribka" },           // Mar 29 (Saturday)
  { opd: "Dr. Dawit",  ward: "Dr. Eden" },            // Mar 30 (Sunday)
  { opd: "Dr. Genet",  ward: "Dr. Helina" }           // Mar 31 (Monday)
];

// For weekdays, day shift is fixed.
function getDayShiftDuty(date) {
  return { opd: "Dr. Miftah", ward: "Dr. Genet" };
}

// Tab switching function
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

// For March 2025, get night shift duty from marchSchedule
function getMarchDuty(date) {
  if (date.getFullYear() === 2025 && date.getMonth() === 2) {
    return marchSchedule[date.getDate() - 1];
  } else {
    return { opd: "N/A", ward: "N/A" };
  }
}

// Display today's duty
function displayTodayDuty() {
  const today = new Date();
  const display = document.getElementById("todayDisplay");
  let html = `<p><strong>Date:</strong> ${today.toLocaleDateString()}</p>`;
  if (isWeekend(today)) {
    // For weekends, show only Night Shift
    const duty = getMarchDuty(today);
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
    // Weekdays: display both Day and Night shifts
    const dayDuty = getDayShiftDuty(today);
    const nightDuty = getMarchDuty(today);
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
  display.innerHTML = html;
}

// Call action
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

// Select Date form event listener
document.getElementById("dateForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const dateVal = document.getElementById("dateInput").value;
  const shift = document.getElementById("shiftSelect").value;
  const display = document.getElementById("selectedDisplay");
  if (dateVal) {
    const date = new Date(dateVal);
    let html = `<p><strong>Date:</strong> ${date.toLocaleDateString()}</p>`;
    if (isWeekend(date)) {
      const duty = getMarchDuty(date);
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
        const duty = getMarchDuty(date);
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

// Populate month dropdown
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

// DOC Export for Night Shift Schedule only
document.getElementById("downloadForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const month = parseInt(document.getElementById("monthSelect").value);
  const year = document.getElementById("yearSelect").value;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Build a table in HTML format for Word export
  let tableHTML = `<table border="1" cellpadding="5" cellspacing="0">
    <tr>
      <th>Date</th>
      <th>Night Shift - OPD and ER</th>
      <th>Night Shift - Ward and ICU</th>
    </tr>`;
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    let duty;
    if (isWeekend(date)) {
      duty = (year == 2025 && month === 2) ? marchSchedule[day - 1] : {opd:"N/A", ward:"N/A"};
    } else {
      duty = (year == 2025 && month === 2) ? marchSchedule[day - 1] : {opd:"N/A", ward:"N/A"};
    }
    tableHTML += `<tr>
      <td>${year}-${month+1}-${day}</td>
      <td>${duty.opd}</td>
      <td>${duty.ward}</td>
    </tr>`;
  }
  tableHTML += `</table>`;
  
  // Wrap the table in an HTML document with proper meta headers
  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Duty Schedule for ${monthNames[month]} ${year}</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          th { background-color: #FFDAB9; }
        </style>
      </head>
      <body>
        <h2>Duty Schedule for ${monthNames[month]} ${year} (Night Shift)</h2>
        ${tableHTML}
      </body>
    </html>`;
  
  // Create a blob with the proper MIME type and trigger download with .doc extension
  const blob = new Blob([htmlContent], { type: "application/vnd.ms-word" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `DutySchedule_${year}_${month+1}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Display today's duty on load
displayTodayDuty();
