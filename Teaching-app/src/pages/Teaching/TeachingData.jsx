// TeachingData.jsx
// This file contains the data for the Teaching page
// Separates data from presentation by storing only raw data values

// Import image assets
import IntensiveCoachingCamps1 from "../../assets/IntensiveCoachingCamps1.jpeg";
import IntensiveCoachingCamps2 from "../../assets/IntensiveCoachingCamps2.jpeg";
import WeeklyAndSurpriseTests from "../../assets/WeeklyAndSurpriseTests.jpeg";
import MentorshipPrograms from "../../assets/MentorshipProgram.png";
import TeachingApproach1 from "../../assets/TeachingApproach1.jpeg";
import TeachingApproach2 from "../../assets/TeachingApproach2.jpeg";
import Volunteer1 from "../../assets/Volunteer1.jpeg";
import Volunteer2 from "../../assets/Volunteer2.jpeg";
import Volunteer3 from "../../assets/Volunteer3.jpeg";
import Volunteer4 from "../../assets/Volunteer4.jpeg";
import Volunteer5 from "../../assets/Volunteer5.jpeg";
import Volunteer6 from "../../assets/Volunteer6.jpeg";
import Volunteer7 from "../../assets/Volunteer7.jpeg";
import Volunteer8 from "../../assets/Volunteer8.jpeg";
import Volunteer9 from "../../assets/Volunteer9.jpeg";
import Volunteer10 from "../../assets/Volunteer10.jpeg";
import Testimonial1 from "../../assets/Testimonial1.png";
import Testimonial2 from "../../assets/Testimonial2.png";
import Testimonial3 from "../../assets/Testimonial3.png";
import Testimonial4 from "../../assets/Testimonial4.png";
import Testimonial5 from "../../assets/Testimonial5.png";

// Banner section data - contains only raw data, no JSX

//Teaching Reports Data
export const TeachingReportsData = [
    {
        title: 'Report_title1',
        placeName: 'Salkot',
        year: "2024",
        lastUpdated: "2025-03-14T14:30:00", // ISO date string
    },
    {
        title: 'Report_title2',
        placeName: 'Narayan Bhagar',
        year: "2023",
        lastUpdated: "2024-03-15T14:30:00", // ISO date string
    },
    {
        title: 'Report_title3',
        placeName: 'Place name',
        year: "20XX",
        lastUpdated: "2024-02-15T14:30:00", // ISO date string
    },
];

// Teaching programs data
export const TeachingProgramsData = [
    {
        id: 1,
        number: "01",
        name: "Intensive coaching camps",
        images: [
            { src: IntensiveCoachingCamps1, alt: "Ongoing Lecture" },
            { src: IntensiveCoachingCamps2, alt: "Various Students" }
        ],
        points: [
            {
                label: "Duration",
                text: "2-month rigorous sessions held annually in locations such as Narayan Bagar and Saikot."
            },
            {
                label: "Subjects covered",
                text: "Physics, Chemistry, Maths, Biology, and English"
            },
            {
                label: "Daily schedule",
                subPoints: [
                    { label: "Morning class", text: "Core subjects (7:30 AM - 12:45 PM)" },
                    { label: "Afternoon tutorials", text: "Practice sessions and problem-solving (3:00 PM - 6:00 PM)" },
                    { label: "Evening doubt-solving", text: "Personalized attention to student queries (8:00 PM - 10:00 PM)" },
                    { label: "Counseling and English classes", text: "Career guidance and soft skills development" }
                ]
            },
            {
                label: "Focus",
                text: "Holistic academic preparation, critical thinking, and real-life application of concepts."
            }
        ]
    },
    {
        id: 2,
        number: "02",
        name: "Weekly and Surprise tests",
        images: [
            { src: WeeklyAndSurpriseTests, alt: "Students taking a test" }
        ],
        points: [
            {
                text: "Regular evaluations through:",
                subPoints: [
                    { label: "Weekly tests", text: "3-hour assessments every Sunday" },
                    { label: "Surprise tests", text: "Conducted randomly during tutorials to ensure attentiveness" }
                ]
            },
            {
                label: "Purpose",
                subPoints: [
                    { text: "Gauge student progress" },
                    { text: "Provide actionable feedback" },
                    { text: "Improve exam strategies and time management" }
                ]
            }
        ]
    },
    {
        id: 3,
        number: "03",
        name: "Mentorship programs",
        images: [
            { src: MentorshipPrograms, alt: "Ongoing Lecture" }
        ],
        points: [
            { text: "Volunteers from premier institution, IIT Delhi, mentor students." },
            {
                text: "Objectives:",
                subPoints: [
                    { text: "Foster peer learning" },
                    { text: "Provide academic and emotional support" }
                ]
            }
        ]
    }
];

// Teaching approach data
export const TeachingApproachData = {
    heading: "Teaching Approach",
    points: [
        {
            label: "Student-centric methods",
            subPoints: [
                { text: "Personalized teaching tailored to unique learning needs." },
                { text: "Use of engaging techniques, such as hands-on activities and real-life examples." }
            ]
        },
        {
            label: "Interactive learning",
            subPoints: [
                { text: "Encouraging active participation through Q&A sessions" },
                { text: "Students solve problems on the blackboard to boost confidence and encourage peer learning" }
            ]
        },
        {
            label: "Comprehensive curriculum",
            subPoints: [
                { text: "Focused on foundational and advanced topics in Physics, Chemistry, Maths, and Biology" },
                { text: "Counseling sessions cover career options in diverse fields such as engineering, media, and design" },
                { text: "Comprehensive English classes designed to enhance soft skills, expand vocabulary, and deepen understanding of the English language" }
            ]
        }
    ],
    images: [
        { src: TeachingApproach1, alt: "students engaged in open discussion" },
        { src: TeachingApproach2, alt: "students studying together" }
    ]
};

// Testimonials data
export const TeachingTestimonialsData = [
    {
        image: Testimonial1,
        imageAlt: "Sneha Kandari Testimonial",
        name: "Sneha Kandari",
        description: "I am Sneha Kandari, and I had the privilege of attending the program in Narayan Bagar in 2023 and in Saikot in 2024. Thanks to the coaching and support I received, I made it to the merit list of the 10th Class Board exams in 2024. Not only that, but my marks in school improved significantly, and I feel more confident in my studies now. Because of the continuous support I have got I am now determined to crack JEE and seek admission in IIT."
    },
    {
        image: Testimonial2,
        imageAlt: "Harshita Rawat Testimonial",
        name: "Harshita Rawat",
        description: "My name is Harshita Rawat, and I'm a Class 9 student. I attended the program in Narayan Bagar and Saikot, and it completely changed my academic journey. I used to be a low scorer, but after participating in the program, I've been consistently scoring over 90%. Now, I even help my fellow students by teaching them how to solve numerical problems in maths, physics, and chemistry. This program has truly boosted my confidence and love for learning."
    },
    {
        image: Testimonial3,
        imageAlt: "Khushi Bisht Testimonial",
        name: "Khushi Bisht",
        description: "My name is Khushi Bisht, and I'm now a Class 12 student at GIC, Garhkot, Chamoli. I attended the program in Narayan Bagar and Saikot, and it has been a turning point in my life. I used to be a mediocre student, scoring between 40-50%, but now I rank first in my class and consistently score 90%. In the teaching program we got very good counselling and came to know of various opportunities that we can avail. This year I will attempt for JEE also."
    },
    {
        image: Testimonial4,
        imageAlt: "Chitranshi Negi Testimonial",
        name: "Chitranshi Negi",
        description: "I am Chitranshi Negi I attended these classes during summer vacation in 2024 at saikot and had the great experience of exploring things and learning things in new way. Before this camp I was a totally different person who don't know how to study and be focused but this camp taught me soo many new things and opportunities , I got to know about exams and job opportunities .This camp told me soo many way to explore things .This camp still helps me in my studies, provided me a mentor who tracks my progress every week and help me with the problems."
    },
    {
        image: Testimonial5,
        imageAlt: "Aditya Sharma Testimonial",
        name: "Aditya Sharma",
        description: "I am Aditya, a JEE 2025 aspirant, and this program has been a game-changer for me. It gave my preparation a significant boost, helping me build confidence and improve my grades at school. It also motivated me to go beyond academics, and with this newfound confidence, I cracked the Young Innovators Internship at Scalar Institute of Technology. This program has strengthened my determination to give my best and achieve my dream of getting into IIT. Highly recommended for serious aspirants!"
    }
];

// Volunteer list data
export const TeachingVolunteerList = [
    {
        image: Volunteer1,
        imageAlt: "Volunteers",
        name: "Kalyani Charan",
        description: "I was incredibly excited to teach JEE-level mathematics to students while staying near the serene Alakhnanda River. But the experience turned out to be even more beautiful and memorable than I could have ever imagined. Teaching eager minds with such a strong passion for learning and growth was truly inspiring. The bond I formed with the students, as well as the insights I gained about the local environment from Dabral sir, made it all the more enriching. Every moment spent there felt special, and the energy, enthusiasm, and warmth of the place left a lasting impression on me. It's an experience I will always cherish, and would always like to go again."
    },
    {
        image: Volunteer2,
        imageAlt: "Volunteers",
        name: "Swastik Naik",
        description: "As a volunteer in the Uttarakhand Teaching Programme under NSS IIT Delhi, I had an amazing experience teaching and mentoring 9th-12th grade students in Chamoli. The students were hardworking, dedicated, and full of energy, which made teaching them a joy. I loved the friendly environment and enjoyed spending time with the children, not just during classes but also during games and conversations. This program gave me a chance to bond with the students and make a positive impact on their journey. It was a truly rewarding experience, and I encourage everyone to take part in such initiatives to learn and give back."
    },
    {
        image: Volunteer3,
        imageAlt: "Volunteers",
        name: "Divyam Goyal",
        description: "During my summer break, I volunteered with the Uttarakhand Teaching Project in Saikot village, teaching mathematics to 10th and 12th-grade students. The experience was truly transformative. I was deeply moved by the students' unwavering dedication and thirst for knowledge, despite the challenges they faced. Their enthusiasm and resilience were inspiring, making the teaching experience incredibly rewarding. As I adapted my teaching methods to suit their needs, I grew both personally and professionally. The connections I formed with the students were invaluable, leaving a lasting impact on my perspective towards education and community service. This wonderful experience reinforced my commitment to making a positive difference through education"
    },
    {
        image: Volunteer4,
        imageAlt: "Volunteers",
        name: "Shivani Meena",
        description: "I'm Shivani Meena, and I had the privilege of volunteering at a summer teaching camp. It was a uniquely self-revelatory experience. Not only did I enhance my own knowledge and skills, but I also had the opportunity to learn about the vibrant lifestyles of the people in Uttarakhand and the challenges they face amidst the rugged mountain terrain. I was deeply inspired by the students' eagerness to learn and grow. Overall, it was an inspiring, enriching, and unforgettable experience. I would be thrilled to volunteer again and continue learning alongside these amazing students."
    },
    {
        image: Volunteer5,
        imageAlt: "Volunteers",
        name: "Vikas Meena",
        description: "Volunteering in Narayan Bagar was a transformative experience. Teaching and mentoring students to prepare for competitive exams like JEE and NEET was deeply rewarding. Witnessing their determination and eagerness to learn inspired me. Despite initial challenges like limited resources and infrastructure, the collective efforts of the team, local educators, and students created a positive learning environment. The exposure to Uttarakhand's unique culture enriched the experience further. This opportunity not only enhanced my teaching skills but also deepened my commitment to contributing to society through education. It was truly a fulfilling journey of learning and giving back."
    },
    {
        image: Volunteer6,
        imageAlt: "Volunteers",
        name: "Bhavneesh",
        description: "I am Bhavneesh yadav from IIT Delhi, in summer of 2023 I got the opportunity to teach student from 9-12 th class in Uttarakhand. It was a one in a life time experience for me as it made me reflect on my career choice and view on social services. Student there were interactive and had eager to learn nee things, bond we created was much more of big brother type rather than typical student and teacher. Till this day I receive calls from student for guidance showing their eagerness to grow."
    },
    {
        image: Volunteer7,
        imageAlt: "Volunteers",
        name: "Neeraj",
        description: "My experience at the Uttarakhand teaching project was incredibly fulfilling. As a teacher and administrative head, I had the privilege of working with village students who were eager to learn, especially since they were being taught by IIT Delhi students. Their enthusiasm and dedication were truly inspiring, making teaching them a joyful and rewarding experience. I feel fortunate to have been part of this wonderful initiative, started by JP Dabral sir, whose vision for improving rural education is truly commendable. This opportunity not only allowed me to contribute to their growth but also left a lasting impact on me. I sincerely hope these bright students achieve great success in life."
    },
    {
        image: Volunteer8,
        imageAlt: "Volunteers",
        name: "Rishabh Chirania",
        description: "I volunteered in Chamoli district, teaching biology to 10th and 12th-grade students. The experience was enriching, both academically and personally. The beautiful environment and close-knit community allowed me to form strong bonds with students, sharing meals, playing, and even trekking together. One of the most rewarding parts was mentoring a student for life, guiding them beyond just academics. This experience not only helped me achieve my educational goals but also created lasting friendships and valuable memories."
    },
    {
        image: Volunteer9,
        imageAlt: "Volunteers",
        name: "Yash Gupta",
        description: "Uttrakhand Teaching camp was great. It was a unique life experience where I got the opportunity to teach the village students, at ground level. After Staying with them for so many days I realized the problems they encounter in their studies. I wish to contribute in every little way possible!"
    },
    {
        image: Volunteer10,
        imageAlt: "Volunteers",
        name: "Mitashi Jain",
        description: "I would like to express my sincere gratitude to NSS for giving me this opportunity to spend two enriching weeks in a serene village in Uttarakhand, teaching physics to classes 9 and 11.. Living amidst nature, away from the city's hustle, was both refreshing and humbling.The children's eagerness to learn and their dreams inspired me to give my best in empowering them academically and personally. Their resilience and curiosity taught me invaluable lessons, making this experience deeply transformative. I felt a heartfelt connection with a community that welcomed me like family. This unforgettable experience will remain a cherished chapter of my life, inspiring me to continue making a positive impact wherever I go."
    }
];