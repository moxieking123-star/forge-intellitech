"""Build review PDFs. Private proposal is never written beneath public/."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PRIVATE = ROOT / 'private-assets'
PRIVATE.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont('Forge', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ForgeBold', 'C:/Windows/Fonts/arialbd.ttf'))
INK = HexColor('#102b24'); CREAM = HexColor('#f4f1e9'); ORANGE = HexColor('#f56b2c')
W,H = 595.28,841.89
c = canvas.Canvas(str(PRIVATE/'forge-school-proposal-2026-10-22-v1.pdf'), pagesize=(W,H))
c.setTitle('A beginning worth building | Forge school programme proposal')
c.setAuthor('Forge Intellitech Services Ltd')
style = ParagraphStyle('body',fontName='Forge',fontSize=11,leading=17,textColor=INK)
def para(text,x,y,width=495,size=11,color=INK,bold=False):
    p=Paragraph(text,ParagraphStyle('p',parent=style,fontName='ForgeBold' if bold else 'Forge',fontSize=size,leading=size*1.48,textColor=color))
    _,height=p.wrap(width,H);p.drawOn(c,x,y-height);return y-height
def base(number,label):
    c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(INK);c.setFont('ForgeBold',19);c.drawString(42,H-45,'FORGE')
    c.setFont('Forge',8);c.drawRightString(W-42,H-41,'SCHOOL PROGRAMMES / PRIVATE PROPOSAL')
    c.setStrokeColor(INK);c.setLineWidth(.5);c.line(42,47,W-42,47)
    c.setFont('Forge',8);c.drawString(42,31,'Forge Intellitech Services Ltd | programs@forgeintellitech.com')
    c.drawRightString(W-42,31,f'{number:02d} / {label}')
def title(kicker,heading):
    para(kicker.upper(),42,H-85,495,9,ORANGE,True)
    return para(heading,42,H-110,500,32,INK,True)-22
def photo(path,x,y,w,h):
    im=Image.open(ROOT/path).convert('RGB');iw,ih=im.size
    scale=max(w/iw,h/ih);nw,nh=iw*scale,ih*scale
    c.saveState();p=c.beginPath();p.rect(x,y,w,h);c.clipPath(p,stroke=0,fill=0)
    c.drawImage(ImageReader(im),x+(w-nw)/2,y+(h-nh)/2,nw,nh);c.restoreState()
def block(label,body,y):
    y=para(label,42,y,495,16,INK,True)-8
    return para(body,42,y)-20
def end():c.showPage()

base(1,'A place to begin')
y=title('ElyTech + TechUp','What could a child build<br/>if someone gave them<br/>a place to begin?')
para('A practical technology subject for primary and secondary schools. Built around discovery, useful skills and the confidence to create.',42,y,490,14)
photo('public/images/programmes/elytech-touch-typing-v2.webp',42,205,511,260)
para('AI-generated illustration of Nigerian pupils. These are not photographs of participating children.',42,193,505,8)
para('We are not introducing another club. We are inviting your school to make creating part of every student’s education.',42,155,490,17,INK,True)
para('Prepared 22 October 2026 | For school leadership and programme planning',42,74,495,8)
end()

base(2,'ElyTech')
y=title('Primary 1 to Primary 6','Before “I can’t”,<br/>let them try.')
y=para('Sometimes a child needs exposure before they can recognise their own ability. ElyTech gives younger learners a patient, practical beginning.',42,y,495,12)-25
y=block('Primary 1-3: a strong foundation','Chisanbop develops finger-based mental arithmetic. Touch typing helps children practise finding keys and building confidence without constantly looking down.',y)
y=block('Primary 3-6: more ways to create','From Basic 3, learners gradually combine those foundations with Scratch coding logic and Canva design. Basic 3 is the transition into all four skills, with practice matched to readiness.',y)
cards=[('01','CHISANBOP','Think through numbers with a practical finger method.'),('02','TOUCH TYPING','Build familiarity, accuracy and keyboard confidence.'),('03','SCRATCH','Sequence actions, test an idea and learn coding logic.'),('04','CANVA','Arrange words, images and ideas to communicate clearly.')]
top=y-5
for i,(n,label,text) in enumerate(cards):
    x=42+(i%2)*264; yy=top-(i//2)*133
    c.setFillColor(white);c.roundRect(x,yy-113,247,113,8,fill=1,stroke=0)
    para(n,x+15,yy-13,210,12,ORANGE,True);para(label,x+15,yy-37,210,11,INK,True);para(text,x+15,yy-59,210,10)
para('Forge supplies Chisanbop learning aids and practice keyboards. Parents prepare a laptop from Basic 3 onward; the device arrangements are explained on page 5.',42,145,495,11)
end()

base(3,'TechUp')
y=title('JSS1 to SS3','Skills first.<br/>Then a path of their own.')
y=para('TechUp helps secondary-school students turn curiosity into things they can research, design, explain and build.',42,y,495,12)-23
y=block('JSS1-3: explore the foundations','Design with Canva and Figma. Organise information in Excel and explore data with Power BI. Build web foundations with HTML and CSS. Practise writing, content planning and digital marketing with thoughtful use of AI. Learn cyber citizenship and awareness of Nigerian cybersecurity law.',y)
for label,body in [('The Builder','Websites, software ideas, automations, data tools and practical prototypes.'),('The Storyteller','Design, writing, video, branding, presentations and media that communicate a useful idea.'),('The Strategist','Research, data, business thinking, product planning and marketing that help an idea find its direction.')]:
    y=block('SS1-3 / '+label,body,y)
photo('public/images/programmes/techup-web-product-studio-v2.webp',42,92,511,150)
para('AI-generated illustration of Nigerian students. Not a record of a participating class.',42,81,500,8)
end()

base(4,'Learning that continues')
y=title('The support around the subject','A lesson should not end<br/>when the teacher leaves.')
for label,body in [('Learning by doing','Students try, make, test and explain. Activities connect tools to a useful task, with room to make mistakes and improve.'),('Internet and classroom support','Internet provision is included in the programme arrangement. During onboarding, we review your school’s timetable, connectivity, teaching space and practical needs together.'),('A dashboard that keeps the journey together','The Forge TechUp dashboard is in testing. Planned school integration brings learning activities, records and guidance into one place. We confirm readiness and access arrangements before activation.'),('Saturday live learning','Saturday live classes support practice beyond the school lesson. Scheduling and access are agreed with participating schools.'),('Something they can carry forward','Students are intended to leave with downloadable learning records and projects as a portfolio of their work. Availability depends on the dashboard features activated for the school.'),('A relationship with the school','We support onboarding and provide parent communication materials. Your school has a clear contact at programs@forgeintellitech.com for questions and coordination.')]:y=block(label,body,y)
end()

base(5,'Devices and access')
y=title('A practical plan for families','Start with what<br/>can connect.')
for label,body in [('For classes: an internet-capable laptop','The school programmes do not impose the donation campaign’s minimum hardware specification. A laptop that connects to the internet can be considered for class use. We review device suitability for the intended activities with the school.'),('Basic 1-2: build the foundations','Forge provides Chisanbop learning aids and practice keyboards. Families begin planning a laptop for Basic 3 and above.'),('When a child has no laptop in class','The dashboard is being designed to guide practice on a parent or family device outside class. This supports continued practice; access arrangements should still be discussed during school onboarding.'),('Supplier introductions, when useful','We can connect families with suppliers offering used laptops suitable for class needs, including options below ₦100,000 when available. Prices, condition, warranty and stock depend on the supplier.'),('Instalments are a supplier arrangement','Some companies supply schools or offer instalment payments. Any purchase or credit agreement is between the family or school and that supplier, subject to its terms and approval. Forge does not guarantee finance or a fixed device price.')]: y=block(label,body,y)
para('A different initiative: Give a Child a Laptop matches eligible secondary-school students to donated Windows laptops. That campaign has its own eligibility, specifications and agreement.',42,110,495,10)
end()

base(6,'Private commercial proposal')
y=title('One subject. Every student.','A clear fee.<br/>A shared commitment.')
c.setFillColor(INK);c.roundRect(42,y-140,511,140,10,fill=1,stroke=0)
para('₦10,000',62,y-20,465,42,white,True)
para('per child / per term / all taxes included',62,y-90,465,13,white)
y-=170
y=block('The same fee for either programme','The Forge programme fee applies to ElyTech or TechUp. It is charged per child, per term, with all taxes included. Device purchases are separate.',y)
y=block('A subject, not an optional club','The programme is offered as a school subject for all students in the relevant classes. We plan delivery with the school rather than inviting only a club-sized group to opt in.',y)
y=block('Your school’s parent communication','Your school determines what it charges parents. Its agreement with Forge remains the per-child, per-term programme fee shown above. Confirm learner numbers, delivery scope, billing and payment arrangements in the school contract before commencement.',y)
y=block('What this proposal does','This document explains the programme and commercial basis. It is an invitation to plan with Forge, not a signed school contract, a finance offer or a guarantee of a particular learning or business outcome.',y)
para('Please share the commercial pages with your school decision-makers. We send this proposal privately so you can discuss the full arrangement with us.',42,112,495,11)
end()

base(7,'Your next step')
y=title('Onboard for next term','We do not have to wait<br/>until everything is perfect.')
y=para('We need schools willing to help children discover that they can create. We need an honest conversation about what your school has, what it needs and how we can make the beginning work.',42,y,495,13)-25
for label,body in [('01 / Bring your questions','Read this proposal with your school team. Tell us about your classes, learner numbers, devices, internet and timetable.'),('02 / Agree the practical details','Complete school onboarding. We review fit, scope, fees and the school contract before confirming commencement.'),('03 / Bring parents into the journey','Use the editable introduction and follow-up messages. Inform families that the subject is planned for next term and explain device preparation. Send portal login details when access is ready.'),('04 / Begin, practise and keep improving','Forge and the school coordinate delivery, practice support and communication. We are building a community that understands that progress takes people working together.')]:y=block(label,body,y)
c.setFillColor(ORANGE);c.roundRect(42,119,511,96,8,fill=1,stroke=0)
para('Onboarding closes 31 December 2026',60,198,475,17,INK,True)
para('programs@forgeintellitech.com<br/>forgeintellitech.com/programmes/onboard',60,169,475,11)
para('We can forge it.',42,91,495,20,INK,True)
end();c.save()

terms=json.loads((ROOT/'docs/redesign/referral-agreement/terms.json').read_text(encoding='utf-8-sig'))
out=ROOT/'public/downloads/forge-referral-agreement-draft.pdf'
story=[]
ps=ParagraphStyle('agreement',fontName='Forge',fontSize=10,leading=15,textColor=INK,spaceAfter=10)
hs=ParagraphStyle('heading',parent=ps,fontName='ForgeBold',fontSize=13,spaceBefore=12,spaceAfter=7,keepWithNext=True)
story += [Paragraph(terms['title'],ParagraphStyle('title',parent=hs,fontSize=25,leading=30)),Paragraph(terms['status'].replace('—','-'),ps),Paragraph('Version: '+terms['version'],ps)]
story.append(Paragraph('Complete one copy for each referred school. Do not enter another school’s particulars. This is a review draft; it does not contain a Forge signature.',ps))
for section in terms['sections']:
    story.append(Paragraph(section['title'],hs))
    for text in section['paragraphs']:story.append(Paragraph(text,ps))
story += [PageBreak(),Paragraph('Referral particulars and signatures',hs),Paragraph('Complete every applicable field before signing. Identify the school and referral exactly as shown in your account. Keep your external signing evidence.',ps)]
for field in terms['fields']:
    story += [Paragraph(field,ParagraphStyle('field',parent=ps,fontName='ForgeBold',spaceAfter=4)),Spacer(1,20)]
    story.append(Table([['']],colWidths=[485],style=[('LINEBELOW',(0,0),(-1,-1),.5,INK)]))
    story.append(Spacer(1,9))
def footer(cv,doc):
    cv.setFont('Forge',8);cv.setFillColor(INK);cv.drawString(46,29,'FORGE / REVIEW DRAFT / '+terms['version']);cv.drawRightString(W-46,29,str(doc.page))
SimpleDocTemplate(str(out),pagesize=(W,H),rightMargin=48,leftMargin=48,topMargin=45,bottomMargin=55,title=terms['title'],author='Forge Intellitech Services Ltd').build(story,onFirstPage=footer,onLaterPages=footer)
print(str(PRIVATE/'forge-school-proposal-2026-10-22-v1.pdf'))
print(str(out))
