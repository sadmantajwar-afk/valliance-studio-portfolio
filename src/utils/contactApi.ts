import { Market, MARKETS, getCanonicalPriceRecord } from './geoPricing';

export interface LeadSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  organization: string;
  websiteUrl?: string;
  market: Market;
  currency: string;
  currencyCode: 'USD' | 'GBP';
  serviceId: string;
  serviceName: string;
  canonicalStartingPrice: string;
  includeMaintenance: boolean;
  maintenancePlanFee: string;
  budget: string;
  timeline: string;
  message: string;
  preferredContact: 'email' | 'call' | 'whatsapp';
  status: 'New' | 'Contacted' | 'In Review' | 'Archived';
}

export interface SubmitLeadInput {
  name: string;
  email: string;
  organization?: string;
  websiteUrl?: string;
  market: Market;
  serviceId: string;
  budget: string;
  timeline: string;
  message: string;
  preferredContact?: 'email' | 'call' | 'whatsapp';
  includeMaintenance?: boolean;
}

export interface SubmitResult {
  success: boolean;
  message?: string;
  leadId?: string;
  mailtoFallback?: string;
}

export async function submitLead(input: SubmitLeadInput): Promise<SubmitResult> {
  const market = input.market === 'UK' ? 'UK' : 'US';
  const includeMaintenance = Boolean(input.includeMaintenance);
  const priceRecord = getCanonicalPriceRecord(input.serviceId, market, includeMaintenance);

  const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const submission: LeadSubmission = {
    id: leadId,
    timestamp: new Date().toISOString(),
    name: input.name.trim(),
    email: input.email.trim(),
    organization: input.organization?.trim() || 'Independent / Individual',
    websiteUrl: input.websiteUrl?.trim() || 'None provided',
    market,
    currency: priceRecord.currency,
    currencyCode: priceRecord.currencyCode,
    serviceId: input.serviceId,
    serviceName: priceRecord.serviceName,
    canonicalStartingPrice: priceRecord.startingPrice,
    includeMaintenance,
    maintenancePlanFee: includeMaintenance ? priceRecord.optionalMaintenance : 'Not selected ($0)',
    budget: input.budget.trim(),
    timeline: input.timeline.trim(),
    message: input.message.trim(),
    preferredContact: input.preferredContact || 'email',
    status: 'New',
  };

  const primaryEndpoint =
    import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
    'https://formsubmit.co/ajax/hello@valliancestudio.com';

  const subject = `[New Client Lead] ${submission.name} (${submission.organization}) — ${submission.market} / ${submission.serviceName}`;
  const mailtoBody = encodeURIComponent(
    `Reference ID: ${submission.id}\n` +
      `Market: ${submission.market} (${submission.currencyCode})\n` +
      `Client Name: ${submission.name}\n` +
      `Email: ${submission.email}\n` +
      `Company: ${submission.organization}\n` +
      `Website: ${submission.websiteUrl}\n` +
      `Selected Service: ${submission.serviceName} (${submission.canonicalStartingPrice})\n` +
      `Optional Maintenance: ${submission.maintenancePlanFee}\n` +
      `Budget Range: ${submission.budget}\n` +
      `Desired Timeline: ${submission.timeline}\n` +
      `Preferred Contact: ${submission.preferredContact.toUpperCase()}\n\n` +
      `External Accounts Disclosure: Client understands third-party AI APIs, hosting, and platform subscriptions are billed directly by providers.\n\n` +
      `Project Brief:\n${submission.message}`
  );

  const mailtoFallback = `mailto:hello@valliancestudio.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  const payload = {
    _lead_id: submission.id,
    _market: submission.market,
    _currency: submission.currencyCode,
    client_name: submission.name,
    client_email: submission.email,
    company: submission.organization,
    existing_website: submission.websiteUrl,
    selected_service: submission.serviceName,
    validated_starting_price: submission.canonicalStartingPrice,
    optional_maintenance: submission.maintenancePlanFee,
    budget: submission.budget,
    timeline: submission.timeline,
    preferred_contact: submission.preferredContact,
    project_brief: submission.message,
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    submitted_at: submission.timestamp,
    origin_page: typeof window !== 'undefined' ? window.location.href : '',
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(primaryEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server responded with HTTP ${response.status}`);
    }

    return {
      success: true,
      leadId: submission.id,
    };
  } catch (error) {
    console.error('Lead submission network notice:', error);
    return {
      success: false,
      leadId: submission.id,
      message: error instanceof Error ? error.message : 'Network request failed',
      mailtoFallback,
    };
  }
}
