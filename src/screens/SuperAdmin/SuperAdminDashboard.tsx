import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTypeSwitcher } from "../../components/ui/account-type-switcher";
import confetti from "canvas-confetti";
import { ProfileDropdown } from "../../components/ui/profile-dropdown";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { BellIcon, SearchIcon, ArrowLeftIcon, CrownIcon, ShieldIcon, UsersIcon, SettingsIcon, BarChart3Icon, DatabaseIcon, ServerIcon, CreditCardIcon, BuildingIcon, FileTextIcon, CheckCircleIcon, XCircleIcon, ClockIcon, AlertTriangleIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon, MapPinIcon, GlobeIcon, KeyIcon, CodeIcon, ShoppingCartIcon, HardDriveIcon, ActivityIcon, CogIcon, UserIcon, WalletIcon, HandshakeIcon, SearchCheckIcon, PieChartIcon, MessageSquareIcon, MailIcon, TicketIcon, PaletteIcon, GiftIcon, StarIcon, FolderIcon, LockIcon, MonitorIcon, WifiOffIcon, PlusIcon, EditIcon, TrashIcon, EyeIcon, DownloadIcon, UploadIcon, RefreshCwIcon, FilterIcon, MoreHorizontalIcon, ChevronDownIcon, HomeIcon, HeadphonesIcon, PhoneIcon, CalendarIcon, ClipboardIcon, LinkIcon, ZapIcon, ShieldCheckIcon, AlertCircleIcon, InfoIcon, CheckIcon, XIcon, PlayIcon, PauseIcon, HopIcon as StopIcon, RotateCcwIcon, SaveIcon, SendIcon, CopyIcon, ShareIcon, PrinterIcon, ExternalLinkIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon, TrendingUpIcon as TrendingUp, TrendingDownIcon as TrendingDown } from "lucide-react";

export const SuperAdminDashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: "", message: "" });
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Confetti animation function
  const triggerConfetti = () => {
    if (hasTriggeredConfetti) return;
    
    setHasTriggeredConfetti(true);
    
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999
    });
  };

  const showSuccess = (title: string, message: string) => {
    setSuccessMessage({ title, message });
    setShowSuccessModal(true);
    setHasTriggeredConfetti(false);
    
    setTimeout(() => {
      triggerConfetti();
    }, 300);

    setTimeout(() => {
      setShowSuccessModal(false);
      setHasTriggeredConfetti(false);
    }, 4000);
  };

  // Navigation items for Super Admin
  const superAdminNavItems = [
    { id: "dashboard", name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, description: "Platform Overview" },
    { id: "admin-users", name: "Admin Users", icon: <ShieldIcon className="w-5 h-5" />, description: "Admin Management" },
    { id: "rbac", name: "RBAC & Permissions", icon: <KeyIcon className="w-5 h-5" />, description: "Role Management" },
    { id: "users", name: "User Management", icon: <UsersIcon className="w-5 h-5" />, description: "All Users" },
    { id: "kyc", name: "KYC Management", icon: <FileTextIcon className="w-5 h-5" />, description: "Identity Verification" },
    { id: "kyb", name: "KYB Management", icon: <BuildingIcon className="w-5 h-5" />, description: "Business Verification" },
    { id: "regional", name: "Regional Management", icon: <GlobeIcon className="w-5 h-5" />, description: "Multi-Region Control" },
    { id: "bulk-data", name: "Bulk Data Management", icon: <DatabaseIcon className="w-5 h-5" />, description: "Data Operations" },
    { id: "approval-workflow", name: "Approval Workflow", icon: <CheckCircleIcon className="w-5 h-5" />, description: "Workflow Management" },
    { id: "transactions", name: "Transaction Management", icon: <CreditCardIcon className="w-5 h-5" />, description: "Transaction Control" },
    { id: "cards", name: "Card Management", icon: <CreditCardIcon className="w-5 h-5" />, description: "Card Operations" },
    { id: "pos", name: "POS Management", icon: <BuildingIcon className="w-5 h-5" />, description: "Terminal Control" },
    { id: "third-party", name: "Third Party Integration", icon: <LinkIcon className="w-5 h-5" />, description: "External Services" },
    { id: "api", name: "API Management", icon: <CodeIcon className="w-5 h-5" />, description: "API Control" },
    { id: "developer", name: "Developer Tools", icon: <CodeIcon className="w-5 h-5" />, description: "Dev Environment" },
    { id: "marketplace", name: "Marketplace", icon: <ShoppingCartIcon className="w-5 h-5" />, description: "Product Management" },
    { id: "database", name: "Database Management", icon: <HardDriveIcon className="w-5 h-5" />, description: "DB Operations" },
    { id: "system-health", name: "System Health", icon: <ActivityIcon className="w-5 h-5" />, description: "Analytics" },
    { id: "subscription", name: "Subscription & Fees", icon: <DollarSignIcon className="w-5 h-5" />, description: "Billing Management" },
    { id: "system-logs", name: "System Logs", icon: <FileTextIcon className="w-5 h-5" />, description: "Log Management" },
    { id: "profile", name: "Profile Settings", icon: <UserIcon className="w-5 h-5" />, description: "Admin Profile" },
    { id: "wallet", name: "Wallet Management", icon: <WalletIcon className="w-5 h-5" />, description: "Wallet Operations" },
    { id: "escrow", name: "Escrow Management", icon: <HandshakeIcon className="w-5 h-5" />, description: "Escrow Control" },
    { id: "background-check", name: "Background Check", icon: <SearchCheckIcon className="w-5 h-5" />, description: "User Screening" },
    { id: "reports", name: "Reports & Analytics", icon: <PieChartIcon className="w-5 h-5" />, description: "Platform Reports" },
    { id: "disputes", name: "Dispute Management", icon: <AlertTriangleIcon className="w-5 h-5" />, description: "Dispute Resolution" },
    { id: "chat", name: "Chat Management", icon: <MessageSquareIcon className="w-5 h-5" />, description: "Platform Chat" },
    { id: "email", name: "Email & Templates", icon: <MailIcon className="w-5 h-5" />, description: "Email Management" },
    { id: "notifications", name: "Notification Management", icon: <BellIcon className="w-5 h-5" />, description: "Notification Control" },
    { id: "tickets", name: "Ticketing System", icon: <TicketIcon className="w-5 h-5" />, description: "Support Tickets" },
    { id: "white-label", name: "White Labelling", icon: <PaletteIcon className="w-5 h-5" />, description: "Platform Customization" },
    { id: "referrals", name: "Referrals Management", icon: <GiftIcon className="w-5 h-5" />, description: "Referral System" },
    { id: "rewards", name: "Reward Management", icon: <StarIcon className="w-5 h-5" />, description: "Reward System" },
    { id: "ratings", name: "Ratings Management", icon: <StarIcon className="w-5 h-5" />, description: "Rating System" },
    { id: "documents", name: "Document Management", icon: <FolderIcon className="w-5 h-5" />, description: "Document Control" },
    { id: "security", name: "Security Center", icon: <LockIcon className="w-5 h-5" />, description: "Security Management" },
    { id: "content", name: "Website Content", icon: <MonitorIcon className="w-5 h-5" />, description: "Content Management" },
    { id: "downtime", name: "Downtime Tracker", icon: <WifiOffIcon className="w-5 h-5" />, description: "Uptime Monitoring" }
  ];

  // Sample data for all pages
  const platformStats = {
    totalUsers: 2500000,
    totalTransactions: 45600000,
    totalRevenue: 125000000000,
    uptime: 99.97,
    activeRegions: 10,
    totalAdmins: 247
  };

  const adminUsers = [
    { id: "1", name: "John Super Admin", email: "john@surebanker.com", role: "Super Admin", regions: ["Nigeria", "Ghana"], status: "Active", lastLogin: "2 hours ago" },
    { id: "2", name: "Sarah Regional Admin", email: "sarah@surebanker.com", role: "Regional Admin", regions: ["Kenya", "Tanzania"], status: "Active", lastLogin: "1 day ago" },
    { id: "3", name: "Mike Support Admin", email: "mike@surebanker.com", role: "Support Admin", regions: ["Nigeria"], status: "Inactive", lastLogin: "1 week ago" }
  ];

  const roles = [
    { id: "1", name: "Super Admin", permissions: 127, users: 12, description: "Full platform access" },
    { id: "2", name: "Regional Admin", permissions: 89, users: 85, description: "Regional management access" },
    { id: "3", name: "Support Admin", permissions: 45, users: 150, description: "Customer support access" }
  ];

  const users = [
    { id: "1", name: "Carchy Atinse", email: "carchy@email.com", type: "Individual", kycStatus: "Tier 2", region: "Nigeria", status: "Active", balance: 120000 },
    { id: "2", name: "Tech Solutions Ltd", email: "admin@techsolutions.com", type: "Business", kybStatus: "Tier 3", region: "Ghana", status: "Active", balance: 2500000 },
    { id: "3", name: "Alex Developer", email: "alex@dev.com", type: "Developer", kycStatus: "Tier 1", region: "Kenya", status: "Active", balance: 50000 }
  ];

  const regions = [
    { id: "1", name: "Nigeria", code: "NG", users: 1200000, admins: 45, status: "Active", database: "ng-prod-db", lastUpdate: "2 hours ago" },
    { id: "2", name: "Ghana", code: "GH", users: 450000, admins: 12, status: "Active", database: "gh-prod-db", lastUpdate: "1 day ago" },
    { id: "3", name: "Kenya", code: "KE", users: 380000, admins: 8, status: "Active", database: "ke-prod-db", lastUpdate: "3 hours ago" },
    { id: "4", name: "South Africa", code: "ZA", users: 320000, admins: 15, status: "Active", database: "za-prod-db", lastUpdate: "5 hours ago" },
    { id: "5", name: "Tanzania", code: "TZ", users: 150000, admins: 6, status: "Pending", database: "tz-staging-db", lastUpdate: "1 week ago" }
  ];

  const transactions = [
    { id: "TXN001", amount: 50000, type: "Transfer", status: "Completed", user: "Carchy Atinse", region: "Nigeria", date: "2024-01-15", time: "14:30" },
    { id: "TXN002", amount: 125000, type: "Payment", status: "Pending", user: "Tech Solutions", region: "Ghana", date: "2024-01-15", time: "12:15" },
    { id: "TXN003", amount: 25000, type: "Withdrawal", status: "Failed", user: "Alex Developer", region: "Kenya", date: "2024-01-15", time: "09:45" }
  ];

  const cards = [
    { id: "CARD001", cardNumber: "4532 **** **** 9012", holderName: "Carchy Atinse", type: "Visa", status: "Active", spendingLimit: 100000, monthlySpent: 25000, region: "Nigeria" },
    { id: "CARD002", cardNumber: "5234 **** **** 3456", holderName: "John Doe", type: "Mastercard", status: "Blocked", spendingLimit: 50000, monthlySpent: 0, region: "Ghana" },
    { id: "CARD003", cardNumber: "5061 **** **** 0123", holderName: "Jane Smith", type: "Verve", status: "Expired", spendingLimit: 25000, monthlySpent: 0, region: "Kenya" }
  ];

  const posTerminals = [
    { id: "POS001", terminalId: "TRM12345", merchantName: "Main Store", location: "Lagos, Nigeria", status: "Active", dailyVolume: 450000, transactionCount: 156, uptime: "99.8%" },
    { id: "POS002", terminalId: "TRM12346", merchantName: "Satellite Office", location: "Accra, Ghana", status: "Offline", dailyVolume: 0, transactionCount: 0, uptime: "0%" },
    { id: "POS003", terminalId: "TRM12347", merchantName: "Branch Store", location: "Nairobi, Kenya", status: "Maintenance", dailyVolume: 125000, transactionCount: 45, uptime: "95.2%" }
  ];

  const approvalRequests = [
    { id: "APR001", type: "Large Transfer", description: "Transfer of ₦5,000,000 to vendor", amount: 5000000, requestedBy: "Business Admin", currentApprover: "Regional Manager", priority: "High", status: "Pending", region: "Nigeria", stage: "1 of 3" },
    { id: "APR002", type: "User Role Change", description: "Promote user to Business Admin", amount: 0, requestedBy: "HR Manager", currentApprover: "Super Admin", priority: "Medium", status: "Approved", region: "Ghana", stage: "3 of 3" },
    { id: "APR003", type: "KYC Override", description: "Manual KYC approval for special case", amount: 0, requestedBy: "Support Agent", currentApprover: "Compliance Officer", priority: "Low", status: "Rejected", region: "Kenya", stage: "2 of 2" }
  ];

  const kycCases = [
    { id: "KYC001", userName: "John Doe", currentTier: "Tier 1", requestedTier: "Tier 2", documents: 3, status: "Under Review", submittedDate: "2024-01-10", region: "Nigeria" },
    { id: "KYC002", userName: "Jane Smith", currentTier: "Tier 2", requestedTier: "Tier 3", documents: 5, status: "Approved", submittedDate: "2024-01-08", region: "Ghana" },
    { id: "KYC003", userName: "Mike Johnson", currentTier: "Tier 0", requestedTier: "Tier 1", documents: 2, status: "Rejected", submittedDate: "2024-01-12", region: "Kenya" }
  ];

  const kybCases = [
    { id: "KYB001", businessName: "Tech Solutions Ltd", currentTier: "Tier 1", requestedTier: "Tier 2", documents: 8, status: "Under Review", submittedDate: "2024-01-09", region: "Nigeria" },
    { id: "KYB002", businessName: "Green Energy Corp", currentTier: "Tier 2", requestedTier: "Tier 3", documents: 12, status: "Approved", submittedDate: "2024-01-07", region: "Ghana" },
    { id: "KYB003", businessName: "Retail Masters Inc", currentTier: "Tier 0", requestedTier: "Tier 1", documents: 5, status: "Pending Documents", submittedDate: "2024-01-11", region: "Kenya" }
  ];

  const bulkJobs = [
    { id: "BULK001", type: "User Import", fileName: "users_batch_001.csv", records: 10000, processed: 8500, status: "Processing", startTime: "14:30", region: "Nigeria" },
    { id: "BULK002", type: "Transaction Export", fileName: "transactions_2024_q1.csv", records: 500000, processed: 500000, status: "Completed", startTime: "09:15", region: "Ghana" },
    { id: "BULK003", type: "Data Archive", fileName: "archive_2023.zip", records: 2000000, processed: 0, status: "Queued", startTime: "Pending", region: "Kenya" }
  ];

  const integrations = [
    { id: "INT001", name: "Paystack", type: "Payment Gateway", status: "Active", uptime: "99.9%", lastSync: "2 minutes ago", region: "Nigeria" },
    { id: "INT002", name: "Flutterwave", type: "Payment Gateway", status: "Active", uptime: "99.7%", lastSync: "5 minutes ago", region: "Ghana" },
    { id: "INT003", name: "Smile Identity", type: "KYC Provider", status: "Maintenance", uptime: "95.2%", lastSync: "2 hours ago", region: "Kenya" }
  ];

  const apiEndpoints = [
    { id: "API001", endpoint: "/api/v1/users", method: "GET", calls: 125000, successRate: "99.8%", avgResponse: "145ms", status: "Healthy" },
    { id: "API002", endpoint: "/api/v1/transactions", method: "POST", calls: 89000, successRate: "99.2%", avgResponse: "230ms", status: "Healthy" },
    { id: "API003", endpoint: "/api/v1/cards", method: "PUT", calls: 12000, successRate: "97.5%", avgResponse: "180ms", status: "Warning" }
  ];

  const developers = [
    { id: "DEV001", name: "Alex Developer", email: "alex@dev.com", apiKeys: 3, sandboxEnv: "Active", lastActivity: "2 hours ago", region: "Nigeria" },
    { id: "DEV002", name: "Sarah Coder", email: "sarah@code.com", apiKeys: 5, sandboxEnv: "Active", lastActivity: "1 day ago", region: "Ghana" },
    { id: "DEV003", name: "Mike Builder", email: "mike@build.com", apiKeys: 2, sandboxEnv: "Suspended", lastActivity: "1 week ago", region: "Kenya" }
  ];

  const marketplaceProducts = [
    { id: "PROD001", name: "Premium Banking Package", vendor: "FinTech Solutions", price: 50000, sales: 1245, revenue: 62250000, status: "Active" },
    { id: "PROD002", name: "Business Loan Service", vendor: "Capital Partners", price: 100000, sales: 567, revenue: 56700000, status: "Active" },
    { id: "PROD003", name: "Insurance Package", vendor: "SecureLife", price: 25000, sales: 890, revenue: 22250000, status: "Pending" }
  ];

  const databases = [
    { id: "DB001", name: "Primary Database", region: "Nigeria", size: "2.8TB", connections: 145, queryTime: "89ms", status: "Healthy", lastBackup: "2 hours ago" },
    { id: "DB002", name: "Ghana Database", region: "Ghana", size: "1.2TB", connections: 67, queryTime: "92ms", status: "Healthy", lastBackup: "4 hours ago" },
    { id: "DB003", name: "Kenya Database", region: "Kenya", size: "890GB", connections: 34, queryTime: "156ms", status: "Warning", lastBackup: "1 day ago" }
  ];

  const subscriptions = [
    { id: "SUB001", planName: "Basic Plan", subscribers: 1200000, monthlyRevenue: 60000000, churnRate: "2.1%", arpu: 50 },
    { id: "SUB002", planName: "Premium Plan", subscribers: 450000, monthlyRevenue: 45000000, churnRate: "1.8%", arpu: 100 },
    { id: "SUB003", planName: "Business Plan", subscribers: 50000, monthlyRevenue: 25000000, churnRate: "1.2%", arpu: 500 }
  ];

  const disputes = [
    { id: "DIS001", transactionId: "TXN12345", amount: 50000, type: "Unauthorized Transaction", status: "Open", priority: "High", assignedTo: "Support Agent 1", createdDate: "2024-01-14", region: "Nigeria" },
    { id: "DIS002", transactionId: "TXN12346", amount: 25000, type: "Failed Payment", status: "Resolved", priority: "Medium", assignedTo: "Support Agent 2", createdDate: "2024-01-12", region: "Ghana" },
    { id: "DIS003", transactionId: "TXN12347", amount: 75000, type: "Duplicate Charge", status: "In Progress", priority: "Low", assignedTo: "Support Agent 3", createdDate: "2024-01-13", region: "Kenya" }
  ];

  const tickets = [
    { id: "TIC001", subject: "Login Issues", category: "Technical", priority: "High", status: "Open", assignedTo: "Tech Support", createdBy: "User123", createdDate: "2024-01-15", region: "Nigeria" },
    { id: "TIC002", subject: "Payment Failed", category: "Financial", priority: "Medium", status: "Resolved", assignedTo: "Finance Team", createdBy: "Business456", createdDate: "2024-01-14", region: "Ghana" },
    { id: "TIC003", subject: "Account Verification", category: "KYC", priority: "Low", status: "In Progress", assignedTo: "KYC Team", createdBy: "Individual789", createdDate: "2024-01-13", region: "Kenya" }
  ];

  const referralCampaigns = [
    { id: "REF001", name: "New Year Campaign", totalReferrals: 12456, conversions: 8934, conversionRate: "71.7%", rewardsPaid: 8934000, status: "Active", endDate: "2024-03-31" },
    { id: "REF002", name: "Business Boost", totalReferrals: 5678, conversions: 4123, conversionRate: "72.6%", rewardsPaid: 4123000, status: "Active", endDate: "2024-06-30" },
    { id: "REF003", name: "Student Special", totalReferrals: 3456, conversions: 2345, conversionRate: "67.9%", rewardsPaid: 1172500, status: "Ended", endDate: "2024-01-31" }
  ];

  const rewardPrograms = [
    { id: "RWD001", name: "Cashback Rewards", type: "Cashback", participants: 450000, totalPaid: 125000000, participationRate: "18%", redemptionRate: "67.8%" },
    { id: "RWD002", name: "Loyalty Points", type: "Points", participants: 320000, totalPaid: 45000000, participationRate: "12.8%", redemptionRate: "72.1%" },
    { id: "RWD003", name: "Referral Bonus", type: "Referral", participants: 85000, totalPaid: 12000000, participationRate: "3.4%", redemptionRate: "89.5%" }
  ];

  const systemLogs = [
    { id: "LOG001", level: "INFO", message: "User login successful", timestamp: "2024-01-15 14:30:23", source: "Auth Service", region: "Nigeria" },
    { id: "LOG002", level: "ERROR", message: "Database connection timeout", timestamp: "2024-01-15 14:25:15", source: "DB Service", region: "Ghana" },
    { id: "LOG003", level: "WARN", message: "High memory usage detected", timestamp: "2024-01-15 14:20:45", source: "System Monitor", region: "Kenya" }
  ];

  const documents = [
    { id: "DOC001", name: "KYC_Document_001.pdf", type: "KYC", size: "2.5MB", uploadDate: "2024-01-10", status: "Verified", uploadedBy: "User123", region: "Nigeria" },
    { id: "DOC002", name: "Business_License.pdf", type: "KYB", size: "1.8MB", uploadDate: "2024-01-09", status: "Under Review", uploadedBy: "Business456", region: "Ghana" },
    { id: "DOC003", name: "Financial_Statement.xlsx", type: "Financial", size: "5.2MB", uploadDate: "2024-01-08", status: "Approved", uploadedBy: "Company789", region: "Kenya" }
  ];

  const securityEvents = [
    { id: "SEC001", type: "Failed Login", description: "Multiple failed login attempts", severity: "High", timestamp: "2024-01-15 14:30", user: "Unknown", ipAddress: "192.168.1.100", region: "Nigeria" },
    { id: "SEC002", type: "Suspicious Activity", description: "Unusual transaction pattern detected", severity: "Medium", timestamp: "2024-01-15 12:15", user: "User123", ipAddress: "10.0.0.50", region: "Ghana" },
    { id: "SEC003", type: "Password Change", description: "Admin password changed", severity: "Low", timestamp: "2024-01-15 09:45", user: "Admin456", ipAddress: "172.16.0.25", region: "Kenya" }
  ];

  const contentPages = [
    { id: "CNT001", title: "Terms of Service", type: "Legal", status: "Published", lastModified: "2024-01-10", author: "Legal Team", views: 125000 },
    { id: "CNT002", title: "Privacy Policy", type: "Legal", status: "Published", lastModified: "2024-01-08", author: "Legal Team", views: 89000 },
    { id: "CNT003", title: "How to Transfer Money", type: "Support", status: "Draft", lastModified: "2024-01-12", author: "Support Team", views: 0 }
  ];

  const downtimeIncidents = [
    { id: "INC001", service: "Payment Gateway", startTime: "2024-01-14 15:30", endTime: "2024-01-14 16:45", duration: "1h 15m", severity: "High", status: "Resolved", affectedRegions: ["Nigeria", "Ghana"] },
    { id: "INC002", service: "Mobile App", startTime: "2024-01-13 09:15", endTime: "2024-01-13 09:45", duration: "30m", severity: "Medium", status: "Resolved", affectedRegions: ["Kenya"] },
    { id: "INC003", service: "API Gateway", startTime: "2024-01-15 14:00", endTime: "Ongoing", duration: "2h 30m", severity: "Critical", status: "Investigating", affectedRegions: ["All"] }
  ];

  const walletOperations = [
    { id: "WAL001", walletId: "WALLET123", operation: "Deposit", amount: 100000, status: "Completed", timestamp: "2024-01-15 14:30", region: "Nigeria", balance: 500000 },
    { id: "WAL002", walletId: "WALLET456", operation: "Withdrawal", amount: 50000, status: "Pending", timestamp: "2024-01-15 12:15", region: "Ghana", balance: 250000 },
    { id: "WAL003", walletId: "WALLET789", operation: "Transfer", amount: 25000, status: "Failed", timestamp: "2024-01-15 09:45", region: "Kenya", balance: 75000 }
  ];

  const escrowTransactions = [
    { id: "ESC001", transactionId: "TXN12345", amount: 500000, buyer: "Company A", seller: "Company B", status: "Held", createdDate: "2024-01-10", releaseDate: "2024-01-20", region: "Nigeria" },
    { id: "ESC002", transactionId: "TXN12346", amount: 250000, buyer: "User123", seller: "Merchant456", status: "Released", createdDate: "2024-01-08", releaseDate: "2024-01-12", region: "Ghana" },
    { id: "ESC003", transactionId: "TXN12347", amount: 750000, buyer: "Business789", seller: "Vendor012", status: "Disputed", createdDate: "2024-01-09", releaseDate: "Pending", region: "Kenya" }
  ];

  const backgroundChecks = [
    { id: "BGC001", userId: "USER123", checkType: "Identity Verification", status: "Completed", score: "95%", completedDate: "2024-01-10", region: "Nigeria" },
    { id: "BGC002", userId: "USER456", checkType: "Credit Check", status: "In Progress", score: "Pending", completedDate: "Pending", region: "Ghana" },
    { id: "BGC003", userId: "USER789", checkType: "Criminal Background", status: "Failed", score: "45%", completedDate: "2024-01-12", region: "Kenya" }
  ];

  const chatSessions = [
    { id: "CHAT001", userId: "USER123", agentId: "AGENT001", status: "Active", startTime: "14:30", duration: "15m", messages: 23, region: "Nigeria" },
    { id: "CHAT002", userId: "USER456", agentId: "AGENT002", status: "Ended", startTime: "12:15", duration: "45m", messages: 67, region: "Ghana" },
    { id: "CHAT003", userId: "USER789", agentId: "AGENT003", status: "Queued", startTime: "Pending", duration: "0m", messages: 0, region: "Kenya" }
  ];

  const emailTemplates = [
    { id: "EMAIL001", name: "Welcome Email", type: "Onboarding", usage: 12456, lastUsed: "2024-01-15", status: "Active", openRate: "78.5%" },
    { id: "EMAIL002", name: "Transaction Alert", type: "Notification", usage: 89000, lastUsed: "2024-01-15", status: "Active", openRate: "92.1%" },
    { id: "EMAIL003", name: "KYC Reminder", type: "Reminder", usage: 5678, lastUsed: "2024-01-14", status: "Draft", openRate: "0%" }
  ];

  const notifications = [
    { id: "NOT001", title: "System Maintenance", type: "System", recipients: 2500000, sent: 2500000, delivered: 2487500, opened: 1865625, status: "Sent" },
    { id: "NOT002", title: "New Feature Launch", type: "Product", recipients: 1200000, sent: 1200000, delivered: 1188000, opened: 950400, status: "Sent" },
    { id: "NOT003", title: "Security Alert", type: "Security", recipients: 50000, sent: 0, delivered: 0, opened: 0, status: "Draft" }
  ];

  const whiteLabels = [
    { id: "WL001", clientName: "Bank of Nigeria", domain: "banking.ng", primaryColor: "#1E40AF", secondaryColor: "#3B82F6", status: "Active", users: 500000 },
    { id: "WL002", clientName: "Ghana Financial", domain: "ghanafin.com", primaryColor: "#059669", secondaryColor: "#10B981", status: "Active", users: 250000 },
    { id: "WL003", clientName: "Kenya Credit", domain: "kenyacredit.ke", primaryColor: "#DC2626", secondaryColor: "#EF4444", status: "Setup", users: 0 }
  ];

  const ratings = [
    { id: "RAT001", userId: "USER123", rating: 5, comment: "Excellent service!", category: "App Experience", date: "2024-01-15", status: "Published", region: "Nigeria" },
    { id: "RAT002", userId: "USER456", rating: 4, comment: "Good but could be better", category: "Customer Support", date: "2024-01-14", status: "Published", region: "Ghana" },
    { id: "RAT003", userId: "USER789", rating: 1, comment: "Terrible experience", category: "Transaction Speed", date: "2024-01-13", status: "Under Review", region: "Kenya" }
  ];

  // Render functions for each page
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Super Admin Dashboard</h2>
          <p className="text-[#64748B]">Platform overview and key metrics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCwIcon className="w-4 h-4" />
            Refresh Data
          </Button>
          <Button className="bg-[#5B52FF] text-white flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">{platformStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12.5% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Transactions</p>
                <p className="text-2xl font-bold text-[#1E293B]">{(platformStats.totalTransactions / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-green-600">+8.3% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Revenue</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦{(platformStats.totalRevenue / 1000000000).toFixed(1)}B</p>
                <p className="text-sm text-green-600">+15.7% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">System Uptime</p>
                <p className="text-2xl font-bold text-[#1E293B]">{platformStats.uptime}%</p>
                <p className="text-sm text-green-600">99.9% SLA target</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Create Admin", icon: <ShieldIcon className="w-5 h-5" />, action: () => setCurrentPage("admin-users") },
              { name: "Manage Users", icon: <UsersIcon className="w-5 h-5" />, action: () => setCurrentPage("users") },
              { name: "View Transactions", icon: <CreditCardIcon className="w-5 h-5" />, action: () => setCurrentPage("transactions") },
              { name: "System Health", icon: <ActivityIcon className="w-5 h-5" />, action: () => setCurrentPage("system-health") },
              { name: "Manage Regions", icon: <GlobeIcon className="w-5 h-5" />, action: () => setCurrentPage("regional") },
              { name: "View Reports", icon: <PieChartIcon className="w-5 h-5" />, action: () => setCurrentPage("reports") }
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center gap-2"
                onClick={action.action}
              >
                {action.icon}
                <span className="text-sm">{action.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Platform Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1E293B]">New admin user created</p>
                <p className="text-sm text-[#64748B]">Sarah Regional Admin added to Ghana region</p>
              </div>
              <span className="text-sm text-[#64748B]">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <DatabaseIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1E293B]">Database maintenance completed</p>
                <p className="text-sm text-[#64748B]">Kenya database optimization finished successfully</p>
              </div>
              <span className="text-sm text-[#64748B]">4 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUpIcon className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1E293B]">Revenue milestone reached</p>
                <p className="text-sm text-[#64748B]">Platform crossed ₦125B in total transaction volume</p>
              </div>
              <span className="text-sm text-[#64748B]">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Admin User Management</h2>
          <p className="text-[#64748B]">Manage all admin users and their permissions</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Admin User Created", "New admin user has been created and onboarding email sent successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Admin User
        </Button>
      </div>

      {/* Admin Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CrownIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Super Admins</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GlobeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Regional Admins</p>
                <p className="text-2xl font-bold text-[#1E293B]">85</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Support Admins</p>
                <p className="text-2xl font-bold text-[#1E293B]">150</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Admins</p>
                <p className="text-2xl font-bold text-[#1E293B]">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Users Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Admin Users</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search admin users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="super">Super Admin</option>
                <option value="regional">Regional Admin</option>
                <option value="support">Support Admin</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ADMIN USER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ROLE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGIONS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST LOGIN</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((admin) => (
                  <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#5B52FF] text-white">
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#1E293B]">{admin.name}</p>
                          <p className="text-sm text-[#64748B]">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        admin.role === "Super Admin" ? "bg-purple-100 text-purple-800" :
                        admin.role === "Regional Admin" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {admin.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {admin.regions.map((region, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        admin.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }>
                        {admin.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{admin.lastLogin}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Admin Updated", `${admin.name} has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRBAC = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">RBAC & Permissions</h2>
          <p className="text-[#64748B]">Manage roles and permissions for admin users</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Role Created", "New role has been created with assigned permissions successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      {/* RBAC Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <KeyIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Roles</p>
                <p className="text-2xl font-bold text-[#1E293B]">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Permissions</p>
                <p className="text-2xl font-bold text-[#1E293B]">127</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Assigned Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <GlobeIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Regions</p>
                <p className="text-2xl font-bold text-[#1E293B]">10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Roles & Permissions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ROLE NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PERMISSIONS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ASSIGNED USERS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DESCRIPTION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
                          <KeyIcon className="w-5 h-5 text-[#5B52FF]" />
                        </div>
                        <span className="font-medium text-[#1E293B]">{role.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{role.permissions} permissions</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{role.users} users</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{role.description}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Role Updated", `${role.name} permissions have been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Permission Categories */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Permission Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-[#1E293B] mb-2">User Management</h4>
              <p className="text-sm text-[#64748B] mb-3">Control user accounts, KYC, and verification</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Create Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Edit Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Approve KYC</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-[#1E293B] mb-2">Transaction Control</h4>
              <p className="text-sm text-[#64748B] mb-3">Manage transactions and financial operations</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">View Transactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Reverse Transactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Manage Disputes</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-[#1E293B] mb-2">System Configuration</h4>
              <p className="text-sm text-[#64748B] mb-3">Configure platform settings and features</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">System Settings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Feature Flags</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Regional Config</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">User Management</h2>
          <p className="text-[#64748B]">Manage all platform users across all regions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Users
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("User Created", "New user account has been created successfully")}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Individual Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.1M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Business Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">350K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CodeIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Developer Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">50K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.5M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">All Users</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="developer">Developer</option>
              </select>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
                <option value="kenya">Kenya</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">KYC/KYB STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">BALANCE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#5B52FF] text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#1E293B]">{user.name}</p>
                          <p className="text-sm text-[#64748B]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        user.type === "Individual" ? "bg-blue-100 text-blue-800" :
                        user.type === "Business" ? "bg-green-100 text-green-800" :
                        "bg-purple-100 text-purple-800"
                      }>
                        {user.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">
                        {user.kycStatus || user.kybStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{user.region}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">{user.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">₦{user.balance.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("User Updated", `${user.name} has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderKYC = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">KYC Management</h2>
          <p className="text-[#64748B]">Manage individual user identity verification</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export KYC Data
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("KYC Approved", "KYC verification has been approved and user has been notified")}
          >
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            Bulk Approve
          </Button>
        </div>
      </div>

      {/* KYC Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileTextIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total KYC Cases</p>
                <p className="text-2xl font-bold text-[#1E293B]">45,623</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Approved</p>
                <p className="text-2xl font-bold text-[#1E293B]">42,156</p>
                <p className="text-sm text-green-600">92.4% approval rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Under Review</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,345</p>
                <p className="text-sm text-yellow-600">Avg 2.4 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Rejected</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,122</p>
                <p className="text-sm text-red-600">2.5% rejection rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Cases Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">KYC Verification Cases</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search KYC cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CURRENT TIER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REQUESTED TIER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DOCUMENTS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SUBMITTED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {kycCases.map((kycCase) => (
                  <tr key={kycCase.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#5B52FF] text-white">
                            {kycCase.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-[#1E293B]">{kycCase.userName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{kycCase.currentTier}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">{kycCase.requestedTier}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kycCase.documents} documents</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        kycCase.status === "Approved" ? "bg-green-100 text-green-800" :
                        kycCase.status === "Rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {kycCase.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kycCase.submittedDate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kycCase.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYC Approved", `${kycCase.userName}'s KYC has been approved successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYC Rejected", `${kycCase.userName}'s KYC has been rejected and user notified`)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderKYB = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">KYB Management</h2>
          <p className="text-[#64748B]">Manage business verification and compliance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export KYB Data
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("KYB Approved", "Business verification has been approved and business has been notified")}
          >
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            Bulk Approve
          </Button>
        </div>
      </div>

      {/* KYB Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total KYB Cases</p>
                <p className="text-2xl font-bold text-[#1E293B]">12,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Approved</p>
                <p className="text-2xl font-bold text-[#1E293B]">10,234</p>
                <p className="text-sm text-green-600">82.2% approval rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Under Review</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,567</p>
                <p className="text-sm text-yellow-600">Avg 5.2 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Rejected</p>
                <p className="text-2xl font-bold text-[#1E293B]">655</p>
                <p className="text-sm text-red-600">5.3% rejection rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYB Cases Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Business Verification Cases</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search KYB cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">BUSINESS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CURRENT TIER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REQUESTED TIER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DOCUMENTS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SUBMITTED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {kybCases.map((kybCase) => (
                  <tr key={kybCase.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
                          <BuildingIcon className="w-5 h-5 text-[#5B52FF]" />
                        </div>
                        <span className="font-medium text-[#1E293B]">{kybCase.businessName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{kybCase.currentTier}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">{kybCase.requestedTier}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kybCase.documents} documents</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        kybCase.status === "Approved" ? "bg-green-100 text-green-800" :
                        kybCase.status === "Rejected" ? "bg-red-100 text-red-800" :
                        kybCase.status === "Under Review" ? "bg-yellow-100 text-yellow-800" :
                        "bg-orange-100 text-orange-800"
                      }>
                        {kybCase.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kybCase.submittedDate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kybCase.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYB Approved", `${kybCase.businessName}'s KYB has been approved successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYB Rejected", `${kybCase.businessName}'s KYB has been rejected and business notified`)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRegional = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Regional Management</h2>
          <p className="text-[#64748B]">Manage multi-regional platform with separate databases</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Region Added", "New region has been added with separate database successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Region
        </Button>
      </div>

      {/* Regional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GlobeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Regions</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Regions</p>
                <p className="text-2xl font-bold text-[#1E293B]">10</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Pending Setup</p>
                <p className="text-2xl font-bold text-[#1E293B]">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Databases</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regions Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Regional Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CODE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USERS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ADMINS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DATABASE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST UPDATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region) => (
                  <tr key={region.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
                          <MapPinIcon className="w-5 h-5 text-[#5B52FF]" />
                        </div>
                        <span className="font-medium text-[#1E293B]">{region.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.code}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.users.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.admins}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        region.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }>
                        {region.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.database}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.lastUpdate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Region Updated", `${region.name} region configuration has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBulkData = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Bulk Historical Data Management</h2>
          <p className="text-[#64748B]">Manage large-scale data operations and historical archives</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <UploadIcon className="w-4 h-4" />
            Import Data
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("Bulk Job Started", "Bulk data processing job has been initiated successfully")}
          >
            <PlayIcon className="w-4 h-4 mr-2" />
            Start Bulk Job
          </Button>
        </div>
      </div>

      {/* Bulk Data Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Records</p>
                <p className="text-2xl font-bold text-[#1E293B]">125.6M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Processed Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.3M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Jobs</p>
                <p className="text-2xl font-bold text-[#1E293B]">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <HardDriveIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Storage Used</p>
                <p className="text-2xl font-bold text-[#1E293B]">15.8TB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Jobs Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Bulk Processing Jobs</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">JOB ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">FILE NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">RECORDS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PROCESSED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">START TIME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {bulkJobs.map((job) => (
                  <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{job.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{job.type}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{job.fileName}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{job.records.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{job.processed.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        job.status === "Completed" ? "bg-green-100 text-green-800" :
                        job.status === "Processing" ? "bg-blue-100 text-blue-800" :
                        job.status === "Failed" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{job.startTime}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{job.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Job Processed", `Bulk job ${job.id} has been processed successfully`)}
                        >
                          <PlayIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderApprovalWorkflow = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Approval Workflow Management</h2>
          <p className="text-[#64748B]">Manage multi-stage approval processes and business rules</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Workflow Created", "New approval workflow has been created and configured successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Approval Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Pending Approvals</p>
                <p className="text-2xl font-bold text-[#1E293B]">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Approved Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Rejected Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Average Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.4h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Escalated</p>
                <p className="text-2xl font-bold text-[#1E293B]">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ZapIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Auto-Approved</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approval Requests Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Approval Requests</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search approval requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REQUEST ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DESCRIPTION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REQUESTED BY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CURRENT APPROVER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PRIORITY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STAGE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {approvalRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{request.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{request.type}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B] max-w-xs truncate">{request.description}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">
                      {request.amount > 0 ? `₦${request.amount.toLocaleString()}` : 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{request.requestedBy}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{request.currentApprover}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        request.priority === "High" ? "bg-red-100 text-red-800" :
                        request.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {request.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        request.status === "Approved" ? "bg-green-100 text-green-800" :
                        request.status === "Rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {request.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{request.stage}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{request.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Request Approved", `Approval request ${request.id} has been approved and processed successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Request Rejected", `Approval request ${request.id} has been rejected and requestor has been notified`)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Transaction Management</h2>
          <p className="text-[#64748B]">Monitor and manage all platform transactions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Transactions
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("Transaction Updated", "Transaction status has been updated successfully")}
          >
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Transaction Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Transactions</p>
                <p className="text-2xl font-bold text-[#1E293B]">45.6M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Success Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">98.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Volume</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦125B</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Disputed</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Recent Transactions</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TRANSACTION ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DATE & TIME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{transaction.id}</td>
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">₦{transaction.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.type}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        transaction.status === "Completed" ? "bg-green-100 text-green-800" :
                        transaction.status === "Failed" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.user}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.region}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.date} {transaction.time}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Transaction Reversed", `Transaction ${transaction.id} has been reversed successfully`)}
                        >
                          <RotateCcwIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontalIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCards = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Card Management</h2>
          <p className="text-[#64748B]">Manage all platform cards and card operations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Card Data
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("Card Issued", "New card has been issued successfully")}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Issue Card
          </Button>
        </div>
      </div>

      {/* Card Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">125,847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">98,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Blocked Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Expired Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">25,457</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MonitorIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Virtual Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">45,623</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Physical Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">80,224</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Platform Cards</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CARD ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CARD NUMBER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">HOLDER NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SPENDING LIMIT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">MONTHLY SPENT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card) => (
                  <tr key={card.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{card.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{card.cardNumber}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{card.holderName}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{card.type}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        card.status === "Active" ? "bg-green-100 text-green-800" :
                        card.status === "Blocked" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {card.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{card.spendingLimit.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{card.monthlySpent.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{card.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Card Blocked", `Card ${card.cardNumber} has been blocked successfully`)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Card Activated", `Card ${card.cardNumber} has been activated successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPOS = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">POS Management</h2>
          <p className="text-[#64748B]">Monitor and manage all POS terminals across regions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export POS Data
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("Terminal Added", "New POS terminal has been added and configured successfully")}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Terminal
          </Button>
        </div>
      </div>

      {/* POS Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Terminals</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <WifiOffIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Offline</p>
                <p className="text-2xl font-bold text-[#1E293B]">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Maintenance</p>
                <p className="text-2xl font-bold text-[#1E293B]">66</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Daily Transactions</p>
                <p className="text-2xl font-bold text-[#1E293B]">45,678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Daily Volume</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦125M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Success Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">98.7%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* POS Terminals Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">POS Terminals</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search terminals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">POS ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TERMINAL ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">MERCHANT NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LOCATION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DAILY VOLUME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TRANSACTIONS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">UPTIME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {posTerminals.map((terminal) => (
                  <tr key={terminal.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{terminal.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{terminal.terminalId}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{terminal.merchantName}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{terminal.location}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        terminal.status === "Active" ? "bg-green-100 text-green-800" :
                        terminal.status === "Offline" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {terminal.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{terminal.dailyVolume.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{terminal.transactionCount}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{terminal.uptime}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Terminal Suspended", `Terminal ${terminal.terminalId} has been suspended successfully`)}
                        >
                          <PauseIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Terminal Activated", `Terminal ${terminal.terminalId} has been activated successfully`)}
                        >
                          <PlayIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderThirdParty = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Third Party Integration Management</h2>
          <p className="text-[#64748B]">Monitor and configure external service integrations</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Integration Added", "New third-party integration has been configured successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Integration Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <LinkIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Integrations</p>
                <p className="text-2xl font-bold text-[#1E293B]">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active</p>
                <p className="text-2xl font-bold text-[#1E293B]">21</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Maintenance</p>
                <p className="text-2xl font-bold text-[#1E293B]">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Inactive</p>
                <p className="text-2xl font-bold text-[#1E293B]">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">External Service Integrations</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">INTEGRATION ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SERVICE NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">UPTIME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST SYNC</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {integrations.map((integration) => (
                  <tr key={integration.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{integration.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{integration.name}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{integration.type}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        integration.status === "Active" ? "bg-green-100 text-green-800" :
                        integration.status === "Maintenance" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {integration.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{integration.uptime}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{integration.lastSync}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{integration.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Integration Updated", `${integration.name} integration has been updated successfully`)}
                        >
                          <RefreshCwIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAPI = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">API Integration Management</h2>
          <p className="text-[#64748B]">Monitor API endpoints, rate limits, and performance</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("API Updated", "API endpoint configuration has been updated successfully")}
        >
          <CodeIcon className="w-4 h-4 mr-2" />
          Configure API
        </Button>
      </div>

      {/* API Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CodeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Endpoints</p>
                <p className="text-2xl font-bold text-[#1E293B]">127</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">API Calls Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.8M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Success Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">99.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg Response</p>
                <p className="text-2xl font-bold text-[#1E293B]">145ms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Endpoints Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">API Endpoints</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">API ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ENDPOINT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">METHOD</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CALLS TODAY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SUCCESS RATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AVG RESPONSE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((endpoint) => (
                  <tr key={endpoint.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{endpoint.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{endpoint.endpoint}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{endpoint.method}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{endpoint.calls.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{endpoint.successRate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{endpoint.avgResponse}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        endpoint.status === "Healthy" ? "bg-green-100 text-green-800" :
                        endpoint.status === "Warning" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {endpoint.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("API Updated", `API endpoint ${endpoint.endpoint} has been updated successfully`)}
                        >
                          <RefreshCwIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDeveloper = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Developer Tools & Sandbox Management</h2>
          <p className="text-[#64748B]">Manage developer accounts, API keys, and sandbox environments</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Developer Added", "New developer account has been created with sandbox access")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Developer
        </Button>
      </div>

      {/* Developer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CodeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Developers</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ServerIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Sandbox Environments</p>
                <p className="text-2xl font-bold text-[#1E293B]">89</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <KeyIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">API Keys Issued</p>
                <p className="text-2xl font-bold text-[#1E293B]">3,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">API Calls Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">567K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Developers Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Developer Accounts</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DEVELOPER ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">EMAIL</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">API KEYS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SANDBOX ENV</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST ACTIVITY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {developers.map((developer) => (
                  <tr key={developer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{developer.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{developer.name}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{developer.email}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{developer.apiKeys} keys</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        developer.sandboxEnv === "Active" ? "bg-green-100 text-green-800" :
                        developer.sandboxEnv === "Suspended" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {developer.sandboxEnv}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{developer.lastActivity}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{developer.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <KeyIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Developer Updated", `${developer.name}'s account has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Marketplace Management System</h2>
          <p className="text-[#64748B]">Manage products, vendors, and marketplace transactions</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Product Added", "New marketplace product has been added successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Marketplace Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCartIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Products</p>
                <p className="text-2xl font-bold text-[#1E293B]">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Sales</p>
                <p className="text-2xl font-bold text-[#1E293B]">12,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Revenue</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦45.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Vendors</p>
                <p className="text-2xl font-bold text-[#1E293B]">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketplace Products Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Marketplace Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PRODUCT ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PRODUCT NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">VENDOR</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PRICE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SALES</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REVENUE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {marketplaceProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{product.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{product.vendor}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{product.price.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{product.sales.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{product.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        product.status === "Active" ? "bg-green-100 text-green-800" :
                        product.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Product Updated", `${product.name} has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDatabase = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Database Management</h2>
          <p className="text-[#64748B]">Monitor database performance, backups, and maintenance</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Database Optimized", "Database optimization has been completed successfully")}
        >
          <RefreshCwIcon className="w-4 h-4 mr-2" />
          Optimize Database
        </Button>
      </div>

      {/* Database Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Databases</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <HardDriveIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Storage</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.8TB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg Query Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">89ms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <LinkIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Connections</p>
                <p className="text-2xl font-bold text-[#1E293B]">246</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Database Instances</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DATABASE ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SIZE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CONNECTIONS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">QUERY TIME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST BACKUP</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {databases.map((database) => (
                  <tr key={database.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{database.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{database.name}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{database.region}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{database.size}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{database.connections}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{database.queryTime}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        database.status === "Healthy" ? "bg-green-100 text-green-800" :
                        database.status === "Warning" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {database.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{database.lastBackup}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Database Optimized", `${database.name} has been optimized successfully`)}
                        >
                          <RefreshCwIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemHealth = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">System Health Check (Analytics)</h2>
          <p className="text-[#64748B]">Monitor platform performance, uptime, and system metrics</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Health Check Completed", "System health check has been completed successfully")}
        >
          <ActivityIcon className="w-4 h-4 mr-2" />
          Run Health Check
        </Button>
      </div>

      {/* System Health Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">System Uptime</p>
                <p className="text-2xl font-bold text-[#1E293B]">99.97%</p>
                <p className="text-sm text-green-600">Last 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Response Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">145ms</p>
                <p className="text-sm text-blue-600">Average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ServerIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">CPU Usage</p>
                <p className="text-2xl font-bold text-[#1E293B]">67%</p>
                <p className="text-sm text-purple-600">Current</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <HardDriveIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Memory Usage</p>
                <p className="text-2xl font-bold text-[#1E293B]">78%</p>
                <p className="text-sm text-orange-600">Current</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Service Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "API Gateway", status: "Healthy", uptime: "99.9%" },
              { name: "Database", status: "Healthy", uptime: "99.8%" },
              { name: "Payment Service", status: "Healthy", uptime: "99.7%" },
              { name: "Authentication", status: "Healthy", uptime: "99.9%" },
              { name: "Notification Service", status: "Warning", uptime: "98.5%" },
              { name: "File Storage", status: "Healthy", uptime: "99.6%" }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === "Healthy" ? "bg-green-500" :
                    service.status === "Warning" ? "bg-yellow-500" :
                    "bg-red-500"
                  }`}></div>
                  <span className="font-medium text-[#1E293B]">{service.name}</span>
                </div>
                <div className="text-right">
                  <Badge className={
                    service.status === "Healthy" ? "bg-green-100 text-green-800" :
                    service.status === "Warning" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {service.status}
                  </Badge>
                  <p className="text-sm text-[#64748B] mt-1">{service.uptime}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSubscription = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Subscription & Fee Management</h2>
          <p className="text-[#64748B]">Manage subscription plans, pricing, and fee structures</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Subscription Updated", "Subscription plan has been updated and users have been notified")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Subscription Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Subscribers</p>
                <p className="text-2xl font-bold text-[#1E293B]">1.7M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Monthly Revenue</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦125M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">ARPU</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦73</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingDownIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Churn Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.1%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Subscription Plans</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PLAN ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PLAN NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SUBSCRIBERS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">MONTHLY REVENUE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CHURN RATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ARPU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{subscription.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{subscription.planName}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{subscription.subscribers.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{subscription.monthlyRevenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{subscription.churnRate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{subscription.arpu}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Plan Updated", `${subscription.planName} has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemLogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">System Log & Configuration Management</h2>
          <p className="text-[#64748B]">Monitor system logs, errors, and configuration settings</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Logs
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("Configuration Updated", "System configuration has been updated successfully")}
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            Update Config
          </Button>
        </div>
      </div>

      {/* System Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileTextIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Log Entries</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.5M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Success Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">99.94%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Error Logs</p>
                <p className="text-2xl font-bold text-[#1E293B]">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <HardDriveIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Log Storage</p>
                <p className="text-2xl font-bold text-[#1E293B]">847GB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Recent System Logs</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="info">INFO</option>
                <option value="warn">WARN</option>
                <option value="error">ERROR</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LOG ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LEVEL</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">MESSAGE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TIMESTAMP</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SOURCE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {systemLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{log.id}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        log.level === "INFO" ? "bg-blue-100 text-blue-800" :
                        log.level === "WARN" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {log.level}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B] max-w-xs truncate">{log.message}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{log.timestamp}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{log.source}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{log.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Profile Settings & Management</h2>
          <p className="text-[#64748B]">Manage your super admin profile and preferences</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Profile Updated", "Your profile has been updated successfully")}
        >
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Full Name</label>
                <Input defaultValue="Super Admin User" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Email Address</label>
                <Input defaultValue="superadmin@surebanker.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Phone Number</label>
                <Input defaultValue="+234 800 123 4567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Role</label>
                <Input defaultValue="Super Administrator" disabled />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Assigned Regions</label>
                <div className="flex flex-wrap gap-2">
                  {["Nigeria", "Ghana", "Kenya", "South Africa", "Tanzania"].map((region) => (
                    <Badge key={region} className="bg-[#5B52FF] text-white">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Two-Factor Authentication</span>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Last Password Change</span>
                <span className="text-sm text-[#64748B]">30 days ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Session Timeout</span>
                <span className="text-sm text-[#64748B]">4 hours</span>
              </div>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1E293B]">Approved KYC verification</p>
                <p className="text-sm text-[#64748B]">Approved John Doe's Tier 2 KYC verification</p>
              </div>
              <span className="text-sm text-[#64748B]">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <SettingsIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1E293B]">Updated system configuration</p>
                <p className="text-sm text-[#64748B]">Modified API rate limits for Ghana region</p>
              </div>
              <span className="text-sm text-[#64748B]">4 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <UsersIcon className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1E293B]">Created new admin user</p>
                <p className="text-sm text-[#64748B]">Added Sarah Regional Admin to Kenya region</p>
              </div>
              <span className="text-sm text-[#64748B]">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWallet = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Wallet Management</h2>
          <p className="text-[#64748B]">Manage platform wallets, balances, and operations</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Wallet Updated", "Wallet configuration has been updated successfully")}
        >
          <WalletIcon className="w-4 h-4 mr-2" />
          Configure Wallet
        </Button>
      </div>

      {/* Wallet Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <WalletIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Wallets</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.5M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Balance</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦45.8B</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Daily Operations</p>
                <p className="text-2xl font-bold text-[#1E293B]">125K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Success Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">99.7%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Operations Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Wallet Operations</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">OPERATION ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">WALLET ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">OPERATION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TIMESTAMP</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">BALANCE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {walletOperations.map((operation) => (
                  <tr key={operation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{operation.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{operation.walletId}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        operation.operation === "Deposit" ? "bg-green-100 text-green-800" :
                        operation.operation === "Withdrawal" ? "bg-red-100 text-red-800" :
                        "bg-blue-100 text-blue-800"
                      }>
                        {operation.operation}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{operation.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        operation.status === "Completed" ? "bg-green-100 text-green-800" :
                        operation.status === "Failed" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {operation.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{operation.timestamp}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{operation.region}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{operation.balance.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Wallet Updated", `Wallet ${operation.walletId} has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEscrow = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Escrow Management</h2>
          <p className="text-[#64748B]">Manage escrow transactions and secure holdings</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Escrow Released", "Escrow funds have been released successfully")}
        >
          <HandshakeIcon className="w-4 h-4 mr-2" />
          Release Escrow
        </Button>
      </div>

      {/* Escrow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <HandshakeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Escrows</p>
                <p className="text-2xl font-bold text-[#1E293B]">8,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Value</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦12.8B</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Escrows</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Disputed</p>
                <p className="text-2xl font-bold text-[#1E293B]">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Transactions Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Escrow Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ESCROW ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TRANSACTION ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">BUYER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SELLER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CREATED DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">RELEASE DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {escrowTransactions.map((escrow) => (
                  <tr key={escrow.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{escrow.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{escrow.transactionId}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{escrow.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{escrow.buyer}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{escrow.seller}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        escrow.status === "Released" ? "bg-green-100 text-green-800" :
                        escrow.status === "Disputed" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {escrow.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{escrow.createdDate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{escrow.releaseDate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{escrow.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Escrow Released", `Escrow ${escrow.id} has been released successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <AlertTriangleIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBackgroundCheck = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Background Check Management System</h2>
          <p className="text-[#64748B]">Manage user screening and compliance verification</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Background Check Initiated", "Background check has been initiated successfully")}
        >
          <SearchCheckIcon className="w-4 h-4 mr-2" />
          Run Check
        </Button>
      </div>

      {/* Background Check Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <SearchCheckIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Checks</p>
                <p className="text-2xl font-bold text-[#1E293B]">45,623</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Passed</p>
                <p className="text-2xl font-bold text-[#1E293B]">42,156</p>
                <p className="text-sm text-green-600">92.4% pass rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">In Progress</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,345</p>
                <p className="text-sm text-yellow-600">Avg 3.2 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Failed</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,122</p>
                <p className="text-sm text-red-600">2.5% fail rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Background Checks Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Background Check Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CHECK ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USER ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CHECK TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SCORE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">COMPLETED DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {backgroundChecks.map((check) => (
                  <tr key={check.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{check.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{check.userId}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{check.checkType}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        check.status === "Completed" ? "bg-green-100 text-green-800" :
                        check.status === "Failed" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {check.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{check.score}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{check.completedDate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{check.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Check Completed", `Background check ${check.id} has been completed successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Report & Analytics Management</h2>
          <p className="text-[#64748B]">Generate and manage platform reports and analytics</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Report Generated", "Platform analytics report has been generated successfully")}
        >
          <PieChartIcon className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <PieChartIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Reports</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DownloadIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Downloads Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3Icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Scheduled Reports</p>
                <p className="text-2xl font-bold text-[#1E293B]">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Report Types</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Available Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "User Analytics", description: "User growth and engagement metrics", icon: <UsersIcon className="w-5 h-5" /> },
              { name: "Transaction Report", description: "Transaction volume and success rates", icon: <CreditCardIcon className="w-5 h-5" /> },
              { name: "Revenue Analytics", description: "Revenue trends and forecasting", icon: <DollarSignIcon className="w-5 h-5" /> },
              { name: "Regional Performance", description: "Performance metrics by region", icon: <GlobeIcon className="w-5 h-5" /> },
              { name: "System Performance", description: "System health and performance metrics", icon: <ActivityIcon className="w-5 h-5" /> },
              { name: "Security Report", description: "Security events and compliance", icon: <ShieldIcon className="w-5 h-5" /> }
            ].map((report, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#5B52FF] rounded-lg flex items-center justify-center text-white">
                    {report.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E293B]">{report.name}</h4>
                    <p className="text-sm text-[#64748B]">{report.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDisputes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Dispute Management</h2>
          <p className="text-[#64748B]">Manage transaction disputes and resolution processes</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={()=> showSuccess("Dispute Resolved", "Dispute has been resolved and all parties have been notified")}
        >
          <CheckCircleIcon className="w-4 h-4 mr-2" />
          Resolve Dispute
        </Button>
      </div>

      {/* Dispute Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Open Disputes</p>
                <p className="text-2xl font-bold text-[#1E293B]">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Resolution Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">3.2 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Disputed Amount</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦8.9M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disputes Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Active Disputes</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search disputes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DISPUTE ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TRANSACTION ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PRIORITY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ASSIGNED TO</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CREATED DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dispute) => (
                  <tr key={dispute.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{dispute.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{dispute.transactionId}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{dispute.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{dispute.type}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        dispute.status === "Resolved" ? "bg-green-100 text-green-800" :
                        dispute.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {dispute.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        dispute.priority === "High" ? "bg-red-100 text-red-800" :
                        dispute.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {dispute.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{dispute.assignedTo}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{dispute.createdDate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{dispute.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Dispute Resolved", `Dispute ${dispute.id} has been resolved successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquareIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChat = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Chat Management</h2>
          <p className="text-[#64748B]">Monitor and manage platform chat sessions and support</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Chat Session Ended", "Chat session has been ended successfully")}
        >
          <MessageSquareIcon className="w-4 h-4 mr-2" />
          Monitor Chats
        </Button>
      </div>

      {/* Chat Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquareIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Chats</p>
                <p className="text-2xl font-bold text-[#1E293B]">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Available Agents</p>
                <p className="text-2xl font-bold text-[#1E293B]">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg Response Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.3min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Satisfaction Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">4.8/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Sessions Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Active Chat Sessions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CHAT ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USER ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AGENT ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">START TIME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DURATION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">MESSAGES</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {chatSessions.map((session) => (
                  <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{session.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{session.userId}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{session.agentId}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        session.status === "Active" ? "bg-green-100 text-green-800" :
                        session.status === "Ended" ? "bg-gray-100 text-gray-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {session.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{session.startTime}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{session.duration}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{session.messages}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{session.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Chat Monitored", `Chat session ${session.id} is being monitored`)}
                        >
                          <MessageSquareIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <StopIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmail = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Email & Template Management</h2>
          <p className="text-[#64748B]">Manage email templates and communication workflows</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Template Created", "New email template has been created successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Email Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MailIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Templates</p>
                <p className="text-2xl font-bold text-[#1E293B]">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <SendIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Emails Sent Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">125K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Open Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">78.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Delivery Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">99.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Templates Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Email Templates</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TEMPLATE ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USAGE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST USED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">OPEN RATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {emailTemplates.map((template) => (
                  <tr key={template.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{template.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{template.name}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{template.type}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{template.usage.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{template.lastUsed}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        template.status === "Active" ? "bg-green-100 text-green-800" :
                        template.status === "Draft" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }>
                        {template.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{template.openRate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Template Updated", `Email template ${template.name} has been updated successfully`)}
                        >
                          <SendIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Notification Management</h2>
          <p className="text-[#64748B]">Manage platform-wide notifications and alerts</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Notification Sent", "Platform notification has been sent successfully to all users")}
        >
          <BellIcon className="w-4 h-4 mr-2" />
          Send Notification
        </Button>
      </div>

      {/* Notification Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BellIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Notifications</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.8M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Delivered</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.7M</p>
                <p className="text-sm text-green-600">96.4% delivery rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Opened</p>
                <p className="text-2xl font-bold text-[#1E293B]">1.9M</p>
                <p className="text-sm text-purple-600">70.4% open rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <SendIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Sent Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">45K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Notifications</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">NOTIFICATION ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TITLE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">RECIPIENTS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SENT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DELIVERED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">OPENED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{notification.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{notification.title}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{notification.type}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{notification.recipients.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{notification.sent.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{notification.delivered.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{notification.opened.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        notification.status === "Sent" ? "bg-green-100 text-green-800" :
                        notification.status === "Draft" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }>
                        {notification.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Notification Sent", `Notification ${notification.title} has been sent successfully`)}
                        >
                          <SendIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Ticketing System Management</h2>
          <p className="text-[#64748B]">Manage customer support tickets and SLA tracking</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Ticket Resolved", "Support ticket has been resolved successfully")}
        >
          <TicketIcon className="w-4 h-4 mr-2" />
          Resolve Ticket
        </Button>
      </div>

      {/* Ticket Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TicketIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Open Tickets</p>
                <p className="text-2xl font-bold text-[#1E293B]">67</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Resolved Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">89</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg Response Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.4h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Satisfaction</p>
                <p className="text-2xl font-bold text-[#1E293B]">4.8/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Support Tickets</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TICKET ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SUBJECT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CATEGORY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PRIORITY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ASSIGNED TO</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CREATED BY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CREATED DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{ticket.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{ticket.subject}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{ticket.category}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        ticket.priority === "High" ? "bg-red-100 text-red-800" :
                        ticket.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        ticket.status === "Resolved" ? "bg-green-100 text-green-800" :
                        ticket.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {ticket.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{ticket.assignedTo}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{ticket.createdBy}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{ticket.createdDate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{ticket.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Ticket Resolved", `Ticket ${ticket.id} has been resolved successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquareIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWhiteLabel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">White Labelling & Platform Customization</h2>
          <p className="text-[#64748B]">Manage platform branding and customization for clients</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("White Label Created", "New white label configuration has been created successfully")}
        >
          <PaletteIcon className="w-4 h-4 mr-2" />
          Create White Label
        </Button>
      </div>

      {/* White Label Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <PaletteIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Brands</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">750K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <GlobeIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Custom Domains</p>
                <p className="text-2xl font-bold text-[#1E293B]">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Configurations</p>
                <p className="text-2xl font-bold text-[#1E293B]">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* White Label Configurations Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">White Label Configurations</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CONFIG ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CLIENT NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DOMAIN</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PRIMARY COLOR</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SECONDARY COLOR</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USERS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {whiteLabels.map((label) => (
                  <tr key={label.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{label.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{label.clientName}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{label.domain}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: label.primaryColor }}
                        ></div>
                        <span className="text-sm text-[#64748B]">{label.primaryColor}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: label.secondaryColor }}
                        ></div>
                        <span className="text-sm text-[#64748B]">{label.secondaryColor}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        label.status === "Active" ? "bg-green-100 text-green-800" :
                        label.status === "Setup" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }>
                        {label.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{label.users.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("White Label Updated", `${label.clientName} branding has been updated successfully`)}
                        >
                          <PaletteIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReferrals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Referrals Management System</h2>
          <p className="text-[#64748B]">Manage referral campaigns and track performance</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Campaign Created", "New referral campaign has been created successfully")}
        >
          <GiftIcon className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Referral Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GiftIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Referrals</p>
                <p className="text-2xl font-bold text-[#1E293B]">24,811</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Conversion Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">73.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Rewards Paid</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦26.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3Icon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">ROI</p>
                <p className="text-2xl font-bold text-[#1E293B]">340%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Campaigns Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Referral Campaigns</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CAMPAIGN ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TOTAL REFERRALS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CONVERSIONS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CONVERSION RATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REWARDS PAID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">END DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {referralCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{campaign.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{campaign.name}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{campaign.totalReferrals.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{campaign.conversions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{campaign.conversionRate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{campaign.rewardsPaid.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        campaign.status === "Active" ? "bg-green-100 text-green-800" :
                        campaign.status === "Ended" ? "bg-gray-100 text-gray-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{campaign.endDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Campaign Updated", `${campaign.name} has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Reward Management System</h2>
          <p className="text-[#64748B]">Manage loyalty programs and reward distribution</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Reward Program Created", "New reward program has been created successfully")}
        >
          <StarIcon className="w-4 h-4 mr-2" />
          Create Program
        </Button>
      </div>

      {/* Reward Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Programs</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Participants</p>
                <p className="text-2xl font-bold text-[#1E293B]">855K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Rewards Paid</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦182M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Participation Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">34%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reward Programs Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Reward Programs</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PROGRAM ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PARTICIPANTS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TOTAL PAID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PARTICIPATION RATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REDEMPTION RATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {rewardPrograms.map((program) => (
                  <tr key={program.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{program.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{program.name}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{program.type}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{program.participants.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">₦{program.totalPaid.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{program.participationRate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{program.redemptionRate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Program Updated", `${program.name} has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRatings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Ratings Management System</h2>
          <p className="text-[#64748B]">Monitor and moderate platform ratings and reviews</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Rating Moderated", "Rating has been reviewed and moderated successfully")}
        >
          <StarIcon className="w-4 h-4 mr-2" />
          Moderate Ratings
        </Button>
      </div>

      {/* Rating Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Ratings</p>
                <p className="text-2xl font-bold text-[#1E293B]">125,847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Average Rating</p>
                <p className="text-2xl font-bold text-[#1E293B]">4.8/5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Under Review</p>
                <p className="text-2xl font-bold text-[#1E293B]">234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Published</p>
                <p className="text-2xl font-bold text-[#1E293B]">125,613</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ratings Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Recent Ratings</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search ratings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="under-review">Under Review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">RATING ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USER ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">RATING</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">COMMENT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CATEGORY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating) => (
                  <tr key={rating.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{rating.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{rating.userId}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-4 h-4 ${i < rating.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B] max-w-xs truncate">{rating.comment}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{rating.category}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{rating.date}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        rating.status === "Published" ? "bg-green-100 text-green-800" :
                        rating.status === "Under Review" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {rating.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{rating.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Rating Approved", `Rating ${rating.id} has been approved and published`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Rating Rejected", `Rating ${rating.id} has been rejected`)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Document Management</h2>
          <p className="text-[#64748B]">Manage platform documents with version control and access permissions</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Document Verified", "Document has been verified and approved successfully")}
        >
          <FolderIcon className="w-4 h-4 mr-2" />
          Verify Document
        </Button>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FolderIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Documents</p>
                <p className="text-2xl font-bold text-[#1E293B]">45,623</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Verified</p>
                <p className="text-2xl font-bold text-[#1E293B]">42,156</p>
                <p className="text-sm text-green-600">92.4% verified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Under Review</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,345</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <HardDriveIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Storage Used</p>
                <p className="text-2xl font-bold text-[#1E293B]">1.2TB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Document Library</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="kyc">KYC</option>
                <option value="kyb">KYB</option>
                <option value="financial">Financial</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DOCUMENT ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SIZE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">UPLOAD DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">UPLOADED BY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr key={document.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{document.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{document.name}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{document.type}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{document.size}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{document.uploadDate}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        document.status === "Verified" ? "bg-green-100 text-green-800" :
                        document.status === "Approved" ? "bg-green-100 text-green-800" :
                        document.status === "Under Review" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {document.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{document.uploadedBy}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{document.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Document Verified", `Document ${document.name} has been verified successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Security & Settings Center</h2>
          <p className="text-[#64748B]">Monitor security events, audit trails, and system logs</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Security Policy Updated", "Security policy has been updated successfully")}
        >
          <LockIcon className="w-4 h-4 mr-2" />
          Update Security
        </Button>
      </div>

      {/* Security Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Security Score</p>
                <p className="text-2xl font-bold text-[#1E293B]">98.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Security Alerts</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Sessions</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <LockIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Failed Logins</p>
                <p className="text-2xl font-bold text-[#1E293B]">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Events Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Security Events</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search security events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Severity</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">EVENT ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DESCRIPTION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SEVERITY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TIMESTAMP</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">IP ADDRESS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {securityEvents.map((event) => (
                  <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{event.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{event.type}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B] max-w-xs truncate">{event.description}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        event.severity === "High" ? "bg-red-100 text-red-800" :
                        event.severity === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {event.severity}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{event.timestamp}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{event.user}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{event.ipAddress}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{event.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Event Investigated", `Security event ${event.id} has been investigated`)}
                        >
                          <SearchIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <LockIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Website Content Management System</h2>
          <p className="text-[#64748B]">Manage website content, pages, and media files</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Content Published", "Website content has been published successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Content Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MonitorIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Pages</p>
                <p className="text-2xl font-bold text-[#1E293B]">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Published</p>
                <p className="text-2xl font-bold text-[#1E293B]">234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <EditIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Drafts</p>
                <p className="text-2xl font-bold text-[#1E293B]">13</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FolderIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Media Files</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Pages Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Website Content</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CONTENT ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TITLE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST MODIFIED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AUTHOR</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">VIEWS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {contentPages.map((page) => (
                  <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{page.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{page.title}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{page.type}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        page.status === "Published" ? "bg-green-100 text-green-800" :
                        page.status === "Draft" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }>
                        {page.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{page.lastModified}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{page.author}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{page.views.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Content Published", `${page.title} has been published successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDowntime = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Downtime Tracker System</h2>
          <p className="text-[#64748B]">Monitor system uptime, incidents, and service availability</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Incident Resolved", "System incident has been resolved successfully")}
        >
          <ActivityIcon className="w-4 h-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {/* Uptime Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Current Uptime</p>
                <p className="text-2xl font-bold text-[#1E293B]">99.97%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg Response Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">145ms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <WifiOffIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Incidents This Month</p>
                <p className="text-2xl font-bold text-[#1E293B]">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <RefreshCwIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">MTTR</p>
                <p className="text-2xl font-bold text-[#1E293B]">12min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Downtime Incidents Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Incidents</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">INCIDENT ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SERVICE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">START TIME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">END TIME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DURATION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SEVERITY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AFFECTED REGIONS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {downtimeIncidents.map((incident) => (
                  <tr key={incident.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{incident.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{incident.service}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{incident.startTime}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{incident.endTime}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{incident.duration}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        incident.severity === "Critical" ? "bg-red-100 text-red-800" :
                        incident.severity === "High" ? "bg-orange-100 text-orange-800" :
                        incident.severity === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        incident.status === "Resolved" ? "bg-green-100 text-green-800" :
                        incident.status === "Investigating" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">
                      {Array.isArray(incident.affectedRegions) ? incident.affectedRegions.join(", ") : incident.affectedRegions}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Incident Resolved", `Incident ${incident.id} has been resolved successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <AlertTriangleIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard": return renderDashboard();
      case "admin-users": return renderAdminUsers();
      case "rbac": return renderRBAC();
      case "users": return renderUsers();
      case "kyc": return renderKYC();
      case "kyb": return renderKYB();
      case "regional": return renderRegional();
      case "bulk-data": return renderBulkData();
      case "approval-workflow": return renderApprovalWorkflow();
      case "transactions": return renderTransactions();
      case "cards": return renderCards();
      case "pos": return renderPOS();
      case "third-party": return renderThirdParty();
      case "api": return renderAPI();
      case "developer": return renderDeveloper();
      case "marketplace": return renderMarketplace();
      case "database": return renderDatabase();
      case "system-health": return renderSystemHealth();
      case "subscription": return renderSubscription();
      case "system-logs": return renderSystemLogs();
      case "profile": return renderProfile();
      case "wallet": return renderWallet();
      case "escrow": return renderEscrow();
      case "background-check": return renderBackgroundCheck();
      case "reports": return renderReports();
      case "disputes": return renderDisputes();
      case "chat": return renderChat();
      case "email": return renderEmail();
      case "notifications": return renderNotifications();
      case "tickets": return renderTickets();
      case "white-label": return renderWhiteLabel();
      case "referrals": return renderReferrals();
      case "rewards": return renderRewards();
      case "ratings": return renderRatings();
      case "documents": return renderDocuments();
      case "security": return renderSecurity();
      case "content": return renderContent();
      case "downtime": return renderDowntime();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Modal with Blur Background */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9998]">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircleIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">{successMessage.title}</h3>
            <p className="text-[#64748B] mb-6">{successMessage.message}</p>
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="bg-[#5B52FF] text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <CrownIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-[#1E293B]">Super Admin</h1>
                <p className="text-xs text-[#64748B]">Platform Control</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            {/* Account Type Switcher */}
            <div className="mb-4">
              <AccountTypeSwitcher variant="sidebar" />
            </div>

            <div className="space-y-1">
              {superAdminNavItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    currentPage === item.id
                      ? "bg-[#5B52FF] text-white"
                      : "text-[#64748B] hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <div className="flex-1">
                    <span className="font-medium text-sm">{item.name}</span>
                    <p className="text-xs opacity-70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <div className="p-4">
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CrownIcon className="w-8 h-8" />
                  <div>
                    <p className="font-semibold">Super Admin</p>
                    <p className="text-sm opacity-80">Full Platform Access</p>
                  </div>
                </div>
                <p className="text-sm opacity-90 mb-3">
                  You have complete control over the SureBanker platform
                </p>
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Platform Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-[#1E293B]">
                    {superAdminNavItems.find(item => item.id === currentPage)?.name || "Super Admin Dashboard"}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <AccountTypeSwitcher variant="header" />
                
                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                  <Button variant="ghost" size="sm" className="p-2">
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    5
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">Super Admin</div>
                    <div className="text-xs text-[#64748B]">Platform Controller</div>
                  </div>
                  <ProfileDropdown
                    userName="Super Admin"
                    userRole="Platform Controller"
                    avatar="SA"
                    profileRoute="/super-admin-profile"
                    accountType="super-admin"
                  />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {renderCurrentPage()}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <CrownIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Super Admin</h1>
              <p className="text-xs text-[#64748B]">Platform Control</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                5
              </Badge>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          {/* Mobile Navigation Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {superAdminNavItems.slice(0, 8).map((item) => (
              <Card 
                key={item.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setCurrentPage(item.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-[#5B52FF] rounded-lg flex items-center justify-center mx-auto mb-2 text-white">
                    {item.icon}
                  </div>
                  <p className="text-sm font-medium text-[#1E293B]">{item.name}</p>
                  <p className="text-xs text-[#64748B]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Page Content */}
          {renderCurrentPage()}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, page: "dashboard" },
              { name: "Users", icon: <UsersIcon className="w-6 h-6" />, page: "users" },
              { name: "Analytics", icon: <BarChart3Icon className="w-6 h-6" />, page: "system-health" },
              { name: "Settings", icon: <SettingsIcon className="w-6 h-6" />, page: "profile" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={() => setCurrentPage(item.page)}
              >
                <div className={`${currentPage === item.page ? 'text-[#5B52FF]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${currentPage === item.page ? 'text-[#5B52FF] font-medium' : 'text-gray-400'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};