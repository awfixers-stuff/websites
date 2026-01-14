export interface PatreonUserData {
  id: string;
  type: string;
  attributes: {
    full_name: string;
    email: string;
    image_url: string;
    is_email_verified: boolean;
    created: string;
  };
}

export interface PatreonMembership {
  id: string;
  type: string;
  attributes: {
    patron_status: "active_patron" | "declined_patron" | "former_patron";
    pledge_cancellation_pending: boolean;
    last_charge_date: string | null;
    next_charge_date: string | null;
    lifetime_support_cents: number;
    currently_entitled_amount_cents: number;
  };
  relationships: {
    currently_entitled_tiers: {
      data: Array<{
        id: string;
        type: string;
        attributes: {
          title: string;
          description: string;
          amount_cents: number;
        };
      }>;
    };
  };
}

export interface PatreonUserResponse {
  data: PatreonUserData;
}

export interface PatreonMembershipResponse {
  data: PatreonUserData;
  included?: PatreonMembership[];
}

export interface EnhancedUserData {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean;
  };
  subscription: {
    status: "active_patron" | "declined_patron" | "former_patron" | "none";
    isDelinquent: boolean;
    tier: string;
    tierAmount: number;
    lastChargeDate: string | null;
    nextChargeDate: string | null;
    lifetimeSupport: number;
  };
}

export class PatreonAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getUserData(): Promise<PatreonUserData> {
    const response = await fetch(
      'https://www.patreon.com/api/oauth2/v2/identity?' +
      'fields[user]=email,full_name,image_url,is_email_verified,created',
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Patreon API error: ${response.status} ${response.statusText}`);
    }

    const data: PatreonUserResponse = await response.json();
    return data.data;
  }

  async getMembershipData(): Promise<PatreonMembership[]> {
    const response = await fetch(
      'https://www.patreon.com/api/oauth2/v2/identity?' +
      'include=memberships&' +
      'fields[user]=email,full_name,image_url,is_email_verified&' +
      'fields[membership]=patron_status,pledge_cancellation_pending,last_charge_date,next_charge_date,lifetime_support_cents,currently_entitled_amount_cents',
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Patreon API error: ${response.status} ${response.statusText}`);
    }

    const data: PatreonMembershipResponse = await response.json();
    return data.included?.filter((item: any) => item.type === 'member') || [];
  }

  async getEnhancedUserData(): Promise<EnhancedUserData> {
    try {
      const [userData, membershipData] = await Promise.all([
        this.getUserData(),
        this.getMembershipData(),
      ]);

      const activeMembership = membershipData.find(
        (m) => m.attributes.patron_status === 'active_patron'
      );

      const declinedMembership = membershipData.find(
        (m) => m.attributes.patron_status === 'declined_patron'
      );

      const tier = activeMembership?.relationships.currently_entitled_tiers.data[0];

      return {
        user: {
          id: userData.id,
          name: userData.attributes.full_name,
          email: userData.attributes.email,
          image: userData.attributes.image_url,
          emailVerified: userData.attributes.is_email_verified,
        },
        subscription: {
          status: activeMembership?.attributes.patron_status || 
                   declinedMembership?.attributes.patron_status || 
                   'none',
          isDelinquent: declinedMembership?.attributes.pledge_cancellation_pending || false,
          tier: tier?.attributes.title || 'Free',
          tierAmount: tier?.attributes.amount_cents || 0,
          lastChargeDate: activeMembership?.attributes.last_charge_date || null,
          nextChargeDate: activeMembership?.attributes.next_charge_date || null,
          lifetimeSupport: activeMembership?.attributes.lifetime_support_cents || 0,
        },
      };
    } catch (error) {
      console.error('Error fetching Patreon data:', error);
      throw error;
    }
  }
}

export async function getFreshPatreonData(accessToken: string): Promise<EnhancedUserData> {
  const patreonAPI = new PatreonAPI(accessToken);
  return await patreonAPI.getEnhancedUserData();
}