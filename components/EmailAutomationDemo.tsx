import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldCheck, Zap } from 'lucide-react';

const TASKS = [
    { sender: "Alice Corp", subject: "Invoice Inquiry #4022", action: "Retrieving Quickbooks data...", result: "Invoice Sent" },
    { sender: "TechStart Inc", subject: "Meeting Request", action: "Checking Calendar availability...", result: "Meeting Booked: Tue 2pm" },
    { sender: "John Doe", subject: "Password Reset", action: "Verifying security protocols...", result: "Reset Link Sent" },
    { sender: "Global Logistics", subject: "Shipment Status", action: "Querying Logistics API...", result: "Status Update Sent" },
    { sender: "Marketing Team", subject: "Campaign Approval", action: "Analyzing sentiment...", result: "Forwarded to Manager" },
];

const EmailAutomationDemo: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    useEffect(() => {
        let step = 0;
        let taskIndex = 0;

        const interval = setInterval(() => {
            const task = TASKS[taskIndex];
            const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

            let newLog = null;

            if (step === 0) {
                newLog = { type: 'info', text: `[${timestamp}] New Email: ${task.sender} - "${task.subject}"` };
            } else if (step === 1) {
                newLog = { type: 'action', text: `[${timestamp}] Agent: ${task.action}` };
            } else if (step === 2) {
                newLog = { type: 'success', text: `[${timestamp}] Success: ${task.result}` };
            }

            if (newLog) {
                setLogs(prev => [...prev.slice(-6), newLog]); // Keep last 7 logs
            }

            step++;
            if (step > 3) { // Small pause between tasks
                step = 0;
                taskIndex = (taskIndex + 1) % TASKS.length;
            }

        }, 800); // Speed of simulation

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto bg-brand-dark border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row mt-12">
            {/* Sidebar Stats */}
            <div className="bg-brand-surface p-4 sm:p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-4 sm:mb-6 text-brand-cyan">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-bold tracking-wider text-xs sm:text-sm uppercase">Live Workflow</span>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-white font-mono text-xs sm:text-sm">Active / Processing</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Emails Processed</p>
                            <p className="text-xl sm:text-2xl font-bold text-white font-mono">{1420 + Math.floor(logs.length / 3)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Avg Response Time</p>
                            <p className="text-lg sm:text-xl font-bold text-brand-cyan font-mono">1.2s</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-400">
                        <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        <span>Enterprise Grade Security</span>
                    </div>
                </div>
            </div>

            {/* Terminal Window */}
            <div className="bg-[#0f172a] p-4 sm:p-6 md:w-2/3 font-mono text-xs sm:text-sm relative overflow-hidden h-64 sm:h-72 md:h-80">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Terminal className="w-20 h-20 sm:w-32 sm:h-32 text-white" />
                </div>

                <div className="h-full overflow-y-auto space-y-2 sm:space-y-3 relative z-10 scrollbar-hide" ref={scrollRef}>
                    {logs.map((log, idx) => (
                        <div key={idx} className={`flex gap-2 sm:gap-3 items-start animate-fade-in`}>
                            <span className="text-gray-600 shrink-0">{'>'}</span>
                            <span className={`break-all text-xs sm:text-sm ${log.type === 'info' ? 'text-blue-400' :
                                    log.type === 'action' ? 'text-yellow-400' :
                                        'text-green-400'
                                }`}>
                                {log.text}
                            </span>
                        </div>
                    ))}
                    {logs.length === 0 && <span className="text-gray-500 text-xs sm:text-sm">Initializing agent core...</span>}
                    <div className="flex gap-2 items-center text-brand-cyan/50 animate-pulse mt-4">
                        <span className="w-2 h-4 bg-brand-cyan/50 block"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailAutomationDemo;