document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const nameFilter = document.getElementById("nameFilter");

    // Function to display a single employee card
    function displayEmployee(employee) {
        content.innerHTML = ""; // Clear previous content

        if (!employee) return; // If no employee selected, don't display anything

        const card = document.createElement("div");
        card.classList.add("employee-card");

        card.innerHTML = `
            <h2>${employee.Name}</h2>
            <p><strong>AM:</strong> ${employee.AM}</p>
            <p><strong>LOB:</strong> ${employee.LOB}</p>

            <div class="table-container">
                <table class="qualifiers">
                    <tr><th colspan="2">Qualifiers</th></tr>
                    <tr><td>Reliability</td><td>${employee.Reliability}</td></tr>
                    <tr><td>Absence</td><td>${employee.Absence}</td></tr>
                    <tr><td>Present Days</td><td>${employee.Present_Days}</td></tr>
                    <tr><td>Prod Hours < 7.5</td><td>${employee.Prod_Hours_Less_7_5}</td></tr>
                    <tr><td>FCR</td><td>${employee.FCR}</td></tr>
                    <tr><td>LC%</td><td>${employee.LC}</td></tr>
                    <tr><td>Tracking</td><td>${employee.Tracking}</td></tr>
                    <tr><td>Dispo</td><td>${employee.Dispo}</td></tr>
                </table>

                <table class="scores">
                    <tr><th>Metric</th><th>Score</th><th>Status</th></tr>
                    <tr><td>AHT</td><td>${employee.Performance_AHT}</td><td>${employee.Status}</td></tr>
                    <tr><td>Incentive Status</td><td colspan="2">${employee.Incentive_Status}</td></tr>
                </table>
            </div>
        `;

        content.appendChild(card);
    }

    // Load JSON data and set up the dropdown
    fetch("data.json")
        .then(response => response.json())
        .then(employees => {
            // Sort employees by name
            employees.sort((a, b) => a.Name.localeCompare(b.Name));

            // Populate the dropdown with sorted names
            employees.forEach(employee => {
                const option = document.createElement("option");
                option.value = employee.Name;
                option.textContent = employee.Name;
                nameFilter.appendChild(option);
            });

            // Add event listener to display selected employee's card
            nameFilter.addEventListener("change", () => {
                const selectedName = nameFilter.value;
                const selectedEmployee = employees.find(emp => emp.Name === selectedName);
                displayEmployee(selectedEmployee);
            });
        })
        .catch(error => console.error("Error loading employee data:", error));
});
