import React, { useState } from 'react';
import { 
  MoreVertical, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Globe, 
  Star, 
  Truck, 
  Shield, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  ArrowRight
} from 'lucide-react';

export function InvoicesTableCard({ onInspect }) {
  const [activeTab, setActiveTab] = useState('Unpaid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([false, false, false, false, false, false, false, false, false, false]);

  const invoices = [
    {
      id: 1,
      company: 'BlueHorizon Ltd.',
      service: 'inventra-api (3 → 6 pods)',
      scenarioKey: 'safe',
      iconBg: 'bg-[#092218] text-white',
      icon: Globe,
      date: '08/17/25',
      contact: 'accounts@bluehorizonltd.com',
      value: '$2,100',
      trustScore: 94,
      status: 'Paid',
      statusType: 'safe',
    },
    {
      id: 2,
      company: 'NexaCorp',
      service: 'order-service (2 → 4 pods)',
      scenarioKey: 'safe',
      iconBg: 'bg-[#10b981] text-white',
      iconText: 'N',
      date: '08/17/25',
      contact: 'payments@nexacorp.com',
      value: '$1,100',
      trustScore: 91,
      status: 'Unpaid',
      statusType: 'safe',
    },
    {
      id: 3,
      company: 'StarFreight Co.',
      service: 'payment-gateway (5 → 8 pods)',
      scenarioKey: 'safe',
      iconBg: 'bg-[#3b82f6] text-white',
      icon: Star,
      date: '08/16/25',
      contact: 'info@starfreight.com',
      value: '$1,500',
      trustScore: 88,
      status: 'Unpaid',
      statusType: 'safe',
    },
    {
      id: 4,
      company: 'Movers',
      service: 'delivery-dispatch (4 → 6 pods)',
      scenarioKey: 'safe',
      iconBg: 'bg-[#eab308] text-black',
      icon: Truck,
      date: '08/16/25',
      contact: 'invoices@movers.com',
      value: '$1,030',
      trustScore: 82,
      status: 'Recent request',
      statusType: 'warning',
    },
    {
      id: 5,
      company: 'Arvox Solutions',
      service: 'inventra-api (3 → 20 pods)',
      scenarioKey: 'dangerous',
      iconBg: 'bg-[#dc2626] text-white',
      iconText: 'A',
      date: '08/16/25',
      contact: 'payments@arvox.com',
      value: '$2,800',
      trustScore: 58,
      status: 'Unpaid',
      statusType: 'danger',
    },
    {
      id: 6,
      company: 'Keystone Transport',
      service: 'ingress-controller (nginx)',
      scenarioKey: 'safe',
      iconBg: 'bg-[#475569] text-white',
      icon: Shield,
      date: '08/16/25',
      contact: 'invoices@keystonetr.com',
      value: '$1,200',
      trustScore: 92,
      status: 'Paid',
      statusType: 'safe',
    },
    {
      id: 7,
      company: 'Kestrel Freight',
      service: 'redis-cache (replica sync)',
      scenarioKey: 'safe',
      iconBg: 'bg-[#092218] text-white',
      iconText: 'K',
      date: '08/16/25',
      contact: 'info@kestrelf.com',
      value: '$1,400',
      trustScore: 90,
      status: 'Unpaid',
      statusType: 'safe',
    },
    {
      id: 8,
      company: 'SwiftLogix',
      service: 'analytics-worker (pool +12)',
      scenarioKey: 'safe',
      iconBg: 'bg-[#059669] text-white',
      iconText: 'S',
      date: '08/15/25',
      contact: 'accounts@swiftlogix.com',
      value: '$1,600',
      trustScore: 85,
      status: 'Recent request',
      statusType: 'warning',
    },
    {
      id: 9,
      company: 'GlobalTrade Inc.',
      service: 'auth-service (session cache)',
      scenarioKey: 'safe',
      iconBg: 'bg-[#0284c7] text-white',
      icon: Globe,
      date: '08/15/25',
      contact: 'accounts@globaltrade.com',
      value: '$2,300',
      trustScore: 96,
      status: 'Paid',
      statusType: 'safe',
    },
    {
      id: 10,
      company: 'PathBlaze Inc.',
      service: 'db-migration (unsafe surge)',
      scenarioKey: 'dangerous',
      iconBg: 'bg-[#b91c1c] text-white',
      iconText: '+',
      date: '08/15/25',
      contact: 'invoices@pathblaze.com',
      value: '$1,510',
      trustScore: 58,
      status: 'Unpaid',
      statusType: 'danger',
    }
  ];

  const filteredInvoices = invoices.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unpaid' && item.status === 'Unpaid') return true;
    if (activeTab === 'Recent request' && item.status === 'Recent request') return true;
    if (activeTab === 'Paid' && item.status === 'Paid') return true;
    return true;
  }).filter(item => {
    if (!searchQuery) return true;
    return item.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.contact.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectedRows(selectedRows.map(() => isChecked));
  };

  const toggleSelectRow = (index) => {
    const updated = [...selectedRows];
    updated[index] = !updated[index];
    setSelectedRows(updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8ede9] p-5 shadow-[0_2px_12px_-4px_rgba(9, 34, 24, 0.03)] card-3d flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#092218] font-sans">
            Invoices
          </h3>
          <button 
            title="More options"
            aria-label="More options"
            className="text-[#86a394] hover:text-[#092218] cursor-pointer p-1 rounded-lg hover:bg-[#edf5ee]"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Top 3 Summary KPIs (PAID, RECENT REQUEST, UNPAID) */}
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#86a394] block">
              PAID
            </span>
            <span className="text-xl font-extrabold text-[#092218] font-sans">
              $169K
            </span>
            <span className="text-[10px] font-mono text-[#86a394] block mt-0.5">
              51.5%
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#86a394] block">
              RECENT REQUEST
            </span>
            <span className="text-xl font-extrabold text-[#092218] font-sans">
              $95K
            </span>
            <span className="text-[10px] font-mono text-[#86a394] block mt-0.5">
              29%
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#86a394] block">
              UNPAID
            </span>
            <span className="text-xl font-extrabold text-[#092218] font-sans">
              $64K
            </span>
            <span className="text-[10px] font-mono text-[#86a394] block mt-0.5">
              19.5%
            </span>
          </div>
        </div>

        {/* Continuous 3-color Segmented Progress Bar */}
        <div className="flex w-full h-1.5 rounded-full overflow-hidden mb-5 bg-[#edf5ee] gap-0.5">
          <div className="h-full bg-[#10b981]" style={{ width: '51.5%' }} />
          <div className="h-full bg-[#84cc16]" style={{ width: '29%' }} />
          <div className="h-full bg-[#cbd5e1]" style={{ width: '19.5%' }} />
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#edf3ee]">
          <div className="flex items-center gap-4 text-xs font-sans">
            {['All', 'Unpaid', 'Recent request', 'Paid'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 transition-all cursor-pointer font-medium ${
                    isActive
                      ? 'text-[#092218] font-bold border-b-2 border-[#092218]'
                      : 'text-[#86a394] hover:text-[#092218]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#86a394] absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 rounded-lg border border-[#e2ede5] bg-[#f8fbf9] text-xs font-sans text-[#092218] placeholder-[#86a394] focus:outline-none focus:border-[#092218] focus:bg-white w-full sm:w-36 transition-all"
            />
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="text-[11px] font-mono text-[#86a394] border-b border-[#edf3ee]">
                <th className="pb-2 w-6">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded text-[#10b981] accent-[#10b981] cursor-pointer"
                  />
                </th>
                <th className="pb-2 font-medium">Company</th>
                <th className="pb-2 font-medium">Issue date ▾</th>
                <th className="pb-2 font-medium">Contact</th>
                <th className="pb-2 font-medium text-right">Value</th>
                <th className="pb-2 w-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f2]">
              {filteredInvoices.map((inv, idx) => {
                const isDanger = inv.statusType === 'danger';
                const IconComponent = inv.icon;

                return (
                  <tr
                    key={inv.id}
                    onClick={() => onInspect && onInspect(inv.scenarioKey)}
                    className="hover:bg-[#f6f9f7] transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows[idx] || false}
                        onChange={() => toggleSelectRow(idx)}
                        className="w-3.5 h-3.5 rounded text-[#10b981] accent-[#10b981] cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 ${inv.iconBg}`}>
                          {IconComponent ? (
                            <IconComponent className="w-3.5 h-3.5" />
                          ) : (
                            inv.iconText
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-[#092218] block truncate">
                            {inv.company}
                          </span>
                          <span className="text-[10px] font-mono text-[#86a394] truncate block">
                            {inv.service}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 font-mono text-[#526d60] whitespace-nowrap">
                      {inv.date}
                    </td>
                    <td className="py-2.5 font-mono text-[#526d60] truncate max-w-[140px]">
                      {inv.contact}
                    </td>
                    <td className="py-2.5 font-mono text-right whitespace-nowrap">
                      <div className="font-bold text-[#092218]">{inv.value}</div>
                      <div className={`text-[10px] font-bold ${isDanger ? 'text-[#dc2626]' : 'text-[#059669]'}`}>
                        {isDanger ? '✕ Blocked' : `✓ ${inv.trustScore}`}
                      </div>
                    </td>
                    <td className="py-2.5 text-right">
                      <button 
                        title="Options"
                        aria-label="Options"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspect && onInspect(inv.scenarioKey);
                        }}
                        className="text-[#86a394] group-hover:text-[#092218] p-1 rounded-sm"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#edf3ee] text-xs font-sans text-[#86a394]">
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#092218]">
          <span>Show by</span>
          <strong className="text-[#092218]">10</strong>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>

        <div className="flex items-center gap-2">
          <span>1 / 4</span>
          <button 
            title="Next page"
            aria-label="Next page"
            className="p-1 hover:text-[#092218] cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
