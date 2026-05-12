import { useState, type ReactNode } from "react"

type Page = "login" | "dashboard" | "upload" | "analyze" | "recovery" | "insights" | "settings"

const findings = [
  "Public S3 bucket exposure detected",
  "RDS automated backup is not enabled",
  "Cross-region recovery path is missing",
]

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login")
  const logout = () => setCurrentPage("login")

  if (currentPage === "login") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-bold mb-3">OneClickDR</h1>
            <p className="text-zinc-400 text-lg">Enterprise Recovery Platform</p>
          </div>
          <div className="space-y-5">
            <Field label="Work Email" type="email" placeholder="admin@company.com" />
            <Field label="Password" type="password" placeholder="••••••••" />
            <button onClick={() => setCurrentPage("dashboard")} className="w-full mt-4 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition font-semibold">Sign In</button>
          </div>
          <div className="mt-8 text-center text-sm text-zinc-500">Protected by OneClickDR Enterprise Security</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} logout={logout} />
      <main className="flex-1 min-h-screen">
        <Topbar />
        <div className="p-8">
          {currentPage === "dashboard" && <DashboardPage setCurrentPage={setCurrentPage} />}
          {currentPage === "upload" && <UploadPage setCurrentPage={setCurrentPage} />}
          {currentPage === "analyze" && <AnalyzePage setCurrentPage={setCurrentPage} />}
          {currentPage === "recovery" && <RecoveryPage setCurrentPage={setCurrentPage} />}
          {currentPage === "insights" && <InsightsPage />}
          {currentPage === "settings" && <SettingsPage />}
        </div>
      </main>
    </div>
  )
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return <div><label className="text-sm text-zinc-400 mb-2 block">{label}</label><input type={type} placeholder={placeholder} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500" /></div>
}

function Sidebar({ currentPage, setCurrentPage, logout }: { currentPage: Page; setCurrentPage: (page: Page) => void; logout: () => void }) {
  const navItems: { label: string; page: Page; icon: string }[] = [
    { label: "Dashboard", page: "dashboard", icon: "📊" },
    { label: "Upload", page: "upload", icon: "📤" },
    { label: "Analyze", page: "analyze", icon: "🔍" },
    { label: "Recovery", page: "recovery", icon: "🚀" },
    { label: "AI Insights", page: "insights", icon: "🧠" },
    { label: "Settings", page: "settings", icon: "⚙️" },
  ]
  return (
    <aside className="w-72 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col">
      <div className="mb-10"><h1 className="text-3xl font-bold">OneClickDR</h1><p className="text-zinc-500 text-sm mt-1">Enterprise Console</p></div>
      <nav className="space-y-2 flex-1">{navItems.map((item) => <button key={item.page} onClick={() => setCurrentPage(item.page)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${currentPage === item.page ? "bg-blue-600 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}><span>{item.icon}</span><span>{item.label}</span></button>)}</nav>
      <button onClick={logout} className="w-full px-4 py-3 rounded-xl text-left text-zinc-400 hover:bg-zinc-900 hover:text-white transition">🚪 Logout</button>
    </aside>
  )
}

function Topbar() {
  return <header className="h-20 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8"><div><p className="text-zinc-500 text-sm">Organization</p><h2 className="text-xl font-semibold">Triple Clouds Demo Org</h2></div><div className="flex items-center gap-4"><div className="text-right"><p className="text-sm font-medium">Admin User</p><p className="text-xs text-zinc-500">admin@triple-clouds.com</p></div><div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">TC</div></div></header>
}

function DashboardPage({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-10"><div><p className="text-blue-400 font-semibold mb-3">Demo Flow Step 3 / 3</p><h1 className="text-6xl font-bold mb-3">DR Dashboard</h1><p className="text-zinc-400 text-xl">Disaster Recovery Assessment Result</p></div><div className="text-right bg-zinc-900 border border-zinc-800 rounded-3xl p-6"><p className="text-zinc-400 text-lg">Overall Readiness</p><p className="text-green-400 text-7xl font-bold">72%</p></div></div>
      <div className="grid md:grid-cols-3 gap-6 mb-8"><MetricCard title="Estimated RTO" value="25 mins" tone="blue" /><MetricCard title="Estimated RPO" value="5 mins" tone="yellow" /><MetricCard title="Protected Services" value="18 / 24" tone="green" /></div>
      <div className="grid md:grid-cols-2 gap-8 mb-8"><Panel title="Critical Risks"><div className="space-y-4 text-xl text-zinc-300">{findings.map((item) => <p key={item}>⚠️ {item}</p>)}</div></Panel><Panel title="Recovery Coverage"><div className="space-y-5 text-xl"><Progress label="Compute" value="85%" width="w-5/6" /><Progress label="Database" value="62%" width="w-2/3" /><Progress label="Network" value="78%" width="w-3/4" /></div></Panel></div>
      <Panel title="Recommended Actions"><div className="space-y-5 text-xl"><ActionRow action="Enable automated RDS snapshots" priority="High Priority" color="text-red-400" /><ActionRow action="Configure multi-region failover" priority="Medium" color="text-yellow-400" /><ActionRow action="Schedule DR simulation test" priority="Planned" color="text-blue-400" /></div></Panel>
      <button onClick={() => setCurrentPage("recovery")} className="w-full mt-8 py-5 bg-green-600 rounded-2xl hover:bg-green-500 transition text-2xl font-bold">Start OneClick Recovery</button>
    </div>
  )
}

function UploadPage({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) {
  const [selectedFileName, setSelectedFileName] = useState("")
  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-blue-400 font-semibold mb-3">Demo Flow Step 1 / 3</p>
      <h1 className="text-6xl font-bold mb-4">Upload Infrastructure Data</h1>
      <p className="text-zinc-400 mb-10 text-xl">Upload a Terraform plan, AWS JSON export, YAML, CSV, or sample DR data.</p>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">
        <label className="border-2 border-dashed border-zinc-700 rounded-3xl p-16 text-center block cursor-pointer hover:border-blue-500 hover:bg-zinc-800/50 transition">
          <input type="file" className="hidden" accept=".json,.csv,.tf,.tfvars,.yaml,.yml,.txt" onChange={(event) => setSelectedFileName(event.target.files?.[0]?.name ?? "")} />
          <div className="text-6xl mb-6">📤</div>
          <p className="text-zinc-300 text-2xl font-semibold">{selectedFileName || "Drag & Drop files here"}</p>
          <p className="text-zinc-600 mt-2">JSON, CSV, Terraform, YAML, or TXT</p>
          <span className="inline-block mt-8 px-8 py-4 bg-blue-600 rounded-2xl hover:bg-blue-500 transition text-xl">{selectedFileName ? "Replace File" : "Choose File"}</span>
        </label>
        {selectedFileName && <div className="mt-6 bg-black/40 border border-zinc-800 rounded-2xl p-5"><p className="text-green-400 font-semibold">File ready for analysis</p><p className="text-zinc-400 mt-1">{selectedFileName}</p></div>}
        <button onClick={() => setCurrentPage("analyze")} disabled={!selectedFileName} className={`w-full mt-10 py-5 rounded-2xl transition text-2xl font-semibold ${selectedFileName ? "bg-green-600 hover:bg-green-500 text-white" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"}`}>Start Analyze</button>
        <button onClick={() => setSelectedFileName("sample-aws-dr-assessment.json")} className="w-full mt-4 py-4 border border-zinc-700 rounded-2xl text-zinc-300 hover:bg-zinc-800 transition">Use Sample Infrastructure File</button>
      </div>
    </div>
  )
}

function AnalyzePage({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) {
  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-blue-400 font-semibold mb-3">Demo Flow Step 2 / 3</p>
      <h1 className="text-6xl font-bold mb-4">Analyzing Infrastructure</h1>
      <p className="text-zinc-400 mb-10 text-xl">OneClickDR is scanning resources, dependencies, and recovery readiness.</p>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 space-y-8">
        <Progress label="Parsing infrastructure file" value="Completed" width="w-full" />
        <Progress label="Checking IAM and exposure risks" value="Processing..." width="w-5/6" />
        <Progress label="Evaluating RTO / RPO posture" value="Processing..." width="w-2/3" />
        <Progress label="Generating AI recommendations" value="Pending" width="w-1/3" />
        <div className="rounded-2xl border border-blue-600/40 bg-blue-600/10 p-5 text-blue-200">AI analysis is running in demo mode. Results are generated from a sample infrastructure risk model.</div>
        <button onClick={() => setCurrentPage("dashboard")} className="w-full mt-8 py-5 bg-blue-600 rounded-2xl hover:bg-blue-500 transition text-2xl font-semibold">View Results</button>
      </div>
    </div>
  )
}

function RecoveryPage({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) {
  return <div className="max-w-5xl mx-auto"><h1 className="text-6xl font-bold mb-3">OneClick Recovery</h1><p className="text-zinc-400 text-xl mb-10">Automated disaster recovery workflow execution</p><div className="grid md:grid-cols-2 gap-8 mb-8"><div className="space-y-6"><RecoveryStep title="Validate Backups" description="Checking latest recovery points" status="Completed" color="text-green-400" /><RecoveryStep title="Prepare DR Environment" description="Provisioning standby infrastructure" status="Completed" color="text-green-400" /><RecoveryStep title="Restore Critical Services" description="Restoring production workloads" status="In Progress" color="text-blue-400" /><RecoveryStep title="Health Verification" description="Running post-recovery validation" status="Pending" color="text-yellow-400" /></div><div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"><p className="text-green-400 text-3xl mb-2">Estimated Recovery Time</p><p className="text-7xl font-bold mb-8">18 mins</p><div className="space-y-4 text-zinc-300 text-lg"><p>✅ Backup integrity verified</p><p>✅ Target region prepared</p><p>🔄 Service restoration running</p><p>⏳ Final health checks pending</p></div><button onClick={() => setCurrentPage("dashboard")} className="w-full mt-10 py-4 bg-blue-600 rounded-2xl hover:bg-blue-500 transition text-xl font-semibold">Back to Dashboard</button></div></div></div>
}

function InsightsPage() {
  return <div className="max-w-5xl mx-auto"><h1 className="text-6xl font-bold mb-4">AI Insights</h1><p className="text-zinc-400 text-xl mb-10">AI-generated disaster recovery recommendations.</p><div className="grid gap-6"><InsightCard title="High-risk database dependency detected" body="The production RDS instance has no verified cross-region recovery path. Enable automated snapshots and replicate to a secondary region." impact="High Impact" /><InsightCard title="Recovery confidence can improve by 22%" body="Running a monthly DR simulation and validating health checks can improve estimated readiness from 72% to 94%." impact="Medium Impact" /><InsightCard title="Network failover gap" body="Current routing configuration does not include automated failover for critical services behind the primary load balancer." impact="High Impact" /></div></div>
}

function SettingsPage() {
  return <div className="max-w-4xl mx-auto"><h1 className="text-6xl font-bold mb-4">Settings</h1><p className="text-zinc-400 text-xl mb-10">Manage organization, cloud providers, and recovery policies.</p><div className="grid gap-6"><Panel title="Organization"><div className="space-y-4 text-xl text-zinc-300"><p>Name: Triple Clouds Demo Org</p><p>Plan: Enterprise Demo</p><p>Region: ap-northeast-1</p></div></Panel><Panel title="Cloud Providers"><div className="flex gap-4"><Badge>AWS Connected</Badge><Badge>Azure Pending</Badge><Badge>GCP Pending</Badge></div></Panel><Panel title="Recovery Policy"><div className="space-y-4 text-xl text-zinc-300"><p>Target RTO: 30 mins</p><p>Target RPO: 5 mins</p><p>Auto Recovery: Simulation Mode</p></div></Panel></div></div>
}

function MetricCard({ title, value, tone }: { title: string; value: string; tone: "blue" | "yellow" | "green" }) {
  const toneMap = { blue: "text-blue-400", yellow: "text-yellow-400", green: "text-green-400" }
  return <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"><p className="text-zinc-400 text-lg">{title}</p><p className={`text-4xl font-bold mt-2 ${toneMap[tone]}`}>{value}</p></div>
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"><h2 className="text-3xl font-bold mb-6">{title}</h2>{children}</div>
}

function Progress({ label, value, width }: { label: string; value: string; width: string }) {
  return <div><div className="flex justify-between mb-2 text-lg"><span>{label}</span><span className="text-zinc-400">{value}</span></div><div className="w-full h-4 bg-zinc-800 rounded-full"><div className={`${width} h-4 bg-blue-500 rounded-full`} /></div></div>
}

function ActionRow({ action, priority, color }: { action: string; priority: string; color: string }) {
  return <div className="flex justify-between border-b border-zinc-700 pb-4 last:border-0"><span>{action}</span><span className={color}>{priority}</span></div>
}

function RecoveryStep({ title, description, status, color }: { title: string; description: string; status: string; color: string }) {
  return <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex justify-between items-center"><div><h2 className="text-2xl font-semibold">{title}</h2><p className="text-zinc-400 mt-1">{description}</p></div><span className={`${color} text-xl font-semibold`}>{status}</span></div>
}

function InsightCard({ title, body, impact }: { title: string; body: string; impact: string }) {
  return <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"><div className="flex justify-between gap-6"><div><h2 className="text-3xl font-bold mb-3">{title}</h2><p className="text-zinc-400 text-xl leading-relaxed">{body}</p></div><span className="h-fit px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 border border-blue-600/40">{impact}</span></div></div>
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">{children}</span>
}

export default App
