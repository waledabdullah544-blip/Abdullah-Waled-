# مسار — جرد الفروقات والنواقص مقارنةً بـ Illustrator (build 159)

> طريقة الجرد: قايمة الأدوات والمنيوهات والبانلز والاختصارات اتطلّعت **من كود `masar.html` نفسه** (مش من الذاكرة)، وقورنت بتصميم Illustrator.
> قسم "أخطاء الأدوات الموجودة" مبني على: (1) قراءة الكود، (2) قايمة "Known remaining differences" في ملف HANDOFF.
> **لسه ماتعملش اختبار سلوك فعلي لكل أداة** — ده بيتعمل في كل مرحلة قبل ما نبدأ فيها (اختبار Playwright بماوس وكيبورد حقيقي + مقارنة بتوثيق Adobe).

---

## 1) الأدوات الموجودة فعلاً (وهي كاملة العدد في مجموعاتها)

| المجموعة | الموجود |
|---|---|
| Selection | Selection, Direct Selection, Group Selection, Magic Wand, Lasso |
| Pen | Pen, Add/Delete Anchor, Anchor Point, Curvature |
| Type | Type, Area, Type on Path, Vertical (3), Touch Type (7 من 7) |
| Line | Line Segment, Arc, Spiral, Rectangular Grid, Polar Grid (5 من 5) |
| Shapes | Rectangle, Rounded Rect, Ellipse, Polygon, Star, Flare (6 من 6) |
| Paint | Paintbrush, Blob Brush, Shaper, Pencil, Smooth, Path Eraser, Join |
| Cut | Eraser, Scissors, Knife |
| Transform | Rotate, Reflect, Scale, Shear, Free Transform |
| أخرى | Gradient, Eyedropper, Hand, Zoom |

## 2) الأدوات الناقصة (40 أداة)

| # | الأداة | المفتاح في Illustrator | تتبع لـ |
|---|---|---|---|
| 1 | Reshape | — | Scale group |
| 2 | Width | Shift+W | Warp group |
| 3–9 | Warp, Twirl, Pucker, Bloat, Scallop, Crystallize, Wrinkle | Shift+R (Warp) | Warp group |
| 10 | Puppet Warp | — | Free Transform group |
| 11 | Shape Builder | Shift+M | |
| 12–13 | Live Paint Bucket, Live Paint Selection | K, Shift+L | |
| 14–15 | Perspective Grid, Perspective Selection | Shift+P, Shift+V | |
| 16 | Mesh | U | |
| 17 | Blend | W | |
| 18 | Measure | — | Eyedropper group |
| 19–26 | Symbol Sprayer + Shifter, Scruncher, Sizer, Spinner, Stainer, Screener, Styler | Shift+S | |
| 27–35 | Graph tools: Column, Stacked Column, Bar, Stacked Bar, Line, Area, Scatter, Pie, Radar | J | |
| 36 | Artboard | Shift+O | |
| 37–38 | Slice, Slice Selection | Shift+K | |
| 39 | Rotate View | Shift+H | Hand group |
| 40 | Print Tiling | — | Hand group |

## 3) المنيوهات: الموجود والناقص

**File** — موجود: New, Open, Save, Export SVG/PNG, Close, Exit.
ناقص: New from Template, Open Recent, **Save As (Ctrl+Shift+S)**, Save a Copy, Save as Template, **Revert (F12)**, **Place (Ctrl+Shift+P)**, Save for Web, Export As / Export for Screens, Package, Scripts, **Document Setup (Ctrl+Alt+P)**, Document Color Mode, File Info, **Print (Ctrl+P)**.

**Edit** — موجود: Undo/Redo, Cut/Copy/Paste/Paste in Front/Back/In Place, Clear, Preferences (General + UI فقط).
ناقص: Paste on All Artboards, **Find and Replace**, Find Next, Spell Check, Edit Custom Dictionary, Edit Colors, Edit Original, Presets (Transparency Flattener / Tracing / Print / PDF…), Color Settings, Assign Profile, **Keyboard Shortcuts (Ctrl+Alt+Shift+K)**، وصفحات Preferences الباقية (حوالي 14 صفحة).

**Object** — موجود: Transform (Again, Move, Rotate, Reflect, Scale, Shear), Arrange (4), Group/Ungroup, Lock, Hide, Path (Join, Average, Remove Anchor Points), Clipping Mask, Compound Path, Isolate.
ناقص: Transform Each, Reset Bounding Box, Send to Current Layer, **Expand / Expand Appearance**, Rasterize, Create Gradient Mesh, Create Object Mosaic, Flatten Transparency, Make Pixel Perfect, Slice, Create Trim Marks, Path (**Outline Stroke, Offset Path, Reverse Path Direction, Simplify, Add Anchor Points**, Divide Objects Below, Split Into Grid, Clean Up), Shape, Pattern, Blend, Envelope Distort, Perspective, Live Paint, Image Trace, Text Wrap, Artboards, Graph.

**Type** — موجود: Threaded Text (3), Create Outlines, Upload Font.
ناقص: Font, Recent Fonts, Size, Glyphs, Area Type Options, Type on a Path Options, Fit Headline, Resolve Missing Fonts, Find Font, Change Case, Smart Punctuation, Optical Margin Alignment, Show Hidden Characters (Ctrl+Alt+I), Type Orientation, Legacy Text.

**Select** — موجود: All, All on Artboard, Deselect, Inverse, Next Above/Below.
ناقص: **Reselect (Ctrl+6)**, **Same** (Appearance, Fill Color, Stroke Color, Stroke Weight, Opacity, Blending Mode, Fill & Stroke, Graphic Style, Symbol Instance, Link Block Series), **Object** (All on Same Layer, Direction Handles, Brush Strokes, Clipping Masks, Stray Points, Text Objects…), Start/Stop Global Edit, **Save Selection / Edit Selection**.

**Effect** — موجود: Apply Last, Last Effect, Convert to Shape (3), Distort & Transform (6 من 7), Path→Offset Path, Stylize (6), Warp (15), Blur→Gaussian فقط.
ناقص: Document Raster Effects Settings, 3D and Materials, Crop Marks, Free Distort, Outline Object / Outline Stroke, Pathfinder, Rasterize, SVG Filters, ومعظم Photoshop Effects (Effect Gallery, Artistic, Brush Strokes, Distort, Pixelate, Sketch, Stylize, Texture, Video, Radial/Smart Blur).

**View** — موجود: Outline/Preview, Zoom In/Out, Fit Artboard, Fit All, Actual Size, Rulers, Guides, Smart Guides, Grid, Snap to Grid/Point.
ناقص: Overprint Preview, Pixel Preview, Proof Setup/Colors, **Hide Edges (Ctrl+H)**, **Hide Artboards (Ctrl+Shift+H)**, Hide Print Tiling, Hide/Show Template, Artboard Rulers, **Hide Bounding Box (Ctrl+Shift+B)**, **Show Transparency Grid (Ctrl+Shift+D)**, Hide Text Threads, Hide Live Paint Gaps, Perspective Grid, Snap to Pixel, New View, Edit Views.

**Window** — موجود: Workspace, Control, Tools, + بانلز (القسم 4).
ناقص: Application Frame, Brush/Graphic Style/Swatch/Symbol Libraries.

**Help** — موجود: About فقط. ناقص: Illustrator Help, Tutorials, System Info, Updates.

## 4) البانلز

**موجود (12):** Layers, Align, Color, Stroke, Properties, Swatches, Pathfinder, Transparency, Appearance, Character, Paragraph, Tabs.

**ناقص (27):**
- أولوية عالية (أساس الشغل): **Transform, Gradient, Brushes, Symbols, Info, Navigator, Graphic Styles, Attributes, Artboards, Image Trace, Pattern Options**
- Type: Glyphs, OpenType, Character Styles, Paragraph Styles
- إدارة: Links, Asset Export, Libraries, Document Info, Actions
- باقي: Color Guide, Magic Wand panel, Separations Preview, Flattener Preview, SVG Interactivity, Variables, CSS Properties, Comments, Version History

## 5) الأخطاء والفروقات في الأدوات / المميزات الموجودة

### اتصلّح في build 159
- Shift+M/L/P/V/A/H/N/T كانت بتشغّل أدوات غلط
- الكيبورد العربي بيكسر الاختصارات (Ctrl+Z وغيره)
- Alt+حرف كان بيغيّر الأداة
- F10 لوحده كان بيفتح Stroke (الصح Ctrl+F10)

### لسه موجود (من HANDOFF — محتاج إصلاح)
1. **Layers:** الضغط على عضو جوه group بيحدد الـ group كله؛ الأعضاء المتداخلة بتتحدد على مستوى أعلى بس
2. **Smart Guides:** مفيش snap للـ path/intersection في حالات؛ حد 150px للـ equal spacing تقديري
3. **Align/Distribute:** Key Object مش متأكد منه
4. **Pathfinder:** Outline بسمك 1px مش hairline؛ Divide بيسيب faces متعددة الأجزاء كـ compound path؛ Trim/Merge/Crop مش متحقق منهم
5. **Effects:** الـ path effects بتتخبز في الـ path (live بس: Inner/Outer Glow, Drop Shadow, Blur, Feather)
6. **Toolbar:** حجم الـ tear-off مش بيتحفظ؛ "Collapse to icons" للـ flyouts
7. **Cursors:** مؤشر anchor المحدد في Direct Selection مش متأكد؛ Group Selection فرقه "+" بس؛ Ctrl من Direct→Selection تقدير مش مؤكد من Adobe
8. **Blob Brush:** الحلقة بتختفي أثناء الرسم
9. **Pen:** الضغط الحقيقي (pressure) ما اتجرّبش على هاردوير؛ Ctrl+W/N/T ممكن المتصفح يبلعها
10. **ملف fileSave:** اسم الملف ثابت `masar-artwork.masar`؛ تصدير SVG/PNG بمقاس ثابت (800×600 / 1600×1200) بدل مقاس الـ artboard المختار
11. **Document:** مفيش New Document dialog ولا Home Screen؛ File>New بيمسح من غير ما يسأل عن الحفظ؛ Preferences > General فاضية

### كروت الشرح (tooltip) الناقصة للأدوات الموجودة
الأدوات دي ليها `title` بسيط بس، مفيش كارت شرح زي Illustrator (الاسم + الاختصار + الوصف + تلميحات الماوس): Eraser, Rotate, Reflect, Scale, Shear, Free Transform, Gradient, Eyedropper, Hand, Zoom, Scissors, Knife, Touch Type وباقي أدوات Type الفرعية.

### اختلافات اختصارات لسه موجودة
- ~~`=` من غير Shift بيشغّل Add Anchor~~ — اتصلّح في build 161
- أرقام 1–0 لتغيير الـ opacity مش موجودة
- كل اختصارات القسمين 2 و3 و4 فوق (Ctrl+H, Ctrl+6, Ctrl+P, F5, Ctrl+F9, Ctrl+F8, Shift+F8…) مش شغالة

---

## 5-ب) نتائج المرحلة A حتى build 162 (اختبار سلوك فعلي بماوس وكيبورد)

**اتختبر ونجح (بدون أخطاء):** Rectangle/Ellipse (Shift, Alt, Shift+Alt, dialog), Polygon/Star/Line, Selection (move, Shift, Alt copy, handles, marquee, Shift+click), Group/Ungroup/Delete/Undo/Redo, Pen (closing, curve drag, Shift, undo), Direct Selection (anchor drag + undo), Rotate (origin + angle + Alt copy), Reflect, Scale, Shear, Pencil, Zoom (click / Alt+click), Hand, Space+drag, Ctrl+0, Type (click + type + Esc), Gradient (drag → white→black gradient), Eyedropper, Scissors, Magic Wand, Lasso.

**اتصلّح في build 163/164:** X/Y في الـ Control bar بقت مطابقة للـ Properties وبنقطة المرجع (Reference Point)؛ Control panel menu (≡) فيه Dock to Top / Dock to Bottom ويتحفظ؛ Window > Workspace > Manage Workspaces (Rename / Delete).

**أخطاء اتصلّحت (قبلها):** polygon 5→6 أضلاع، Shift+حروف أدوات، الكيبورد العربي، Alt+حرف، F10، `=`/`_`، **الـ tooltips مش بتظهر لأدوات flyout الأشكال (RoundedRect/Polygon/Star/Flare) وأدوات Type (Area/Path/Vertical/Touch Type)** — اتربطت.

**أخطاء لسه موجودة:**
1. **Control bar X/Y ≠ Properties X/Y**: الـ control bar بيعرض الركن العلوي الأيسر (75.03) والـ Properties بيعرض المركز (155.57) لنفس الشكل. في Illustrator الاتنين بيستخدموا نقطة المرجع (Reference Point) نفسها (الافتراضي: المركز).
2. ~~أرقام 1–0 للـ opacity~~ — **مش ميزة Illustrator** (دي Photoshop)؛ Adobe بتوثّق أسهم ↑↓ في خانة الـ Opacity (1%، و10% مع Shift) — لسه ما اتختبرش في مسار.
3. الـ control bar بيعمل scroll أفقي على العروض الصغيرة؛ Illustrator بيحط الزايد في قايمة overflow.

**لسه ما اتختبرش:** Blob Brush, Paintbrush+Brushes, Curvature, Add/Delete Anchor/Anchor Point, Shaper, Smooth/Path Eraser/Join, Knife, Eraser, Free Transform, Arc/Spiral/Grids, Flare, Touch Type/Area Type, Align, Pathfinder, Layers (drag/search), Appearance, Swatches/Color, Stroke options, Transparency, Smart Guides، Isolation Mode، Clipping Mask، Effects.

## 5-د) نتائج التدقيق العميق (Layers / Color / Text) — build 166
**Layers — اتصلّح:** Ctrl+click على العين = Outline/Preview للـ layer (أيقونة العين بتتحول لبؤبؤ مفرغ)؛ Alt+Ctrl+click = Outline Others؛ Alt+click على القفل = قفل/فتح باقي الـ layers؛ عناوين القائمة بتتبدل (Show All / Unlock All / Preview All)؛ Outline Others؛ Release to Layers (Sequence/Build) [اسم الـ sublayers غير موثّق عند Adobe → "Layer N"]. 
**Layers — build 167:** زرار العدسة (Locate Object) بيشتغل من غير كتابة اسم: حدد العنصر واضغط العدسة فيظهر ويتحدد في القايمة (بيفتح الـ layer المقفولة)، ولو محدد أكتر من عنصر بيظهر الأعلى ترتيباً (حسب Adobe).
**Layers — لسه:** Paste Remembers Layers، Panel Options (حجم الصفوف)، تأكيد الحذف عند حذف layer فيها artwork (مش مؤكد من Adobe). 
**Layers — شغّال ومطابق:** New Layer/Sublayer، اللون الافتراضي الثاني Red، الطبقة النشطة، العين وAlt للـ solo، القفل، Layer Options (كل الحقول: Name/Color(27)/Template/Lock/Show/Print/Preview/Dim Images)، السحب لنقل object وإعادة ترتيب layers، Duplicate، Template، Target circle، Search، قايمة البانل.
**Color — شغّال ومطابق:** Color panel (RGB/HSB/CMYK/Grayscale/Web Safe، شرائط الـ sliders، Hex، Spectrum، None/White/Black)، Invert وComplement (أرقام صحيحة)، X/Shift+X/D//، Swatches (أسماء Illustrator الافتراضية).
**Color — ناقص/مختلف:** **Color Picker dialog (دبل كليك على Fill/Stroke) غير موجود**؛ تحويل CMYK تقريبي (Illustrator بيستخدم ICC profile → مش هيتطابق رقمياً)؛ Web Safe RGB مش واضح تأثيره؛ Gradient panel؛ Document Color Mode (RGB/CMYK).
**Text — شغّال ومطابق:** Placeholder عند الضغط والسحب، Area vs Point، Character panel (الحجم)، Ctrl+Shift+> / <، Alt+←→ (tracking)، Alt+↑↓ (leading)، Paragraph panel (7 محاذاة + اختصاراتها Ctrl+Shift+L/C/R/J/F)، Esc/Ctrl+Enter.
**Text — ناقص:** قايمة Type شبه فاضية (فيها Threaded Text وCreate Outlines فقط): ناقص Font, Size, Glyphs, Area Type Options, Type on a Path Options, Change Case, Fill With Placeholder Text, Show Hidden Characters (Ctrl+Alt+I), Smart Punctuation, Optical Margin Alignment, Type Orientation, Find Font؛ Preferences > Type؛ Character/Paragraph Styles؛ OpenType/Glyphs panels.

## 5-هـ) build 168 / 169
**Color Picker (168):** دبل كليك على Fill/Stroke (الـ Toolbox أو الـ Color panel) → dialog: Color field + Hue slider بأزرار الراديو H/S/B/R/G/B، حقول HSB/RGB/CMYK/Hex، New/Current، Only Web Colors مع تحذير الـ cube، زر Color Swatches مع بحث وColor Models للرجوع، OK/Cancel/Enter/Esc. ناقص: Out of Gamut (يحتاج ICC) والقطّارة داخل الـ dialog.
**Type menu (169):** Font، Size، Area Type Options…، Type on a Path (5 effects + Options…)، Threaded Text، Change Case (4 أنماط)، Smart Punctuation… (ligatures/quotes/spaces/dashes/ellipses/fractions، Selected أو Entire Document)، Create Outlines، Fill With Placeholder Text. كلها بتمر عبر جلسة محرر النص (Undo/Redo صح). ناقص: Glyphs، Fit Headline، Resolve Missing Fonts، Find Font، Show Hidden Characters، Type Orientation، Optical Margin Alignment، Preferences > Type.

## 5-و) build 170 — File / Preferences
**اتصلّح:** Save As… (Ctrl+Shift+S) وSave a Copy… (Ctrl+Alt+S)، أول Ctrl+S على مستند غير مسمى يفتح Save As ثم Ctrl+S يحفظ بنفس الاسم، اسم المستند بيظهر في التاب، File>New بيسأل عن الحفظ لو فيه تعديلات (Cancel/Don't Save/Save) ويرجّع الاسم Untitled-1، Export PNG بخيارات (Resolution 72/150/300 وBackground) بدل المقاس الثابت (72 ppi = مقاس الـ artboard 800×600)، الملفات بتتسمى باسم المستند، Preferences > General (Keyboard Increment وShow Tool Tips شغالين فعلاً، Shift+سهم = 10× الزيادة).
**لسه:** New Document dialog وHome Screen (Illustrator بيفتح مستند جديد في تاب منفصل)، Place وRevert وDocument Setup وPrint، باقي صفحات Preferences، Save بيحمّل ملف جديد (المتصفح مش بيستبدل الملف).

## 5-ز) builds 171–174
**اتصلّح:** Pathfinder Divide (المناطق المنفصلة بقت faces منفصلة، والثقوب بتفضل مع منطقتها) وOutline (hairline حقيقي: `vector-effect: non-scaling-stroke`، ويتشال لما تغيّر الـ Weight)؛ Layers: ضغط صف عضو جوه group بيحدد العضو نفسه (عبر Isolation) مش الـ group؛ Blob Brush: الحلقة بتفضل ظاهرة أثناء الرسم؛ **Keyboard Shortcuts** (Edit > Keyboard Shortcuts… / Ctrl+Alt+Shift+K): تخصيص اختصارات الأدوات، تنبيه تعارض، Clear/Default/Reset All، بيتحفظ، وكروت الشرح بتعرض الاختصار الجديد.
**اتحقق ومفيهوش مشكلة:** Align Key Object (المفتاح ثابت + Distribute Spacing بقيمة)، Smart Guides (labels: path/anchor/intersect/center، محاذاة الحواف، snap للـ anchor)، أسهم خانة Opacity (1% و Shift = 10%)، حفظ وضع Toolbar (أعمدة/جنب/موضع).
**لسه (بالترتيب):** تأثيرات الـ path الـ live (Zig Zag/Roughen/Offset… حالياً بتتخبز) — محتاجة معمارية effects غير مدمّرة؛ نسخة محرر الاختصارات لأوامر المنيو؛ Control bar overflow وإخفاء عناصره؛ Place/Revert/Document Setup/Print؛ باقي صفحات Preferences وUI Scale؛ Workspaces الجاهزة؛ اختيار الأعضاء المتداخلة بعمق (>1 مستوى) في Layers؛ ثم الأدوات (40) والبانلز (27) الجديدة.

## 5-ح) مراجعة الـ Effects (قبل البدء في الـ live effects)
**شغّال:** كل التأثيرات بتفتح dialog فيه Preview، Undo/Redo، Apply Last Effect (Ctrl+Shift+E) وLast Effect…، بتطبّق على كل المحدد وعلى النصوص، وأرقام Offset Path وRound Corners وConvert to Shape وTransform وWarp اتحقق منها. الـ Appearance panel فيه Stroke/Fill/Opacity وأزرار (New Stroke/Fill/Effect، Clear، Duplicate، Delete، eye للـ effect).
**المشاكل والفروقات:**
1. **معظم التأثيرات "متخبّزة" مش live:** اللي live بس 5 (Drop Shadow, Feather, Inner Glow, Outer Glow, Gaussian Blur). الباقي (Convert to Shape ×3، Pucker & Bloat، Roughen، Transform، Tweak، Twist، Zig Zag، Offset Path، Round Corners، Scribble، الـ15 Warp) بيغيّر الـ path نهائياً: مش بيظهر في Appearance، ومينفعش يتعدّل/يتعطّل/يتحذف/يتعاد ترتيبه (غير Undo). Illustrator: كلها live في Appearance وبتتعدّل بالضغط على اسمها.
2. **Appearance:** فتح dialog التأثير بـ**دبل كليك** على الصف؛ Illustrator بضغطة واحدة على اسم التأثير (المسطّر).
3. **ناقص من منيو Effect:** Free Distort (Distort & Transform فيها 6 من 7)، Path > Outline Object / Outline Stroke، Pathfinder (13 أمر)، Rasterize، Crop Marks، SVG Filters، 3D and Materials، Document Raster Effects Settings، وكل Photoshop Effects ما عدا Gaussian Blur (Blur: Radial/Smart؛ Artistic، Brush Strokes، Distort، Pixelate، Sketch، Stylize، Texture، Video، Effect Gallery).
4. **فروق الـ dialogs:** Drop Shadow ناقصها Mode (Multiply) وDarkness/Color؛ Inner/Outer Glow ناقصها Mode (Screen)؛ Transform effect مفيهاش Preview؛ Scribble مبسّطة (ناقص Settings presets وPath Overlap وVariation)؛ القيم بالـ px بدل وحدة المستند (pt).
5. **افتراضيات مش متأكد منها من Adobe:** Inner Glow blur=8 (مسار) وألوان الـ Glow (أبيض)، Round Corners=20، Roughen/Zig Zag/Twist/Offset، مدى Pucker & Bloat (Adobe: ‎-200% إلى 200%؛ ما اتأكدتش إن dialog مسار بيدعم نفس المدى).
**المرجع:** [Distort and transform effects](https://helpx.adobe.com/illustrator/desktop/manage-objects/reshape-transform-objects/distort-and-transform-effects-in-illustrator.html).

## 5-ط) build 175/176 — Live Path Effects (معمارية غير مدمّرة)
**اتعمل:** كل تأثيرات الـ path (Convert to Shape ×3، Pucker & Bloat، Roughen، Transform، Tweak، Twist، Zig Zag، Offset Path، Round Corners، Scribble، الـ15 Warp) بقت **live**: بتتخزن في `data-fx` كـ `{t:'px',k,P}` (P فيها الإعدادات والـ seed فالنتيجة ثابتة)، والـ path الأصلي بيفضل زي ما هو وقابل للتعديل (مخفي لكن بيستجيب للماوس)، والنتيجة بتترسم في overlay `g[data-pxo]` بيتعاد بناؤه تلقائياً لما الـ path أو قايمة التأثيرات تتغير. بتظهر في Appearance وبتتعدّل (دبل كليك) وتتعطّل بالعين وتتحذف وتتكرر، Undo/Redo، Apply Last Effect بيضيفه تأثير جديد، ترتيب التأثيرات، Transform بنسخ live، Save/Load، تصدير SVG (النتيجة بس)، Object > **Expand Appearance** (جديد: بيخبز النتيجة لـ paths حقيقية).
**إصلاح جانبي مهم:** الـ live effects (حتى Drop Shadow وباقي الـ filters) كانت **بتضيع** عند Group/Ungroup وCopy/Paste — دلوقتي بتفضل.
**لسه:** (1) ~~نقر مرة واحدة على اسم التأثير~~ اتعمل في build 177؛ (2) Mode في Drop Shadow/Glow؛ (3) الـ filter effects بتتعرض بس على الـ objects العليا (جوه group لسه بتتحفظ لكن مش بتترسم لحد الـ Ungroup)؛ (4) الـ path effects على Groups/النصوص؛ (5) إعادة ترتيب الـ path effects مع الـ filter effects (كلهم بنفس الترتيب الداخلي: path ثم filters)؛ (6) التأثيرات الناقصة: Free Distort، Outline Object/Stroke، Pathfinder، Photoshop effects…

## 5-ي) build 178 — Mode في Drop Shadow / Glow
**اتعمل:** Drop Shadow: Mode (16 mode، الافتراضي Multiply) + خيار Shadow = Color أو **Darkness** (لون الـ object ممزوج بأسود بنسبة %). Outer Glow: Mode (الافتراضي Screen). Inner Glow: Mode (الافتراضي Screen) بـ feBlend على الـ object. الظل/التوهج بأي Mode غير Normal بيترسم كـ layer مستقل ورا الشغل بـ `mix-blend-mode` فبيتمازج مع اللي تحته (اتأكدت: أحمر Multiply على أزرق = #330000). Mode=Normal بيفضل جوه فلتر الـ object. بيشتغل مع Undo/Redo وCopy/Paste وGroup/Ungroup وSave/Load وتصدير SVG وحذف التأثير.
**ملاحظة:** الـ effects القديمة المحفوظة (من غير Mode) بتفضل Normal زي ما كانت.

## 5-ك) build 179 — الناقص في Effect
**اتعمل:** Effect > Distort & Transform > **Free Distort** (dialog بمقابض الأركان الأربعة تتسحب، live)؛ Effect > Path > **Outline Stroke** (live، من غير dialog) وObject > Path > **Outline Stroke** (بيخبز)؛ Effect > Path > **Outline Object** (يحوّل الـ live shapes لـ paths). Outline Stroke: caps (butt/round/square) وjoins (miter/round/bevel مع miter limit) والـ dashes بتتحترم، النتيجة مظبوطة رقمياً (مساحة = الطول × العرض، + π r² للـ round caps، وزوايا الـ joins).
**لسه:** Effect > **Pathfinder** (13 تأثير): في Illustrator بتشتغل على groups/layers مش objects منفردة، ومسار حالياً الـ live effects على objects منفردة بس (الـ Pathfinder panel الـ destructive موجود)؛ Rasterize، Crop Marks، SVG Filters، 3D and Materials، Document Raster Effects Settings، Photoshop Effects.

## 5-ل) builds 180–188 — قوايم Object / Select / Edit / View
**Object (اتعمل ومختبر):** Transform Each… (Ctrl+Alt+Shift+D: Scale/Move/Rotate/Reflect/Random/نقطة مرجع/Preview/Copy؛ كل object حوالين مركزه)، Reset Bounding Box، Send to Current Layer، Expand… (Object / Fill: gradient → شرائح أو حلقات حتى 255 خطوة بألوان مظبوطة / Stroke)، Make Pixel Perfect، Create Trim Marks، Path ▸ **Offset Path…** (نسخة جديدة مع Preview)، **Reverse Path Direction**، **Simplify…** (Simplify Curve + Corner Point Angle Threshold الافتراضي 90° حسب Adobe + Convert to Straight Lines + Show Original Path + عدّاد النقاط)، **Add Anchor Points**، **Divide Objects Below**، **Split Into Grid…** (Rows/Columns/Gutter/Total + Add Guides)، **Clean Up…** (Stray Points / Unpainted / Empty Text).
**Select:** Reselect (Ctrl+6)، **Same** ▸ (Appearance / Appearance Attribute / Blending Mode / Fill & Stroke / Fill Color / Opacity / Stroke Color / Stroke Weight / Link Block Series)، **Object** ▸ (All on Same Layer / Direction Handles / Brush Strokes / Clipping Masks / Stray Points / Text Objects)، **Save Selection… / Edit Selection…** (الأسماء بتتخزن جوه الـ objects فبتتحفظ مع الملف والـ Undo والـ Copy).
**Edit:** **Find and Replace…** (panel غير modal: Match Case / Whole Word / Search Backwards / Hidden & Locked layers؛ Find / Replace / Replace & Find / Replace All = خطوة Undo واحدة) + Find Next.
**View:** Hide Edges (Ctrl+H)، Hide Bounding Box (Ctrl+Shift+B)، Show Transparency Grid (Ctrl+Shift+D)، Pixel Preview (Ctrl+Alt+Y: بدون anti-aliasing + شبكة بكسل من 600%)، Snap to Pixel، Hide Artboards (Ctrl+Shift+H)، New View… / Edit Views…
**لسه في القوايم (بتحتاج أدوات/مميزات مش موجودة):** Object: Rasterize، Flatten Transparency، Create Gradient Mesh/Object Mosaic (Mesh)، Slice، Pattern، Blend، Envelope Distort، Perspective، Live Paint، Image Trace، Text Wrap، Artboards، Graph، Shape؛ Select: Start Global Edit، Symbol Instance، Graphic Style؛ Edit: Paste on All Artboards، Spell Check، Edit Colors؛ View: Overprint Preview، Proof Setup/Colors، Hide Print Tiling، Hide Template، Hide Text Threads، Perspective Grid.

## 5-م) builds 189–194 — الأدوات الجديدة (مكتبة أدوات + أول دفعة)
**البنية:** مكتبة `TL`/`addTool`/`addGroup`/`regPanel`: أي أداة جديدة بتتضاف في الـ toolbar وفي flyout group زي الأدوات الأصلية، ومعاها المؤشر (cursor) وكارت الشرح والاختصار (بيتسجّل في محرر الاختصارات)، وأي بانل جديدة بتتسجّل في الـ dock والـ Window menu مرتبة أبجدياً.
**اتعمل ومختبر:**
- **Info panel** (Window > Info، Ctrl+F8): X/Y للماوس، W/H للتحديد، Fill/Stroke، وقراءات Measure (D/A/X/Y).
- **Measure Tool** (في flyout الـ Eyedropper): سحب بين نقطتين، D = المسافة وA = الزاوية (عكس عقارب الساعة زي Illustrator)، Shift = مضاعفات 45°، Esc يمسح.
- **عائلة الـ Warp (7 أدوات)** في flyout واحد: Warp (Shift+R)، Twirl، Pucker، Bloat، Scallop، Crystallize، Wrinkle: فرشاة بيضاوية (Width/Height/Angle/Intensity)، Alt+سحب لتغيير حجم الفرشاة (Shift = نسبة ثابتة)، دبل كليك على الأيقونة = Options (Twirl Rate، Complexity، Detail، Simplify، Horizontal/Vertical، Show Brush Size)، بتشتغل على المحدد أو على اللي تحت الفرشاة لو مفيش تحديد، النتيجة بتتنعّم لـ Bezier بدقة Simplify، Undo.
- **Shape Builder Tool** (Shift+M): hover = ظل halftone على الـ region، سحب = دمج الـ regions في شكل واحد، كليك = فصل الـ region في شكل مستقل، Alt+كليك/سحب = حذف، Shift+سحب = marquee، Options (Open Filled Paths / Pick Color From / Highlight Color)، المصادر بتتقص حسب الـ regions (محسوبة من الـ faces فمفيش أخطاء boolean على الحواف المشتركة).
**لسه (الأدوات):** Width، Reshape، Puppet Warp، Live Paint Bucket/Selection، Perspective Grid/Selection، Mesh، Blend، Symbol Sprayer + 7، Graphs (9)، Artboard، Slice + Slice Selection، Rotate View، Print Tiling. **لسه (البانلز):** Transform، Gradient، Brushes، Symbols، Navigator، Graphic Styles، Attributes، Artboards، Image Trace، Pattern Options، Glyphs، OpenType، Character/Paragraph Styles، Links، Asset Export، Libraries، Document Info، Actions، Color Guide…

## 5-ج) تخصيص الواجهة (مقارنة بـ Illustrator)
**موجود وشغال (اتختبر بماوس حقيقي):** سحب تاب بانل لليسار/اليمين/عايم، دمج بانلز كتابات، إغلاق/فتح من Window، حفظ التخطيط بعد reload، Workspaces (Essentials, Essentials Classic, Typography, Painting) + New Workspace + Reset، Edit Toolbar، Toolbar عمودين/عمود، Tab/Shift+Tab، 4 ثيمات.
**ناقص:** Keyboard Shortcuts editor (Ctrl+Alt+Shift+K) — تخصيص الاختصارات؛ Workspaces الجاهزة الباقية (3D, Automation, Layout, Motion, Printing, Tracing, Web…)؛ قايمة إظهار/إخفاء عناصر الـ Control bar؛ Control bar overflow menu؛ UI Scale في Preferences؛ تخصيص قوائم السياق/البانل.

## 6) خطة التنفيذ المقترحة (بالترتيب)

| المرحلة | المحتوى | ليه الترتيب ده |
|---|---|---|
| **A** | **تدقيق سلوك الأدوات الموجودة** (اختبار آلي لكل أداة + مقارنة بتوثيق Adobe) وإصلاح الأخطاء من القسم 5 | الأساس لازم يبقى سليم قبل ما نبني فوقه |
| **B** | **File + Edit + Select + View الناقصة** (Save As, Place, Document Setup, Revert, Find/Replace, Reselect, Select Same/Object, Hide Edges/Bounding Box/Transparency Grid) + New Document dialog | سريعة ومؤثرة وبتفعّل اختصارات كتير |
| **C** | **بانلز الأساس:** Transform, Gradient, Brushes, Info, Navigator, Graphic Styles, Attributes, Artboards | الأدوات الجاية بتعتمد عليها |
| **D** | **Object menu:** Expand, Outline Stroke, Offset Path, Simplify, Add Anchor Points, Reverse Path, Transform Each, Blend, Envelope Distort | |
| **E** | **أدوات الـ Transform الناقصة:** Reshape, Width, Warp family, Puppet Warp | |
| **F** | **Shape Builder + Live Paint + Perspective Grid** | |
| **G** | **Mesh + Blend + Measure** | |
| **H** | **Artboard + Slice + Rotate View** | |
| **I** | **Symbols (Sprayer family) + Graphs** | أكبر وأقل أولوية |
| **J** | **Type menu + Glyphs + Styles + OpenType** و **Effects الناقصة** | |
| **K** | لاحقاً: AI generation + الدفع | حسب اتفاقكم |

## 5-ن) Build 195 — أداة Width (Shift+W)
- **اتعملت:** Width Tool كاملة: drag على الاستروك يعمل width point متماثل، Alt+drag جنب واحد، سحب المقبض يغيّر العرض، سحب الـ diamond يحرّك النقطة على المسار (Alt = نسخ، Shift = تحريك المحدد كله)، Shift+click تحديد أكتر من نقطة، Delete يمسح، double-click يفتح Width Point Edit (Side 1 / Side 2 / Total / Adjust Adjoining Width Points، Shift+double-click يفعّل الخيار).
- النقاط متخزنة في `data-wpts` كنسب من نص عرض الاستروك → تغيير Weight بيكبّرها كلها؛ Stroke › Profile بيعرض "Custom" و"Uniform" بيمسحها؛ بتشتغل على المسارات المقفولة والمفتوحة وعلى شكل Rect/Ellipse (بيتحول لمسار) وعلى أكتر من subpath.
- كارت شرح + كيرسر + سطر الحالة + اختصار Shift+W في Keyboard Shortcuts. الأداة أول عنصر في فلاي-أوت Width/Warp.
- Build 196: أزرار Add to Profiles / Delete Profile في Stroke › Profile (البروفايلات المحفوظة في localStorage وبتتطبق على أي مسار)، وFlip Along/Across شغالين على النقاط المخصصة. Width Tool Options: ما اتأكدش من أدوبي إنه موجود فمااتعملش (مش هنحط ديالوج وهمي).
- اختبار: `tests/wt.js` (21 فحص ناجح).
- Build 197: قايمة Width Profile في Properties panel (بتظهر مع أداة Width أو مسار عليه بروفايل) — بنفس البروفايلات المحفوظة.

## 5-س) Build 198 — Blend (أداة W + قائمة Object › Blend)
- **اتعمل:** Blend Tool (W): كليك على أول أوبجكت ثم التاني ← بلند حي؛ كليك على أوبجكت تالت يمدّه؛ كليك على anchor يحدد نقطة البداية؛ Alt+click يفتح Blend Options. Object › Blend: Make (Ctrl+Alt+B)، Release (Ctrl+Alt+Shift+B)، Blend Options (Smooth Color / Specified Steps / Specified Distance + Align to Page / Align to Path + Preview)، Expand، Replace Spine، Reverse Spine، Reverse Front to Back. دبل-كليك على الأيقونة = Blend Options.
- البلند حي: لما تعدّل الـkeys (move/تعديل/تلوين) الـsteps بتتعاد، ويتحفظ في الـundo والـcopy/paste والملف (الميتا في عنصر مخفي داخل الجروب). تداخل الألوان RGB والـstroke-width والـopacity، وتساوي عدد الـanchors بتقسيم أطول segment.
- **إصلاح:** Ctrl+Alt+B كان بيتفسّر Paste in Back — اتصلح.
- لسه ناقص في Blend: ترتيب z-order الافتراضي للـsteps عند أكتر من 3 keys مش متأكد منه 100%، والبلند على نصوص/gradients (الـsteps بتاخد gradient أقرب key بدون تداخل).
- اختبار: tests/bl.js و tests/bl2.js (24 فحص).

## 5-ع) Build 200 — فحص وإصلاح لوحة Layers
**اتفحصت بـ 3 سكربتات (tests/lyprobe*.js) ثم اتصلح الآتي (tests/layers3.js، 27 فحص):**
1. مسح لير فيه شغل كان بيمسح بدون تأكيد ← دلوقتي بيسأل (Yes/No)؛ اللير الفاضي بيتمسح علطول.
2. Shift+click على صفوف الأوبجكتات كان بيعمل toggle ← بقى بيحدد المدى كله (Ctrl للإضافة/الحذف الفردي).
3. السحب لتحت في عمود العين/القفل كان مش شغال ← بيطبق نفس الحالة على كل صف بتعدي عليه (وخطوة undo واحدة).
4. Alt+drag لصف أوبجكت كان بينقل ← بقى بينسخ.
5. قايمة اللوحة: اتضاف Hide/Show Others و Lock/Unlock Others و Paste Remembers Layers (فعلية: اللصق بيرجع للير الأصلي أو بيعمله) و Panel Options (Row Size 12–100، Thumbnails للـLayers/Groups/Objects، Show Layers Only، بتتحفظ).
6. زر Filter (By Object: Paths/Text/Groups/Clipping Masks — By State: Hidden/Locked).
- لسه ناقص: Save Selection و Collect for Export (محتاجين لوحة Asset Export)، Alt+drag لنسخ لير كامل، Locate Layer لما Show Layers Only شغال.

## 5-ف) Build 202 — بحث الـLayers + Appearance متعدد الـFills/Strokes
- **Layers:** حقل "Search All" اتنقل لأعلى اللوحة (زي إليستريتور) + زر Filter جنبه؛ زر Locate Object في الفوتر بقى أيقونة عدسة. تحديد عنصر ثم الضغط على العدسة (في الفوتر أو داخل الحقل) يظهره في اللوحة من غير كتابة اسم.
- **Appearance:** بقى يدعم أكتر من Fill/Stroke للأوبجكت الواحد: Add New Stroke / Add New Fill تضيف عنصر فوق المحدد، Duplicate / Delete Selected Item، سحب الصفوف لإعادة الترتيب (حتى بين الـStroke والـFill)، لون ووزن وOpacity لكل عنصر، قايمة اللوحة (Add New Fill/Stroke/Effect، Duplicate Item، Remove Item، Clear Appearance، Reduce to Basic Appearance). مخزّن في `data-aps` ومرسوم كمسارات مصاحبة `data-apx` (بتتحرك وبتتنسخ وبتتحفظ وبتتعمل لها Undo). tests/ap.js (14 فحص).
- لسه ناقص في Appearance: Gradient/Pattern في العناصر الإضافية، Blend Mode لكل عنصر في الواجهة، Redefine Graphic Style (محتاجة لوحة Graphic Styles)، New Art Has Basic Appearance، ترتيب الـEffects بين العناصر.
- **UI:** منع تحديد النص العشوائي في كل الواجهة (user-select:none ما عدا حقول الإدخال).
