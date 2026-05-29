/**
 * Sympla API Service Client
 * 
 * Documentation: https://developers.sympla.com.br/api-doc
 * Auth Header: s_token: <TOKEN_USER>
 */

export interface SymplaClientConfig {
  token?: string;
  baseUrl?: string;
}

export interface SymplaAddress {
  name: string;
  address: string;
  address_num: string;
  address_alt?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  lon?: string;
  lat?: string;
}

export interface SymplaHost {
  name: string;
  description?: string;
}

export interface SymplaCategory {
  name: string;
}

export interface SymplaEvent {
  id: string;
  reference_id: number;
  start_date: string;
  end_date: string;
  name: string;
  detail: string;
  private_event: number;
  published: number;
  cancelled: number;
  image: string;
  url: string;
  address: SymplaAddress;
  host: SymplaHost;
  category_prim?: SymplaCategory;
  category_sec?: SymplaCategory;
}

export interface SymplaCustomField {
  id: number;
  name: string;
  value: string;
}

export interface SymplaOrder {
  id: string;
  order_date: string;
  order_status: string;
  buyer_first_name: string;
  buyer_last_name: string;
  buyer_email: string;
  buyer_phone?: string;
  buyer_doc?: string;
  discount_code?: string;
  ticket_amount: number;
  nominal_amount: number;
  net_amount: number;
  tax_amount: number;
  payment_type?: string;
}

export interface SymplaParticipant {
  id: number;
  order_id: string;
  ticket_number: string;
  first_name: string;
  last_name: string;
  email: string;
  ticket_name: string;
  checkin: Array<{
    checkin_date: string;
  }>;
  custom_form?: SymplaCustomField[];
}

export interface SymplaPagination {
  has_next: boolean;
  has_prev: boolean;
  quantity: number;
  offset: number;
  page: number;
  page_size: number;
}

export interface SymplaSort {
  field_sort: string;
  sort: 'ASC' | 'DESC';
}

export interface SymplaResponse<T> {
  data: T;
  sort?: SymplaSort;
  pagination?: SymplaPagination;
  error?: boolean;
  code?: number;
  message?: string;
}

export interface SymplaEventsQuery {
  page?: number;
  page_size?: number;
  sort?: 'ASC' | 'DESC';
  field_sort?: string;
  fields?: string;
  published?: boolean;
}

export interface SymplaOrdersQuery {
  page?: number;
  page_size?: number;
  sort?: 'ASC' | 'DESC';
  status?: 'APPROVED' | 'PENDING' | 'CANCELLED' | 'REFUNDED';
}

export interface SymplaParticipantsQuery {
  page?: number;
  page_size?: number;
  ticket_number?: string;
}

export class SymplaClient {
  private token: string;
  private baseUrl: string;

  constructor(config: SymplaClientConfig = {}) {
    // Falls back to Vite environment variable VITE_SYMPLA_TOKEN if not explicitly passed
    this.token = config.token || (import.meta.env.VITE_SYMPLA_TOKEN as string) || '';
    this.baseUrl = config.baseUrl || 'https://api.sympla.com.br/public/v1.5.1';
  }

  /**
   * Helper to perform requests to Sympla API with correct s_token header
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<SymplaResponse<T>> {
    if (!this.token) {
      console.warn('Sympla API Client: API Token (s_token) is not configured.');
    }

    const url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;
    const headers = {
      'Content-Type': 'application/json',
      's_token': this.token,
      ...(options.headers || {}),
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          data: null as any,
          error: true,
          code: data.code || response.status,
          message: data.message || `HTTP error! Status: ${response.status}`,
        };
      }

      return data as SymplaResponse<T>;
    } catch (error: any) {
      return {
        data: null as any,
        error: true,
        message: error.message || 'Network error occurred while fetching Sympla API.',
      };
    }
  }

  /**
   * Helper to construct query string from options object
   */
  private buildQueryString(query?: Record<string, any>): string {
    if (!query) return '';
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        params.append(key, String(val));
      }
    });
    const str = params.toString();
    return str ? `?${str}` : '';
  }

  /**
   * Set or update the Sympla s_token dynamically
   */
  public setToken(token: string): void {
    this.token = token;
  }

  /**
   * Retrieve list of all events
   * GET /events
   */
  public async getEvents(query?: SymplaEventsQuery): Promise<SymplaResponse<SymplaEvent[]>> {
    const qs = this.buildQueryString(query);
    return this.request<SymplaEvent[]>(`/events${qs}`);
  }

  /**
   * Retrieve a specific event by ID
   * GET /events/{eventId}
   */
  public async getEvent(eventId: string): Promise<SymplaResponse<SymplaEvent>> {
    return this.request<SymplaEvent>(`/events/${eventId}`);
  }

  /**
   * Retrieve presentations of a specific event
   * GET /events/{eventId}/presentations
   */
  public async getEventPresentations(eventId: string, query?: Record<string, any>): Promise<SymplaResponse<any>> {
    const qs = this.buildQueryString(query);
    return this.request<any>(`/events/${eventId}/presentations${qs}`);
  }

  /**
   * Retrieve orders of a specific event
   * GET /events/{eventId}/orders
   */
  public async getEventOrders(eventId: string, query?: SymplaOrdersQuery): Promise<SymplaResponse<SymplaOrder[]>> {
    const qs = this.buildQueryString(query);
    return this.request<SymplaOrder[]>(`/events/${eventId}/orders${qs}`);
  }

  /**
   * Retrieve a specific order by ID
   * GET /events/{eventId}/orders/{orderId}
   */
  public async getEventOrder(eventId: string, orderId: string): Promise<SymplaResponse<SymplaOrder>> {
    return this.request<SymplaOrder>(`/events/${eventId}/orders/${orderId}`);
  }

  /**
   * Retrieve participants of a specific event
   * GET /events/{eventId}/participants
   */
  public async getEventParticipants(
    eventId: string, 
    query?: SymplaParticipantsQuery
  ): Promise<SymplaResponse<SymplaParticipant[]>> {
    const qs = this.buildQueryString(query);
    return this.request<SymplaParticipant[]>(`/events/${eventId}/participants${qs}`);
  }

  /**
   * Retrieve a specific participant by ID
   * GET /events/{eventId}/participants/{participantId}
   */
  public async getEventParticipant(eventId: string, participantId: number): Promise<SymplaResponse<SymplaParticipant>> {
    return this.request<SymplaParticipant>(`/events/${eventId}/participants/${participantId}`);
  }

  /**
   * Perform check-in for a specific participant
   * POST /events/{eventId}/participants/{participantId}/checkin
   */
  public async checkInParticipant(
    eventId: string, 
    participantId: number
  ): Promise<SymplaResponse<{ checkin_date: string; ticket_number: string }>> {
    return this.request<{ checkin_date: string; ticket_number: string }>(
      `/events/${eventId}/participants/${participantId}/checkin`,
      {
        method: 'POST',
      }
    );
  }
}

// Single default instance using environment variables configuration
export const sympla = new SymplaClient();
