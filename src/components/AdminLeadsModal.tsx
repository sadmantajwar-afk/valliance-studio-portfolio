import React, { useState, useEffect } from 'react';
import {
  Lock,
  X,
  Download,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle,
  ExternalLink,
  Shield,
  Building,
  Mail,
  Calendar,
  DollarSign,
  Globe
} from 'lucide-react';
import { sound } from '../utils/audio';
import {
  getStoredLeads,
  updateLeadStatus,
  deleteLead,
  verifyAdminPasscode,
  LeadSubmission
} from '../utils/contactApi';
import { useTheme } from '../utils/theme';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [filterMarket, setFilterMarket] = useState<'ALL' | 'US' | 'UK'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLead, setActiveLead] = useState<LeadSubmission | null>(null);
  const { isDark } = useTheme();

  const loadLeads = () => {
    const list = getStoredLeads();
    setLeads(list);
    if (list.length > 0 && !activeLead) {
      setActiveLead(list[0]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const savedAuth = sessionStorage.getItem('valliance_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
        loadLeads();
      }
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick(800);
    if (verifyAdminPasscode(passcode)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('valliance_admin_auth', 'true');
      setAuthError('');
      loadLeads();
    } else {
      setAuthError('Invalid administrator security key');
      sound.playClick(400);
    }
  };

  const handleStatusChange = (leadId: string, status: LeadSubmission['status']) => {
    sound.playClick(600);
    updateLeadStatus(leadId, status);
    loadLeads();
    if (activeLead && activeLead.id === leadId) {
      setActiveLead({ ...activeLead, status });
    }
  };

  const handleDelete = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this client inquiry?')) {
      sound.playClick(700);
      deleteLead(leadId);
      loadLeads();
      if (activeLead && activeLead.id === leadId) {
        setActiveLead(null);
      }
    }
  };

  const handleExportJson = () => {
    sound.playClick(800);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `valliance-leads-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter((item) => {
    const matchesMarket = filterMarket === 'ALL' || item.market === filterMarket;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMarket && matchesSearch;
  });

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn transition-colors"
      style={{
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(8, 9, 11, 0.65)',
      }}
    >
      <div
        className="w-full max-w-5xl h-[88vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: 'var(--theme-surface-card)',
          color: 'var(--theme-text-primary)',
          borderColor: 'var(--theme-border-strong)',
        }}
      >
        {/* Modal Header */}
        <div
          className="p-4 sm:p-5 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--theme-surface-elevated)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F3264B]/15 border border-[#F3264B]/30 flex items-center justify-center text-[#F3264B]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
                Valliance Studio // Lead Operations Terminal
              </h3>
              <p className="text-[11px] font-mono" style={{ color: 'var(--theme-text-muted)' }}>
                US &amp; UK Client Inquiries • Server-Validated Catalog
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick(500);
              onClose();
            }}
            className="btn-tactile p-2 rounded-full hover:opacity-80"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex items-center justify-center p-6">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F3264B]/10 border border-[#F3264B]/30 flex items-center justify-center mx-auto text-[#F3264B]">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-xl uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
                  Security Access Required
                </h4>
                <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                  Enter studio security passphrase to inspect captured leads.
                </p>
              </div>

              <div className="space-y-2">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter studio key..."
                  className="w-full p-3.5 rounded-xl border text-center text-sm font-mono focus:border-[#F3264B] focus:outline-none"
                  style={{
                    backgroundColor: 'var(--theme-surface-elevated)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text-primary)',
                  }}
                  autoFocus
                />
                {authError && <p className="text-xs text-[#F3264B] font-mono">{authError}</p>}
              </div>

              <button
                type="submit"
                className="btn-tactile w-full py-3.5 px-6 rounded-xl bg-[#F3264B] hover:bg-[#FF2A44] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(243,38,75,0.4)]"
              >
                Authenticate Terminal
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Split View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Column: Leads List */}
            <div
              className="w-full md:w-5/12 border-r flex flex-col"
              style={{
                backgroundColor: 'var(--theme-surface-elevated)',
                borderColor: 'var(--theme-border)',
              }}
            >
              {/* Filter Bar */}
              <div className="p-3 border-b space-y-2.5" style={{ borderColor: 'var(--theme-border)' }}>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--theme-text-muted)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, company, email..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[#F3264B]"
                    style={{
                      backgroundColor: 'var(--theme-surface-card)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text-primary)',
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex gap-1">
                    {(['ALL', 'US', 'UK'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          sound.playClick(600);
                          setFilterMarket(m);
                        }}
                        className={`px-2.5 py-1 rounded text-[10.5px] uppercase ${
                          filterMarket === m
                            ? 'bg-[#F3264B] text-white font-bold'
                            : 'hover:opacity-80'
                        }`}
                        style={{
                          backgroundColor: filterMarket === m ? '#F3264B' : 'var(--theme-surface-card)',
                          color: filterMarket === m ? '#FFFFFF' : 'var(--theme-text-secondary)',
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={loadLeads}
                      title="Refresh"
                      className="p-1 rounded hover:opacity-80"
                      style={{ color: 'var(--theme-text-muted)' }}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleExportJson}
                      title="Export JSON"
                      className="p-1 rounded hover:opacity-80"
                      style={{ color: 'var(--theme-text-muted)' }}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Leads Scroll Area */}
              <div className="flex-1 overflow-y-auto divide-y scrollbar-thin" style={{ borderColor: 'var(--theme-border)' }}>
                {filteredLeads.length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono space-y-2" style={{ color: 'var(--theme-text-muted)' }}>
                    <p>No client inquiries found matching filter.</p>
                  </div>
                ) : (
                  filteredLeads.map((item) => {
                    const isSelected = activeLead?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          sound.playClick(600);
                          setActiveLead(item);
                        }}
                        className="p-3.5 cursor-pointer transition-colors text-left space-y-1.5"
                        style={{
                          backgroundColor: isSelected
                            ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(8,9,11,0.06)')
                            : 'transparent',
                          borderLeft: isSelected ? '2px solid #F3264B' : 'none',
                        }}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold truncate max-w-[140px]" style={{ color: 'var(--theme-text-primary)' }}>
                            {item.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
                              item.status === 'New'
                                ? 'bg-[#F3264B]/20 text-[#F3264B]'
                                : item.status === 'Contacted'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-white/10'
                            }`}
                            style={{
                              color: item.status === 'New'
                                ? '#F3264B'
                                : item.status === 'Contacted'
                                ? '#10B981'
                                : 'var(--theme-text-muted)',
                            }}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="text-[11px] flex items-center justify-between" style={{ color: 'var(--theme-text-secondary)' }}>
                          <span className="truncate max-w-[160px]">{item.organization}</span>
                          <span className="font-mono font-bold text-[#F3264B]">
                            {item.market === 'UK' ? '🇬🇧 £' : '🇺🇸 $'}
                          </span>
                        </div>

                        <div className="text-[10px] font-mono flex items-center justify-between" style={{ color: 'var(--theme-text-muted)' }}>
                          <span className="truncate">{item.serviceName}</span>
                          <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Lead Detail Inspector */}
            <div
              className="w-full md:w-7/12 flex-1 p-6 overflow-y-auto scrollbar-thin"
              style={{
                backgroundColor: 'var(--theme-surface-card)',
              }}
            >
              {activeLead ? (
                <div className="space-y-6">
                  {/* Lead Header */}
                  <div className="flex items-start justify-between pb-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#F3264B] uppercase tracking-wider font-bold">
                          {activeLead.id}
                        </span>
                        <span className="text-[10px] font-mono" style={{ color: 'var(--theme-text-muted)' }}>
                          • {new Date(activeLead.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <h4 className="font-display font-black text-2xl uppercase mt-1" style={{ color: 'var(--theme-text-primary)' }}>
                        {activeLead.name}
                      </h4>
                      <p className="text-xs flex items-center gap-2 mt-0.5" style={{ color: 'var(--theme-text-secondary)' }}>
                        <Building className="w-3.5 h-3.5 text-[#F3264B]" />
                        <span>{activeLead.organization}</span>
                        {activeLead.websiteUrl && activeLead.websiteUrl !== 'None provided' && (
                          <a
                            href={activeLead.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#F3264B] hover:underline"
                          >
                            <Globe className="w-3 h-3" />
                            <span>Visit Site</span>
                          </a>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={activeLead.status}
                        onChange={(e) =>
                          handleStatusChange(activeLead.id, e.target.value as LeadSubmission['status'])
                        }
                        className="p-1.5 px-3 rounded-lg border text-xs font-mono focus:outline-none"
                        style={{
                          backgroundColor: 'var(--theme-surface-elevated)',
                          borderColor: 'var(--theme-border)',
                          color: 'var(--theme-text-primary)',
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Review">In Review</option>
                        <option value="Archived">Archived</option>
                      </select>

                      <button
                        onClick={() => handleDelete(activeLead.id)}
                        className="btn-tactile p-2 rounded-lg border hover:bg-red-500/10 text-red-400"
                        style={{ borderColor: 'var(--theme-border)' }}
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Commercial Specifications */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-xl border space-y-1" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
                      <span className="block" style={{ color: 'var(--theme-text-muted)' }}>Market Region:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>
                        {activeLead.market === 'UK' ? '🇬🇧 United Kingdom (GBP)' : '🇺🇸 United States (USD)'}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl border space-y-1" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
                      <span className="block" style={{ color: 'var(--theme-text-muted)' }}>Selected Package:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>{activeLead.serviceName}</span>
                    </div>

                    <div className="p-3.5 rounded-xl border space-y-1" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
                      <span className="block" style={{ color: 'var(--theme-text-muted)' }}>Validated Baseline:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>{activeLead.canonicalStartingPrice}</span>
                    </div>

                    <div className="p-3.5 rounded-xl border space-y-1" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
                      <span className="block" style={{ color: 'var(--theme-text-muted)' }}>Optional Care Plan:</span>
                      <span className="font-bold" style={{ color: activeLead.includeMaintenance ? '#F3264B' : 'var(--theme-text-primary)' }}>
                        {activeLead.maintenancePlanFee}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl border space-y-1" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
                      <span className="block" style={{ color: 'var(--theme-text-muted)' }}>Client Stated Budget:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>{activeLead.budget}</span>
                    </div>

                    <div className="p-3.5 rounded-xl border space-y-1" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
                      <span className="block" style={{ color: 'var(--theme-text-muted)' }}>Delivery Window:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>{activeLead.timeline}</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="p-4 rounded-xl border space-y-2 text-xs" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
                    <div className="font-mono uppercase font-bold" style={{ color: 'var(--theme-text-muted)' }}>Client Contact</div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                      <a
                        href={`mailto:${activeLead.email}`}
                        className="inline-flex items-center gap-1.5 text-[#F3264B] hover:underline"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{activeLead.email}</span>
                      </a>
                      <span style={{ color: 'var(--theme-text-muted)' }}>
                        Mode: <strong style={{ color: 'var(--theme-text-primary)' }}>{activeLead.preferredContact.toUpperCase()}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Project Scope Brief */}
                  <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
                    <div className="font-mono text-xs uppercase font-bold" style={{ color: 'var(--theme-text-muted)' }}>
                      Project Scope Brief
                    </div>
                    <p className="text-xs whitespace-pre-wrap leading-relaxed font-sans" style={{ color: 'var(--theme-text-secondary)' }}>
                      {activeLead.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-xs font-mono" style={{ color: 'var(--theme-text-muted)' }}>
                  Select a client inquiry from the sidebar to inspect full brief.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
