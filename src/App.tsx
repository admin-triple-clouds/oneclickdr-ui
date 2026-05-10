import { useState } from "react"

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  // Recovery Page
  if (currentPage === "recovery") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-3xl bg-zinc-900 p-10 rounded-3xl border border-zinc-800">

          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-3">
              OneClick Recovery
            </h1>

            <p className="text-zinc-400">
              Automated disaster recovery workflow execution
            </p>
          </div>

          <div className="space-y-6">

            <div className="bg-zinc-800 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  Validate Backups
                </h3>

                <p className="text-zinc-400 text-sm mt-1">
                  Checking latest recovery points
                </p>
              </div>

              <span className="text-green-400 font-semibold">
                Completed
              </span>
            </div>

            <div className="bg-zinc-800 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  Prepare DR Environment
                </h3>

                <p className="text-zinc-400 text-sm mt-1">
                  Provisioning standby infrastructure
                </p>
              </div>

              <span className="text-green-400 font-semibold">
                Completed
              </span>
            </div>

            <div className="bg-zinc-800 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  Restore Critical Services
                </h3>

                <p className="text-zinc-400 text-sm mt-1">
                  Restoring production workloads
                </p>
              </div>

              <span className="text-blue-400 font-semibold">
                In Progress
              </span>
            </div>

            <div className="bg-zinc-800 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  Health Verification
                </h3>

                <p className="text-zinc-400 text-sm mt-1">
                  Running post-recovery validation
                </p>
              </div>

              <span className="text-yellow-400 font-semibold">
                Pending
              </span>
            </div>

          </div>

          <div className="mt-10 bg-green-500/10 border border-green-500/30 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              Estimated Recovery Time
            </h3>

            <p className="text-5xl font-bold">
              18 mins
            </p>
          </div>

          <button
            onClick={() => setCurrentPage("dashboard")}
            className="mt-10 w-full py-4 bg-blue-600 rounded-xl hover:bg-blue-500 transition font-semibold text-lg"
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    )
  }

  // Dashboard Page
  if (currentPage === "dashboard") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-4xl bg-zinc-900 p-10 rounded-3xl border border-zinc-800">

          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-5xl font-bold">
                DR Dashboard
              </h1>

              <p className="text-zinc-400 mt-2">
                Disaster Recovery Assessment Result
              </p>
            </div>

            <div className="text-right">
              <p className="text-zinc-400 text-sm">
                Overall Readiness
              </p>

              <h2 className="text-6xl font-bold text-green-400">
                72%
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-zinc-800 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">
                Critical Risks
              </h3>

              <ul className="space-y-3 text-zinc-300">
                <li>⚠️ RDS backup missing</li>
                <li>⚠️ EC2 cross-region replication disabled</li>
                <li>⚠️ No DR test in last 90 days</li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">
                Recovery Metrics
              </h3>

              <div className="space-y-4 text-zinc-300">
                <div className="flex justify-between">
                  <span>Estimated RTO</span>
                  <span className="text-blue-400">25 mins</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated RPO</span>
                  <span className="text-yellow-400">5 mins</span>
                </div>

                <div className="flex justify-between">
                  <span>Protected Services</span>
                  <span className="text-green-400">18 / 24</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 bg-zinc-800 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">
              Recommended Actions
            </h3>

            <div className="space-y-3 text-zinc-300">
              <div className="flex justify-between">
                <span>Enable automated RDS snapshots</span>
                <span className="text-red-400">High Priority</span>
              </div>

              <div className="flex justify-between">
                <span>Configure multi-region failover</span>
                <span className="text-yellow-400">Medium</span>
              </div>

              <div className="flex justify-between">
                <span>Schedule DR simulation test</span>
                <span className="text-blue-400">Planned</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage("recovery")}
            className="mt-10 w-full py-4 bg-green-600 rounded-xl hover:bg-green-500 transition font-semibold text-lg"
          >
            Start OneClick Recovery
          </button>

        </div>
      </div>
    )
  }

  // Analyze Page
  if (currentPage === "analyze") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-2xl bg-zinc-900 p-10 rounded-3xl border border-zinc-800">
          <h1 className="text-4xl font-bold mb-3">
            Analyzing Infrastructure
          </h1>

          <p className="text-zinc-400 mb-10">
            OneClickDR is scanning your environment...
          </p>

          <div className="space-y-6">

            <div>
              <div className="flex justify-between mb-2">
                <span>Cloud Resources</span>
                <span>Completed</span>
              </div>

              <div className="w-full h-3 bg-zinc-800 rounded-full">
                <div className="w-full h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Dependency Mapping</span>
                <span>Processing...</span>
              </div>

              <div className="w-full h-3 bg-zinc-800 rounded-full">
                <div className="w-2/3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>DR Readiness Check</span>
                <span>Pending</span>
              </div>

              <div className="w-full h-3 bg-zinc-800 rounded-full">
                <div className="w-1/4 h-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>

          </div>

          <button
            onClick={() => setCurrentPage("dashboard")}
            className="mt-10 w-full py-4 bg-blue-600 rounded-xl hover:bg-blue-500 transition font-semibold"
          >
            View Results
          </button>

        </div>
      </div>
    )
  }

  // Upload Page
  if (currentPage === "upload") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-xl bg-zinc-900 p-10 rounded-3xl border border-zinc-800">
          <h1 className="text-4xl font-bold mb-4">
            Upload Infrastructure Data
          </h1>

          <p className="text-zinc-400 mb-8">
            Upload your cloud configuration or sample DR data.
          </p>

          <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-12 text-center">
            <p className="text-zinc-500">
              Drag & Drop files here
            </p>

            <button className="mt-6 px-5 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition">
              Choose File
            </button>
          </div>

          <button
            onClick={() => setCurrentPage("analyze")}
            className="mt-8 w-full py-4 bg-green-600 rounded-xl hover:bg-green-500 transition font-semibold"
          >
            Start Analyze
          </button>
        </div>
      </div>
    )
  }

  // Home Page
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          OneClickDR
        </h1>

        <p className="text-gray-400 text-xl">
          Disaster Recovery Simplified
        </p>

        <button
          onClick={() => setCurrentPage("upload")}
          className="mt-8 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition"
        >
          Start Demo
        </button>
      </div>
    </div>
  )
}

export default App