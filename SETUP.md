# تشغيل مسار أونلاين — دليل خطوة بخطوة

ده كل اللي محتاج تعمله **مرة واحدة** عشان مسار يشتغل على الدومين بتاعك بالحسابات والاشتراكات والدفع والإيميلات ولوحة الأدمن.
كل الخدمات هنا ليها خطط مجانية؛ الحاجة الوحيدة المدفوعة هي **الدومين**. (الأسعار والحدود بتتغير، اتأكد منها على مواقعهم.)

```
العميل ──> مسار (Cloudflare Pages: masar.html + admin.html)
             │  تسجيل / اشتراك / تمبليتس
             ▼
         Supabase (قاعدة البيانات + الحسابات + الدوال)
             ├── Paymob  ← الدفع (فيزا / محافظ / فوري)
             └── الإيميلات: Brevo → Mailjet → Resend → Amazon SES (لو واحد خلص أو وقع ينقل للي بعده)
GitHub ──> أي تعديل على main بيتنشر لوحده (الموقع + السيرفر)
```

---

## 1) Supabase (السيرفر)

1. اعمل حساب في supabase.com ← **New project**. اكتب **Database password** واحفظه.
2. من **Project Settings › General** خد **Reference ID** (زي `abcd1234`).
3. من **Project Settings › API** خد **Project URL** و **anon public key** وحطهم في ملف `masar-config.js`:
   ```js
   window.MASAR_CLOUD_CONFIG = { url: 'https://abcd1234.supabase.co', key: 'eyJhbGciOi...' };
   ```
   مفتاح الـ anon معمول عشان يبقى في البرنامج. **عمرك ما تحط مفتاح `service_role` هنا.**
4. من صورة حسابك فوق ← **Account › Access Tokens** ← اعمل توكن واحفظه.

## 2) GitHub (النشر التلقائي)

في الريبو: **Settings › Secrets and variables › Actions**:

| النوع | الاسم | القيمة |
|---|---|---|
| Variable | `SUPABASE_PROJECT_REF` | الـ Reference ID |
| Variable | `SUPABASE_URL` | الـ Project URL |
| Secret | `SUPABASE_ACCESS_TOKEN` | التوكن من خطوة 1.4 |
| Secret | `SUPABASE_DB_PASSWORD` | باسورد قاعدة البيانات |
| Secret | `CRON_SECRET` | أي كلمة سر طويلة إنت تختارها |

بعدها: **Actions › Deploy Masar server › Run workflow**. ده بيعمل كل الجداول وقواعد الأمان والدوال على Supabase.
من بعد كده أي تعديل في فولدر `supabase/` على فرع `main` بيتنشر لوحده.

> ملاحظة: الـ workflows بتشتغل على الفرع الافتراضي (`main`). لو الشغل لسه على فرع تاني اعمل Pull Request ودمجه في `main`.

## 3) أسرار الدوال (Supabase › Edge Functions › Secrets)

| الاسم | إيه هو |
|---|---|
| `APP_URL` | رابط مسار، زي `https://masar.app` |
| `CRON_SECRET` | نفس اللي حطيته في GitHub |
| `MAIL_FROM` / `MAIL_FROM_NAME` | الإيميل اللي بتبعت منه (زي `no-reply@masar.app`) والاسم `Masar` |
| `BREVO_API_KEY` | من Brevo (خطوة 6) |
| `MAILJET_API_KEY` / `MAILJET_SECRET_KEY` | اختياري، احتياطي تاني |
| `RESEND_API_KEY` | اختياري، احتياطي تالت |
| `SES_ACCESS_KEY_ID` / `SES_SECRET_ACCESS_KEY` / `SES_REGION` | اختياري: Amazon SES بالدفع حسب الاستخدام لو كل المجاني خلص |
| `BREVO_DAILY` / `MAILJET_DAILY` / `RESEND_DAILY` | اختياري: لو رقّيت باقة، اكتب الحد اليومي الجديد (الافتراضي 300 / 200 / 100) |
| `SEND_EMAIL_HOOK_SECRET` | من خطوة 4 |
| `PAYMOB_SECRET_KEY` / `PAYMOB_PUBLIC_KEY` / `PAYMOB_HMAC` / `PAYMOB_INTEGRATION_IDS` | من Paymob (خطوة 7). الـ integration IDs مفصولة بفاصلة، زي `123456,654321` |

## 4) تسجيل الدخول والإيميلات (Supabase › Authentication)

1. **Providers › Email**: شغال، و **Confirm email** شغال.
2. **URL Configuration**: Site URL = `https://masar.app`، وفي Redirect URLs ضيف `https://masar.app/**`.
3. **Hooks › Send Email hook**: اختار **HTTPS** واكتب `https://<ref>.supabase.co/functions/v1/send-email`، واعمل **Generate secret** وانسخه في `SEND_EMAIL_HOOK_SECRET`.
   كده كل إيميلات التسجيل ونسيت الباسورد بتعدي على الموزّع (Brevo ← Mailjet ← Resend ← SES) ومش بتقف.
4. **Rate Limits**: ارفع حد الإيميلات في الساعة للرقم اللي يناسبك.

## 5) الدخول بجوجل (مجاني)

1. في console.cloud.google.com ← **APIs & Services › OAuth consent screen** (External) ← بعدها **Credentials › Create OAuth client ID › Web application**.
2. **Authorized redirect URI**: `https://<ref>.supabase.co/auth/v1/callback`
3. انسخ الـ Client ID والـ Secret في **Supabase › Authentication › Providers › Google** وفعّله.

## 6) الإيميلات (Brevo مجاني، والباقي احتياطي)

1. اعمل حساب Brevo ← **Senders, Domains** ← ضيف الدومين بتاعك واعمل سجلات الـ DNS اللي بيطلبها (SPF و DKIM) في Cloudflare. ده بيمنع الإيميلات تروح Spam.
2. **SMTP & API › API Keys** ← اعمل مفتاح وحطه في `BREVO_API_KEY`.
3. اختياري: نفس الكلام في Mailjet و Resend. واختياري Amazon SES (محتاج تخرج من الـ sandbox بطلب من AWS).

## 7) الدفع (Paymob)

1. افتح حساب تاجر في Paymob (هيطلبوا أوراق النشاط). ابدأ بـ **Test mode**.
2. من الداشبورد خد: **Secret key** و **Public key** و **HMAC** (من Settings › Account Info) و **Integration IDs** لكل طريقة دفع (كارت، محافظ، فوري).
3. في إعدادات كل integration:
   - **Transaction processed callback** = `https://<ref>.supabase.co/functions/v1/paymob-webhook`
   - **Transaction response callback** = `https://masar.app/?paid=1`
4. **اتأكد من دول مع Paymob** (أنا بنيتهم من الحزمة الرسمية والمعلومات المتاحة، بس موقع الدوكيومنتيشن مكانش متاح من عندي):
   - إن `amount` في Create Intention بالقرش (99 جنيه = 9900).
   - إن ترتيب حقول الـ HMAC هو اللي في `supabase/functions/_shared/paymob.ts` (`HMAC_KEYS`).
   - إن الـ `special_reference` بيرجع في `order.merchant_order_id`.
   اعمل دفعة تجريبية، وشوفها في لوحة الأدمن (Payments) ومن غير ما تتأكد متشغلش الدفع الحقيقي.

## 8) الموقع (Cloudflare Pages — مجاني)

1. Cloudflare ← **Workers & Pages › Create › Pages › Connect to Git** ← اختار الريبو.
2. **Production branch**: `main` · **Build command**: `bash build.sh` · **Output directory**: `dist`
3. **Custom domains** ← ضيف الدومين بتاعك.
4. أي فرع تاني غير `main` بياخد **رابط معاينة** لوحده، فتشوف التعديل قبل ما ينزل للعملاء.

مسار بيتسطب كبرنامج (PWA) من Chrome / Edge، وبيشتغل من غير نت، وبيفتح ملفات `.masar` من الكمبيوتر ويحفظ فيها على طول.

## 9) أول أدمن (إنت)

1. افتح مسار على الدومين واعمل حساب بإيميلك.
2. **Supabase › SQL Editor** وشغّل:
   ```sql
   update public.profiles set is_admin = true where email = 'إيميلك@example.com';
   ```
3. افتح `https://masar.app/admin.html` ← **Plans & trial**: حط مدة التجربة وسعر الشهري والسنوي. (السعر 0 = الخطة مخفية.)
4. **Templates**: اسحب ملفات SVG أو `.masar` مرة واحدة، اكتب لكل واحد اسم وتصنيف، واضغط Published.

## 10) التعديلات بعد كده (أوتوماتيك)

- **الطريقة العادية:** افتح جلسة Claude Code على الريبو واطلب التعديل. التعديل بيتعمل على فرع ← Cloudflare يديك رابط معاينة ← لو تمام ادمج الـ Pull Request في `main` ← الموقع والسيرفر بيتحدثوا لوحدهم.
- **من GitHub مباشرة (اختياري):** اكتب Issue واكتب فيه `@claude` والمطلوب. Claude بيعمل Pull Request لوحده. محتاج Secret اسمه `CLAUDE_CODE_OAUTH_TOKEN` (من أمر `claude setup-token`)، وبيستهلك من خطة Claude بتاعتك. الأمر ده شغال لصاحب الريبو بس.
- **الأمان:** كل push بيشغّل الاختبارات (`Masar tests`)؛ لو حاجة اتكسرت هتشوف علامة حمرا قبل ما تدمج.

## الحدود والتكلفة

| الخدمة | المجاني (تقريباً) | لما تكبر |
|---|---|---|
| Supabase | 500 MB قاعدة بيانات، ~50 ألف مستخدم نشط في الشهر، بيقف بعد أسبوع من غير استخدام | Pro حوالي 25$ في الشهر |
| Cloudflare Pages | استضافة وبيانات من غير حد عملي للموقع | — |
| Brevo / Mailjet / Resend | ~300 / ~200 / ~100 إيميل في اليوم | Amazon SES ~1$ لكل 10 آلاف |
| GitHub Actions | مجاني للريبو العام؛ الخاص ليه دقائق مجانية في الشهر | — |
| Paymob | من غير اشتراك؛ نسبة من كل عملية | — |
| الدومين | مدفوع (~10–15$ في السنة) | — |

لوحة الأدمن (Dashboard) بتوريك قد إيه قربت من حدود قاعدة البيانات والإيميلات.

## الاختبارات

`bash tests/ci.sh` (أو تلقائي على GitHub): سيرفر الدفع والإيميلات (`tests/server.mjs`)، قواعد الأمان على Postgres حقيقي (`tests/cloudsql.mjs`)، الاشتراكات (`tests/sub.js`)، الكلاود (`tests/cloud.js`)، لوحة الأدمن (`tests/admin.js`)، البرنامج كتطبيق (`tests/pwa.js`)، وغيرهم.
