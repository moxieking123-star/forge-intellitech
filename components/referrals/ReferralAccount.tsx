"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { User, SupabaseClient } from "@supabase/supabase-js";
import { referralAuth } from "@/lib/referrals/client";
import s from "./Referrals.module.css";
import ReferralAgreement, { PayoutProfile } from "./ReferralAgreement";

type ReferralLink = {
  id: string;
  code: string;
  schoolName: string;
  location: string;
  stage: string;
  earnedKobo: number | null;
  paidKobo: number;
  startsOn: string | null;
  payableOn: string | null;
};
type AccountData = {
  account: { referralNumber: string; status: string };
  links: ReferralLink[];
};
const stages: Record<string, string> = {
  link_created: "Link created",
  school_requested: "School enquired",
  verified: "Verified",
  teaching_started: "Teaching started",
  payable: "Ready for payment",
  paid: "Paid",
  cancelled: "Cancelled",
};
const money = (kobo: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(kobo / 100);
const date = (value: string | null) => {
  if (!value) return "Not confirmed";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? "Not confirmed"
    : parsed.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

export default function ReferralAccount({ enabled }: { enabled: boolean }) {
  const [supabase,setSupabase]=useState<SupabaseClient|null>(null);
  const [connectionReady,setConnectionReady]=useState(false);
  const [connectionAttempt,setConnectionAttempt]=useState(0);
  const [emailLoginEnabled,setEmailLoginEnabled]=useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(false);
  const [accountError, setAccountError] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [location, setLocation] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [origin, setOrigin] = useState("");
  const activeUserId = useRef<string | null>(null);
  activeUserId.current = user?.id ?? null;
  useEffect(()=>{
    if(!enabled)return;
    let active=true;setConnectionReady(false);
    referralAuth().then(config=>{if(active){setSupabase(config.client);setEmailLoginEnabled(config.emailLoginEnabled);}}).catch(()=>{if(active)setAuthError("Secure account access could not be connected. Please try again.");}).finally(()=>{if(active)setConnectionReady(true);});
    return()=>{active=false;};
  },[enabled,connectionAttempt]);

  const checkAuth = useCallback(async () => {
    if (!supabase) return;
    setAuthError("");
    setAuthReady(false);
    try {
      const result = await supabase.auth.getUser();
      if (result.error && result.error.name !== "AuthSessionMissingError")
        throw result.error;
      setUser(result.data.user);
    } catch {
      setAuthError("We could not check your sign-in. Please try again.");
    } finally {
      setAuthReady(true);
    }
  }, [supabase]);

  useEffect(() => {
    setOrigin(window.location.origin);
    if (!enabled || !supabase) return;
    void checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setAuthReady(true);
        setData(null);
        setAccountError("");
      },
    );
    return () => listener.subscription.unsubscribe();
  }, [enabled, checkAuth, supabase]);

  const loadAccount = useCallback(async () => {
    if (!supabase || !user) return;
    const requestedUserId = user.id;
    setLoading(true);
    setAccountError("");
    setData(null);
    try {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error || !sessionData.session) throw new Error("Session unavailable");
      const response = await fetch("/api/referrals/account", {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Account unavailable");
      const result = (await response.json()) as AccountData;
      if (!result.account?.referralNumber || !Array.isArray(result.links))
        throw new Error("Incomplete account");
      if (activeUserId.current === requestedUserId) setData(result);
    } catch {
      if (activeUserId.current === requestedUserId)
        setAccountError(
          "We could not load your referral records. Your balances are unavailable until the account loads successfully.",
        );
    } finally {
      if (activeUserId.current === requestedUserId) setLoading(false);
    }
  }, [user,supabase]);

  useEffect(() => {
    if (user) void loadAccount();
    else setData(null);
  }, [user, loadAccount]);

  async function sendLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !emailLoginEnabled || !consent || signingIn) return;
    setSigningIn(true);
    setAuthError("");
    setEmailSent(false);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/earn-with-forge#account`,
        },
      });
      if (error) throw error;
      setEmailSent(true);
    } catch {
      setAuthError(
        "We could not send your sign-in email. Please check the address and try again.",
      );
    } finally {
      setSigningIn(false);
    }
  }

  async function signOut() {
    if (!supabase) return;
    activeUserId.current=null;setUser(null);setData(null);
    const { error } = await supabase.auth.signOut({scope:"local"});
    if (error)
      setAuthError("Sign-out could not be completed. Please try again.");
    else {
      setUser(null);
      setData(null);
      setEmailSent(false);
      setCopyMessage("");
    }
  }

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || creating) return;
    setCreating(true);
    setCreateError("");
    try {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error || !sessionData.session) throw new Error("Session unavailable");
      const response = await fetch("/api/referrals/links", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolName: schoolName.trim(),
          location: location.trim(),
        }),
      });
      if (response.status !== 201) throw new Error("Link unavailable");
      setSchoolName("");
      setLocation("");
      await loadAccount();
    } catch {
      setCreateError(
        "We could not confirm that the school link was created. Refresh your records before trying again, to avoid a duplicate.",
      );
    } finally {
      setCreating(false);
    }
  }

  async function copyLink(code: string) {
    const url = `${window.location.origin}/programmes/onboard?ref=${encodeURIComponent(code)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyMessage("School referral link copied.");
    } catch {
      setCopyMessage(`Copy this link manually: ${url}`);
    }
  }

  if(enabled&&!connectionReady)return <div className={s.panel} role="status">Connecting secure referral access…</div>;
  if (!enabled || !supabase)
    return (
      <div className={s.panel}>
        <h3 style={{ marginTop: 0 }}>
          Account registration is unavailable in this preview.
        </h3>
        <p>
          You can explore the referral terms here. Contact Forge to discuss an
          introduction while secure account access is being prepared.
        </p>
        <Link className={s.textLink} href="/contact?interest=referral">
          Talk to Forge about a referral →
        </Link>
        {enabled&&<button className={s.quietButton} onClick={()=>setConnectionAttempt(n=>n+1)}>Retry account connection</button>}
      </div>
    );
  if (!authReady)
    return (
      <div className={s.panel} role="status">
        Checking your secure sign-in…
      </div>
    );
  if (!user)
    return (
      <div className={s.panel}>
        <h3 style={{ marginTop: 0 }}>Create an account or sign in.</h3>
        <p>
          Use the same email each time. We’ll send a secure sign-in link; you do
          not need to create a password.
        </p>
        {!emailLoginEnabled&&<p className={s.notice}>Email sign-in is awaiting secure mail configuration. Registration emails are not being sent yet.</p>}
        <form className={s.form} onSubmit={sendLink}>
          <label className={s.field}>
            Your email address
            <input
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailSent(false);
              }}
            />
          </label>
          <label className={s.check}>
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
            />
            <span>
              I agree that Forge may use my email and referral details to create
              and manage my referral account. I have read the{" "}
              <Link href="/privacy">privacy notice</Link>.
            </span>
          </label>
          <div>
            <button className={s.button} disabled={signingIn||!emailLoginEnabled}>
              {signingIn
                ? "Sending your link…"
                : "Email me a secure sign-in link"}
            </button>
          </div>
        </form>
        {emailSent && (
          <p className={s.notice} role="status">
            Check your email for your secure sign-in link. Open it to continue
            to your account.
          </p>
        )}
        {authError && (
          <div className={s.error} role="alert">
            <p>{authError}</p>
            <button className={s.quietButton} onClick={() => void checkAuth()}>
              Check sign-in again
            </button>
          </div>
        )}
      </div>
    );

  const earned =
    data?.links.reduce((total, link) => total + (link.earnedKobo ?? 0), 0) ?? 0;
  const paid =
    data?.links.reduce((total, link) => total + link.paidKobo, 0) ?? 0;
  const pending =
    data?.links.filter((link) => link.earnedKobo === null).length ?? 0;
  return (
    <div className={s.panel}>
      <div className={s.accountHeader}>
        <div>
          <p className={s.muted}>Signed in as {user.email}</p>
          {data && (
            <>
              <strong>{data.account.referralNumber}</strong>
              <p className={s.muted}>
                Account status: {data.account.status.replace(/_/g, " ")}
              </p>
            </>
          )}
        </div>
        <button className={s.quietButton} onClick={() => void signOut()}>
          Sign out
        </button>
      </div>
      {authError && (
        <p className={s.error} role="alert">
          {authError}
        </p>
      )}
      {loading && <p role="status">Loading your verified referral records…</p>}
      {accountError && (
        <div className={s.error} role="alert">
          <p>{accountError}</p>
          <button className={s.quietButton} onClick={() => void loadAccount()}>
            Retry loading records
          </button>
        </div>
      )}
      {data && (
        <>
          <div className={s.notice}>
            <strong>Helping a school complete its enquiry?</strong>
            <p>
              You can enter its details together from your account. This starts
              the same school review process and connects the introduction to
              you; it does not confirm programme approval.
            </p>
            <Link className={s.button} href="/earn-with-forge/onboard">
              Onboard a school from your account ↗
            </Link>
          </div>
          <dl className={s.summary}>
            <div>
              <dt>School links recorded</dt>
              <dd>{data.links.length}</dd>
            </div>
            <div>
              <dt>Confirmed earnings</dt>
              <dd>{money(earned)}</dd>
            </div>
            <div>
              <dt>Recorded as paid</dt>
              <dd>{money(paid)}</dd>
            </div>
          </dl>
          {pending > 0 && (
            <p className={s.notice}>
              {pending}{" "}
              {pending === 1 ? "school record is" : "school records are"}{" "}
              pending cost review. Unconfirmed amounts are excluded from
              confirmed earnings.
            </p>
          )}
          <PayoutProfile />
          <h3>Your school introductions</h3>
          {data.links.length === 0 ? (
            <p>
              No school links are recorded yet. Create a school-specific link
              below to begin an introduction.
            </p>
          ) : (
            <div
              className={s.tableWrap}
              tabIndex={0}
              role="region"
              aria-label="School introductions, scroll horizontally if needed"
            >
              <table className={s.table}>
                <caption>
                  Only recorded activity appears here. Dates and earnings remain
                  unconfirmed until reviewed by Forge.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">School & link</th>
                    <th scope="col">Progress</th>
                    <th scope="col">Earned</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Teaching starts</th>
                    <th scope="col">Payable date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.links.map((link) => (
                    <tr key={link.id}>
                      <td>
                        <div className={s.school}>{link.schoolName}</div>
                        <div className={s.muted}>{link.location}</div>
                        <a
                          className={s.referralUrl}
                          href={`${origin}/programmes/onboard?ref=${encodeURIComponent(link.code)}`}
                        >{`${origin}/programmes/onboard?ref=${encodeURIComponent(link.code)}`}</a>
                        <button
                          className={s.quietButton}
                          aria-label={`Copy referral link for ${link.schoolName}`}
                          onClick={() => void copyLink(link.code)}
                        >
                          Copy school link
                        </button>
                        <p>
                          <Link
                            className={s.textLink}
                            href={`/earn-with-forge/onboard?ref=${encodeURIComponent(link.code)}`}
                          >
                            Onboard this school →
                          </Link>
                        </p>
                      </td>
                      <td>{stages[link.stage] ?? "Awaiting confirmation"}<ReferralAgreement referralId={link.id} schoolName={link.schoolName} /></td>
                      <td>
                        {link.earnedKobo === null
                          ? "Pending cost review"
                          : money(link.earnedKobo)}
                      </td>
                      <td>{money(link.paidKobo)}</td>
                      <td>{date(link.startsOn)}</td>
                      <td>{date(link.payableOn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className={s.copyStatus} role="status">
            {copyMessage}
          </p>
          <h3>Create a school-specific link</h3>
          <p>
            Use the school’s public name and general location. Do not enter
            learner information or private contact details.
          </p>
          <form className={s.form} onSubmit={createLink}>
            <label className={s.field}>
              School name
              <input
                required
                maxLength={180}
                value={schoolName}
                onChange={(event) => setSchoolName(event.target.value)}
              />
            </label>
            <label className={s.field}>
              School location
              <input
                required
                maxLength={180}
                placeholder="Area, city and state"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </label>
            <div>
              <button className={s.button} disabled={creating}>
                {creating
                  ? "Creating school link…"
                  : "Create school referral link"}
              </button>
            </div>
          </form>
          {createError && (
            <div className={s.error} role="alert">
              <p>{createError}</p>
              <button
                className={s.quietButton}
                onClick={() => void loadAccount()}
              >
                Refresh referral records
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
