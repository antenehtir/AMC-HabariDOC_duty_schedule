// Schedule Data (Based on February pattern)
const schedule = [
  { opd: "Dr. Dawit", ward: "Dr. Eden" },
  { opd: "Dr. Genet", ward: "Dr. Helina" },
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },
  { opd: "Dr. Eden", ward: "Dr. Dawit" },
  { opd: "Dr. Helina", ward: "Dr. Genet" },
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },
  { opd: "Dr. Eden", ward: "Dr. Dawit" },
  { opd: "Dr. Helina", ward: "Dr. Genet" },
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },
  { opd: "Dr. Dawit", ward: "Dr. Eden" },
  { opd: "Dr. Genet", ward: "Dr. Helina" },
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },
  { opd: "Dr. Dawit", ward: "Dr. Eden" },
  { opd: "Dr. Genet", ward: "Dr. Helina" },
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },
  { opd: "Dr. Eden", ward: "Dr. Dawit" },
  { opd: "Dr. Helina", ward: "Dr. Genet" },
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },
  { opd: "Dr. Eden", ward: "Dr. Dawit" },
  { opd: "Dr. Helina", ward: "Dr. Genet" },
  { opd: "Dr. Lewam", ward: "Dr. Ribka" },
  { opd: "Dr. Dawit", ward: "Dr. Eden" },
  { opd: "Dr. Genet", ward: "Dr. Helina" },
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },
  { opd: "Dr. Dawit", ward: "Dr. Eden" },
  { opd: "Dr. Genet", ward: "Dr. Helina" },
  { opd: "Dr. Ribka", ward: "Dr. Lewam" },
  { opd: "Dr. Eden", ward: "Dr. Dawit" }
];

// Mapping of Physician to Phone Numbers
const phoneNumbers = {
  "Dr. Dawit": "+251920192199",
  "Dr. Eden": "+251932689445",
  "Dr. Ribka": "+251923800544",
  "Dr. Genet": "+251921931429",
  "Dr. Helina": "+251913110147",
  "Dr. Lewam": "+251934343144"
};

// Tab Switching Function
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

// Set default open tab
document.getElementById("defaultOpen").click();

// Get duty for a given date (using day-of-month modulo the schedule length)
function getDuty(date) {
  const d = new Date(date);
  const day = d.getDate(); // 1-based day number
  const index = (day - 1) % schedule.length;
  return schedule[index];
}

// Function to trigger call action
function callDoctor(doctor) {
  const number = phoneNumbers[doctor];
  if (number) {
    window.location.href = `tel:${number}`;
  } else {
    alert("Phone number not available.");
  }
}

// Display Today's Duty
function displayTodayDuty() {
  const today = new Date();
  const duty = getDuty(today);
  const todayDisplay = document.getElementById("todayDisplay");
  todayDisplay.innerHTML = `
    <p><strong>Date:</strong> ${today.toLocaleDateString()}</p>
    <div class="duty-section">
      <h3>OPD and ER</h3>
      <p>${duty.opd} 
        <button onclick="callDoctor('${duty.opd}')">Call</button>
      </p>
    </div>
    <div class="duty-section">
      <h3>Ward and ICU</h3>
      <p>${duty.ward} 
        <button onclick="callDoctor('${duty.ward}')">Call</button>
      </p>
    </div>
  `;
}

// Event listener for Select Date form
document.getElementById("dateForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const dateInput = document.getElementById("dateInput").value;
  const section = document.getElementById("sectionSelect").value;
  if (dateInput) {
    const duty = getDuty(dateInput);
    const selectedDisplay = document.getElementById("selectedDisplay");
    const doctorName = section === "opd" ? duty.opd : duty.ward;
    selectedDisplay.innerHTML = `
      <p><strong>Date:</strong> ${new Date(dateInput).toLocaleDateString()}</p>
      <p><strong>Section:</strong> ${section === "opd" ? "OPD and ER" : "Ward and ICU"}</p>
      <p><strong>Duty Physician:</strong> ${doctorName} 
        <button onclick="callDoctor('${doctorName}')">Call</button>
      </p>
    `;
  }
});

// Populate month dropdown for download form
const monthSelect = document.getElementById("monthSelect");
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
monthNames.forEach((month, index) => {
  const option = document.createElement("option");
  option.value = index; // 0-indexed month
  option.text = month;
  monthSelect.appendChild(option);
});

// Event listener for Download Schedule form
document.getElementById("downloadForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const month = parseInt(document.getElementById("monthSelect").value);
  const year = document.getElementById("yearSelect").value;
  // Determine number of days in the selected month/year
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let csvContent = "Date,OPD and ER,Ward and ICU\n";
  for (let day = 1; day <= daysInMonth; day++) {
    const index = (day - 1) % schedule.length;
    const duty = schedule[index];
    csvContent += `${year}-${month + 1}-${day},${duty.opd},${duty.ward}\n`;
  }
  // Create and trigger CSV download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `DutySchedule_${year}_${month + 1}.csv`;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Display Today's Duty on page load
displayTodayDuty();
