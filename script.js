// ===============================
// 1. STUDENT DATA
// ===============================

const students = [
    {
        id: "ST001",
        name: "Alex Johnson",
        course: "Computer Science",
        marks: 92
    },
    {
        id: "ST002",
        name: "Sarah Williams",
        course: "Mathematics",
        marks: 85
    },
    {
        id: "ST003",
        name: "David Brown",
        course: "Physics",
        marks: 78
    },
    {
        id: "ST004",
        name: "Emily Davis",
        course: "Computer Science",
        marks: 96
    },
    {
        id: "ST005",
        name: "Michael Wilson",
        course: "Mathematics",
        marks: 88
    },
    {
        id: "ST006",
        name: "Olivia Taylor",
        course: "Physics",
        marks: 91
    },
    {
        id: "ST007",
        name: "James Anderson",
        course: "Computer Science",
        marks: 75
    },
    {
        id: "ST008",
        name: "Sophia Martin",
        course: "Commerce",
        marks: 89
    },
    {
        id: "ST009",
        name: "Daniel Thomas",
        course: "Commerce",
        marks: 82
    },
    {
        id: "muhammedaffan@mulearn",
        name: "Muhammed Affan",
        course: "Electronics and Communication",
        marks: 99
    }
];


// ===============================
// 2. SELECT HTML ELEMENTS
// ===============================

const studentList = document.getElementById("student-list");

const searchInput = document.getElementById("search");

const courseFilter = document.getElementById("course-filter");

const marksFilter = document.getElementById("marks-filter");

const sortSelect = document.getElementById("sort");


// ===============================
// 3. DISPLAY STUDENTS
// ===============================

function displayStudents(data) {

    studentList.innerHTML = "";

    document.getElementById("result-count").textContent =
        `${data.length} results`;

    document.getElementById("no-results").style.display =
        data.length === 0 ? "block" : "none";

    data.forEach(student => {

        const card = document.createElement("div");

        card.className = "student-card";

        card.innerHTML = `
            <h3>${student.name}</h3>

            <p>
                <strong>Course:</strong>
                ${student.course}
            </p>

            <p class="marks">
                ${student.marks} Marks
            </p>

            <p class="student-id">
                Student ID: ${student.id}
            </p>
        `;

        studentList.appendChild(card);

    });

}


// ===============================
// 4. SEARCH AND FILTER
// ===============================

function filterStudents() {

    const searchValue = searchInput.value.toLowerCase();

    const selectedCourse = courseFilter.value;

    const selectedMarks = marksFilter.value;

    let filteredStudents = students.filter(student => {

        const matchesName =
            student.name.toLowerCase().includes(searchValue);

        const matchesCourse =
            selectedCourse === "all" ||
            student.course === selectedCourse;

        const matchesMarks =
            selectedMarks === "all" ||
            student.marks >= Number(selectedMarks);

        return matchesName && matchesCourse && matchesMarks;

    });


    // ===============================
    // 5. SORT STUDENTS
    // ===============================

    const sortValue = sortSelect.value;

    if (sortValue === "name-asc") {

        filteredStudents.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    }

    else if (sortValue === "name-desc") {

        filteredStudents.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    }

    else if (sortValue === "marks-high") {

        filteredStudents.sort((a, b) =>
            b.marks - a.marks
        );

    }

    else if (sortValue === "marks-low") {

        filteredStudents.sort((a, b) =>
            a.marks - b.marks
        );

    }


    // ===============================
    // 6. UPDATE STATISTICS
    // ===============================

    updateStatistics(filteredStudents);


    // ===============================
    // 7. UPDATE DISPLAY
    // ===============================

    displayStudents(filteredStudents);

}


// ===============================
// 8. CALCULATE STATISTICS
// ===============================

function updateStatistics(data) {

    const totalStudents = data.length;

    const totalMarks = data.reduce((total, student) => {

        return total + student.marks;

    }, 0);


    const averageMarks = totalStudents > 0
        ? (totalMarks / totalStudents).toFixed(1)
        : 0;


    const topper = totalStudents > 0
        ? data.reduce((top, student) =>
            student.marks > top.marks ? student : top
        )
        : null;


    document.getElementById("total-students").textContent =
        totalStudents;

    document.getElementById("average-marks").textContent =
        averageMarks;

    document.getElementById("topper").textContent =
        topper ? topper.name : "-";

}


// ===============================
// 9. EVENT LISTENERS
// ===============================

searchInput.addEventListener("input", filterStudents);

courseFilter.addEventListener("change", filterStudents);

marksFilter.addEventListener("change", filterStudents);

sortSelect.addEventListener("change", filterStudents);


// ===============================
// 10. INITIAL DISPLAY
// ===============================

filterStudents();
