"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { frontendPreview, sendContact, type ContactPayload } from "@/lib/frontend-preview";

export const supportPath = "/endless-possibilities/give-a-child-a-laptop/request-support";
export const donorPath = "/endless-possibilities/give-a-child-a-laptop/donate";

function useDelivery() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const pending = useRef(false);
  async function deliver(payload: ContactPayload) {
    if (pending.current) return false;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      if (!frontendPreview) await sendContact(payload);
      setDone(true);
      return true;
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Please try again. Your answers are still here.");
      return false;
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  return { busy, error, done, deliver, reset: () => { setDone(false); setError(""); } };
}

function PrivacyConsent() {
  return <label className="fg-checkbox"><input type="checkbox" required name="consent"/> <span>I have read the <Link href="/privacy">privacy notice</Link> and agree that Forge may use these details to review and respond to this enquiry.</span></label>;
}

function DeliveryNote() {
  return <p className="fg-fine">{frontendPreview ? "Preview only. Please use sample details. Nothing is sent or saved." : "Your details are used to review and respond to your enquiry. Please leave out passwords, identity documents and sensitive personal information."}</p>;
}

function Received({kind, reset}: {kind: "enquiry" | "support" | "donor"; reset: () => void}) {
  return <div className="fg-success" role="status" tabIndex={-1} ref={element => {element?.focus();}}><CheckCircle size={42} weight="duotone"/><h3>{frontendPreview ? "Preview completed." : "Your enquiry is received."}</h3><p>{frontendPreview ? "No details were sent or saved. You have completed the demonstration." : kind === "support" ? "Forge will review your request and contact you about the next steps. Support depends on eligibility, adult involvement and a suitable device becoming available. A laptop is not guaranteed." : kind === "donor" ? "Thank you for offering a practical beginning. Keep your device until Forge has reviewed the offer and agreed the next steps with you." : "Thank you for starting the conversation. Forge will review your message and follow up about the next steps."}</p><button type="button" className="fg-link" onClick={reset}>Start another enquiry <ArrowRight size={17}/></button></div>;
}

export function EnquiryForm({initialInterest = "School partnership"}: {initialInterest?: string}) {
  const delivery = useDelivery();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) || "").trim();
    const interest = value("interest");
    await delivery.deliver({name:value("name"),email:value("email"),phone:value("phone"),subject:`Forge enquiry — ${interest}`,inquiryType:interest === "School partnership" ? "schools" : interest === "Giving a laptop" ? "support" : interest === "Volunteering or partnering" ? "partnership" : "general",submissionSource:interest === "School partnership" ? "programmes" : interest === "Giving a laptop" ? "endless-possibilities" : "general",message:[`Interest: ${interest}`,`School or organisation: ${value("organisation") || "Not provided"}`,value("message")].join("\n\n")});
  }
  return <div className="fg-form-panel" id="enquire"><p className="fg-eyebrow">A conversation is a beginning</p><h2>Find your place at Forge.</h2>{delivery.done ? <Received kind="enquiry" reset={delivery.reset}/> : <form data-forge-form onSubmit={submit} aria-busy={delivery.busy}>
    <label>I am here for…<select name="interest" defaultValue={initialInterest}>{["School partnership","Products & technology","Giving a laptop","Volunteering or partnering","Earn with Forge","Something else"].map(option=><option key={option}>{option}</option>)}</select></label>
    <label>Your name<input name="name" required maxLength={120} autoComplete="name" placeholder="What should we call you?" pattern=".*\S.*"/></label>
    <label>School or organisation <span className="fg-optional">(optional)</span><input name="organisation" maxLength={160} autoComplete="organization" placeholder="Where are you joining us from?"/></label>
    <div className="fg-form-grid"><label>Email<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="you@example.com"/></label><label>WhatsApp <span className="fg-optional">(optional)</span><input name="phone" type="tel" maxLength={80} autoComplete="tel" placeholder="Your number"/></label></div>
    <label>How can we help?<textarea name="message" required maxLength={5000} rows={3} placeholder="Tell us a little about your enquiry…"/></label>
    <PrivacyConsent/>{delivery.error && <p className="fg-form-error" role="alert">{delivery.error}</p>}
    <button type="submit" className="fg-button" disabled={delivery.busy}>{delivery.busy ? "Sending…" : frontendPreview ? "Preview enquiry" : "Start a conversation"}<ArrowRight size={18}/></button><DeliveryNote/>
  </form>}<p className="fg-form-crosslink">Looking for a device? <Link href={supportPath}>Request student laptop support <ArrowRight size={15}/></Link></p></div>;
}

const steps = ["Who is applying", "The student", "Need & discovery", "Review"];
export function LaptopApplication() {
  const [step,setStep] = useState(0);
  const [values,setValues] = useState<Record<string,string>>({role:"Teacher"});
  const heading = useRef<HTMLHeadingElement>(null);
  const delivery = useDelivery();
  const role = values.role;
  const set = (name:string,value:string) => setValues(previous=>({...previous,[name]:value}));
  function move(next:number) {setStep(next);requestAnimationFrame(()=>heading.current?.focus());}
  function input(name:string,label:string,placeholder:string,type="text",required=true) {return <label key={name}>{label}{!required && <span className="fg-optional"> (optional)</span>}<input name={name} type={type} value={values[name] || ""} onChange={e=>set(name,e.target.value)} placeholder={placeholder} required={required} maxLength={type === "email" ? 254 : type === "tel" ? 80 : name === "applicantName" ? 120 : 160}/></label>;}
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) return move(step+1);
    await delivery.deliver({name:values.applicantName.trim(),email:values.email.trim(),phone:values.phone?.trim(),subject:"Give a Child a Laptop — student support request",inquiryType:"support",submissionSource:"endless-possibilities",message:Object.entries(values).map(([name,value])=>`${name}: ${value}`).join("\n\n")});
  }
  return <div className="fg-application"><p className="fg-eyebrow">Student laptop support</p><h2 tabIndex={-1} ref={heading}>{steps[step]}</h2>{delivery.done ? <Received kind="support" reset={()=>{delivery.reset();setValues({role:"Teacher"});move(0);}}/> : <>
    <ol className="fg-stepper" aria-label="Application progress">{steps.map((label,index)=><li key={label} aria-current={index === step ? "step" : undefined} className={index <= step ? "is-active" : ""}><span>{index+1}</span><small>{label}</small></li>)}</ol>
    {frontendPreview && <p className="fg-demo-notice">Demonstration only. Use sample details. Nothing is sent or saved.</p>}
    <form data-forge-form onSubmit={submit} aria-busy={delivery.busy}>
      {step === 0 && <>
        <label>I am completing this as…<select name="role" value={role} onChange={e=>set("role",e.target.value)}><option>Teacher</option><option>Parent or guardian</option><option>Student</option></select></label>
        {input("applicantName",role === "Student" ? "Your first name" : "Your name","Your name")}
        {input("email","Contact email (yours or an adult assisting)","you@example.com","email")}
        {input("phone","WhatsApp or phone","Contact number","tel",false)}
        {role === "Teacher" && input("teacherSchool","School where you teach","School name")}
        <p className="fg-fine">Students can begin here. A parent or guardian must be involved before support is agreed. Teachers can refer a learner; they do not replace a guardian’s consent.</p>
      </>}
      {step === 1 && <>
        {input("studentName","Student’s first name","First name only")}
        {input("school","Student’s school","School name")}
        <div className="fg-form-grid"><label>Class<select name="class" value={values.class || ""} onChange={e=>set("class",e.target.value)} required><option value="">Choose class</option>{["JSS1","JSS2","JSS3","SS1","SS2","SS3"].map(value=><option key={value}>{value}</option>)}</select></label>{input("location","Town and state","e.g. Shomolu, Lagos")}</div>
        <label>School category<select name="schoolCategory" value={values.schoolCategory || ""} onChange={e=>set("schoolCategory",e.target.value)} required><option value="">Choose category</option><option>Public secondary school</option><option>Low-income private secondary school</option></select></label>
        {input("guardianName","Parent or guardian’s name","Adult contact name")}
        {input("guardianContact","Parent or guardian’s phone","Adult phone number","tel")}
      </>}
      {step === 2 && <>
        <label>Current computer access<select name="access" value={values.access || ""} onChange={e=>set("access",e.target.value)} required><option value="">Choose the closest answer</option><option>No regular computer access</option><option>A shared or borrowed computer</option><option>A computer that no longer works</option><option>Other — explained below</option></select></label>
        <label>What would the student like to learn or build?<textarea name="project" value={values.project || ""} onChange={e=>set("project",e.target.value)} rows={4} required maxLength={2000} placeholder="An interest, a problem to solve or an idea to explore…"/></label>
        <label>Where did you hear about Forge?<select name="source" value={values.source || ""} onChange={e=>set("source",e.target.value)} required><option value="">Choose one</option>{["School visit or workshop","Teacher or school","Social media","Friend or family","Forge website","Other"].map(value=><option key={value}>{value}</option>)}</select></label>
        {values.source && input("sourceDetail",values.source === "School visit or workshop" ? "Which school, workshop or session?" : "Which platform, person or place?","Tell us a little more","text",false)}
      </>}
      {step === 3 && <>
        <p>Check the details below. You can go back to edit your answers.</p><dl className="fg-review">{Object.entries(values).filter(([,value])=>value).map(([name,value])=><div key={name}><dt>{({role:"Applying as",applicantName:"Applicant",email:"Contact email",phone:"Phone",teacherSchool:"Referring school",studentName:"Student",school:"Student’s school",class:"Class",location:"Location",schoolCategory:"School category",guardianName:"Guardian",guardianContact:"Guardian’s phone",access:"Device access",project:"Learning or project",source:"Heard about Forge",sourceDetail:"Where / who"} as Record<string,string>)[name] || name}</dt><dd>{value}</dd></div>)}</dl>
        <label className="fg-checkbox"><input type="checkbox" required/><span>I understand that support depends on review, parent or guardian involvement and availability. Applying does not guarantee a laptop.</span></label><PrivacyConsent/>
      </>}
      {delivery.error && <p role="alert" className="fg-form-error">{delivery.error}</p>}
      <div className="fg-form-actions">{step > 0 && <button type="button" className="fg-button fg-button-secondary" disabled={delivery.busy} onClick={()=>move(step-1)}><ArrowLeft size={18}/>Back</button>}<button type="submit" className="fg-button" disabled={delivery.busy}>{delivery.busy ? "Sending…" : step < 3 ? "Continue" : frontendPreview ? "Complete preview" : "Send support request"}<ArrowRight size={18}/></button></div>
      <DeliveryNote/>
    </form>
  </>}</div>;
}

export function DonorForm() {
  const delivery=useDelivery();
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();const data=new FormData(event.currentTarget);const get=(key:string)=>String(data.get(key)||"").trim();
    await delivery.deliver({name:get("name"),email:get("email"),phone:get("phone"),subject:"Give a Child a Laptop — donor interest",inquiryType:"support",submissionSource:"endless-possibilities",message:`Offer: ${get("offer")}\n\n${get("device")}`});
  }
  return <div className="fg-form-panel"><p className="fg-eyebrow">Give a child a laptop</p><h2>Offer a laptop.<br/>Open a possibility.</h2>{delivery.done ? <Received kind="donor" reset={delivery.reset}/> : <form data-forge-form onSubmit={submit} aria-busy={delivery.busy}>
    <label>Your name<input name="name" required maxLength={120} autoComplete="name"/></label><label>Email<input name="email" type="email" required maxLength={254} autoComplete="email"/></label><label>WhatsApp or phone <span className="fg-optional">(optional)</span><input name="phone" type="tel" maxLength={80} autoComplete="tel"/></label>
    <label>I would like to…<select name="offer"><option>Offer a working laptop</option><option>Purchase a laptop for a learner</option><option>Discuss company support</option></select></label>
    <label>Tell us about the device or support<textarea name="device" rows={4} required maxLength={3000} placeholder="Model, condition, location or your question…"/></label><PrivacyConsent/>
    {delivery.error && <p role="alert" className="fg-form-error">{delivery.error}</p>}<button type="submit" className="fg-button" disabled={delivery.busy}>{delivery.busy ? "Sending…" : frontendPreview ? "Preview donor enquiry" : "Register donor interest"}<ArrowRight size={18}/></button><DeliveryNote/>
  </form>}</div>;
}
