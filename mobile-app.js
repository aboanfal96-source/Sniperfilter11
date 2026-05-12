/* ════════════════════════════════════════════════════════
   TADAWUL US PRO — MOBILE APP
   ════════════════════════════════════════════════════════ */

const NAMES = {
  'AAPL':'أبل','MSFT':'مايكروسوفت','GOOGL':'جوجل','GOOG':'ألفابت','AMZN':'أمازون',
  'NVDA':'إنفيديا','META':'ميتا','TSLA':'تيسلا','NFLX':'نتفلكس','AVGO':'بروادكوم',
  'AMD':'إيه إم دي','INTC':'إنتل','MU':'مايكرون','TSM':'تي إس إم سي','QCOM':'كوالكوم',
  'TXN':'تكساس إنسترومنتس','SMCI':'سوبر مايكرو','ARM':'آرم','MRVL':'مارفيل',
  'COST':'كوستكو','WMT':'وول مارت','TGT':'تارجت','HD':'هوم ديبو','MCD':'ماكدونالدز',
  'SBUX':'ستاربكس','NKE':'نايك','LULU':'لولوليمون','DIS':'ديزني',
  'JPM':'جي بي مورجان','BAC':'بنك أوف أمريكا','GS':'جولدمان','MS':'مورجان ستانلي',
  'WFC':'ويلز فارجو','V':'فيزا','MA':'ماستركارد','AXP':'أمريكان إكسبريس',
  'BRK-B':'بيركشاير ب','BLK':'بلاك روك','C':'سيتي بنك','SCHW':'تشارلز شواب',
  'UNH':'يونايتد هيلث','JNJ':'جونسون','PFE':'فايزر','LLY':'إيلاي ليلي','ABBV':'أبفي',
  'MRK':'ميرك','TMO':'ثيرمو فيشر','ABT':'أبوت','DHR':'دانيل','BMY':'بريستول',
  'XOM':'إكسون','CVX':'شيفرون','COP':'كونوكو فيليبس','OXY':'أوكسيدنتال',
  'BA':'بوينج','CAT':'كاتربيلر','GE':'جنرال إلكتريك','LMT':'لوكهيد مارتن','RTX':'آر تي إكس',
  'CMCSA':'كومكاست','T':'إيه تي آند تي','VZ':'فيرايزون','TMUS':'تي موبايل','SPOT':'سبوتيفاي',
  'RIVN':'ريفيان','LCID':'لوسيد','F':'فورد','GM':'جنرال موتورز','NIO':'نيو',
  'PLUG':'بلج باور','ENPH':'إنفيز',
  'CRM':'سيلز فورس','ORCL':'أوراكل','ADBE':'أدوبي','SNOW':'سنوفليك','PLTR':'بالانتير',
  'NOW':'سيرفس ناو','SHOP':'شوبيفاي','UBER':'أوبر','ABNB':'إيربنب','PYPL':'بايبال',
  'SQ':'بلوك','ROKU':'روكو','PINS':'بنترست','SNAP':'سناب','RBLX':'روبلوكس',
  'COIN':'كوين بيز','MSTR':'مايكرو ستراتيجي','HOOD':'روبن هود',
  'GME':'جيم ستوب','AMC':'إيه إم سي','BB':'بلاك بيري','SOFI':'صوفاي',
  'SPY':'S&P 500','QQQ':'ناسداك 100','DIA':'داو 30','IWM':'راسل 2000',
  'VOO':'فانجارد 500','VTI':'فانجارد توتال','XLK':'تكنولوجيا','XLF':'مالية',
  'XLE':'طاقة','TLT':'سندات','GLD':'الذهب','SLV':'الفضة'
};
const SECS = {
  'AAPL':'تكنولوجيا','MSFT':'تكنولوجيا','GOOGL':'تكنولوجيا','GOOG':'تكنولوجيا','AMZN':'تكنولوجيا','NVDA':'أشباه موصلات','META':'تكنولوجيا','TSLA':'سيارات كهربائية','NFLX':'إعلام','AVGO':'أشباه موصلات',
  'AMD':'أشباه موصلات','INTC':'أشباه موصلات','MU':'أشباه موصلات','TSM':'أشباه موصلات','QCOM':'أشباه موصلات','TXN':'أشباه موصلات','SMCI':'أشباه موصلات','ARM':'أشباه موصلات','MRVL':'أشباه موصلات',
  'COST':'استهلاكي','WMT':'استهلاكي','TGT':'استهلاكي','HD':'استهلاكي','MCD':'استهلاكي','SBUX':'استهلاكي','NKE':'استهلاكي','LULU':'استهلاكي','DIS':'إعلام',
  'JPM':'بنوك','BAC':'بنوك','GS':'بنوك','MS':'بنوك','WFC':'بنوك','V':'مالي','MA':'مالي','AXP':'مالي','BRK-B':'مالي','BLK':'مالي','C':'بنوك','SCHW':'مالي',
  'UNH':'صحة','JNJ':'صحة','PFE':'صحة','LLY':'صحة','ABBV':'صحة','MRK':'صحة','TMO':'صحة','ABT':'صحة','DHR':'صحة','BMY':'صحة',
  'XOM':'طاقة','CVX':'طاقة','COP':'طاقة','OXY':'طاقة','BA':'صناعة','CAT':'صناعة','GE':'صناعة','LMT':'صناعة','RTX':'صناعة',
  'CMCSA':'اتصالات','T':'اتصالات','VZ':'اتصالات','TMUS':'اتصالات','SPOT':'إعلام',
  'RIVN':'سيارات كهربائية','LCID':'سيارات كهربائية','F':'سيارات','GM':'سيارات','NIO':'سيارات كهربائية','PLUG':'طاقة','ENPH':'طاقة',
  'CRM':'سحابة','ORCL':'سحابة','ADBE':'سحابة','SNOW':'سحابة','PLTR':'سحابة','NOW':'سحابة','SHOP':'سحابة','UBER':'تكنولوجيا','ABNB':'تكنولوجيا','PYPL':'مالي','SQ':'مالي','ROKU':'إعلام','PINS':'تكنولوجيا','SNAP':'تكنولوجيا','RBLX':'تكنولوجيا',
  'COIN':'كريبتو','MSTR':'كريبتو','HOOD':'مالي',
  'GME':'ميم','AMC':'ميم','BB':'تكنولوجيا','SOFI':'مالي',
  'SPY':'ETF','QQQ':'ETF','DIA':'ETF','IWM':'ETF','VOO':'ETF','VTI':'ETF','XLK':'ETF','XLF':'ETF','XLE':'ETF','TLT':'ETF','GLD':'ETF','SLV':'ETF'
};
const STKS = Object.keys(NAMES);
const PRI = ['AAPL','MSFT','NVDA','GOOGL','AMZN','META','TSLA','AMD','SPY','QQQ','NFLX','PLTR','COIN','SHOP','BA'];
const BPX = {'AAPL':275,'MSFT':400,'GOOGL':383,'GOOG':385,'AMZN':215,'NVDA':140,'META':620,'TSLA':378,'NFLX':720,'AVGO':210,'AMD':135,'INTC':22,'MU':105,'TSM':205,'QCOM':165,'TXN':190,'SMCI':45,'ARM':140,'MRVL':75,'COST':945,'WMT':100,'TGT':145,'HD':390,'MCD':305,'SBUX':95,'NKE':70,'LULU':315,'DIS':110,'JPM':255,'BAC':45,'GS':620,'MS':130,'WFC':75,'V':340,'MA':550,'AXP':305,'BRK-B':480,'BLK':1010,'C':75,'SCHW':80,'UNH':550,'JNJ':155,'PFE':25,'LLY':780,'ABBV':190,'MRK':100,'TMO':520,'ABT':130,'DHR':215,'BMY':55,'XOM':115,'CVX':165,'COP':105,'OXY':50,'BA':175,'CAT':380,'GE':205,'LMT':495,'RTX':125,'CMCSA':40,'T':22,'VZ':42,'TMUS':230,'SPOT':620,'RIVN':14,'LCID':3,'F':10,'GM':52,'NIO':5,'PLUG':2.5,'ENPH':70,'CRM':335,'ORCL':175,'ADBE':445,'SNOW':155,'PLTR':75,'NOW':1015,'SHOP':115,'UBER':82,'ABNB':150,'PYPL':82,'SQ':82,'ROKU':75,'PINS':35,'SNAP':10,'RBLX':62,'COIN':205,'MSTR':340,'HOOD':50,'GME':22,'AMC':4,'BB':3,'SOFI':16,'SPY':580,'QQQ':495,'DIA':425,'IWM':220,'VOO':535,'VTI':290,'XLK':235,'XLF':50,'XLE':95,'TLT':92,'GLD':265,'SLV':30};

/* AI MEMORY (shared key with desktop) */
const AI_KEY = 'tadawul_us_ai_memory_v1';
const AI_DEFAULT_WEIGHTS = {technical:1,delta:1,iv:1,oi:1,volume:1,spread:1,move:1,strat_classic:1,strat_harmonic:1,strat_elliott:1,strat_ma:1,strat_osc:1,strat_macd:1,strat_ichimoku:1,strat_bollinger:1,strat_vwap:1,strat_supdem:1,strat_liquidity:1,strat_fakeout:1,strat_fractal:1};
function loadMem(){try{const r=localStorage.getItem(AI_KEY);if(!r)return{recs:[],weights:{...AI_DEFAULT_WEIGHTS},stats:{total:0,wins:0,losses:0,pending:0},lastUpdate:0};const m=JSON.parse(r);return{recs:m.recs||[],weights:{...AI_DEFAULT_WEIGHTS,...(m.weights||{})},stats:m.stats||{total:0,wins:0,losses:0,pending:0},lastUpdate:m.lastUpdate||0};}catch(e){return{recs:[],weights:{...AI_DEFAULT_WEIGHTS},stats:{total:0,wins:0,losses:0,pending:0},lastUpdate:0};}}
function saveMem(m){try{localStorage.setItem(AI_KEY,JSON.stringify(m));}catch(e){}}
const AI = loadMem();

/* GLOBAL */
const G = {sel:'AAPL',tab:'signals',tf:'3mo',tfi:'1d',pr:{},op:{},hi:{},lo:{},vo:{},ch:{},pc:{},cans:{},ind:{},sc:{},ld:new Set(),ldg:new Set(),preMarket:{},postMarket:{},chart:null,cSeries:null,vSeries:null,view:'home',contractCache:{},opt:[]};

/* UTILS */
const fK = n => n>=1e9?(n/1e9).toFixed(1)+'B':n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(0)+'K':''+n;
const fDays = ms => {const d=Math.round(ms/86400000);return d<=0?'منتهي':d===1?'يوم':d+' أيام';};
const fExpiry = ts => {const d=new Date(ts);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};

/* MARKET STATUS */
function getMS(){const n=new Date(),u=n.getTime()+n.getTimezoneOffset()*60000,et=new Date(u-4*3600000),d=et.getDay();if(d===0||d===6)return{l:'مغلق (عطلة)',c:'#7a8ba8'};const m=et.getHours()*60+et.getMinutes();if(m>=240&&m<570)return{l:'بري ماركت 🌅',c:'#ff6b9d'};if(m>=570&&m<960)return{l:'مفتوح ●',c:'#0ecf7e'};if(m>=960&&m<1200)return{l:'بعد الإغلاق 🌙',c:'#a78bfa'};return{l:'مغلق',c:'#7a8ba8'};}
function updateMarket(){const s=getMS(),e=document.getElementById('market-status');e.textContent='السوق: '+s.l;e.style.color=s.c;e.style.borderColor=s.c+'55';}

/* INDICATORS — slim versions */
function sma(a,p){const r=[];for(let i=0;i<a.length;i++){if(i<p-1){r.push(null);continue;}let m=0;for(let j=i-p+1;j<=i;j++)m+=a[j];r.push(m/p);}return r;}
function ema(a,p){const k=2/(p+1);const r=[a[0]];for(let i=1;i<a.length;i++)r.push(a[i]*k+r[i-1]*(1-k));return r;}
function rsi(a,p=14){let g=0,l=0;for(let i=1;i<=p;i++){const d=a[i]-a[i-1];d>0?g+=d:l-=d;}g/=p;l/=p;let v=l===0?100:100-100/(1+g/l);for(let i=p+1;i<a.length;i++){const d=a[i]-a[i-1];g=(g*(p-1)+(d>0?d:0))/p;l=(l*(p-1)+(d<0?-d:0))/p;v=l===0?100:100-100/(1+g/l);}return v;}
function bb(a,p=20){const i=a.length-1,s=sma(a,p);if(!s[i])return null;let v=0;for(let j=i-p+1;j<=i;j++)v+=(a[j]-s[i])**2;const sd=Math.sqrt(v/p);return{u:s[i]+2*sd,m:s[i],l:s[i]-2*sd,w:4*sd/s[i]*100};}
function calcATR(cs,p=14){const tr=[];for(let i=1;i<cs.length;i++)tr.push(Math.max(cs[i].high-cs[i].low,Math.abs(cs[i].high-cs[i-1].close),Math.abs(cs[i].low-cs[i-1].close)));return sma(tr,p);}

function calcInd(sym){
  const cs=G.cans[sym];if(!cs||cs.length<10)return;
  const cl=cs.map(c=>c.close),n=cl.length;
  const e12=ema(cl,12),e26=ema(cl,26);
  const macdL=e12.map((v,i)=>v-e26[i]),sigL=ema(macdL,9);
  const atrA=calcATR(cs,14);
  G.ind[sym]={
    rsi:rsi(cl,14),
    macd:{v:macdL[n-1],s:sigL[n-1],h:macdL[n-1]-sigL[n-1]},
    boll:bb(cl,20),
    ma9:sma(cl,9)[n-1]||cl[n-1],
    ma20:sma(cl,20)[n-1]||cl[n-1],
    ma50:sma(cl,50)[n-1]||cl[n-1],
    ma200:sma(cl,200)[n-1]||cl[n-1],
    atr:atrA[atrA.length-1]||cl[n-1]*.01
  };
}

function detectFractalM(cs, p){
  if(!cs||cs.length<11) return {sig:'محايد', desc:'بيانات غير كافية', upPts:[], downPts:[], lastUp:null, lastDown:null, score:0};
  const n=cs.length, upPts=[], downPts=[];
  for(let i=2;i<n-2;i++){
    const c=cs[i];
    if(c.high>cs[i-1].high&&c.high>cs[i-2].high&&c.high>cs[i+1].high&&c.high>cs[i+2].high) upPts.push({i,time:c.time,price:c.high});
    if(c.low<cs[i-1].low&&c.low<cs[i-2].low&&c.low<cs[i+1].low&&c.low<cs[i+2].low) downPts.push({i,time:c.time,price:c.low});
  }
  const lastUp=upPts[upPts.length-1]||null, lastDown=downPts[downPts.length-1]||null;
  let sig='محايد',desc=`${upPts.length} قمم • ${downPts.length} قيعان`,score=50;
  const dist=(a,b)=>Math.abs(a-b)/b;
  if(lastDown&&dist(p,lastDown.price)<0.025){sig='شراء';desc=`قرب قاع $${lastDown.price.toFixed(2)}`;score=72;}
  else if(lastUp&&dist(p,lastUp.price)<0.025){sig='بيع';desc=`قرب قمة $${lastUp.price.toFixed(2)}`;score=72;}
  else if(lastUp&&p>lastUp.price*1.005){sig='شراء';desc=`كسر صاعد فوق $${lastUp.price.toFixed(2)}`;score=78;}
  else if(lastDown&&p<lastDown.price*0.995){sig='بيع';desc=`كسر هابط تحت $${lastDown.price.toFixed(2)}`;score=78;}
  return{sig,desc,upPts,downPts,lastUp,lastDown,score};
}

function calcSc(sym){
  const p=G.pr[sym];if(!p||!G.ind[sym])return;
  const cs=G.cans[sym]||[];
  const ind=G.ind[sym];const{rsi:r,macd,ma9,ma20,ma50,boll}=ind;
  let buy=0,sell=0,sigs={};
  if(ma9>ma20&&ma20>ma50){sigs.ma='شراء';buy++;}else if(ma9<ma20&&ma20<ma50){sigs.ma='بيع';sell++;}else sigs.ma='محايد';
  if(r<30){sigs.osc='شراء';buy++;}else if(r>70){sigs.osc='بيع';sell++;}else sigs.osc='محايد';
  if(macd.v>macd.s&&macd.h>0){sigs.macd='شراء';buy++;}else if(macd.v<macd.s&&macd.h<0){sigs.macd='بيع';sell++;}else sigs.macd='محايد';
  if(boll){if(p<boll.l){sigs.bollinger='شراء';buy++;}else if(p>boll.u){sigs.bollinger='بيع';sell++;}else sigs.bollinger='محايد';}
  if(Math.abs(p-(G.lo[sym]||p*.95))/p<.02){sigs.classic='شراء';buy++;}else if(Math.abs(p-(G.hi[sym]||p*1.05))/p<.02){sigs.classic='بيع';sell++;}else sigs.classic='محايد';
  const frRes=detectFractalM(cs,p); sigs.fractal=frRes.sig;
  if(frRes.sig==='شراء')buy++; else if(frRes.sig==='بيع')sell++;
  const net=buy-sell,tot=buy+sell;
  // Momentum-first for weekly options
  const pCh=G.pc[sym]||0;
  let mB=0,mS=0;
  if(pCh>1.5)mB+=3;else if(pCh>0.5)mB+=2;else if(pCh>0)mB+=1;
  if(pCh<-1.5)mS+=3;else if(pCh<-0.5)mS+=2;else if(pCh<0)mS+=1;
  if(p>(ind.ma20||p))mB+=1;else mS+=1;
  const tB=buy+mB,tS=sell+mS,tNet=tB-tS;
  const main=tNet>=1?'شراء':tNet<=-1?'بيع':'محايد';
  const str=(tB+tS)>0?Math.round(Math.max(tB,tS)/(tB+tS)*100):50;
  const atr=ind.atr;
  G.sc[sym]={sigs,main,str,buy,sell,entry:p,tp:main==='شراء'?p+atr*2:p-atr*2,sl:main==='شراء'?p-atr:p+atr,expectedMovePct:+(atr*Math.sqrt(5)/p*100).toFixed(2),frRes};
  calcSniperM(sym);
  calcSecretSauceM(sym);
}

function calcSniperM(sym){
  const p=G.pr[sym],cs=G.cans[sym],ind=G.ind[sym],sc=G.sc[sym];
  if(!p||!cs||cs.length<20||!ind||!sc)return;
  const n=cs.length,atr=ind.atr||p*0.01;
  // Squeeze: BB inside Keltner
  const bb=ind.boll,kU=ind.ma20+atr*1.5,kL=ind.ma20-atr*1.5;
  const squeezed=bb?(bb.u<kU&&bb.l>kL):false;
  let sqzCount=0;
  if(squeezed)for(let i=n-1;i>=Math.max(0,n-20);i--){const m20=cs.slice(Math.max(0,i-19),i+1).reduce((a,b)=>a+b.close,0)/Math.min(20,i+1);const std=Math.sqrt(cs.slice(Math.max(0,i-19),i+1).reduce((a,b)=>a+(b.close-m20)**2,0)/Math.min(20,i+1));if(m20+std*2<m20+atr*1.5&&m20-std*2>m20-atr*1.5)sqzCount++;else break;}
  const sqzScore=squeezed?Math.min(100,40+sqzCount*8):0;
  // Volume divergence
  let volDiv='none',vdScore=0;
  if(n>=10){const l5=cs.slice(-5),p5=cs.slice(-10,-5);const pt=l5[4].close-l5[0].close;const vt=l5.reduce((a,c)=>a+c.volume,0)/p5.reduce((a,c)=>a+c.volume,0);
  if(pt>0&&vt<0.8){volDiv='bearish';vdScore=70;}else if(pt<0&&vt<0.8){volDiv='bullish';vdScore=70;}else if(pt>0&&vt>1.3){volDiv='confirmed_bull';vdScore=85;}else if(pt<0&&vt>1.3){volDiv='confirmed_bear';vdScore=85;}}
  // A/D
  let ad=0,adP=0;for(let i=Math.max(0,n-20);i<n;i++){const c=cs[i],clv=((c.close-c.low)-(c.high-c.close))/(c.high-c.low||.001);const mfv=clv*c.volume;if(i<n-5)adP+=mfv;else ad+=mfv;}
  const adPhase=ad>adP*1.2?'accumulation':ad<adP*0.8?'distribution':'neutral';const adScore=adPhase!=='neutral'?80:40;
  // Flow
  let bp=0,sp=0;cs.slice(-10).forEach(c=>{const b=c.close-c.open;const r=c.high-c.low||.001;if(b>0)bp+=(b/r)*c.volume;else sp+=(Math.abs(b)/r)*c.volume;});
  const flowR=bp/(bp+sp+1);const flowType=flowR>0.65?'heavy_buy':flowR<0.35?'heavy_sell':'balanced';const flowScore=Math.abs(flowR-0.5)*200;
  // MTF
  const tOf=arr=>{if(arr.length<3)return 0;const f=arr.slice(0,3).reduce((a,c)=>a+c.close,0)/3;const l=arr.slice(-3).reduce((a,c)=>a+c.close,0)/3;return(l-f)/f;};
  const t1=tOf(cs.slice(-5)),t2=tOf(cs.slice(-20)),t3=tOf(cs.slice(-60));
  const allBull=t1>0.005&&t2>0.005&&t3>0.005,allBear=t1<-0.005&&t2<-0.005&&t3<-0.005;
  const mtfScore=(allBull||allBear)?90:40;
  // Spring/Upthrust
  const lc=cs[n-1],pc2=cs[n-2];let spring=false,upthrust=false;
  if(n>=5){const lo5=Math.min(...cs.slice(-5).map(c=>c.low)),hi5=Math.max(...cs.slice(-5).map(c=>c.high));
  if(lc.low<=lo5&&lc.close>pc2.close&&lc.close>(lc.high+lc.low)/2)spring=true;
  if(lc.high>=hi5&&lc.close<pc2.close&&lc.close<(lc.high+lc.low)/2)upthrust=true;}
  // Composite
  const raw=sqzScore*0.20+vdScore*0.15+(0)*0.15+adScore*0.15+flowScore*0.15+mtfScore*0.10+(spring?90:upthrust?90:30)*0.10;
  const score=Math.round(Math.min(100,raw));
  let sB=0,sS=0;
  const sPCh=G.pc[sym]||0;if(sPCh>1)sB+=2;else if(sPCh>0)sB+=1;if(sPCh<-1)sS+=2;else if(sPCh<0)sS+=1;
  if(adPhase==='accumulation')sB+=2;if(adPhase==='distribution')sS+=2;
  if(flowType==='heavy_buy')sB+=2;if(flowType==='heavy_sell')sS+=2;
  if(volDiv==='bullish'||volDiv==='confirmed_bull')sB++;if(volDiv==='bearish'||volDiv==='confirmed_bear')sS++;
  if(allBull)sB+=2;if(allBear)sS+=2;if(spring)sB+=3;if(upthrust)sS+=3;
  const dir=sB>sS+1?'شراء':sS>sB+1?'بيع':'محايد';
  const urgency=(score>=80&&(spring||upthrust||squeezed))?'فوري ⚡':score>=70?'قريب 🔔':score>=55?'مراقبة 👁️':'انتظار ⏳';
  const wr=(getWinRate()||50)/100;const kellyPct=Math.max(1,Math.min(25,Math.round((wr-(1-wr)/2)*100)));
  const optRR=Math.max(1.5,Math.min(5,(1/(1-wr))*0.8));
  let sEntry=p,sTP,sSL;
  if(dir==='شراء'){sEntry=+(p-atr*0.3).toFixed(2);sSL=+(sEntry-atr*1.2).toFixed(2);sTP=+(sEntry+atr*optRR).toFixed(2);}
  else if(dir==='بيع'){sEntry=+(p+atr*0.3).toFixed(2);sSL=+(sEntry+atr*1.2).toFixed(2);sTP=+(sEntry-atr*optRR).toFixed(2);}
  else{sSL=+(p-atr*1.5).toFixed(2);sTP=+(p+atr*1.5).toFixed(2);}
  const timing=squeezed?'اشترِ العقد — Squeeze وشيك':spring?'Spring — Call مثالي':upthrust?'Upthrust — Put مثالي':score>=70?'ظروف ممتازة':'انتظر إشارة';
  sc.sniper={score,dir,urgency,squeeze:{active:squeezed,count:sqzCount,score:sqzScore},volDiv:{type:volDiv,score:vdScore},ad:{phase:adPhase,score:adScore},flow:{type:flowType,ratio:+flowR.toFixed(3),score:Math.round(flowScore)},mtf:{score:mtfScore},spring,upthrust,entry:sEntry,tp:sTP,sl:sSL,rr:+optRR.toFixed(1),kellyPct,contractTiming:timing};
}

function calcSecretSauceM(sym){
  const p=G.pr[sym],cs=G.cans[sym],ind=G.ind[sym],sc=G.sc[sym];
  if(!p||!cs||cs.length<20||!ind||!sc)return;
  const n=cs.length,atr=ind.atr||p*0.01;
  // Win probability
  let wins=0,total=0;const tm=atr*2;
  for(let i=20;i<n-5;i++){const dr=cs[i].close>cs[i-1].close?1:-1;let hit=false;for(let j=1;j<=5;j++){if(i+j>=n)break;if((cs[i+j].close-cs[i].close)*dr>=tm){hit=true;break;}}total++;if(hit)wins++;}
  const winProb=total>0?Math.round(wins/total*100):50;
  // IV Rank
  const atrArr=[];for(let i=14;i<n;i++){let s=0;for(let j=i-13;j<=i;j++)s+=cs[j].high-cs[j].low;atrArr.push(s/14);}
  const sorted=[...atrArr].sort((a,b)=>a-b);
  const ivRank=Math.round((sorted.indexOf(sorted.find(v=>v>=(atrArr[atrArr.length-1]||atr)))/sorted.length)*100);
  // Theta
  const dow=new Date().getDay();
  const thetaScore=dow<=2?90:dow===3?60:30;
  const thetaDanger=dow>=4?'خطر 🔴':dow===3?'حذر 🟡':'آمن 🟢';
  const bestEntry=dow<=1?'أفضل وقت للدخول':dow===2?'لا تزال فرصة':dow===3?'آخر يوم جيد':'متأخر ⚠️';
  // Max Pain
  let volS=0,pxVS=0;cs.slice(-20).forEach(c=>{volS+=c.volume;pxVS+=c.close*c.volume;});
  const maxPain=volS>0?+(pxVS/volS).toFixed(2):p;
  // Entry timing
  const pullback=(Math.max(...cs.slice(-10).map(c=>c.high))-p)/p*100;
  let entryTiming='عادي',entryAdvice='ادخل عند تأكيد';
  if(sc.main==='شراء'&&pullback>2&&pullback<5){entryTiming='مثالي 🎯';entryAdvice='تراجع صحي — نقطة ذهبية';}
  else if(pullback<0.5){entryTiming='حذر ⚠️';entryAdvice='عند القمة — انتظر تراجع';}
  // Confluence
  let conf=0;const dr=sc.main;
  if(dr!=='محايد'){if(sc.sniper?.dir===dr)conf++;if(sc.sigs?.macd===dr)conf++;if(sc.sigs?.osc===dr)conf++;if(sc.sigs?.ma===dr)conf++;if(sc.sigs?.bollinger===dr)conf++;if(sc.sigs?.fractal===dr)conf++;}
  const confPct=Math.round(conf/6*100);
  // Position size
  const stopD=atr*1.2;
  const ideal10k=Math.max(1,Math.floor((10000*0.02)/(stopD*100)));
  // Score
  const ssScore=Math.round(winProb*0.25+(100-ivRank)*0.15+thetaScore*0.15+confPct*0.25+65*0.10+50*0.10);
  sc.sauce={score:ssScore,winProb,ivRank,thetaDanger,thetaScore,bestEntry,maxPain,entryTiming,entryAdvice,confluenceCount:conf,confluencePct:confPct,idealContracts:{'10k':ideal10k}};
}

/* DATA LOADER */
async function loadStock(sym, range, interval){
  if (G.ldg.has(sym)) return;
  G.ldg.add(sym);
  const r = range || G.tf, i = interval || G.tfi;
  let ok = false;
  try {
    const rsp = await fetch(`/api/stock?symbol=${sym}&range=${r}&interval=${i}&prepost=1`, {signal: AbortSignal.timeout(8000)});
    if (rsp.ok) {
      const d = await rsp.json();
      const res = d?.chart?.result?.[0];
      if (res) {
        const m = res.meta||{}, ts = res.timestamp||[], q = res.indicators?.quote?.[0]||{};
        const cs = [];
        for (let k=0; k<ts.length; k++) {
          const o=q.open?.[k], h=q.high?.[k], l=q.low?.[k], c=q.close?.[k], v=q.volume?.[k];
          if (o!=null && c!=null && !isNaN(c) && c>0)
            cs.push({time:ts[k],open:+o.toFixed(2),high:+h.toFixed(2),low:+l.toFixed(2),close:+c.toFixed(2),volume:v||0});
        }
        if (cs.length >= 5) {
          const last = cs[cs.length-1];
          const pv = +(m.previousClose || cs[cs.length-2]?.close || last.open).toFixed(2);
          G.cans[sym] = cs;
          G.pr[sym] = +(m.regularMarketPrice||last.close).toFixed(2);
          G.op[sym] = last.open; G.hi[sym] = last.high; G.lo[sym] = last.low; G.vo[sym] = last.volume;
          G.ch[sym] = +(G.pr[sym] - pv).toFixed(2);
          G.pc[sym] = +((G.pr[sym] - pv)/pv*100).toFixed(2);
          if (m.preMarketPrice) G.preMarket[sym] = {price: +m.preMarketPrice.toFixed(2), change: +(m.preMarketChangePercent||0).toFixed(2)};
          if (m.postMarketPrice) G.postMarket[sym] = {price: +m.postMarketPrice.toFixed(2), change: +(m.postMarketChangePercent||0).toFixed(2)};
          calcInd(sym); calcSc(sym);
          ok = true;
        }
      }
    }
  } catch(e) {}
  G.ld.add(sym); G.ldg.delete(sym);
}

/* ════════════════════════════════════════════════════════
   CONTRACT RECOMMENDATION + AI MEMORY
   ════════════════════════════════════════════════════════ */
async function fetchContractsFor(sym){
  const sc=G.sc[sym],p=G.pr[sym];if(!sc||!p)return null;
  // Unified direction: sniper overrides when confident
  let direction,dirSource='technical';
  if(sc.sniper&&sc.sniper.score>=30){direction=sc.sniper.dir==='شراء'?'bullish':sc.sniper.dir==='بيع'?'bearish':'neutral';dirSource='sniper';}
  else{direction=sc.main==='شراء'?'bullish':sc.main==='بيع'?'bearish':'neutral';}
  if(sc.sniper&&sc.main===sc.sniper.dir&&sc.sniper.dir!=='محايد'){direction=sc.sniper.dir==='شراء'?'bullish':'bearish';dirSource='aligned';}
  const firingStrats=Object.entries(sc.sigs).filter(([k,v])=>v!=='محايد').map(([k])=>k);
  let adj=sc.str;
  if(firingStrats.length){let m=0;for(const k of firingStrats)m+=AI.weights['strat_'+k]||1;m/=firingStrats.length;adj=Math.round(Math.min(100,sc.str*m));}
  try{
    const hv=G.ind[sym]?.atr?Math.min(1.5,Math.max(0.15,(G.ind[sym].atr/p)*Math.sqrt(252))):0.30;
    const fr=sc.frRes?{sig:sc.frRes.sig,score:sc.frRes.score,lastUp:sc.frRes.lastUp?.price||null,lastDown:sc.frRes.lastDown?.price||null}:null;
    const rsp=await fetch('/api/recommend',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({symbol:sym,technicalScore:adj,direction,dirSource,sniperScore:sc.sniper?.score||0,sniperDir:sc.sniper?.dir||'محايد',weights:AI.weights,expectedMove:sc.expectedMovePct,underlyingPrice:p,historicalVol:hv,fractal:fr,sniperEntry:sc.sniper?.entry||null,sniperTP:sc.sniper?.tp||null})});
    if(!rsp.ok)return null;
    const data=await rsp.json();
    if(data.error)return null;
    data.recommendations=(data.recommendations||[]).map(c=>({...c,underlyingPrice:p,_snapshot:{direction,technicalScore:adj,strategies:firingStrats}}));
    return data;
  }catch(e){return null;}
}

function recordRec(sym,c,snap){
  const id=`${sym}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
  AI.recs.push({id,symbol:sym,type:c.type,strike:c.strike,entry:c.mid||c.lastPrice,expiry:c.expiry,underlying_at_entry:c.underlyingPrice||G.pr[sym],breakeven:c.breakeven,target:c.target,score:c.score,breakdown:c.breakdown,strategies:snap.strategies||[],direction:snap.direction,technicalScore:snap.technicalScore,timestamp:Date.now(),status:'pending',outcome:null,settledAt:null});
  AI.stats.total++;AI.stats.pending++;saveMem(AI);updateAIBadge();
  toast(`🧠 تمت إضافة العقد للذاكرة — ${sym}`);
  return id;
}

function trackContract(sym,c){
  const snap=c._snapshot||{direction:'neutral',technicalScore:50,strategies:[]};
  recordRec(sym,c,snap);
  if(G.view==='memory')buildMemory();
}
window.trackContract=trackContract;

async function settlePending(){
  const now=Date.now();let changed=false;
  for(const r of AI.recs){
    if(r.status!=='pending')continue;
    if(now<r.expiry)continue;
    const final=G.pr[r.symbol];if(!final)continue;
    const isCall=r.type==='CALL';
    const breakHit=isCall?final>=r.breakeven:final<=r.breakeven;
    const itm=isCall?final>r.strike:final<r.strike;
    r.final_price=final;r.settledAt=now;
    if(breakHit){r.status='win';r.outcome='win';AI.stats.wins++;}
    else if(itm){r.status='win';r.outcome='partial';AI.stats.wins++;}
    else{r.status='loss';r.outcome='loss';AI.stats.losses++;}
    AI.stats.pending=Math.max(0,AI.stats.pending-1);changed=true;adaptW(r);
  }
  if(changed){saveMem(AI);updateAIBadge();if(G.view==='memory')buildMemory();}
}
function adaptW(r){
  const isWin=r.outcome==='win',isLoss=r.outcome==='loss';if(!isWin&&!isLoss)return;
  const lr=0.06,cap=2.5,floor=0.25,dir=isWin?1:-1;
  if(r.breakdown)for(const[k,v]of Object.entries(r.breakdown)){if(AI.weights[k]===undefined||v<60)continue;AI.weights[k]=Math.max(floor,Math.min(cap,AI.weights[k]*(1+dir*lr)));}
  for(const k of(r.strategies||[])){const wk='strat_'+k;if(AI.weights[wk]===undefined)continue;AI.weights[wk]=Math.max(floor,Math.min(cap,AI.weights[wk]*(1+dir*lr)));}
}

function getWR(){const s=AI.stats.wins+AI.stats.losses;return s>0?Math.round(AI.stats.wins/s*100):0;}
function updateAIBadge(){document.getElementById('ai-badge').textContent=`🧠 ${AI.stats.wins}/${AI.stats.wins+AI.stats.losses} (${getWR()}%)`;}

/* ════════════════════════════════════════════════════════
   UI BUILDERS
   ════════════════════════════════════════════════════════ */
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2400);}

function buildTickers(){
  document.getElementById('ticker-strip').innerHTML=PRI.slice(0,15).map(s=>{
    const p=G.pr[s]||0,pc=G.pc[s]||0,ir=G.ld.has(s);
    return `<div class="tk ${s===G.sel?'on':''}" onclick="selStock('${s}')"><span class="tk-s">${s}</span><span class="tk-p ${pc>=0?'up':'dn'}" style="${!ir?'opacity:.5':''}">${p>0?'$'+p.toFixed(2):'…'}</span><span class="tk-c ${pc>=0?'up':'dn'}">${pc!==0?(pc>=0?'+':'')+pc.toFixed(1)+'%':''}</span></div>`;
  }).join('');
}

function buildMain(){
  const sym=G.sel,p=G.pr[sym]||0,c=G.ch[sym]||0,pc=G.pc[sym]||0;
  document.getElementById('m-sym').textContent=sym;
  document.getElementById('m-name').textContent=NAMES[sym]||'';
  document.getElementById('m-sec').textContent=SECS[sym]||'';
  document.getElementById('m-price').textContent=p>0?p.toFixed(2):'---';
  const ce=document.getElementById('m-change');
  if(c!==0){ce.textContent=`${c>=0?'+':''}${c.toFixed(2)} (${pc.toFixed(2)}%)`;ce.style.color=c>=0?'var(--up)':'var(--dn)';}
  else ce.textContent='—';
  document.getElementById('m-open').textContent=G.op[sym]?G.op[sym].toFixed(2):'—';
  document.getElementById('m-high').textContent=G.hi[sym]?G.hi[sym].toFixed(2):'—';
  document.getElementById('m-low').textContent=G.lo[sym]?G.lo[sym].toFixed(2):'—';
  document.getElementById('m-vol').textContent=fK(G.vo[sym]||0);
  let pmHtml='';
  if(G.preMarket[sym]){const pm=G.preMarket[sym];pmHtml+=`<div class="pm-info"><span class="pm-label">🌅 بري ماركت</span><span style="color:${pm.change>=0?'var(--up)':'var(--dn)'};font-family:monospace;font-weight:600">$${pm.price.toFixed(2)} (${pm.change>=0?'+':''}${pm.change.toFixed(2)}%)</span></div>`;}
  if(G.postMarket[sym]){const am=G.postMarket[sym];pmHtml+=`<div class="am-info"><span class="am-label">🌙 بعد الإغلاق</span><span style="color:${am.change>=0?'var(--up)':'var(--dn)'};font-family:monospace;font-weight:600">$${am.price.toFixed(2)} (${am.change>=0?'+':''}${am.change.toFixed(2)}%)</span></div>`;}
  document.getElementById('m-pm-info').innerHTML=pmHtml;
  document.getElementById('chart-title').textContent=`${sym} — ${NAMES[sym]||''}`;
}

function initChart(){
  if(G.chart)return;
  const el=document.getElementById('chart');
  G.chart=LightweightCharts.createChart(el,{
    width:el.clientWidth,height:280,
    layout:{background:{type:'solid',color:'#04060e'},textColor:'#7a8ba8',fontFamily:"'IBM Plex Mono',monospace"},
    grid:{vertLines:{color:'rgba(255,255,255,.03)'},horzLines:{color:'rgba(255,255,255,.03)'}},
    rightPriceScale:{borderColor:'rgba(255,255,255,.055)',scaleMargins:{top:.06,bottom:.22}},
    timeScale:{borderColor:'rgba(255,255,255,.055)',rightOffset:6,timeVisible:true,secondsVisible:false},
    handleScroll:{mouseWheel:true,pressedMouseMove:true,horzTouchDrag:true,vertTouchDrag:false},
    handleScale:{mouseWheel:true,pinch:true,axisPressedMouseMove:true},
  });
  G.cSeries=G.chart.addCandlestickSeries({upColor:'#0ecf7e',downColor:'#f04458',borderUpColor:'#0ecf7e',borderDownColor:'#f04458',wickUpColor:'rgba(14,207,126,.6)',wickDownColor:'rgba(240,68,88,.6)'});
  G.vSeries=G.chart.addHistogramSeries({priceFormat:{type:'volume'},priceScaleId:'vol'});
  G.chart.priceScale('vol').applyOptions({scaleMargins:{top:.85,bottom:0}});
  new ResizeObserver(()=>{if(!G.chart)return;G.chart.applyOptions({width:el.clientWidth,height:280});}).observe(el);
}

function updateChart(){
  if(!G.chart||!G.cans[G.sel])return;
  const cs=G.cans[G.sel];
  G.cSeries.setData(cs.map(c=>({time:c.time,open:c.open,high:c.high,low:c.low,close:c.close})));
  G.vSeries.setData(cs.map(c=>({time:c.time,value:c.volume,color:c.close>=c.open?'rgba(14,207,126,.12)':'rgba(240,68,88,.12)'})));
  G.chart.timeScale().fitContent();
}

function buildSignals(){
  const sym=G.sel,sc=G.sc[sym],ind=G.ind[sym],p=G.pr[sym];
  if(!sc||!ind||!p){document.getElementById('ht-signals').innerHTML='<div class="loading"><div class="spinner"></div>جاري التحميل...</div>';return;}
  const cls=sc.main==='شراء'?'buy':sc.main==='بيع'?'sell':'';
  const strc=sc.str>75?'var(--up)':sc.str>55?'var(--gd)':'var(--dn)';
  let h=`<div class="signal-card ${cls}">
    <div class="signal-head"><span class="signal-name">⚡ الإشارة الرئيسية</span><span class="signal-time">${new Date().toLocaleTimeString('en-US',{hour12:false}).slice(0,5)}</span></div>
    <div class="signal-action ${cls||'neu'}">${sc.main==='شراء'?'▲ شراء':sc.main==='بيع'?'▼ بيع':'◆ انتظار'}</div>
    <div class="signal-desc">${sc.buy} إشارة شراء | ${sc.sell} إشارة بيع${sc.expectedMovePct?` | حركة متوقعة ±${sc.expectedMovePct}% أسبوعياً`:''}</div>
    <div class="lvl-grid">
      <div class="lvl-cell"><div class="ll">الدخول</div><div class="lv" style="color:var(--bl)">$${sc.entry.toFixed(2)}</div></div>
      <div class="lvl-cell"><div class="ll">الهدف</div><div class="lv" style="color:var(--up)">$${sc.tp.toFixed(2)}</div></div>
      <div class="lvl-cell"><div class="ll">الوقف</div><div class="lv" style="color:var(--dn)">$${sc.sl.toFixed(2)}</div></div>
    </div>
    <div class="strength-row"><span style="color:var(--t2)">قوة الإشارة</span>
      <div class="str-bar"><div class="str-fill" style="width:${sc.str}%;background:${strc}"></div></div>
      <span style="color:${strc};font-weight:700;font-family:monospace">${sc.str}%</span>
    </div>
  </div>`;
  // ═══ SNIPER PANEL ═══
  const sn=sc.sniper;
  if(sn){
    const snCol=sn.dir==='شراء'?'var(--up)':sn.dir==='بيع'?'var(--dn)':'var(--gd)';
    const urgCol=sn.urgency.includes('فوري')?'var(--up)':sn.urgency.includes('قريب')?'var(--gd)':'var(--t3)';
    h+=`<div class="signal-card" style="border-color:${snCol};border-width:2px;background:rgba(${sn.dir==='شراء'?'14,207,126':sn.dir==='بيع'?'240,68,88':'245,200,66'},.04)">
      <div class="signal-head"><span class="signal-name" style="color:${snCol}">🎯 القنص الاستباقي</span><span style="color:${urgCol};font-weight:700;font-size:11px">${sn.urgency}</span></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin:6px 0">
        <div style="font-size:18px;font-weight:900;color:${snCol}">${sn.dir==='شراء'?'▲ قنص شراء':sn.dir==='بيع'?'▼ قنص بيع':'◆ ترقب'}</div>
        <div style="font-size:28px;font-weight:900;color:${sn.score>=80?'var(--up)':sn.score>=60?'var(--gd)':'var(--t3)'};font-family:monospace">${sn.score}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:8px 0">
        <div style="text-align:center;padding:6px;background:rgba(0,0,0,.15);border-radius:4px"><div style="font-size:9px;color:var(--t3)">🎯 دخول</div><div style="font-size:14px;font-weight:800;color:var(--bl);font-family:monospace">$${sn.entry}</div></div>
        <div style="text-align:center;padding:6px;background:rgba(0,0,0,.15);border-radius:4px"><div style="font-size:9px;color:var(--t3)">🏆 هدف</div><div style="font-size:14px;font-weight:800;color:var(--up);font-family:monospace">$${sn.tp}</div></div>
        <div style="text-align:center;padding:6px;background:rgba(0,0,0,.15);border-radius:4px"><div style="font-size:9px;color:var(--t3)">🛡 وقف</div><div style="font-size:14px;font-weight:800;color:var(--dn);font-family:monospace">$${sn.sl}</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:10px;margin:4px 0">
        <div style="padding:4px 6px;background:rgba(0,0,0,.1);border-radius:3px;display:flex;justify-content:space-between"><span style="color:var(--t3)">R:R</span><span style="color:var(--up);font-weight:700">${sn.rr}:1</span></div>
        <div style="padding:4px 6px;background:rgba(0,0,0,.1);border-radius:3px;display:flex;justify-content:space-between"><span style="color:var(--t3)">Kelly</span><span style="color:var(--cy);font-weight:700">${sn.kellyPct}%</span></div>
      </div>
      ${sn.spring?'<div style="margin-top:6px;padding:6px;background:rgba(14,207,126,.1);border:1px solid rgba(14,207,126,.3);border-radius:4px;font-size:10px;color:var(--up);font-weight:700;text-align:center">🎯 SPRING — نقطة دخول Call مثالية!</div>':''}
      ${sn.upthrust?'<div style="margin-top:6px;padding:6px;background:rgba(240,68,88,.1);border:1px solid rgba(240,68,88,.3);border-radius:4px;font-size:10px;color:var(--dn);font-weight:700;text-align:center">⚠️ UPTHRUST — نقطة دخول Put!</div>':''}
      ${sn.squeeze.active?`<div style="margin-top:6px;padding:6px;background:rgba(236,72,153,.1);border:1px solid rgba(236,72,153,.3);border-radius:4px;font-size:10px;color:var(--pm);font-weight:700;text-align:center">💥 SQUEEZE نشط (${sn.squeeze.count} بارات) — انفجار وشيك!</div>`:''}
      <div style="margin-top:6px;padding:6px;background:rgba(74,158,255,.06);border-radius:4px;font-size:10px;color:var(--bl);text-align:center;font-weight:600">💬 ${sn.contractTiming}</div>
    </div>`;
  }
  
  // Secret Sauce display
  if(sc.sauce){
    const ss=sc.sauce;
    h+=`<div class="signal-card" style="border-color:var(--gd);background:rgba(245,200,66,.02)">
      <div class="signal-head"><span class="signal-name" style="color:var(--gd)">🧪 الخلطة السحرية</span><span style="color:${ss.score>=70?'var(--up)':ss.score>=50?'var(--gd)':'var(--dn)'};font-weight:800;font-size:14px">${ss.score}/100</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:8px 0">
        <div style="text-align:center;padding:6px;background:rgba(0,0,0,.15);border-radius:4px"><div style="font-size:8px;color:var(--t3)">🎰 فوز</div><div style="font-size:18px;font-weight:900;color:${ss.winProb>=55?'var(--up)':'var(--dn)'};font-family:monospace">${ss.winProb}%</div></div>
        <div style="text-align:center;padding:6px;background:rgba(0,0,0,.15);border-radius:4px"><div style="font-size:8px;color:var(--t3)">IV Rank</div><div style="font-size:18px;font-weight:900;color:${ss.ivRank>60?'var(--dn)':'var(--up)'};font-family:monospace">${ss.ivRank}%</div></div>
        <div style="text-align:center;padding:6px;background:rgba(0,0,0,.15);border-radius:4px"><div style="font-size:8px;color:var(--t3)">توافق</div><div style="font-size:18px;font-weight:900;color:${ss.confluencePct>=50?'var(--up)':'var(--gd)'};font-family:monospace">${ss.confluenceCount}/6</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:10px">
        <div style="padding:6px;background:rgba(0,0,0,.1);border-radius:4px;border-right:2px solid ${ss.thetaScore>=60?'var(--up)':'var(--dn)'}"><span style="color:var(--t3)">⏰ Theta:</span><br><span style="font-weight:700;color:${ss.thetaScore>=60?'var(--up)':'var(--dn)'}">${ss.thetaDanger}</span></div>
        <div style="padding:6px;background:rgba(0,0,0,.1);border-radius:4px;border-right:2px solid var(--cy)"><span style="color:var(--t3)">🧲 Max Pain:</span><br><span style="font-weight:700;color:var(--cy);font-family:monospace">$${ss.maxPain}</span></div>
      </div>
      <div style="margin-top:6px;padding:6px;background:rgba(0,0,0,.08);border-radius:4px;font-size:10px;border-right:2px solid ${ss.entryTiming.includes('مثالي')?'var(--up)':'var(--gd)'}">
        <span style="color:var(--t3)">🎯 توقيت:</span> <span style="font-weight:700;color:${ss.entryTiming.includes('مثالي')?'var(--up)':'var(--gd)'}">${ss.entryTiming}</span><br>
        <span style="color:var(--t2)">${ss.entryAdvice}</span>
      </div>
      <div style="margin-top:4px;font-size:9px;color:var(--bl);text-align:center;font-weight:600">⏱ ${ss.bestEntry}</div>
    </div>`;
  }
// Indicators table
  h+=`<div class="info-card"><div class="info-title">📊 المؤشرات الفنية</div>
    <div class="info-row"><span class="info-label">RSI(14)</span><span class="info-value" style="color:${ind.rsi>70?'var(--dn)':ind.rsi<30?'var(--up)':'var(--bl)'}">${ind.rsi.toFixed(1)}</span></div>
    <div class="info-row"><span class="info-label">MACD</span><span class="info-value" style="color:${ind.macd.v>ind.macd.s?'var(--up)':'var(--dn)'}">${ind.macd.v>ind.macd.s?'تقاطع صعودي ▲':'تقاطع هبوطي ▼'}</span></div>
    <div class="info-row"><span class="info-label">MA9 / MA20 / MA50</span><span class="info-value" style="font-size:9px">${ind.ma9.toFixed(1)} / ${ind.ma20.toFixed(1)} / ${ind.ma50.toFixed(1)}</span></div>
    ${ind.boll?`<div class="info-row"><span class="info-label">بولنجر</span><span class="info-value" style="color:${p>ind.boll.u?'var(--dn)':p<ind.boll.l?'var(--up)':'var(--t1)'};font-size:9px">${ind.boll.l.toFixed(1)} — ${ind.boll.u.toFixed(1)}</span></div>`:''}
  </div>`;
  // Patterns row (Classic / Harmonic / Elliott / Fractal — always visible)
  const psig=(s)=>s==='شراء'?{c:'var(--up)',i:'▲',t:'شراء'}:s==='بيع'?{c:'var(--dn)',i:'▼',t:'بيع'}:{c:'var(--t3)',i:'◆',t:'محايد'};
  const cl=psig(sc.sigs.classic||'محايد'),fr=psig(sc.frRes?.sig||'محايد');
  // Mobile only computes classic, fractal locally — others not detected; show as not-available
  h+=`<div class="info-card"><div class="info-title">🎯 الأنماط الفنية</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
      <div style="background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-right:3px solid ${cl.c};border-radius:4px;padding:6px 8px">
        <div style="font-size:9px;color:var(--t3)">كلاسيك</div>
        <div style="font-size:11px;color:${cl.c};font-weight:700">${cl.i} ${cl.t}</div>
      </div>
      <div style="background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-right:3px solid ${fr.c};border-radius:4px;padding:6px 8px">
        <div style="font-size:9px;color:var(--t3)">⚡ فركتال</div>
        <div style="font-size:11px;color:${fr.c};font-weight:700">${fr.i} ${fr.t}</div>
      </div>
    </div>
    ${sc.frRes&&sc.frRes.sig!=='محايد'?`<div style="margin-top:6px;font-size:9px;color:var(--t2);background:rgba(167,139,250,.06);padding:5px 8px;border-radius:3px">⚡ ${sc.frRes.desc}</div>`:''}
    <div style="margin-top:6px;font-size:8px;color:var(--t3);text-align:center">للهارمونيك والإيليوت استخدم نسخة سطح المكتب</div>
  </div>`;
  document.getElementById('ht-signals').innerHTML=h;
}

async function buildContract(){
  const sym=G.sel;
  const target=document.getElementById('ht-contract');
  target.innerHTML='<div class="loading"><div class="spinner"></div>جاري ترشيح أفضل عقد أسبوعي...</div>';
  let data=G.contractCache[sym];
  if(!data||Date.now()-data.ts>180000){const d=await fetchContractsFor(sym);if(d)G.contractCache[sym]={data:d,ts:Date.now()};data=G.contractCache[sym];}
  if(!data||!data.data?.recommendations?.length){target.innerHTML='<div class="info-card"><div style="text-align:center;color:var(--t3);padding:20px;font-size:11px">لا توجد عقود مناسبة الآن<br><span style="font-size:9px;margin-top:6px;display:inline-block;color:var(--t2)">جرّب إعادة تحميل الصفحة أو اختيار سهم آخر</span></div></div>';return;}
  const top=data.data.recommendations.slice(0,2);
  const synthBadge=data.data.dataSource==='synthetic'?`<div style="background:rgba(245,200,66,.12);border:1px solid rgba(245,200,66,.4);border-radius:6px;padding:8px 10px;margin-bottom:10px;font-size:10px;color:var(--gd);text-align:center;line-height:1.5">⚠️ تقديرات تركيبية بـ Black-Scholes</div>`:'';
  const alignBadge=data.data.dirSource==='aligned'?`<div style="background:rgba(14,207,126,.08);border:1px solid rgba(14,207,126,.3);border-radius:6px;padding:8px 10px;margin-bottom:10px;font-size:10px;color:var(--up);text-align:center;font-weight:700">✅ إشارة موحّدة — القنص والعقد متوافقان (Sniper ${data.data.sniperScore||''})</div>`:data.data.dirSource==='sniper'?`<div style="background:rgba(167,139,250,.08);border:1px solid rgba(167,139,250,.3);border-radius:6px;padding:8px 10px;margin-bottom:10px;font-size:10px;color:var(--pu);text-align:center">🎯 العقد مبني على محرك القنص</div>`:'';
  let h=synthBadge+alignBadge;
  top.forEach((c,idx)=>{
    const isCall=c.type==='CALL';
    const recPayload=JSON.stringify({...c,underlyingPrice:data.data.underlying}).replace(/'/g,"&#39;");
    const mid=c.mid||c.lastPrice||0;
    const expVal=isCall?Math.max(0,(c.target||0)-c.strike):Math.max(0,c.strike-(c.target||0));
    const roi=mid>0?((expVal-mid)/mid*100):0;
    const roiCol=roi>100?'var(--up)':roi>50?'var(--cy)':roi>0?'var(--gd)':'var(--dn)';
    const scoreCol=c.score>=75?'var(--up)':c.score>=60?'var(--cy)':c.score>=45?'var(--gd)':'var(--dn)';
    const borderCol=c.score>=75?'var(--up)':c.score>=60?'var(--bl)':'var(--pm)';
    h+=`<div class="contract-card" style="border-color:${borderCol};border-width:1.5px">
      <div class="cc-head"><span class="cc-name">${idx===0?'🥇 العقد الأول المرشح':'🥈 العقد الثاني المرشح'}</span><span class="cc-exp">انتهاء ${fExpiry(c.expiry)} (${fDays(c.expiry-Date.now())})</span></div>
      <div class="cc-type ${isCall?'cc-call':'cc-put'}" style="font-size:16px">${isCall?'▲ CALL':'▼ PUT'} $${c.strike}</div>
      <div class="cc-grid">
        <div class="cc-cell"><div class="ll">سعر العقد</div><div class="lv" style="color:var(--cy)">$${mid.toFixed(2)}</div></div>
        <div class="cc-cell"><div class="ll">نقطة التعادل</div><div class="lv" style="color:var(--gd)">$${(c.breakeven||0).toFixed(2)}</div></div>
        <div class="cc-cell"><div class="ll">🎯 الهدف</div><div class="lv" style="color:var(--up)">$${(c.target||0).toFixed(2)}</div></div>
        <div class="cc-cell"><div class="ll">عائد متوقع</div><div class="lv" style="color:${roiCol};font-weight:800">${roi>0?'+':''}${roi.toFixed(0)}%</div></div>
        <div class="cc-cell"><div class="ll">Δ ديلتا</div><div class="lv">${(c.delta||0).toFixed(2)}</div></div>
        <div class="cc-cell"><div class="ll">IV</div><div class="lv">${((c.iv||0)*100).toFixed(0)}%</div></div>
        <div class="cc-cell"><div class="ll">OI</div><div class="lv">${fK(c.openInterest||0)}</div></div>
        <div class="cc-cell"><div class="ll">حجم</div><div class="lv">${fK(c.volume||0)}</div></div>
      </div>
      <div class="strength-row"><span style="color:var(--t2)">⭐ Score</span>
        <div class="str-bar"><div class="str-fill" style="width:${c.score}%;background:linear-gradient(90deg,var(--pm),var(--pu))"></div></div>
        <span style="color:${scoreCol};font-weight:800;font-family:monospace">${c.score}/100</span>
      </div>
      <button class="btn-track" onclick='trackContract("${sym}", ${recPayload})'>🧠 تتبع — أضف للذاكرة التكيفية</button>
    </div>`;
  });
  h+=`<div class="disclosure"><b>كيف يعمل الترشيح:</b> يحلل السلسلة الأسبوعية، يقيّم 7 معايير (فني، ديلتا، IV، OI، حجم، سبريد، حركة متوقعة) بأوزان تتعلم من نتائج توصياتك السابقة.</div>`;
  target.innerHTML=h;
}

/* ════════════════════════════════════════════════════════
   RADAR (mobile)
   ════════════════════════════════════════════════════════ */
const RADAR={raf:null,lastFrame:0,nodes:[],walls:[],smartFlow:[],darkSignals:[],pulseT:0,optionsData:null,priceLine:null};
function detectSmartMoneyM(sym){
  const cs=G.cans[sym];if(!cs||cs.length<20)return{zscore:0,accumulation:0,diagnosis:'بيانات غير كافية'};
  const vols=cs.slice(-20).map(c=>c.volume);
  const mean=vols.reduce((a,b)=>a+b,0)/vols.length;
  const std=Math.sqrt(vols.reduce((a,b)=>a+(b-mean)**2,0)/vols.length)||1;
  const z=(cs[cs.length-1].volume-mean)/std;
  const last10=cs.slice(-10);let acc=0;
  for(const c of last10){const r=c.high-c.low||.001;acc+=((c.close-c.low)/r-0.5)*c.volume;}
  acc=acc/last10.reduce((a,c)=>a+c.volume,0);
  let diag='سيولة طبيعية';
  if(z>2&&acc>0.15)diag='🐋 شراء مؤسسي محتمل';
  else if(z>2&&acc<-0.15)diag='🦈 بيع مؤسسي محتمل';
  else if(z>1.5)diag='⚡ نشاط غير عادي';
  else if(Math.abs(acc)>0.25)diag=acc>0?'📈 تراكم تدريجي':'📉 توزيع تدريجي';
  return{zscore:+z.toFixed(2),accumulation:+acc.toFixed(3),diagnosis:diag};
}
function calcBreakoutProbM(sym){
  const ind=G.ind[sym],sc=G.sc[sym];if(!ind||!sc)return 0;
  let s=0;
  if(ind.boll&&ind.boll.w<4)s+=25;else if(ind.boll&&ind.boll.w<7)s+=15;
  const sm=detectSmartMoneyM(sym);
  if(sm.zscore>2)s+=20;else if(sm.zscore>1)s+=10;
  if(sc.main!=='محايد'&&sc.str>60)s+=20;
  return Math.min(95,s);
}
function renderGaugeM(sym){
  const sc=G.sc[sym];if(!sc)return '';
  let power=sc.main==='شراء'?sc.str:sc.main==='بيع'?-sc.str:0;
  power=Math.max(-100,Math.min(100,power));
  const angle=(power/100)*90;
  const cx=100,cy=90,r=70;
  const nx=cx+r*0.85*Math.cos((angle-90)*Math.PI/180);
  const ny=cy+r*0.85*Math.sin((angle-90)*Math.PI/180);
  const lbl=power>60?'شراء قوي':power>25?'شراء':power>-25?'محايد':power>-60?'بيع':'بيع قوي';
  const lblCol=power>25?'var(--up)':power<-25?'var(--dn)':'var(--gd)';
  return `<div class="gauge-wrap">
    <svg class="gauge-svg" viewBox="0 0 200 100">
      <defs><linearGradient id="ggm" x1="0%" x2="100%"><stop offset="0%" stop-color="#f04458"/><stop offset="50%" stop-color="#f5c842"/><stop offset="100%" stop-color="#0ecf7e"/></linearGradient></defs>
      <path d="M 30 90 A 70 70 0 0 1 170 90" stroke="url(#ggm)" stroke-width="10" fill="none" opacity=".7" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="4" fill="#fff"/>
      <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="#fff" stroke-width="2.5" stroke-linecap="round" style="filter:drop-shadow(0 0 4px #fff)"/>
    </svg>
    <div class="gauge-label" style="color:${lblCol}">⚡ ${lbl} • قوة ${Math.abs(power).toFixed(0)}%</div>
  </div>`;
}
async function fetchOptions(sym){try{const r=await fetch(`/api/options?symbol=${sym}`,{signal:AbortSignal.timeout(10000)});if(!r.ok)return null;const d=await r.json();return d?.optionChain?.result?.[0]||null;}catch(e){return null;}}
async function buildRadar(){
  const sym=G.sel,cs=G.cans[sym],ind=G.ind[sym],sc=G.sc[sym],p=G.pr[sym];
  if(!cs||!ind||!sc||!p){document.getElementById('ht-radar').innerHTML='<div class="loading"><div class="spinner"></div>جاري التحميل...</div>';return;}
  const sm=detectSmartMoneyM(sym);const bp=calcBreakoutProbM(sym);
  let h=`<div style="margin-bottom:8px;padding:6px 10px;background:linear-gradient(90deg,rgba(74,158,255,.05),rgba(167,139,250,.05));border:1px solid rgba(74,158,255,.2);border-radius:5px;display:flex;justify-content:space-between;align-items:center;font-size:10px"><span style="color:var(--bl);font-weight:600">📡 رادار السيولة الذكي</span><span style="display:flex;align-items:center;gap:5px"><span style="width:6px;height:6px;background:var(--up);border-radius:50%;box-shadow:0 0 8px var(--up);animation:dot 1.5s infinite"></span>BEAT</span></div>
  <canvas id="radar-canvas" class="radar-canvas"></canvas>
  <div class="radar-legend">
    <div class="rl-item"><span class="rl-dot call"></span>جدار Call</div>
    <div class="rl-item"><span class="rl-dot put"></span>جدار Put</div>
    <div class="rl-item"><span class="rl-dot smart"></span>أموال ذكية</div>
    <div class="rl-item"><span class="rl-dot dark"></span>سيولة مستنتجة</div>
  </div>
  <div class="breakout-prob" style="margin-top:10px"><span style="font-weight:700;color:${bp>=70?'var(--up)':bp>=50?'var(--gd)':'var(--t2)'}">⚡ احتمالية انفجار:</span><div class="bp-bar"><div class="bp-fill" style="width:${bp}%"></div></div><span style="font-weight:700;color:${bp>=70?'var(--up)':bp>=50?'var(--gd)':'var(--t2)'};min-width:34px;text-align:left">${bp}%</span></div>
  ${renderGaugeM(sym)}
  <div class="info-card"><div class="info-title">🐋 تتبع الأموال الذكية</div>
    <div class="info-row"><span class="info-label">شذوذ الحجم</span><span class="info-value" style="color:${sm.zscore>2?'var(--up)':sm.zscore<-2?'var(--dn)':'var(--t1)'}">${sm.zscore.toFixed(2)}σ ${sm.zscore>2?'⚡':''}</span></div>
    <div class="info-row"><span class="info-label">اتجاه التراكم</span><span class="info-value" style="color:${sm.accumulation>0?'var(--up)':sm.accumulation<0?'var(--dn)':'var(--t1)'}">${sm.accumulation>0?'▲ تراكم':sm.accumulation<0?'▼ توزيع':'◆ متوازن'}</span></div>
    <div class="info-row"><span class="info-label">تشخيص الحالة</span><span class="info-value" style="color:var(--bl);font-size:10px">${sm.diagnosis}</span></div>
  </div>
  <div class="info-card"><div class="info-title">🧱 جدار العقود (Open Interest)</div><div id="walls-mobile"><div style="font-size:10px;color:var(--t3);text-align:center;padding:10px">جاري الجلب...</div></div></div>
  <div class="disclosure"><b>شفافية:</b> بيانات Dark Pool الفعلية تتطلب اشتراك Unusual Whales. هذا النظام محاكاة استنتاجية تعتمد على Open Interest الحقيقي + Z-Score الحجم + تجمعات السيولة + الجاما المحسوبة.</div>`;
  document.getElementById('ht-radar').innerHTML=h;
  startRadar(sym);
  fetchOptions(sym).then(chain=>{if(chain){RADAR.optionsData=chain;renderWallsM(sym,chain);buildRadarNodes(sym);}});
}
function renderWallsM(sym,chain){
  const target=document.getElementById('walls-mobile');if(!target||!chain)return;
  const exps=chain.expirationDates||[];const now=Date.now()/1000;
  let nearest=exps.find(t=>t-now>0&&t-now<86400*14)||exps[0];
  const opt=(chain.options||[]).find(o=>o.expirationDate===nearest)||(chain.options||[])[0];
  if(!opt){target.innerHTML='<div style="font-size:10px;color:var(--t3);text-align:center;padding:10px">لا توجد عقود</div>';return;}
  const calls=(opt.calls||[]).filter(c=>c.openInterest>0),puts=(opt.puts||[]).filter(c=>c.openInterest>0);
  const p=G.pr[sym];
  const cw=calls.filter(c=>c.strike>p).sort((a,b)=>b.openInterest-a.openInterest).slice(0,4).sort((a,b)=>a.strike-b.strike);
  const pw=puts.filter(c=>c.strike<p).sort((a,b)=>b.openInterest-a.openInterest).slice(0,4).sort((a,b)=>b.strike-a.strike);
  const maxOI=Math.max(...cw.map(c=>c.openInterest),...pw.map(c=>c.openInterest),1);
  let html='';
  if(cw.length){html+='<div style="font-size:9px;color:var(--up);font-weight:700;padding:3px 4px">▲ Call Walls</div>';for(const c of cw){const pct=c.openInterest/maxOI*100;html+=`<div class="wall-row"><span style="font-weight:700;color:var(--up);min-width:60px">$${c.strike}</span><div class="wall-bar-wrap"><div class="wall-bar" style="width:${pct}%;background:linear-gradient(90deg,rgba(14,207,126,.3),rgba(14,207,126,.7))"></div></div><span style="color:var(--t2);min-width:40px;text-align:left">${fK(c.openInterest)}</span></div>`;}}
  html+=`<div class="wall-row" style="background:rgba(74,158,255,.06);border-right:2px solid var(--bl);padding-right:6px"><span style="color:var(--bl);min-width:60px;font-weight:700">$${p.toFixed(2)}</span><span style="flex:1;text-align:center;color:var(--bl);font-size:9px">◆ السعر الحالي</span><span style="color:var(--bl);min-width:40px;text-align:left">NOW</span></div>`;
  if(pw.length){html+='<div style="font-size:9px;color:var(--dn);font-weight:700;padding:3px 4px">▼ Put Walls</div>';for(const c of pw){const pct=c.openInterest/maxOI*100;html+=`<div class="wall-row"><span style="font-weight:700;color:var(--dn);min-width:60px">$${c.strike}</span><div class="wall-bar-wrap"><div class="wall-bar" style="width:${pct}%;background:linear-gradient(90deg,rgba(240,68,88,.3),rgba(240,68,88,.7))"></div></div><span style="color:var(--t2);min-width:40px;text-align:left">${fK(c.openInterest)}</span></div>`;}}
  target.innerHTML=html;
}
function buildRadarNodes(sym){
  RADAR.nodes=[];RADAR.walls=[];RADAR.smartFlow=[];RADAR.darkSignals=[];
  const cs=G.cans[sym],ind=G.ind[sym],sc=G.sc[sym],p=G.pr[sym];
  const cv=document.getElementById('radar-canvas');if(!cv||!cs||!ind)return;
  const W=cv.clientWidth,H=260;
  const recent=cs.slice(-30);
  const pH=Math.max(...recent.map(c=>c.high))*1.02,pL=Math.min(...recent.map(c=>c.low))*0.98;
  const pR=pH-pL||1;
  const yFor=price=>H-30-((price-pL)/pR)*(H-60);
  RADAR.priceLine={y:yFor(p),p};
  if(RADAR.optionsData){
    const exps=RADAR.optionsData.expirationDates||[];const now=Date.now()/1000;
    const nearest=exps.find(t=>t-now>0&&t-now<86400*14)||exps[0];
    const opt=(RADAR.optionsData.options||[]).find(o=>o.expirationDate===nearest);
    if(opt){
      const calls=(opt.calls||[]).filter(c=>c.openInterest>50).sort((a,b)=>b.openInterest-a.openInterest).slice(0,4);
      const puts=(opt.puts||[]).filter(c=>c.openInterest>50).sort((a,b)=>b.openInterest-a.openInterest).slice(0,4);
      const maxOI=Math.max(...calls.map(c=>c.openInterest),...puts.map(c=>c.openInterest),1);
      for(const c of calls){const y=yFor(c.strike);if(y>=5&&y<=H-5)RADAR.walls.push({type:'call',y,strike:c.strike,oi:c.openInterest,intensity:c.openInterest/maxOI});}
      for(const c of puts){const y=yFor(c.strike);if(y>=5&&y<=H-5)RADAR.walls.push({type:'put',y,strike:c.strike,oi:c.openInterest,intensity:c.openInterest/maxOI});}
    }
  }
  // Liquidity nodes from price-action levels (simple version: highs/lows of recent candles)
  for(let i=0;i<recent.length;i+=4){const c=recent[i];if(c.volume>0){RADAR.nodes.push({type:Math.random()>0.5?'liq-up':'liq-down',x:Math.random()*(W-60)+30,y:yFor((c.high+c.low)/2),radius:5,strength:1,price:c.close,pulse:Math.random()*Math.PI*2,vx:(Math.random()-0.5)*0.3,vy:0});}}
  const sm=detectSmartMoneyM(sym);
  if(Math.abs(sm.zscore)>1.5)RADAR.smartFlow.push({x:W/2,y:RADAR.priceLine.y,strength:Math.abs(sm.zscore),direction:sm.accumulation>0?1:-1,pulse:0});
  for(let i=cs.length-5;i<cs.length;i++){if(i<1)continue;const c=cs[i],pc=cs[i-1];const vr=c.volume/Math.max(1,pc.volume),pm=Math.abs(c.close-c.open)/c.open;if(vr>1.8&&pm<0.005)RADAR.darkSignals.push({x:Math.random()*(W-40)+20,y:yFor((c.high+c.low)/2),intensity:vr,pulse:Math.random()*Math.PI*2});}
}
function startRadar(sym){
  if(RADAR.raf)cancelAnimationFrame(RADAR.raf);
  buildRadarNodes(sym);
  const cv=document.getElementById('radar-canvas');if(!cv)return;
  const dpr=window.devicePixelRatio||1;cv.width=cv.clientWidth*dpr;cv.height=260*dpr;
  const ctx=cv.getContext('2d');ctx.scale(dpr,dpr);
  function frame(now){
    if(G.tab!=='radar'){RADAR.raf=null;return;}
    const W=cv.clientWidth,H=260;
    if(!RADAR.lastFrame)RADAR.lastFrame=now;
    const dt=Math.min(0.05,(now-RADAR.lastFrame)/1000);RADAR.lastFrame=now;RADAR.pulseT+=dt;
    ctx.fillStyle='rgba(2,5,13,0.25)';ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(74,158,255,0.04)';ctx.lineWidth=0.5;
    for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    for(const w of RADAR.walls){
      const col=w.type==='call'?'14,207,126':'240,68,88';
      const grad=ctx.createLinearGradient(0,w.y,W,w.y);
      grad.addColorStop(0,`rgba(${col},0)`);grad.addColorStop(0.5,`rgba(${col},${0.18+w.intensity*0.4})`);grad.addColorStop(1,`rgba(${col},0)`);
      ctx.strokeStyle=grad;ctx.lineWidth=1.5+w.intensity*4;ctx.beginPath();ctx.moveTo(0,w.y);ctx.lineTo(W,w.y);ctx.stroke();
      ctx.fillStyle=w.type==='call'?'rgba(14,207,126,0.9)':'rgba(240,68,88,0.9)';
      ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='left';
      ctx.fillText(`${w.type==='call'?'▲':'▼'} $${w.strike} ${fK(w.oi)}`,4,w.y-3);
    }
    for(let i=0;i<RADAR.nodes.length;i++){for(let j=i+1;j<RADAR.nodes.length;j++){const a=RADAR.nodes[i],b=RADAR.nodes[j];const dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);if(d<90){const op=(1-d/90)*0.35*(Math.sin(RADAR.pulseT*1.5)*0.3+0.7);ctx.strokeStyle=`rgba(74,158,255,${op})`;ctx.lineWidth=0.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}}
    if(RADAR.priceLine){ctx.strokeStyle='rgba(74,158,255,0.5)';ctx.lineWidth=1.2;ctx.setLineDash([4,3]);ctx.beginPath();ctx.moveTo(0,RADAR.priceLine.y);ctx.lineTo(W,RADAR.priceLine.y);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='rgba(74,158,255,0.95)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='right';ctx.fillText(`◆ $${RADAR.priceLine.p.toFixed(2)}`,W-4,RADAR.priceLine.y-3);}
    for(const n of RADAR.nodes){n.pulse+=dt*2;n.x+=n.vx;if(n.x<20||n.x>W-20)n.vx*=-1;const isUp=n.type==='liq-up',col=isUp?'245,200,66':'167,139,250',pr=n.radius+Math.sin(n.pulse)*2;const grad=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,pr*2.5);grad.addColorStop(0,`rgba(${col},0.5)`);grad.addColorStop(0.4,`rgba(${col},0.18)`);grad.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=grad;ctx.beginPath();ctx.arc(n.x,n.y,pr*2.5,0,Math.PI*2);ctx.fill();ctx.fillStyle=`rgba(${col},0.9)`;ctx.beginPath();ctx.arc(n.x,n.y,pr,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(n.x,n.y,1.5,0,Math.PI*2);ctx.fill();}
    for(const sm of RADAR.smartFlow){sm.pulse+=dt*3;const r=14+Math.sin(sm.pulse)*4,col=sm.direction>0?'14,207,126':'240,68,88';const ag=ctx.createRadialGradient(sm.x,sm.y,0,sm.x,sm.y,r*2);ag.addColorStop(0,`rgba(${col},0.7)`);ag.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=ag;ctx.beginPath();ctx.arc(sm.x,sm.y,r*2,0,Math.PI*2);ctx.fill();ctx.fillStyle=`rgba(${col},0.95)`;ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.fillText('🐋',sm.x,sm.y+6);}
    for(const ds of RADAR.darkSignals){ds.pulse+=dt*1.5;const r=8+Math.sin(ds.pulse)*3,it=Math.min(0.6,ds.intensity*0.15);const grad=ctx.createRadialGradient(ds.x,ds.y,0,ds.x,ds.y,r*3);grad.addColorStop(0,`rgba(167,139,250,${it})`);grad.addColorStop(1,'rgba(167,139,250,0)');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(ds.x,ds.y,r*3,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(167,139,250,0.5)';ctx.lineWidth=1;ctx.setLineDash([2,3]);ctx.beginPath();ctx.arc(ds.x,ds.y,r,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);}
    const sx=(Math.sin(RADAR.pulseT*0.4)+1)*0.5*W;const sg=ctx.createLinearGradient(sx-30,0,sx+30,0);sg.addColorStop(0,'rgba(74,158,255,0)');sg.addColorStop(0.5,'rgba(74,158,255,0.18)');sg.addColorStop(1,'rgba(74,158,255,0)');ctx.fillStyle=sg;ctx.fillRect(sx-30,0,60,H);
    RADAR.raf=requestAnimationFrame(frame);
  }
  RADAR.lastFrame=0;RADAR.raf=requestAnimationFrame(frame);
}

/* ════════════════════════════════════════════════════════
   AI / INFO panels
   ════════════════════════════════════════════════════════ */
async function buildAI(){
  const sym=G.sel,sc=G.sc[sym],p=G.pr[sym],ind=G.ind[sym];
  if(!sc||!p){document.getElementById('ht-ai').innerHTML='<div class="loading">انتظر تحميل البيانات</div>';return;}
  document.getElementById('ht-ai').innerHTML=`<div class="info-card"><div class="info-title">✦ تحليل AI</div><button class="btn-ai" id="ai-run-btn" onclick="runAI()">🚀 تحليل ذكي بـ Claude</button><div id="ai-output" style="margin-top:10px"></div></div>`;
}
async function runAI(){
  const sym=G.sel,sc=G.sc[sym],p=G.pr[sym],ind=G.ind[sym];
  document.getElementById('ai-output').innerHTML=`<div style="display:flex;align-items:center;gap:8px;color:var(--t3);font-size:11px;padding:10px">جاري التحليل...<div class="ai-dots"><span></span><span></span><span></span></div></div>`;
  document.getElementById('ai-run-btn').disabled=true;
  const cached=G.contractCache[sym];const contracts=cached?.data?.recommendations||[];
  const wr=getWR();
  const prompt=`أنت محلل فني خبير في الأسواق الأمريكية وعقود الخيارات الأسبوعية. حلل بدقة بالعربية.
السهم: ${sym} — ${NAMES[sym]||''} (${SECS[sym]||''})
السعر: $${p.toFixed(2)}${G.preMarket[sym]?` | بري ماركت $${G.preMarket[sym].price.toFixed(2)} (${G.preMarket[sym].change>=0?'+':''}${G.preMarket[sym].change.toFixed(2)}%)`:''}
RSI:${ind.rsi.toFixed(1)} MACD:${ind.macd.v>ind.macd.s?'↑':'↓'} MA9:${ind.ma9.toFixed(2)} MA20:${ind.ma20.toFixed(2)} MA50:${ind.ma50.toFixed(2)}
الإشارة: ${sc.main} قوة ${sc.str}% (${sc.buy} شراء | ${sc.sell} بيع)
حركة متوقعة أسبوعياً: ±${sc.expectedMovePct}%
${contracts.length?'العقود المرشحة: '+contracts.map(c=>`${c.type} ${c.strike} (Score ${c.score})`).join(' | '):''}
${AI.stats.total?`ذاكرة المنصة: ${AI.stats.total} توصية، فوز ${wr}%`:''}
اكتب تحليلاً موجزاً يشمل: (1) الاتجاه، (2) أقوى 2 إشارة، (3) رأيك في العقود وأيهم أفضل، (4) إدارة المخاطر، (5) ما يجب مراقبته في البري ماركت. تنبيه: للأغراض التعليمية فقط.`;
  try{
    const r=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,max_tokens:1200})});
    const d=await r.json();
    if(!d || d.ok===false){throw new Error(d?.errorMsg || 'HTTP '+r.status);}
    const txt=(typeof d.text==='string'&&d.text.length)?d.text:'تعذر استخراج التحليل';
    const fmt=String(txt).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
    document.getElementById('ai-output').innerHTML=`<div class="ai-text">${fmt}</div>`;
  }catch(e){
    document.getElementById('ai-output').innerHTML=`<div style="color:var(--dn);font-size:10px;line-height:1.7">⚠ ${String(e.message||e)}<br><br><span style="color:var(--t2)">للتشخيص افتح <code style="color:var(--gd)">/api/test?symbol=${sym}</code> في المتصفح</span></div>`;
  }
  document.getElementById('ai-run-btn').disabled=false;
}
window.runAI=runAI;

function buildInfoTab(){
  const sym=G.sel,p=G.pr[sym],sc=G.sc[sym],ind=G.ind[sym];
  let h=`<div class="info-card"><div class="info-title">معلومات السهم</div>
    <div class="info-row"><span class="info-label">الرمز</span><span class="info-value" style="color:var(--bl)">${sym}</span></div>
    <div class="info-row"><span class="info-label">الاسم</span><span class="info-value">${NAMES[sym]||'—'}</span></div>
    <div class="info-row"><span class="info-label">القطاع</span><span class="info-value" style="color:var(--cy)">${SECS[sym]||'—'}</span></div>
    <div class="info-row"><span class="info-label">السعر</span><span class="info-value">$${p?.toFixed(2)||'—'}</span></div>
    <div class="info-row"><span class="info-label">أعلى</span><span class="info-value up">${G.hi[sym]?.toFixed(2)||'—'}</span></div>
    <div class="info-row"><span class="info-label">أدنى</span><span class="info-value dn">${G.lo[sym]?.toFixed(2)||'—'}</span></div>
    <div class="info-row"><span class="info-label">حجم</span><span class="info-value">${fK(G.vo[sym]||0)}</span></div>
    <div class="info-row"><span class="info-label">المصدر</span><span class="info-value" style="color:${G.ld.has(sym)?'var(--up)':'var(--gd)'}">${G.ld.has(sym)?'Yahoo Finance ✓':'تقريبي'}</span></div>
  </div>`;
  if(G.preMarket[sym]){const pm=G.preMarket[sym];h+=`<div class="info-card"><div class="info-title">🌅 بيانات قبل السوق</div><div class="info-row"><span class="info-label">السعر</span><span class="info-value">$${pm.price.toFixed(2)}</span></div><div class="info-row"><span class="info-label">التغير</span><span class="info-value" style="color:${pm.change>=0?'var(--up)':'var(--dn)'}">${pm.change>=0?'+':''}${pm.change.toFixed(2)}%</span></div></div>`;}
  if(sc&&ind)h+=`<div class="info-card"><div class="info-title">الملخص الفني</div><div class="info-row"><span class="info-label">إشارة</span><span class="info-value" style="color:${sc.main==='شراء'?'var(--up)':sc.main==='بيع'?'var(--dn)':'var(--gd)'}">${sc.main} ${sc.str}%</span></div><div class="info-row"><span class="info-label">RSI</span><span class="info-value">${ind.rsi.toFixed(1)}</span></div><div class="info-row"><span class="info-label">شراء/بيع</span><span class="info-value">${sc.buy}/${sc.sell}</span></div></div>`;
  document.getElementById('ht-info').innerHTML=h;
}

/* WATCHLIST */
function buildWatch(filter=''){
  const f=filter.toLowerCase();
  const arr=STKS.filter(s=>!f||s.toLowerCase().includes(f)||(NAMES[s]||'').includes(filter));
  document.getElementById('watchlist').innerHTML=arr.map(s=>{
    const p=G.pr[s]||0,pc=G.pc[s]||0,sc=G.sc[s];
    const sigCol=sc?.main==='شراء'?'var(--up)':sc?.main==='بيع'?'var(--dn)':'var(--gd)';
    const sigText=sc?.main==='شراء'?'▲ شراء':sc?.main==='بيع'?'▼ بيع':'—';
    return `<div class="wl-row ${s===G.sel?'on':''}" onclick="selStock('${s}');setView('home',document.querySelector('.bn-btn'))">
      <div class="wl-l"><span class="wl-sym">${s}</span><span class="wl-name">${NAMES[s]||''}</span></div>
      <div class="wl-r"><span class="wl-p ${pc>=0?'up':'dn'}">${p>0?'$'+p.toFixed(2):'—'}</span><span class="wl-c ${pc>=0?'up':'dn'}">${pc!==0?(pc>=0?'+':'')+pc.toFixed(2)+'%':''}</span></div>
      <span style="color:${sigCol};font-size:10px;font-weight:700;min-width:50px;text-align:center">${sigText}</span>
    </div>`;
  }).join('')||'<div class="empty">لا نتائج</div>';
}

/* CONTRACTS SCAN */
async function scanContracts(){
  G.opt=[];
  const prog=document.getElementById('opt-progress');prog.style.display='block';
  const pTxt=document.getElementById('opt-prog-txt'),pFill=document.getElementById('opt-prog-fill');
  document.getElementById('opt-results').innerHTML='';
  const cands=PRI.slice(0,16);const total=cands.length;let done=0;
  for(const sym of cands){
    if(!G.cans[sym])await loadStock(sym,'3mo','1d');
    if(!G.sc[sym])calcSc(sym);
    const data=await fetchContractsFor(sym);
    if(data&&data.recommendations){for(const c of data.recommendations){G.opt.push({sym,name:NAMES[sym],price:G.pr[sym],...c,underlying:data.underlying});}}
    done++;pFill.style.width=(done/total*100).toFixed(0)+'%';pTxt.textContent=`${done}/${total} — وجد ${G.opt.length}`;
    renderOptList();
    await new Promise(r=>setTimeout(r,80));
  }
  prog.style.display='none';
  pTxt.textContent=`اكتمل — ${G.opt.length} عقد`;
  renderOptList();
}
window.scanContracts=scanContracts;
function renderOptList(){
  const data=[...G.opt].sort((a,b)=>b.score-a.score);
  document.getElementById('opt-results').innerHTML=data.map(d=>{
    const isCall=d.type==='CALL';
    const recPayload=JSON.stringify({...d,underlyingPrice:d.underlying}).replace(/'/g,"&#39;");
    return `<div class="opt-row" onclick="selStock('${d.sym}');setView('home',document.querySelector('.bn-btn'))">
      <span class="opt-sym">${d.sym}</span>
      <span class="${isCall?'opt-type-call':'opt-type-put'}">${isCall?'▲ CALL':'▼ PUT'} ${d.strike}</span>
      <div style="font-size:9px;color:var(--t2)"><div>$${(d.mid||0).toFixed(2)} • ${fDays(d.expiry-Date.now())} • IV ${((d.iv||0)*100).toFixed(0)}%</div><div style="color:var(--t3)">Δ${(d.delta||0).toFixed(2)} • OI ${fK(d.openInterest||0)}</div></div>
      <div style="display:flex;flex-direction:column;align-items:end;gap:3px"><span class="opt-score">${d.score}</span><button onclick='event.stopPropagation();trackContract("${d.sym}", ${recPayload})' style="background:rgba(167,139,250,.1);border:1px solid rgba(167,139,250,.3);color:var(--pu);padding:3px 6px;border-radius:3px;font-size:10px;font-family:inherit;cursor:pointer">🧠</button></div>
    </div>`;
  }).join('')||'<div class="empty">اضغط زر المسح لبدء البحث</div>';
}

/* MEMORY */
function buildMemory(){
  const wins=AI.stats.wins,losses=AI.stats.losses,pending=AI.recs.filter(r=>r.status==='pending').length;
  const wr=getWR();
  const STR_NAMES={classic:'كلاسيك',harmonic:'هارمونيك',elliott:'إيليوت',ma:'متوسطات',osc:'RSI',macd:'MACD',ichimoku:'إيشيموكو',bollinger:'بولنجر',vwap:'VWAP',supdem:'عرض/طلب',liquidity:'سيولة',fakeout:'كسر وهمي',fractal:'فركتال'};
  let h=`<div class="info-card"><div class="info-title">🧠 ذاكرة الذكاء التكيفي</div>
    <div class="mem-stat">
      <div class="mem-cell"><div class="ml">إجمالي</div><div class="mv">${AI.stats.total}</div></div>
      <div class="mem-cell"><div class="ml">معلق</div><div class="mv" style="color:var(--gd)">${pending}</div></div>
      <div class="mem-cell"><div class="ml">نسبة الفوز</div><div class="mv" style="color:${wr>=60?'var(--up)':wr<40?'var(--dn)':'var(--gd)'}">${wr}%</div></div>
    </div>
    <div style="font-size:10px;color:var(--t2);margin-top:8px;line-height:1.7">المنصة تتعلم من نتائج كل عقد. الأوزان تتعدل ذاتياً بعد انتهاء العقد.</div>
  </div>`;
  h+=`<div class="info-card"><div class="info-title">⚖️ أوزان المؤشرات</div>`;
  const labels={technical:'فني',delta:'ديلتا',iv:'IV',oi:'OI',volume:'حجم',spread:'سبريد',move:'حركة'};
  for(const[k,l]of Object.entries(labels)){const w=AI.weights[k]||1;const pct=Math.min(100,w/2.5*100);const col=w>=1.3?'var(--up)':w<=0.7?'var(--dn)':'var(--gd)';h+=`<div class="mem-bar"><div class="mem-bar-fill" style="width:${pct}%;background:${col}"></div><div class="mem-bar-text"><span>${l}</span><span style="font-family:monospace;color:${col}">×${w.toFixed(2)}</span></div></div>`;}
  h+='</div>';
  h+=`<div class="info-card"><div class="info-title">🎯 أوزان الاستراتيجيات</div>`;
  for(const k of Object.keys(STR_NAMES)){const w=AI.weights['strat_'+k]||1;const pct=Math.min(100,w/2.5*100);const col=w>=1.3?'var(--up)':w<=0.7?'var(--dn)':'var(--gd)';h+=`<div class="mem-bar"><div class="mem-bar-fill" style="width:${pct}%;background:${col}"></div><div class="mem-bar-text"><span>${STR_NAMES[k]}</span><span style="font-family:monospace;color:${col}">×${w.toFixed(2)}</span></div></div>`;}
  h+='</div>';
  h+=`<div class="info-card"><div class="info-title">📋 سجل التوصيات</div>`;
  const recent=[...AI.recs].slice(-15).reverse();
  if(!recent.length){h+='<div style="text-align:center;color:var(--t3);padding:20px;font-size:11px">لا توجد توصيات بعد<br><span style="font-size:9px;color:var(--t3)">اضغط "🧠 تتبع" على أي عقد لبدء التعلم</span></div>';}
  else{for(const r of recent){const cls=r.status==='win'?'win':r.status==='loss'?'loss':'pending';const lbl=r.status==='win'?'✓ فوز':r.status==='loss'?'✗ خسارة':'⏳ معلق';const dt=new Date(r.timestamp);h+=`<div class="rec-row" onclick="selStock('${r.symbol}');setView('home',document.querySelector('.bn-btn'))"><div><div style="font-weight:600;color:var(--bl);font-family:monospace">${r.symbol} ${r.type} ${r.strike}</div><div style="font-size:9px;color:var(--t3)">${dt.getMonth()+1}/${dt.getDate()} • Score ${r.score}</div></div><span class="rec-status ${cls}">${lbl}</span></div>`;}}
  h+='</div>';
  document.getElementById('memory-content').innerHTML=h;
}

/* CONTROLS */
function selStock(sym){
  G.sel=sym;buildMain();updateChart();buildTickers();
  if(G.tab==='signals'){buildSignals();buildContract();}
  else if(G.tab==='contract')buildContract();
  else if(G.tab==='greeks')buildGreeksM();
  else if(G.tab==='builder')buildBuilderM();
  else if(G.tab==='radar')buildRadar();
  else if(G.tab==='chat')buildChatM();
  else if(G.tab==='ai')buildAI();
  else if(G.tab==='info')buildInfoTab();
  if(!G.ld.has(sym)&&!G.ldg.has(sym))loadStock(sym).then(()=>{buildMain();updateChart();buildTickers();if(G.tab==='signals'){buildSignals();buildContract();}});
}
window.selStock=selStock;

function setHomeTab(tab,el){
  G.tab=tab;document.querySelectorAll('.tabs-bar .tab').forEach(t=>t.classList.remove('on'));el.classList.add('on');
  ['signals','contract','greeks','builder','radar','chat','ai','info'].forEach(t=>{
    const d=document.getElementById('ht-'+t);if(d)d.style.display='none';
  });
  const el2=document.getElementById('ht-'+tab);if(el2)el2.style.display='block';
  if(tab==='signals'){buildSignals();const c=document.getElementById('ht-contract');if(c)c.style.display='block';buildContract();}
  else if(tab==='contract')buildContract();
  else if(tab==='greeks')buildGreeksM();
  else if(tab==='builder')buildBuilderM();
  else if(tab==='radar')buildRadar();
  else if(tab==='chat')buildChatM();
  else if(tab==='ai')buildAI();
  else if(tab==='info')buildInfoTab();
}
window.setHomeTab=setHomeTab;

function calcFearGreedM(){
  let bu=0,be=0,tIV=0,ic=0;
  STKS.forEach(sym=>{const sc=G.sc[sym];if(!sc)return;if(sc.main==='شراء')bu++;else if(sc.main==='بيع')be++;const ind=G.ind[sym];if(ind&&ind.atr&&G.pr[sym]){tIV+=(ind.atr/G.pr[sym])*Math.sqrt(252)*100;ic++;}});
  const avgIV=ic>0?tIV/ic:30;const breadth=(bu+be)>0?bu/(bu+be)*100:50;
  let fg=50+(breadth-50)*0.6-(avgIV-25)*0.4;fg=Math.max(0,Math.min(100,Math.round(fg)));
  const label=fg>=80?'طمع مفرط 🤑':fg>=65?'طمع 😊':fg>=45?'محايد 😐':fg>=25?'خوف 😰':'خوف مفرط 😱';
  const color=fg>=70?'var(--up)':fg>=45?'var(--gd)':'var(--dn)';
  return{fg,label,color,avgIV:avgIV.toFixed(1),breadth:breadth.toFixed(0),bullish:bu,bearish:be};
}

function buildGreeksM(){
  const sym=G.sel,p=G.pr[sym],sc=G.sc[sym],ind=G.ind[sym],el=document.getElementById('ht-greeks');if(!el)return;
  if(!p||!sc||!ind){el.innerHTML='<div class="info-card" style="text-align:center;padding:20px;color:var(--t3)">يحتاج بيانات...</div>';return;}
  const fg=calcFearGreedM();const hv=ind.atr?(ind.atr/p)*Math.sqrt(252)*100:30;
  const da=sc.main==='شراء'?0.3+sc.str/200:sc.main==='بيع'?-(0.3+sc.str/200):0;
  const dC=da>0?'var(--up)':da<0?'var(--dn)':'var(--t3)';
  const dT=da>0.3?'متفائل 🚀':da>0?'شرائي 📈':da<-0.3?'تحوط ⚠️':da<0?'بيعي 📉':'محايد';
  const fgA=-90+(fg.fg/100)*180;
  el.innerHTML=`<div class="info-card"><div class="info-title">📊 الخوف والطمع</div>
    <div style="text-align:center;margin:8px 0"><svg width="150" height="80" viewBox="0 0 150 80"><defs><linearGradient id="fgm" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="var(--dn)"/><stop offset="50%" stop-color="var(--gd)"/><stop offset="100%" stop-color="var(--up)"/></linearGradient></defs><path d="M 12 75 A 63 63 0 0 1 138 75" fill="none" stroke="url(#fgm)" stroke-width="9" stroke-linecap="round"/><line x1="75" y1="75" x2="75" y2="18" stroke="var(--t1)" stroke-width="2" stroke-linecap="round" transform="rotate(${fgA},75,75)"/><circle cx="75" cy="75" r="4" fill="var(--t1)"/></svg></div>
    <div style="text-align:center;font-size:26px;font-weight:900;color:${fg.color};font-family:monospace">${fg.fg}</div>
    <div style="text-align:center;font-size:12px;font-weight:700;color:${fg.color};margin-bottom:8px">${fg.label}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;font-size:9px;color:var(--t3)">
      <div style="text-align:center">IV<br><b style="color:var(--t1)">${fg.avgIV}%</b></div>
      <div style="text-align:center">اتساع<br><b style="color:var(--t1)">${fg.breadth}%</b></div>
      <div style="text-align:center">صعود/هبوط<br><b style="color:var(--up)">${fg.bullish}</b>/<b style="color:var(--dn)">${fg.bearish}</b></div>
    </div></div>
    <div class="info-card"><div class="info-title">Δ يونانيات ${sym}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0">
      <div style="text-align:center;padding:8px;background:rgba(0,0,0,.2);border-radius:6px"><div style="font-size:9px;color:var(--t3)">Δ Delta</div><div style="font-size:20px;font-weight:800;color:${dC};font-family:monospace">${da>0?'+':''}${da.toFixed(2)}</div><div style="font-size:9px;color:var(--t2)">${dT}</div></div>
      <div style="text-align:center;padding:8px;background:rgba(0,0,0,.2);border-radius:6px"><div style="font-size:9px;color:var(--t3)">Vega</div><div style="font-size:20px;font-weight:800;color:${hv>35?'var(--dn)':'var(--gd)'};font-family:monospace">${hv.toFixed(1)}%</div><div style="font-size:9px;color:var(--t2)">${hv>35?'مرتفع':'طبيعي'}</div></div>
    </div></div>`;
}

function buildBuilderM(){
  const sym=G.sel,p=G.pr[sym],sc=G.sc[sym],ind=G.ind[sym],el=document.getElementById('ht-builder');if(!el)return;
  if(!p||!sc){el.innerHTML='<div class="info-card" style="text-align:center;padding:20px;color:var(--t3)">اختر سهم</div>';return;}
  const hv=ind?.atr?(ind.atr/p)*Math.sqrt(252):0.30;const isC=sc.main==='شراء'||sc.main==='محايد';
  const step=p<50?1:p<200?2.5:p<500?5:10;const K=Math.round(p/step)*step;const T=7/365;
  const N2=(x)=>{const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,pp=0.3275911;const s=x<0?-1:1;x=Math.abs(x)/Math.sqrt(2);const t=1/(1+pp*x);const y=1-(((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);return 0.5*(1+s*y);};
  const r=0.05,d1=(Math.log(p/K)+(r+hv*hv/2)*T)/(hv*Math.sqrt(T)),d2=d1-hv*Math.sqrt(T);
  const pr=isC?Math.max(0.01,p*N2(d1)-K*Math.exp(-r*T)*N2(d2)):Math.max(0.01,K*Math.exp(-r*T)*N2(-d2)-p*N2(-d1));
  const be=isC?K+pr:K-pr;const dl=isC?N2(d1):N2(d1)-1;
  el.innerHTML=`<div class="info-card"><div class="info-title">📐 محاكي — ${sym} ${isC?'CALL ▲':'PUT ▼'} $${K}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0">
      <div style="text-align:center;padding:8px;background:rgba(0,0,0,.2);border-radius:6px"><div style="font-size:9px;color:var(--t3)">تكلفة العقد</div><div style="font-size:16px;font-weight:800;color:var(--cy);font-family:monospace">$${pr.toFixed(2)}</div></div>
      <div style="text-align:center;padding:8px;background:rgba(0,0,0,.2);border-radius:6px"><div style="font-size:9px;color:var(--t3)">نقطة التعادل</div><div style="font-size:16px;font-weight:800;color:var(--gd);font-family:monospace">$${be.toFixed(2)}</div></div>
      <div style="text-align:center;padding:8px;background:rgba(0,0,0,.2);border-radius:6px"><div style="font-size:9px;color:var(--t3)">أقصى خسارة</div><div style="font-size:16px;font-weight:800;color:var(--dn);font-family:monospace">-$${pr.toFixed(2)}</div></div>
      <div style="text-align:center;padding:8px;background:rgba(0,0,0,.2);border-radius:6px"><div style="font-size:9px;color:var(--t3)">Delta</div><div style="font-size:16px;font-weight:800;font-family:monospace">${dl.toFixed(3)}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:10px">
      <div style="padding:6px;background:rgba(0,0,0,.1);border-radius:4px"><span style="color:var(--t3)">IV:</span> <b style="color:var(--gd)">${(hv*100).toFixed(1)}%</b></div>
      <div style="padding:6px;background:rgba(0,0,0,.1);border-radius:4px"><span style="color:var(--t3)">100 سهم:</span> <b style="color:var(--cy)">$${(pr*100).toFixed(0)}</b></div>
    </div></div>`;
}

function buildChatM(){
  const el=document.getElementById('ht-chat');if(!el)return;if(el.querySelector('#chat-msgs-m'))return;
  el.innerHTML=`<div style="display:flex;flex-direction:column;min-height:280px">
    <div id="chat-msgs-m" style="flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:8px;min-height:200px">
      <div style="align-self:flex-start;background:var(--c3);border:1px solid var(--bd);padding:8px 10px;border-radius:8px;font-size:11px;line-height:1.6;max-width:90%">مرحباً! اسألني 💬
        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">
          <button onclick="chatAskM('أفضل 3 أسهم سيولة')" style="background:var(--c2);border:1px solid var(--bd);color:var(--bl);padding:4px 8px;border-radius:4px;font-size:9px;cursor:pointer;font-family:inherit">💰 سيولة</button>
          <button onclick="chatAskM('أقوى عقد أسبوعي')" style="background:var(--c2);border:1px solid var(--bd);color:var(--bl);padding:4px 8px;border-radius:4px;font-size:9px;cursor:pointer;font-family:inherit">⚡ أقوى عقد</button>
          <button onclick="chatAskM('خوف أم طمع')" style="background:var(--c2);border:1px solid var(--bd);color:var(--bl);padding:4px 8px;border-radius:4px;font-size:9px;cursor:pointer;font-family:inherit">😰 خوف/طمع</button>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:4px;padding:8px;border-top:1px solid var(--bd)">
      <input id="chat-input-m" type="text" placeholder="اسأل عن أي سهم..." style="flex:1;background:var(--c3);border:1px solid var(--bd);color:var(--t1);padding:8px;border-radius:6px;font:inherit;font-size:11px" onkeypress="if(event.key==='Enter')chatSendM()">
      <button onclick="chatSendM()" style="background:linear-gradient(135deg,var(--pu),var(--pm));color:#fff;border:none;padding:8px 14px;border-radius:6px;cursor:pointer;font:inherit;font-size:11px;font-weight:700">إرسال</button>
    </div>
  </div>`;
}
function chatAskM(q){document.getElementById('chat-input-m').value=q;chatSendM();}
async function chatSendM(){
  const inp=document.getElementById('chat-input-m');const q=inp.value.trim();if(!q)return;inp.value='';
  const msgs=document.getElementById('chat-msgs-m');
  msgs.innerHTML+=`<div style="align-self:flex-end;background:rgba(74,158,255,.12);border:1px solid rgba(74,158,255,.2);padding:8px;border-radius:8px;font-size:11px;max-width:90%">${q}</div>`;
  msgs.innerHTML+=`<div id="chat-ld-m" style="padding:8px;font-size:10px;color:var(--t3)">جاري التحليل...</div>`;
  msgs.scrollTop=msgs.scrollHeight;
  const sym=G.sel,sc=G.sc[sym],p=G.pr[sym];
  const ctx='السهم: '+sym+' $'+(p?.toFixed(2)||'?')+' '+(sc?.main||'?');
  const prompt='أنت مساعد تحليل فني للعقود الأسبوعية. أجب بالعربية بإيجاز.\n'+ctx+'\nسؤال: '+q;
  try{const r=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,max_tokens:500})});
    const d=await r.json();const txt=d.ok?d.text:(d.errorMsg||'تعذر');
    const fmt=String(txt).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
    document.getElementById('chat-ld-m').outerHTML=`<div style="align-self:flex-start;background:var(--c3);border:1px solid var(--bd);padding:8px;border-radius:8px;font-size:11px;line-height:1.6;max-width:92%">${fmt}</div>`;
  }catch(e){document.getElementById('chat-ld-m').outerHTML='<div style="color:var(--dn);font-size:10px;padding:8px">⚠ '+e.message+'</div>';}
  msgs.scrollTop=msgs.scrollHeight;
}
window.chatAskM=chatAskM;window.chatSendM=chatSendM;

function setTF(range,interval,el){
  G.tf=range;G.tfi=interval;
  document.querySelectorAll('.tf').forEach(t=>t.classList.remove('on'));el.classList.add('on');
  delete G.cans[G.sel];G.ld.delete(G.sel);G.ldg.delete(G.sel);
  loadStock(G.sel,range,interval).then(()=>{updateChart();if(G.tab==='signals')buildSignals();});
}
window.setTF=setTF;

function setView(v,el){
  G.view=v;
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('on'));
  document.getElementById('view-'+v).classList.add('on');
  document.querySelectorAll('.bn-btn').forEach(b=>b.classList.remove('on'));
  if(el)el.classList.add('on');
  if(v==='watch')buildWatch();
  else if(v==='memory')buildMemory();
  else if(v==='settings'){document.getElementById('set-stocks').textContent=STKS.length;document.getElementById('set-loaded').textContent=G.ld.size;document.getElementById('set-total').textContent=AI.stats.total;document.getElementById('set-pending').textContent=AI.stats.pending;document.getElementById('set-wr').textContent=getWR()+'%';}
  else if(v==='contracts'&&!G.opt.length)renderOptList();
}
window.setView=setView;
window.AI_KEY=AI_KEY;

/* ═══ MOBILE GREEKS / FEAR-GREED ═══ */
function calcFearGreedM(){
  let bullish=0,bearish=0,totalIV=0,ivC=0;
  for(const sym of STKS){const sc=G.sc[sym];if(!sc)continue;if(sc.main==='شراء')bullish++;else if(sc.main==='بيع')bearish++;const ind=G.ind[sym];if(ind&&ind.atr){totalIV+=(ind.atr/(G.pr[sym]||1))*Math.sqrt(252)*100;ivC++;}}
  const avgIV=ivC>0?totalIV/ivC:30;const breadth=(bullish+bearish)>0?bullish/(bullish+bearish)*100:50;
  let fg=50+(breadth-50)*0.6-(avgIV-25)*0.4;fg=Math.max(0,Math.min(100,Math.round(fg)));
  const label=fg>=80?'طمع مفرط 🤑':fg>=65?'طمع 😊':fg>=45?'محايد 😐':fg>=25?'خوف 😰':'خوف مفرط 😱';
  const color=fg>=70?'var(--up)':fg>=45?'var(--gd)':'var(--dn)';
  return{fg,label,color,avgIV:avgIV.toFixed(1),breadth:breadth.toFixed(0),bullish,bearish};
}

function buildGreeksM(){
  const sym=G.sel,p=G.pr[sym],sc=G.sc[sym],ind=G.ind[sym];
  const el=document.getElementById('ht-greeks');
  if(!p||!sc||!ind){el.innerHTML='<div class="info-card"><div style="text-align:center;color:var(--t3);padding:20px">يحتاج بيانات — اختر سهم</div></div>';return;}
  const fg=calcFearGreedM();
  const hv=ind.atr?(ind.atr/p)*Math.sqrt(252)*100:30;
  const deltaAgg=sc.main==='شراء'?0.3+sc.str/200:sc.main==='بيع'?-(0.3+sc.str/200):0;
  const fgAngle=-90+(fg.fg/100)*180;
  let h=`<div class="info-card">
    <div class="info-title">📊 مؤشر الخوف والطمع</div>
    <div style="text-align:center;margin:10px 0">
      <svg width="160" height="85" viewBox="0 0 160 85">
        <defs><linearGradient id="fgG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="var(--dn)"/><stop offset="50%" stop-color="var(--gd)"/><stop offset="100%" stop-color="var(--up)"/></linearGradient></defs>
        <path d="M 10 80 A 70 70 0 0 1 150 80" fill="none" stroke="url(#fgG)" stroke-width="10" stroke-linecap="round"/>
        <line x1="80" y1="80" x2="80" y2="15" stroke="var(--t1)" stroke-width="2.5" stroke-linecap="round" transform="rotate(${fgAngle},80,80)"/>
        <circle cx="80" cy="80" r="5" fill="var(--t1)"/>
      </svg>
      <div style="font-size:28px;font-weight:900;color:${fg.color};font-family:monospace;margin-top:4px">${fg.fg}</div>
      <div style="font-size:12px;font-weight:700;color:${fg.color}">${fg.label}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;font-size:10px;text-align:center;margin-top:8px">
      <div style="padding:6px;background:var(--c3);border-radius:4px"><div style="color:var(--t3);font-size:9px">IV متوسط</div><div style="font-weight:700">${fg.avgIV}%</div></div>
      <div style="padding:6px;background:var(--c3);border-radius:4px"><div style="color:var(--t3);font-size:9px">اتساع</div><div style="font-weight:700">${fg.breadth}%</div></div>
      <div style="padding:6px;background:var(--c3);border-radius:4px"><div style="color:var(--t3);font-size:9px">صعود/هبوط</div><div><span style="color:var(--up)">${fg.bullish}</span>/<span style="color:var(--dn)">${fg.bearish}</span></div></div>
    </div>
  </div>`;
  const dCol=deltaAgg>0?'var(--up)':deltaAgg<0?'var(--dn)':'var(--t3)';
  h+=`<div class="info-card">
    <div class="info-title">Δ ملخص اليونانيات — ${sym}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
      <div style="text-align:center;padding:8px;background:var(--c3);border-radius:5px">
        <div style="font-size:9px;color:var(--t3)">Δ Delta الإجمالي</div>
        <div style="font-size:20px;font-weight:800;color:${dCol};font-family:monospace">${deltaAgg>0?'+':''}${deltaAgg.toFixed(2)}</div>
        <div style="font-size:9px;color:${dCol}">${deltaAgg>0.3?'متفائل 🚀':deltaAgg>0?'ميول شرائية':deltaAgg<-0.3?'تحوط ⚠️':'ميول بيعية'}</div>
      </div>
      <div style="text-align:center;padding:8px;background:var(--c3);border-radius:5px">
        <div style="font-size:9px;color:var(--t3)">Vega التقلب</div>
        <div style="font-size:20px;font-weight:800;color:${hv>35?'var(--dn)':'var(--gd)'};font-family:monospace">${hv.toFixed(1)}%</div>
        <div style="font-size:9px;color:var(--t2)">${hv>35?'مرتفع — تحوط':hv<20?'منخفض — هدوء':'طبيعي'}</div>
      </div>
    </div>
  </div>`;
  el.innerHTML=h;
}
window.buildGreeksM=buildGreeksM;

/* ═══ MOBILE STRATEGY BUILDER ═══ */
function buildBuilderM(){
  const sym=G.sel,p=G.pr[sym],sc=G.sc[sym],ind=G.ind[sym];
  const el=document.getElementById('ht-builder');
  if(!p||!sc){el.innerHTML='<div class="info-card"><div style="text-align:center;color:var(--t3);padding:20px">اختر سهم أولاً</div></div>';return;}
  const hv=ind?.atr?(ind.atr/p)*Math.sqrt(252):0.30;
  const isCall=sc.main==='شراء'||sc.main==='محايد';
  const step=p<50?1:p<200?2.5:5;
  const strike=Math.round(p/step)*step;
  const T=7/365;
  const N=(x)=>{const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,pp=0.3275911;const s=x<0?-1:1;x=Math.abs(x)/Math.sqrt(2);const t=1/(1+pp*x);const y=1-(((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);return 0.5*(1+s*y);};
  const r=0.05,d1=(Math.log(p/strike)+(r+hv*hv/2)*T)/(hv*Math.sqrt(T)),d2=d1-hv*Math.sqrt(T);
  const premium=isCall?Math.max(0.01,p*N(d1)-strike*Math.exp(-r*T)*N(d2)):Math.max(0.01,strike*Math.exp(-r*T)*N(-d2)-p*N(-d1));
  const delta=isCall?N(d1):N(d1)-1;
  const be=isCall?strike+premium:strike-premium;
  const roiMax=isCall?'غير محدود':`$${(strike-premium).toFixed(2)}`;
  let h=`<div class="info-card">
    <div class="info-title">📐 محاكي الصفقة — ${sym} ${isCall?'CALL ▲':'PUT ▼'} $${strike}</div>
    <div style="font-size:10px;color:var(--t3);margin-bottom:8px">بناءً على التحليل الفني • انتهاء 7 أيام</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px">
      <div style="text-align:center;padding:6px;background:var(--c3);border-radius:4px"><div style="font-size:8px;color:var(--t3)">تكلفة</div><div style="font-size:13px;font-weight:800;color:var(--cy);font-family:monospace">$${premium.toFixed(2)}</div></div>
      <div style="text-align:center;padding:6px;background:var(--c3);border-radius:4px"><div style="font-size:8px;color:var(--t3)">تعادل</div><div style="font-size:13px;font-weight:800;color:var(--gd);font-family:monospace">$${be.toFixed(2)}</div></div>
      <div style="text-align:center;padding:6px;background:var(--c3);border-radius:4px"><div style="font-size:8px;color:var(--t3)">أقصى خسارة</div><div style="font-size:13px;font-weight:800;color:var(--dn);font-family:monospace">-$${premium.toFixed(2)}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
      <div style="text-align:center;padding:6px;background:var(--c3);border-radius:4px"><div style="font-size:8px;color:var(--t3)">أقصى ربح</div><div style="font-size:11px;font-weight:700;color:var(--up)">${roiMax}</div></div>
      <div style="text-align:center;padding:6px;background:var(--c3);border-radius:4px"><div style="font-size:8px;color:var(--t3)">Delta</div><div style="font-size:11px;font-weight:700;font-family:monospace">${delta.toFixed(3)}</div></div>
      <div style="text-align:center;padding:6px;background:var(--c3);border-radius:4px"><div style="font-size:8px;color:var(--t3)">IV</div><div style="font-size:11px;font-weight:700;font-family:monospace">${(hv*100).toFixed(1)}%</div></div>
    </div>
    <div style="margin-top:10px;padding:6px;background:rgba(240,68,88,.06);border:1px solid rgba(240,68,88,.2);border-radius:4px;font-size:9px;color:var(--t2);line-height:1.6">
      ⚠️ تكلفة $${(premium*100).toFixed(0)} لكل عقد (100 سهم) • لا تخاطر بأكثر من 2% من المحفظة
    </div>
  </div>`;
  el.innerHTML=h;
}
window.buildBuilderM=buildBuilderM;

/* ═══ MOBILE AI CHAT ═══ */
function buildChatM(){
  const el=document.getElementById('ht-chat');
  if(el.querySelector('.chat-msgs'))return;
  el.innerHTML=`<div style="display:flex;flex-direction:column;min-height:400px">
    <div class="chat-msgs" id="m-chat-msgs" style="flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:8px;min-height:300px">
      <div class="chat-msg bot" style="background:var(--c3);border:1px solid var(--bd);padding:8px 10px;border-radius:8px;font-size:11px;line-height:1.6;align-self:flex-start;max-width:90%">
        مرحباً! اسألني أي شيء 💬
        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px">
          <button onclick="mChatAsk('أفضل 3 أسهم عليها سيولة')" style="background:var(--c2);border:1px solid var(--bd);color:var(--bl);padding:4px 8px;border-radius:4px;font:inherit;font-size:9px;cursor:pointer">💰 أفضل سيولة</button>
          <button onclick="mChatAsk('أقوى عقد أسبوعي')" style="background:var(--c2);border:1px solid var(--bd);color:var(--bl);padding:4px 8px;border-radius:4px;font:inherit;font-size:9px;cursor:pointer">⚡ أقوى عقد</button>
          <button onclick="mChatAsk('هل السوق خوف أم طمع')" style="background:var(--c2);border:1px solid var(--bd);color:var(--bl);padding:4px 8px;border-radius:4px;font:inherit;font-size:9px;cursor:pointer">😰 خوف/طمع</button>
          <button onclick="mChatAsk('حلل ${G.sel}')" style="background:var(--c2);border:1px solid var(--bd);color:var(--bl);padding:4px 8px;border-radius:4px;font:inherit;font-size:9px;cursor:pointer">📊 حلل ${G.sel}</button>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:6px;padding:8px;border-top:1px solid var(--bd);background:var(--c1)">
      <input id="m-chat-input" type="text" placeholder="اسأل عن أي سهم..." onkeypress="if(event.key==='Enter')mChatSend()" style="flex:1;background:var(--c3);border:1px solid var(--bd);color:var(--t1);padding:8px 12px;border-radius:6px;font:inherit;font-size:11px">
      <button onclick="mChatSend()" style="background:linear-gradient(135deg,var(--pu),var(--pm));color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font:inherit;font-size:11px;font-weight:700">إرسال</button>
    </div>
  </div>`;
}
function mChatAsk(q){document.getElementById('m-chat-input').value=q;mChatSend();}
async function mChatSend(){
  const inp=document.getElementById('m-chat-input');const q=inp.value.trim();if(!q)return;inp.value='';
  const msgs=document.getElementById('m-chat-msgs');
  msgs.innerHTML+=`<div style="background:rgba(74,158,255,.12);border:1px solid rgba(74,158,255,.2);padding:8px 10px;border-radius:8px;font-size:11px;align-self:flex-end;max-width:85%">${q}</div>`;
  msgs.innerHTML+=`<div id="m-chat-ld" style="background:var(--c3);border:1px solid var(--bd);padding:8px 10px;border-radius:8px;font-size:11px;align-self:flex-start"><div class="ai-dots"><span></span><span></span><span></span></div></div>`;
  msgs.scrollTop=msgs.scrollHeight;
  const topS=STKS.filter(s=>G.sc[s]).slice(0,20).map(s=>`${s}:$${G.pr[s]?.toFixed(0)||'?'} ${G.sc[s]?.main||'?'}`).join('|');
  const fg=calcFearGreedM();const sym=G.sel,sc=G.sc[sym],p=G.pr[sym];
  const ctx=`السهم: ${sym} $${p?.toFixed(2)||'?'} ${sc?.main||'?'} Score:${sc?.str||'?'}\\nخوف/طمع: ${fg.fg} (${fg.label})`;
  const prompt=`أنت مساعد لمحلل فني خبير بالعقود الأمريكية. أجب بإيجاز بالعربية (3-5 أسطر).\\n${ctx}\\nسؤال: ${q}`;
  try{
    const r=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,max_tokens:600})});
    const d=await r.json();const txt=d.ok?d.text:(d.errorMsg||'خطأ');
    const fmt=String(txt).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
    document.getElementById('m-chat-ld').outerHTML=`<div style="background:var(--c3);border:1px solid var(--bd);padding:8px 10px;border-radius:8px;font-size:11px;line-height:1.6;align-self:flex-start;max-width:90%">${fmt}</div>`;
  }catch(e){document.getElementById('m-chat-ld').outerHTML=`<div style="color:var(--dn);padding:8px;font-size:10px">⚠ ${e.message}</div>`;}
  msgs.scrollTop=msgs.scrollHeight;
}
window.mChatAsk=mChatAsk;window.mChatSend=mChatSend;window.buildChatM=buildChatM;window.buildGreeksM=buildGreeksM;window.buildBuilderM=buildBuilderM;

// Font size control
let _fontScale = parseInt(localStorage.getItem('tadawul_font_scale') || '100');
function setFontSize(dir) {
  if (dir === 0) _fontScale = 100;
  else _fontScale = Math.max(80, Math.min(150, _fontScale + dir * 10));
  localStorage.setItem('tadawul_font_scale', _fontScale);
  document.body.style.fontSize = (_fontScale / 100 * 11) + 'px';
  const lbl = document.getElementById('font-size-label');
  if (lbl) lbl.textContent = _fontScale + '%';
}
window.setFontSize = setFontSize;
// Apply saved font size on load
(function(){ const s = parseInt(localStorage.getItem('tadawul_font_scale') || '100'); if(s !== 100) { _fontScale = s; document.body.style.fontSize = (s / 100 * 11) + 'px'; } })();

/* INIT */
async function init(){
  initChart();
  buildTickers();buildMain();updateMarket();updateAIBadge();
  buildSignals();
  // Auto-load contract in home view
  setTimeout(() => buildContract(), 500);
  // load priority stocks
  await Promise.allSettled(PRI.slice(0,5).map(s=>loadStock(s)));
  buildTickers();buildMain();updateChart();buildSignals();
  await Promise.allSettled(PRI.slice(5).map(s=>loadStock(s)));
  buildTickers();
  // background load remaining
  setTimeout(async()=>{const rest=STKS.filter(s=>!PRI.includes(s));for(let i=0;i<rest.length;i+=4){await Promise.allSettled(rest.slice(i,i+4).map(s=>loadStock(s)));await new Promise(r=>setTimeout(r,400));buildTickers();}},2500);
  setInterval(updateMarket,5000);
  setInterval(settlePending,60000);
  setTimeout(settlePending,8000);
}
window.addEventListener('load',init);
