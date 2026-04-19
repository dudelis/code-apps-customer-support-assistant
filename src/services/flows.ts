import { PublicClientApplication } from '@azure/msal-browser';

const CLIENT_ID = '22096dd6-2dd5-4c8b-a26f-8a615ae94a8e';
const TENANT_ID = '1e7886bb-4ad8-4924-b559-29c5f5fea8f5';
const FLOW_SCOPE = 'https://service.flow.microsoft.com//.default';
const FLOW_URL = 'https://f0c1817ceed6edee9857661c7b8d6e.0e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ef8fbd01bbbf470fb0ca1f8b80441d03/triggers/manual/paths/invoke?api-version=1';
const REDIRECT_URI = window.location.origin;
const POPUP_POLL_INTERVAL_MS = 200;
const POPUP_TIMEOUT_MS = 120_000;

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
});

let msalInitialized = false;

async function generatePkce(): Promise<{ verifier: string; challenge: string }> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const verifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  return { verifier, challenge };
}

async function acquireTokenViaCustomPopup(): Promise<string> {
  const { verifier, challenge } = await generatePkce();

  const authUrl = new URL(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`);
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('scope', `${FLOW_SCOPE} openid profile`);
  authUrl.searchParams.set('code_challenge', challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  authUrl.searchParams.set('response_mode', 'fragment');
  authUrl.searchParams.set('prompt', 'select_account');

  const popup = window.open(authUrl.toString(), 'msal-popup', 'width=500,height=600,left=200,top=100');
  if (!popup) throw new Error('Popup was blocked. Please allow popups for this app.');

  const code = await new Promise<string>((resolve, reject) => {
    const deadline = Date.now() + POPUP_TIMEOUT_MS;

    const poll = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(poll);
          reject(new Error('Popup was closed before authentication completed.'));
          return;
        }

        // Same-origin: readable once popup lands on our domain after AAD redirect
        const hash = popup.location.hash;
        if (hash.includes('code=')) {
          clearInterval(poll);
          popup.close();
          const params = new URLSearchParams(hash.replace(/^#/, ''));
          const authCode = params.get('code');
          if (!authCode) { reject(new Error('No auth code in popup response.')); return; }
          resolve(authCode);
        }
      } catch {
        // Cross-origin while popup is at login.microsoftonline.com — keep polling
      }

      if (Date.now() > deadline) {
        clearInterval(poll);
        popup.close();
        reject(new Error('Authentication timed out.'));
      }
    }, POPUP_POLL_INTERVAL_MS);
  });

  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        scope: `${FLOW_SCOPE} openid profile`,
        code_verifier: verifier,
      }),
    }
  );

  if (!tokenResponse.ok) {
    const text = await tokenResponse.text();
    throw new Error(`Token exchange failed: ${text}`);
  }

  const tokenData = await tokenResponse.json() as { access_token: string; expires_in: number };
  return tokenData.access_token;
}

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  if (!msalInitialized) {
    await msalInstance.initialize();
    msalInitialized = true;
  }

  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    try {
      const response = await msalInstance.acquireTokenSilent({
        scopes: [FLOW_SCOPE],
        account: accounts[0],
      });
      cachedToken = response.accessToken;
      tokenExpiresAt = response.expiresOn ? response.expiresOn.getTime() - 60_000 : Date.now() + 3_540_000;
      return cachedToken;
    } catch {
      // fall through to custom popup
    }
  }

  const token = await acquireTokenViaCustomPopup();
  cachedToken = token;
  // Access tokens for Flow scope are typically valid 1 hour; cache for 59 minutes
  tokenExpiresAt = Date.now() + 59 * 60 * 1_000;
  return cachedToken;
}

export interface CodeAppFlowInput {
  input1: string;
  input2: string;
}

export interface CodeAppFlowOutput {
  output: string;
}

export async function runCodeAppFlow(input: CodeAppFlowInput): Promise<CodeAppFlowOutput> {
  const token = await getAccessToken();

  const response = await fetch(FLOW_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Flow failed (${response.status}): ${text}`);
  }

  return response.json() as Promise<CodeAppFlowOutput>;
}
