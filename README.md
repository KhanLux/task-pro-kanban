# 🚀 TaskFlow Pro

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Dark_Mode-black?style=for-the-badge&logo=dark-reader&logoColor=white" alt="Dark Mode" />
</div>

<div align="center">
  <p>A modern, responsive Kanban board application with drag-and-drop functionality</p>
</div>

## ✨ Features

- 📱 **Fully Responsive** - Works seamlessly on all device sizes
- 🌓 **Dark/Light Mode** - Elegant theme switching with system preference detection
- 🔄 **Drag & Drop Interface** - Intuitive task management with smooth animations
- 📊 **Task Organization** - Create, edit, and delete tasks with categories and priorities
- 🎨 **Modern UI** - Clean, minimalist design with subtle animations
- 💾 **Persistent Storage** - Tasks are saved to localStorage

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Drag & Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **UI Components**: Custom components with Shadcn UI inspiration
- **Icons**: [Tabler Icons](https://tabler-icons.io/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/taskflow-pro.git
   cd taskflow-pro
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Usage

- **Create a new column**: Click the "Add Column" button in the header
- **Add a task**: Click the "+" icon in any column
- **Edit a task**: Click the edit icon on any task card
- **Delete a task/column**: Click the delete icon
- **Move tasks**: Drag and drop tasks between columns
- **Reorder columns**: Drag and drop columns to reorder them
- **Switch themes**: Click the theme toggle button in the header

## 🎯 Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
│   ├── Board/        # Main Kanban board component
│   ├── Column/       # Column component
│   ├── Footer/       # Application footer
│   ├── Header/       # Application header
│   ├── Modal/        # Modal components
│   ├── Task/         # Task card component
│   └── ui/           # UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── types/            # TypeScript type definitions
```

## 🔜 Future Enhancements

- User authentication
- Cloud synchronization
- Collaborative editing
- Advanced filtering and sorting
- Custom labels and tags
- Task attachments
- Mobile app version

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**KhanLux**

<div align="left">
  <a href="https://github.com/khanlux">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://linkedin.com/in/khanlux">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</div>

---

<p align="center">
  Made with ❤️ by KhanLux
</p>
