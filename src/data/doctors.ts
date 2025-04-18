
import { Doctor } from "../types";

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. John Smith",
    specialty: "Cardiology",
    email: "john.smith@example.com",
    phone: "123-456-7890",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    experience: 15,
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    rating: 4.8,
    bio:" ",
    address:" ",
    status: "active",
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    specialty: "Neurology",
    email: "sarah.johnson@example.com",
    phone: "234-567-8901",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    experience: 12,
    availability: "Tue-Sat, 10:00 AM - 6:00 PM",
    rating: 4.7,
    status: "active",
    createdAt: "2023-02-22T09:15:00Z",
    bio:" ",
    address:" ",
  },
  {
    id: "3",
    name: "Dr. Michael Chen",
    specialty: "Orthopedics",
    email: "michael.chen@example.com",
    phone: "345-678-9012",
    imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    experience: 20,
    availability: "Mon-Thu, 8:00 AM - 4:00 PM",
    rating: 4.9,
    bio:" ",
    address:" ",
    status: "active",
    createdAt: "2022-11-05T14:45:00Z"
  },
  {
    id: "4",
    name: "Dr. Emily Parker",
    specialty: "Pediatrics",
    email: "emily.parker@example.com",
    phone: "456-789-0123",
    imageUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    experience: 8,
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    rating: 4.6,
    bio:" ",
    address:" ",
    status: "on-leave",
    createdAt: "2023-03-18T11:20:00Z"
  },
  {
    id: "5",
    name: "Dr. Robert Williams",
    specialty: "Dermatology",
    email: "robert.williams@example.com",
    phone: "567-890-1234",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    experience: 10,
    availability: "Wed-Sun, 10:00 AM - 6:00 PM",
    rating: 4.5,
    bio:" ",
    address:" ",
    status: "active",
    createdAt: "2023-05-07T13:10:00Z"
  },
  {
    id: "6",
    name: "Dr. Jessica Lee",
    specialty: "Ophthalmology",
    email: "jessica.lee@example.com",
    phone: "678-901-2345",
    imageUrl: "https://randomuser.me/api/portraits/women/32.jpg",
    experience: 14,
    availability: "Mon-Fri, 8:30 AM - 4:30 PM",
    rating: 4.7,
    bio:" ",
    address:" ",
    status: "active",
    createdAt: "2022-12-12T15:35:00Z"
  },
  {
    id: "7",
    name: "Dr. Daniel Kim",
    specialty: "Psychiatry",
    email: "daniel.kim@example.com",
    phone: "789-012-3456",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    experience: 11,
    availability: "Tue-Sat, 9:00 AM - 5:00 PM",
    rating: 4.8,
    bio:" ",
    address:" ",
    status: "active",
    createdAt: "2023-04-25T10:50:00Z"
  },
  {
    id: "8",
    name: "Dr. Amanda Martinez",
    specialty: "Oncology",
    email: "amanda.martinez@example.com",
    phone: "890-123-4567",
    imageUrl: "https://randomuser.me/api/portraits/women/58.jpg",
    experience: 18,
    availability: "Mon-Thu, 8:00 AM - 6:00 PM",
    rating: 4.9,
    bio:" ",
    address:" ",
    status: "retired",
    createdAt: "2022-10-30T12:40:00Z"
  }
];

export const specialties = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Ophthalmology",
  "Psychiatry",
  "Oncology",
  "Endocrinology",
  "Gastroenterology",
  "Urology",
  "Pulmonology"
];

export const statuses = [
  "active",
  "on-leave",
  "retired"
];

export const hospitals = [
  "City General Hospital",
  "Metropolitan Medical Center",
  "University Hospital",
  "Children's Medical Center",
  "Skin & Health Clinic",
  "Vision Care Center",
  "Behavioral Health Institute",
  "Cancer Treatment Center"
];
