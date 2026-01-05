// Sample Tickets Data
const tickets = [
    { id: 1, name: "Amit Sharma", issue: "Login Issue", status: "Pending", date: "2025-03-15" },
    { id: 2, name: "Ritika Verma", issue: "Transaction Failure", status: "Resolved", date: "2025-03-14" },
    { id: 3, name: "Rahul Mehta", issue: "Card Blocked", status: "Pending", date: "2025-03-16" },
    { id: 4, name: "Pooja Singh", issue: "Account Locked", status: "Resolved", date: "2025-03-13" },
];

// Insert Tickets into Table
function loadTickets() {
    const table = document.getElementById("ticketTable");
    let pendingCount = 0, resolvedCount = 0;

    tickets.forEach(ticket => {
        let row = `<tr>
            <td>${ticket.id}</td>
            <td>${ticket.name}</td>
            <td>${ticket.issue}</td>
            <td>${ticket.status}</td>
            <td>${ticket.date}</td>
        </tr>`;
        table.innerHTML += row;

        if (ticket.status === "Pending") pendingCount++;
        else resolvedCount++;
    });

    document.getElementById("totalTickets").innerText = tickets.length;
    document.getElementById("pendingTickets").innerText = pendingCount;
    document.getElementById("resolvedTickets").innerText = resolvedCount;
}

// Search Function
function searchTickets() {
    let filter = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#ticketTable tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
}

// Load Data on Page Load
window.onload = loadTickets;