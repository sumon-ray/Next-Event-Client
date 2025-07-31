# Next Event Pro - Event Planner & Participation System

A comprehensive, secure, JWT-protected web platform that enables users to create, manage, and participate in events with integrated payment processing and advanced participant management features.

## 🌐 Live Demo

**[Visit Next Event Pro](https://next-event-pro.vercel.app/)**

## 📚 Repositories

- **Frontend Repository:** [Next-Event-Client](https://github.com/sumon-ray/Next-Event-Client)
- **Backend Repository:** [Next-Event-Server](https://github.com/sumon-ray/Next-Event-Server)

## 📖 Project Overview

The **Event Planner & Participation System** is a modern web application that allows registered users to create and manage events with flexible visibility and payment options. The platform supports both free and paid events, with sophisticated approval workflows and participant management capabilities.

### 🎯 Key Capabilities

- **Event Creation & Management** - Create events as Public or Private with optional registration fees
- **Payment Integration** - Secure payment processing using SSLCommerz/ShurjoPay
- **Participant Management** - Approve/reject requests, issue bans, send invitations
- **Multi-Role System** - User and Admin roles with distinct permissions
- **Advanced Filtering** - Search and filter events by type, cost, and visibility
- **Review System** - Post-event ratings and reviews

## 👥 Roles & Permissions

### 🔧 Admin
- Monitor all events and user activity
- Delete inappropriate events or accounts
- Manage payments and invitations system-wide
- Access comprehensive analytics dashboard

### 👤 User
- **Event Management**: Create, update, and delete personal events
- **Event Discovery**: Browse and search Public and Private events
- **Participation**: Join events with various approval workflows
- **Invitations**: Send invitations to other users
- **Payment**: Secure payment processing for paid events
- **Reviews**: Rate and review attended events

## 💰 Event Types & Payment Workflows

### 1. Public Events (Free)
- ✅ Visible to everyone
- ✅ Instant join acceptance

### 2. Public Events (Paid)
- ✅ Visible to everyone
- 💳 Payment required → Pending approval

### 3. Private Events (Free)
- 👥 Listed for logged-in users only
- 📝 Request approval required

### 4. Private Events (Paid)
- 👥 Listed for logged-in users only
- 💳 Payment required → Pending approval

## 🏗️ Architecture Overview

### Frontend (Next.js)
- **Server-Side Rendering** - Optimized performance and SEO
- **Route Groups** - Organized by authentication status
- **Component Architecture** - Modular, reusable components
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Backend (Node.js + Express)
- **RESTful API** - Clean, standardized endpoints
- **JWT Authentication** - Secure session management
- **Prisma ORM** - Type-safe database operations
- **Payment Integration** - SSLCommerz/ShurjoPay integration

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── forget-password/
│   │   └── reset-password/
│   ├── (commonLayout)/           # Public pages
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   ├── contact/
│   │   └── events/               # Event browsing & details
│   ├── (withLoginUser)/          # Protected user routes
│   │   ├── payments/success/
│   │   └── profile/              # User dashboard
│   │       ├── my-events/
│   │       ├── my-received-invites/
│   │       ├── payments-history/
│   │       ├── personal-info/
│   │       ├── privacy_and_security/
│   │       └── review/
│   ├── admin/                    # Admin dashboard
│   │   ├── dashboard/
│   │   ├── manage-invites/
│   │   ├── manage-payments/
│   │   ├── products/
│   │   ├── review/
│   │   └── user/
│   ├── api/                      # API routes
│   └── types/                    # TypeScript definitions
│
├── components/                    # Reusable components
│   ├── modules/                  # Feature-specific modules
│   │   ├── Auth/                 # Authentication components
│   │   ├── Events/               # Event management
│   │   ├── Payment/              # Payment processing
│   │   ├── Profile/              # User profile management
│   │   ├── Review/               # Review system
│   │   └── adminDashboard/       # Admin interface
│   ├── shared/                   # Shared components
│   └── ui/                       # UI component library
│
└── services/                     # API service layer
    ├── AuthService/
    ├── EventService/
    ├── InviteService/
    ├── PaymentService/
    ├── ProfileService/
    ├── ReviewService/
    └── UserService/
```

## 🛠️ Technology Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Modern component library
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication solution

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[JWT](https://jwt.io/)** - Secure token-based authentication

### Payment & Deployment
- **SSLCommerz/ShurjoPay** - Payment gateway integration
- **[Vercel](https://vercel.com/)** - Frontend deployment
- **Railway/Render** - Backend hosting

## 🚀 Key Features

### 🎟️ Event Management
- **CRUD Operations** - Complete event lifecycle management
- **Flexible Pricing** - Free or paid events with secure payment processing
- **Visibility Controls** - Public or private event settings
- **Rich Media** - Event images, descriptions, and metadata

### 👥 Participant Management
- **Join Requests** - Sophisticated approval workflows
- **Invitation System** - Direct user invitations with payment integration
- **Ban Management** - Host controls for problematic participants
- **Capacity Management** - Event size limitations and waitlists

### 💳 Payment System
- **Secure Processing** - Industry-standard payment security
- **Multiple Gateways** - SSLCommerz and ShurjoPay support
- **Payment History** - Complete transaction tracking
- **Refund Management** - Automated refund processing

### 📊 Analytics & Reviews
- **Event Analytics** - Participation metrics and insights
- **Review System** - Post-event feedback and ratings
- **User Profiles** - Comprehensive user activity tracking
- **Admin Dashboard** - System-wide monitoring and control

### 🔒 Security Features
- **JWT Authentication** - Secure session management
- **Role-Based Access** - Granular permission system
- **Input Validation** - Comprehensive data sanitization
- **Payment Security** - PCI-compliant payment processing

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop** - Full-featured experience with advanced interactions
- **Tablet** - Touch-optimized interface with adapted layouts
- **Mobile** - Native-like mobile experience with gesture support

## 🎨 User Experience

### Design Principles
- **Intuitive Navigation** - Clear user flows and information architecture
- **Modern Aesthetics** - Contemporary design with smooth animations
- **Accessibility** - WCAG-compliant design with keyboard navigation
- **Performance** - Optimized loading times and smooth interactions

### Interactive Elements
- **Real-time Updates** - Live participant counts and status updates
- **Smooth Transitions** - Animated page changes and component interactions
- **Form Validation** - Real-time feedback and error handling
- **Loading States** - Skeleton screens and progress indicators

## 📧 Contact Information

- **Email:** [sumonray146371@gmail.com](mailto:sumonray146371@gmail.com)
- **Portfolio:** [https://sumon-ray.vercel.app/](https://sumon-ray.vercel.app/)
- **LinkedIn:** [https://www.linkedin.com/in/sumon60/](https://www.linkedin.com/in/sumon60/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Payment gateway credentials (SSLCommerz/ShurjoPay)

### Frontend Setup

1. Clone the frontend repository
```bash
git clone https://github.com/sumon-ray/Next-Event-Client.git
cd Next-Event-Client
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env.local
# Add your environment variables
```

4. Run the development server
```bash
npm run dev
```

### Backend Setup

1. Clone the backend repository
```bash
git clone https://github.com/sumon-ray/Next-Event-Server.git
cd Next-Event-Server
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Add your database URL, JWT secrets, and payment credentials
```

4. Run database migrations
```bash
npx prisma migrate dev
npx prisma generate
```

5. Start the server
```bash
npm run dev
```

## 🧪 Testing Credentials

### Admin Access
- **Email:** admin@nextevent.com
- **Password:** admin123

### Demo User
- **Email:** user@nextevent.com
- **Password:** user123

## 📈 Performance Optimizations

- **Code Splitting** - Automatic route-based code splitting
- **Image Optimization** - Next.js automatic image optimization
- **Database Indexing** - Optimized database queries
- **Caching Strategy** - Redis caching for frequently accessed data
- **CDN Integration** - Static asset delivery optimization

## 🔐 Security Measures

- **Authentication** - JWT-based secure authentication
- **Authorization** - Role-based access control
- **Data Validation** - Input sanitization and validation
- **Payment Security** - PCI DSS compliant payment processing
- **Rate Limiting** - API rate limiting and DDoS protection

## 📄 API Documentation

The backend provides RESTful APIs for all functionality:

- **Authentication**: `/api/auth/*`
- **Events**: `/api/events/*`
- **Users**: `/api/users/*`
- **Payments**: `/api/payments/*`
- **Invitations**: `/api/invites/*`
- **Reviews**: `/api/reviews/*`

## 🤝 Contributing

This project was developed as a comprehensive full-stack application demonstrating modern web development practices and is available for portfolio review.

## 📄 License

This project is created for portfolio purposes and professional demonstration.

## 🙏 Acknowledgments

- **Next.js Team** - For the excellent React framework
- **Vercel** - For seamless deployment and hosting
- **Prisma** - For the powerful database toolkit
- **Tailwind CSS** - For the utility-first CSS framework
- **Shadcn/ui** - For the beautiful component library

---

**Created with ❤️ by Sumon Ray**

*This project demonstrates advanced full-stack development skills, modern web technologies, and production-ready application architecture.*
