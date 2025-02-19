document.addEventListener("DOMContentLoaded", function () {
    // Datos simulados: 30 tareas, 6 diseñadores, 3 squads
    const tasks = [
        { diseñador: "Ana", squad: "UI", tipo: "Diseño", estimado: 6, real: 7 },
        { diseñador: "Carlos", squad: "DEV", tipo: "Desarrollo", estimado: 8, real: 10 },
        { diseñador: "Luis", squad: "UX", tipo: "Prototipado", estimado: 5, real: 5 },
        { diseñador: "Sofía", squad: "UI", tipo: "Investigación", estimado: 4, real: 3 },
        { diseñador: "Miguel", squad: "DEV", tipo: "Conceptualización", estimado: 7, real: 8 },
        { diseñador: "Laura", squad: "UX", tipo: "UI/DEV", estimado: 6, real: 7 },
        { diseñador: "Ana", squad: "UX", tipo: "Diseño", estimado: 5, real: 6 },
        { diseñador: "Carlos", squad: "UI", tipo: "Prototipado", estimado: 4, real: 5 },
        { diseñador: "Luis", squad: "DEV", tipo: "Investigación", estimado: 8, real: 9 },
        { diseñador: "Sofía", squad: "UX", tipo: "Conceptualización", estimado: 6, real: 5 },
        { diseñador: "Miguel", squad: "UI", tipo: "UI/DEV", estimado: 5, real: 6 },
        { diseñador: "Laura", squad: "DEV", tipo: "Diseño", estimado: 7, real: 8 },
        { diseñador: "Ana", squad: "UI", tipo: "Desarrollo", estimado: 9, real: 10 },
        { diseñador: "Carlos", squad: "UX", tipo: "Prototipado", estimado: 3, real: 4 },
        { diseñador: "Luis", squad: "DEV", tipo: "Investigación", estimado: 7, real: 7 },
        { diseñador: "Sofía", squad: "UI", tipo: "Conceptualización", estimado: 5, real: 6 },
        { diseñador: "Miguel", squad: "UX", tipo: "UI/DEV", estimado: 4, real: 5 },
        { diseñador: "Laura", squad: "DEV", tipo: "Diseño", estimado: 8, real: 9 }
    ];

    // Filtros y renderizado de tabla
    function renderTable() {
        let tableBody = document.getElementById("taskTable");
        if (!tableBody) return;
        
        tableBody.innerHTML = "";
        let filteredTasks = tasks;

        const designerFilter = document.getElementById("filterDesigner")?.value;
        const squadFilter = document.getElementById("filterSquad")?.value;
        const typeFilter = document.getElementById("filterType")?.value;

        if (designerFilter) filteredTasks = filteredTasks.filter(t => t.diseñador === designerFilter);
        if (squadFilter) filteredTasks = filteredTasks.filter(t => t.squad === squadFilter);
        if (typeFilter) filteredTasks = filteredTasks.filter(t => t.tipo === typeFilter);

        filteredTasks.forEach(task => {
            let row = `<tr>
                <td>${task.diseñador}</td>
                <td>${task.squad}</td>
                <td>${task.tipo}</td>
                <td>${task.estimado}h</td>
                <td>${task.real}h</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    document.getElementById("filterDesigner")?.addEventListener("change", renderTable);
    document.getElementById("filterSquad")?.addEventListener("change", renderTable);
    document.getElementById("filterType")?.addEventListener("change", renderTable);
    
    renderTable();

    // Generar gráficos de carga de trabajo
    if (document.getElementById("workloadChart")) {
        new Chart(document.getElementById("workloadChart"), {
            type: "bar",
            data: {
                labels: ["Ana", "Carlos", "Luis", "Sofía", "Miguel", "Laura"],
                datasets: [{
                    label: "Horas de Trabajo",
                    data: [7, 10, 5, 3, 8, 7],
                    backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"]
                }]
            },
            options: { responsive: true }
        });
    }

    // Exportar a PDF
    window.exportPDF = function () {
        const { jsPDF } = window.jspdf;
        let doc = new jsPDF();
        doc.text("Informe de Carga de Trabajo", 10, 10);
        
        let yPos = 20;
        tasks.forEach(task => {
            doc.text(`${task.diseñador} - ${task.squad} - ${task.tipo} (${task.real}h)`, 10, yPos);
            yPos += 10;
        });

        doc.save("Reporte.pdf");
    };

    // Exportar a Excel
    window.exportExcel = function () {
        let ws = XLSX.utils.json_to_sheet(tasks);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Tareas");
        XLSX.writeFile(wb, "Reporte.xlsx");
    };
});
