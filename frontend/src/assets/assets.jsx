export const DEPARTMENTS = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Emergency",
    "Radiology",
    "Oncology",
    "Pharmacy",
    "ICU",
    "General Medicine"
];

export const dummyAdminDashboardData = {
    role: "ADMIN",
    totalStaff: 3,
    totalDepartments: 10,
    todayAttendance: 1,
    pendingLeaves: 1,
};

export const dummyStaffDashboardData = {
    currentMonthAttendance: 20,
    pendingLeaves: 2,
    latestPayslip: {
        netSalary: 45000,
    },
    staff: {
        firstName: "Jenny",
        lastName: "Sharma",
        position: "Staff Nurse",
        department: "ICU",
    },
};

export const dummyProfileData = {
    _id: "69b411e6f8a807df391d7b13",
    firstName: "Jenny",
    lastName: "Sharma",
    email: "aarav.sharma@hospital.com",
    image: null,
};

export const dummyStaffData = [
    {
        _id: "hosp_001",
        userId: {
            _id: "hosp_user_001",
            email: "dr.ravi@hospital.com",
            role: "STAFF",
        },
        department: "Cardiology",
        firstName: "Dr. Ravi",
        lastName: "Verma",
        email: "dr.ravi@hospital.com",
        phone: "9000000001",
        position: "Senior Cardiologist",
        basicSalary: 120000,
        allowances: 20000,
        deductions: 5000,
        employmentStatus: "ACTIVE",
        joinDate: "2018-06-15T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "Heart specialist with 10+ years experience",
        createdAt: "2026-03-13T13:44:07.806Z",
        updatedAt: "2026-03-13T13:44:07.806Z",
        id: "hosp_001",
        user: {
            email: "dr.ravi@hospital.com",
            role: "STAFF",
        },
    },
    {
        _id: "hosp_002",
        userId: {
            _id: "hosp_user_002",
            email: "nurse.meera@hospital.com",
            role: "STAFF",
        },
        department: "ICU",
        firstName: "Meera",
        lastName: "Patil",
        email: "nurse.meera@hospital.com",
        phone: "9000000002",
        position: "ICU Nurse",
        basicSalary: 45000,
        allowances: 5000,
        deductions: 1000,
        employmentStatus: "ACTIVE",
        joinDate: "2020-01-20T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "",
        createdAt: "2026-03-13T13:42:17.589Z",
        updatedAt: "2026-03-13T13:42:17.589Z",
        id: "hosp_002",
        user: {
            email: "nurse.meera@hospital.com",
            role: "STAFF",
        },
    },
    {
        _id: "hosp_003",
        userId: {
            _id: "hosp_user_003",
            email: "tech.arjun@hospital.com",
            role: "STAFF",
        },
        department: "Radiology",
        firstName: "Arjun",
        lastName: "Singh",
        email: "tech.arjun@hospital.com",
        phone: "9000000003",
        position: "Radiology Technician",
        basicSalary: 30000,
        allowances: 3000,
        deductions: 500,
        employmentStatus: "ACTIVE",
        joinDate: "2021-08-10T00:00:00.000Z",
        image: null,
        isDeleted: false,
        bio: "",
        createdAt: "2026-03-13T13:32:22.013Z",
        updatedAt: "2026-03-13T13:33:20.498Z",
        id: "hosp_003",
        user: {
            email: "tech.arjun@hospital.com",
            role: "STAFF",
        },
    },
];

export const dummyLeaveData = [
    {
        _id: "leave_001",
        staffId: "hosp_002",
        type: "CASUAL",
        startDate: "2026-03-27T00:00:00.000Z",
        endDate: "2026-03-29T00:00:00.000Z",
        reason: "Family medical emergency",
        status: "APPROVED",
        createdAt: "2026-03-13T13:51:22.716Z",
        updatedAt: "2026-03-13T13:51:43.139Z",
        id: "leave_001",
        staff: dummyStaffData[1],
    },
    {
        _id: "leave_002",
        staffId: "hosp_001",
        type: "ANNUAL",
        startDate: "2026-03-23T00:00:00.000Z",
        endDate: "2026-03-24T00:00:00.000Z",
        reason: "Medical conference",
        status: "REJECTED",
        createdAt: "2026-03-13T13:50:52.117Z",
        updatedAt: "2026-03-13T13:51:46.450Z",
        id: "leave_002",
        staff: dummyStaffData[0],
    },
    {
        _id: "leave_003",
        staffId: "hosp_003",
        type: "SICK",
        startDate: "2026-03-15T00:00:00.000Z",
        endDate: "2026-03-16T00:00:00.000Z",
        reason: "Health issue",
        status: "PENDING",
        createdAt: "2026-03-13T13:49:19.204Z",
        updatedAt: "2026-03-13T13:51:45.418Z",
        id: "leave_003",
        staff: dummyStaffData[2],
    },
];

export const dummyPayslipData = [
    {
        _id: "pay_001",
        staffId: "hosp_001",
        month: 2,
        year: 2026,
        basicSalary: 120000,
        allowances: 20000,
        deductions: 5000,
        netSalary: 135000,
        createdAt: "2026-03-13T13:48:05.653Z",
        updatedAt: "2026-03-13T13:48:05.653Z",
        id: "pay_001",
        staff: dummyStaffData[0],
    },
    {
        _id: "pay_002",
        staffId: "hosp_002",
        month: 2,
        year: 2026,
        basicSalary: 45000,
        allowances: 5000,
        deductions: 1000,
        netSalary: 49000,
        createdAt: "2026-03-13T13:46:30.804Z",
        updatedAt: "2026-03-13T13:46:30.804Z",
        id: "pay_002",
        staff: dummyStaffData[1],
    },
    {
        _id: "pay_003",
        staffId: "hosp_003",
        month: 2,
        year: 2026,
        basicSalary: 30000,
        allowances: 3000,
        deductions: 500,
        netSalary: 32500,
        createdAt: "2026-03-13T13:46:14.884Z",
        updatedAt: "2026-03-13T13:46:14.884Z",
        id: "pay_003",
        staff: dummyStaffData[2],
    },
];

export const dummyAttendanceData = [
    {
        _id: "att_001",
        staffId: "hosp_001",
        date: "2026-03-14T18:30:00.000Z",
        checkIn: "2026-03-15T10:00:00.000Z",
        checkOut: "2026-03-15T18:00:00.000Z",
        status: "PRESENT",
        workingHours: 8,
        dayType: "Full Day",
    },
    {
        _id: "att_002",
        staffId: "hosp_002",
        date: "2026-03-12T18:30:00.000Z",
        checkIn: "2026-03-13T13:00:00.000Z",
        checkOut: "2026-03-13T21:00:00.000Z",
        status: "PRESENT",
        workingHours: 8,
        dayType: "Full Day",
    },
];

export function getWorkingHoursDisplay(record) {
    if (record.workingHours != null) {
        const hrs = Math.floor(record.workingHours);
        const mins = Math.round((record.workingHours - hrs) * 60);
        return `${hrs}h ${mins}m`;
    }

    if (record.checkIn && !record.checkOut) {
        const diffMs = Date.now() - new Date(record.checkIn).getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        const hrs = Math.floor(diffHours);
        const mins = Math.round((diffHours - hrs) * 60);
        return `${hrs}h ${mins}m (ongoing)`;
    }
    return "—";
}

export function getDayTypeDisplay(record) {
    if (record.dayType) {
        const map = {
            "Full Day": "badge-success",
            "Three Quarter Day": "bg-blue-100 text-blue-700",
            "Half Day": "badge-warning",
            "Short Day": "badge-danger",
        };
        return {
            label: record.dayType,
            className: map[record.dayType] || "bg-slate-100 text-slate-600",
        };
    }
    if (record.checkIn && !record.checkOut) {
        return { label: "In Progress", className: "bg-indigo-100 text-indigo-700" };
    }
    return { label: "—", className: "" };
}