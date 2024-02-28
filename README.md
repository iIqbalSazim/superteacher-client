# Superteacher

## Table of Contents

- [What is the project about](#what-is-the-project-about)
- [Why are we doing this project](#why-are-we-doing-this-project)
- [Architecture](#architecture)
- [Feature List](#feature-list)
- [Trello Board](#trello-board)
- [Local Development Setup](#local-development-setup)
- [Acknowledgments](#acknowledgments)

## What is the project about

Superteacher is a dedicated application designed for freelance teachers. It empowers teachers to create and oversee multiple classrooms, enabling effective student management.

## Why are we doing this project

The Superteacher project is undertaken as the final project of the Sazim Learner's Program. It serves as a culmination of the trainee's acquired skills and knowledge throughout the program, demonstrating their proficiency in **frontend development using React JS**. This project provides an opportunity for the trainee to apply their learning to a real-world application, showcasing their ability to build a robust and functional system tailored to the needs of freelance teachers.

## Architecture

The frontend of the Superteacher application is built using React JS and it integrates with a [Ruby on Rails backend](https://github.com/iIqbalSazim/superteacher-api).
<br/>
The frontend architecture follows a component-based approach, where the user interface is composed of reusable and modular components. These components include pages, UI elements, and container components.

- Pages: Each page in the application corresponds to a specific route or URL and is composed of one or more React components. Examples of pages include the login page, dashboard page, classroom page, and profile page.

- UI Elements: UI elements are reusable components that represent common user interface elements such as buttons, forms, input fields, dropdowns, and modals. These components are styled using Mantine UI, a modern React UI library.

- Container Components: Container components are responsible for managing state and data fetching logic. They interact with the backend API to retrieve and update data, and pass this data down to presentational components as props.

The app follows the bulletproof file-folder structure.

## Feature List

- **User Types:** Superteacher supports two types of users: **Students** and **Teachers**.

- **Login/Registration:**

  - Two types of registration processes are available for Students and Teachers, with tailored forms for each.
  - For Teachers, a unique code is required for registration, and the system limits the number of wrong attempts for the unique code to prevent misuse.

- **Teacher Functionalities:**

  - Creation and management of multiple classrooms, each with a title, subject, class time, and days.
  - Addition and removal of students from classes, with automated email notifications sent to added students.
  - Global chat thread within each class, allowing all participants to communicate realtime.
  - Upload of attachments such as assignments and learning resources, with automated email notifications sent to enrolled students.
  - Scheduling of exam dates and assignment deadlines.
  - Integration of Google Meet class links within classrooms.
  - Viewing of assignments submitted by students.
  - Automatic detection of late submissions.

- **Student Functionalities:**
  - Viewing of enrolled classes.
  - Participation in global chat threads within classes.
  - Access to and download of resource materials uploaded by teachers.
  - Viewing of assignment and exam schedules.
  - Joining Google Meet classes directly from the platform.
  - Submission of assignments.

## Trello Board

- [Superteacher [Final Project]](https://trello.com/invite/b/9Cy2KHbi/ATTIaac921f8a66bcba3842355892570a412620CD66F/superteacher-final-project)

## Local Development Setup

### Prerequisites

- Node v18 or higher installed on your machine

### Step-by-step instructions

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the client directory: `cd superteacher-client`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

## Acknowledgments

- This project was developed as part of the Learner's Program Final Project January-February 2024.
- Special thanks to the instructors and mentors for their guidance and support throughout the program.
