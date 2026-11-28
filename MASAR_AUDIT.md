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

## 5-ص) Build 203 — Layers: البحث بزر فقط
- اتشال حقل الكتابة؛ بقى في زر بحث (عدسة) في الفوتر: حدد عنصر واضغط عليه ← اللير يتفتح والصف يظهر ويومّض (ظاهر حتى لو جوه جروب/لير مقفول/القايمة طويلة). الزر رمادي لو مفيش تحديد. Filter اتنقل للفوتر.
- Alt+click على اسم لير يحدد كل شغله؛ Alt+drag للير ينسخه بشغله.
- tests/layers4.js

## 5-ق) Build 204 — إكمال ناقص الـLayers
- **Save Selection** زر في فوتر Layers (يفتح نفس ديالوج Select › Save Selection).
- **Collect for Export**: زر في الفوتر + Object › Collect for Export (As Single Asset / As Multiple Assets) + لوحة جديدة **Asset Export** (Window): قايمة الأصول بمصغّرات، إعادة تسمية بدبل-كليك، Scale (0.5x–4x) وFormat (PNG/JPEG/WebP/SVG) لكل أصل، Export All / Export…، Remove. التصدير حقيقي (يرسم SVG على canvas ← ملف، اسمه `name@2x.jpg`). الحالة محفوظة في الأوبجكت (`data-ax`) فتعدّي على Undo/Copy/الملف.
- **Locate Layer** لما Show Layers Only شغال (الزر بيتغير اسمه ويومّض صف الـLayer).
- ملحوظة: لوحة Asset Export فيها تبويب Assets فقط (تبويب Artboards بيستنى الـmulti-Artboard). tests/layers5.js (12 فحص).

## 5-ر) Build 205 — اختصارات القفل
- Ctrl+2 (Lock Selection) و Alt+Ctrl+2 (Unlock All) و Ctrl+3 / Alt+Ctrl+3 بقوا يشتغلوا حتى لو الفوكس في خانة أرقام/لوحة (كانوا بيتجاهلوا لو الفوكس في input). لو اللير متحدد في لوحة Layers ومفيش أوبجكت متحدد: Ctrl+2 يقفل اللير؛ Alt+Ctrl+2 يفك قفل الأوبجكتات واللايرز. tests/lk.js

## 5-ش) Build 206 — اللوحات الجديدة بتتدوك
- Asset Export / Info وأي لوحة جديدة بتتسجل بـregPanel كانت بتفتح عايمة فوق الـDock وتغطي لوحة Layers ("اللير بتختفي"). دلوقتي بتتدوك في العمود اليمين تحت اللوحات الموجودة (home:{m:'R'}).

## 5-ت) Build 207 — الأزرق → رمادي + ألوان الضغط
- كل أزرق في واجهة التطبيق (hover القوايم، صفوف التحديد في Layers/Appearance/Properties، focus، الأزرار الأساسية OK/Apply، تبويب اللوحة النشط، تحديد النص، أزرار الراديو/الـcheckbox) بقى رمادي عن طريق متغيرات الثيم (`--brand --acc --acch --acca --accink --sel`) في الأربع ثيمات.
- حالة الضغط (:active) كانت موجودة بس على أزرار OK؛ دلوقتي كل الأزرار (الأدوات، أيقونات اللوحات، القوايم، التبويبات…) بتتغمق بنفس الرمادي (`--prs`).
- فضل أزرق عن قصد: ألوان اللير (شريط اللون ومربع التحديد في Layers وتحديد الأوبجكت على الكانفس) لأنها ميزة Layer Color في إليستريتور.

## 5-ث) Build 208 — صفر أزرق في الواجهة
- اتفحصت بسكان بكسلات (Python/PIL) في ~35 حالة: قوايم، لوحات، حوارات، أدوات، تلميحات الأدوات، مقابض Width، تحديد النص… النتيجة صفر بكسل أزرق (غير طيف الـHue في Color Picker وسواتشات الألوان).
- اتحول لرمادي: تحديد الأوبجكت/المقابض على الكانفس وكل overlays الأدوات، لون اللير الافتراضي (Light Gray #8C8C8C؛ الألوان الزرقاء بقت آخر قايمة ألوان اللير فمش بتتوزع تلقائي)، لوجو Masar (التايل كان كحلي)، الـfavicon، رسومات كروت الشرح.

## 5-ج) Build 209 — فحص Color
**لوحة Color (tests/colprobe.js، 25 فحص):** اتصلح: hex مختصر (f80 → ff8800، ab → ababab، f → ffffff)، Shift+drag لسلايدر = باقي السلايدرز تتحرك بنفس النسبة، Shift+Arrow = ±10 في الخانات، خانة hex فاضية لما الألوان مختلفة (Mixed)، **Out of Gamut Warning** (مثلث أصفر في RGB/HSB/Web — بيتقرّب لأقرب لون قابل للطباعة بنموذج SWOP تقريبي). Color Picker سليم (cpick/col1-6).
**لوحات عايمة:** اللوحات اللي بتتفتح (Color / Stroke / Align / Swatches…) كانت بتتراكم فوق بعض عايمة؛ دلوقتي أول فتح بيدوكها في العمود اليمين (place() default = R).
**Swatches (لسه ناقص — ما اتعملش):** Swatch Options (دبل-كليك)، New Swatch dialog، Global/Spot swatches، New Color Group، Swatch Libraries، List view/Sort/Select All Unused/Add Used Colors، سحب لإعادة الترتيب، قايمة اللوحة، Duplicate/Merge.

## 5-ح) Build 210 — لوحة Swatches كاملة (Window › Swatches)
- لوحة حقيقية متدوكة: عرض Thumbnail (صغير/وسط/كبير) وList (صغير/كبير)، Show Swatch Kinds (All/Color/Color Groups)، حقل Find، قايمة اللوحة، سحب لإعادة الترتيب أو للنقل جوه مجموعة، تحديد متعدد (Shift/Ctrl).
- **Swatch Options** (دبل-كليك): Name، Color Type (Process/Spot)، Global، Color Mode (Grayscale/RGB/HSB/CMYK/Web)، Hex، Preview حي. **New Swatch** بنفس الديالوج.
- **Global/Spot swatches**: بيتربطوا بالأوبجكتات (data-swf/data-sws) فتعديل السواتش يعيد تلوينها؛ تغيير اللون يدوي بيفك الربط. مؤشر مثلث أبيض في الركن.
- **New Color Group** (من سواتشات محددة أو من ألوان Selected Artwork)، تغيير اسم المجموعة بدبل-كليك.
- Duplicate / Merge (بيحوّل الاستخدامات) / Delete (بتأكيد) / Select All Unused / Add Used Colors / Sort by Name / Sort by Kind.
- **Swatch Libraries**: Pastel, Earthtones, Neon, Grayscale, Skintones, Vintage, Metals — كليك يطبّق ويضيف للـSwatches.
- Alt+click يطبّق على الخاصية التانية. الـpop-up بتاع Fill/Stroke بيستخدم نفس القايمة، والحفظ في localStorage.
- لسه ناقص: Gradient/Pattern swatches، حفظ/فتح مكتبة ملف (ASE)، سحب سواتش على أوبجكت في الكانفس. tests/sw.js (29 فحص).

## 5-خ) Build 211 — السكيل بيبوّظ الرسمة
- **السبب:** سحب مقابض الـbounding box كان بيكبّر الأوبجكت بـtransform (الـstroke بيتكبّر معاه بصريًا)، وعند الإفلات الشكل بيتخبّز في الـpath لكن الـstroke-width بيرجع للقيمة الأصلية → الرسمة تتحوّل لسمك زايد (blob) وقت الإفلات.
- **الإصلاح:** إعداد **Scale Strokes & Effects** (Edit › Preferences › General + خانة في Properties › Transform + بيحدد الافتراضي في ديالوج Scale). ON (الافتراضي): الـstroke وأحجام الـeffects (Shadow/Glow/Blur) بتتكبّر مع الرسمة. OFF: الـstroke يفضل بنفس السمك أثناء السحب وبعد الإفلات (بدون قفزة). شغّال في: مقابض الـSelection، حقول W/H، Free Transform، Scale/Rotate drag، Transform Each/Again. tests/ss.js
- اختصارات القفل: Numpad2 كمان، وعناصر Lock Selection / Unlock All في قايمة Layers.

## 5-د) فحص الواجهة (build 211) — أخطاء + الناقص (للإصلاح)
**أخطاء مؤكدة:**
1. عمود الـDock لما تفتح لوحات كتير بيطلع بره الشاشة (مفيش scroll ولا تقليص) — ظاهر في 1280×720 وحتى 1500×900.
2. Control bar بيتقطع على اليمين (1567px > 1500) بدل ما يعمل overflow menu.
3. سطر الحالة (footer) نصه بيتقص بدون "…" و 1819px جواه.
4. Window menu فيها "Swatches" مرتين.
5. ثيم Medium Dark: نص صف Layers المحدد تباينه 3.8:1 (أقل من 4.5) بعد تحويل الأزرق لرمادي.
6. مفيش Context menu (right-click) على الكانفس ولا على لوحة Layers.
7. قوايم اللوحات (≡) لـAlign/Pathfinder/Transparency/Info/Character/Paragraph/Tabs/Properties/Asset Export فاضية (Close بس).
8. مفيش تنقل بالكيبورد في القوايم (Alt+حرف، أسهم).
9. Control bar بدون تحديد: "No Selection X Y W H" بس — ناقص Document Setup / Preferences / Style.
10. File › New بيصفّر المستند بدون ديالوج (Width/Height/Units/Color Mode/Artboards).
**نتايج سليمة:** 225 أمر قايمة اتجرّبوا بدون خطأ JS؛ تباين النصوص سليم في 3 ثيمات؛ الـtooltips والـcards لكل الأدوات الـ58 موجودة.

## 5-ذ) Builds 212–216 — إصلاحات فحص الواجهة
- (1) **كان إنذار كاذب:** عمود الـDock بيسكرول فعلًا (overflow-y:auto، العجلة شغالة) — اتأكد بالماوس.
- (2) Control bar: لو ضاق، الكنترولز الزيادة بتنتقل (حيّة) لقايمة **»** بدل ما تتقص (tests/ovt.js).
- (3) سطر الحالة: نص الـhint بقى بـ"…" + tooltip. (4) Window: Swatches مرة واحدة. (5) Medium Dark: تباين صف Layers اتظبط.
- (6) **Context menus (كليك يمين):** على الأوبجكت (Undo/Group/Compound/Clipping/Blend/Transform/Arrange/Select/Lock/Hide/Cut/Copy/Paste…)، على الكانفس الفاضي (Paste/Select/View)، وعلى صفوف Layers (قايمة اللوحة).
- (8) **القوايم بالكيبورد:** Alt+F/E/O/T/S/C/V/W/H، أسهم ↑↓←→، Home/End، Enter، Esc (القوايم الفرعية كمان) — tests/menukb.js.
- (7) **قوايم اللوحات (≡):** Align (Show/Hide Options + Use Preview Bounds بيشتغل فعلًا)، Info/Transparency/Character/Paragraph/Properties (Show/Hide Options)، Pathfinder (Repeat + Ctrl+4)، Asset Export (Export All/Selected، Collect) — tests/pm.js.
- (9) Control bar بدون تحديد: Document Setup + Preferences.
- (10) **File › New…** (Name/Preset/Units/Width/Height/Orientation/Color Mode)، **Document Setup…** (Ctrl+Alt+P)، **Place…** (Ctrl+Shift+P: صور مضمّنة PNG/JPG/GIF/WebP أو SVG)، **Document Color Mode** (RGB/CMYK)، **Print…** (Ctrl+P). حجم الـArtboard بقى متغيّر (ABW/ABH) ومتحفوظ في الملف ومستخدم في التصدير/الـFit/Align/Smart Guides. tests/doc.js
- إصلاح: دالة `add` الخاصة بالسواتشات كانت بتغطي `add` العامة جوه سكريبت الأدوات (اتغيرت لـswAdd).
- المتبقي من القايمة: multi-Artboard، لوحات/أدوات ناقصة، Open Recent/Revert، أوامر Type/Effect/View الناقصة.

## 5-ض) Builds 217–219 — Multi-Artboard
- نموذج بيانات: `ARTS` (id/اسم/x/y/w/h) + الـArtboard النشط (ABX/ABY/ABW/ABH) — في الـUndo/Redo وفي الملف (.masar) وفي التصدير.
- **Artboard Tool (Shift+O)**: سحب = Artboard جديد (Shift مربع، Alt من المركز)؛ كليك = تنشيط؛ سحب جواه = نقل مع الـartwork (زر Move artwork في الـControl bar)؛ Alt+drag = نسخة بالـartwork؛ مقابض تغيير حجم (Shift/Alt)؛ Delete؛ أسهم؛ Enter/Esc للخروج؛ دبل-كليك = Artboard Options (Name/Preset/W/H/Orientation/X/Y)؛ Control bar كامل (Preset, Name, X, Y, W, H, تبديل الاتجاه, New, Delete, Options).
- **لوحة Artboards**: قايمة مرقمة، كليك = تنشيط + Fit، دبل-كليك = إعادة تسمية، سحب لإعادة الترتيب، تحديد متعدد، New/Delete، قايمة (Duplicate, Delete, Artboard Options, Rearrange All…, Fit to Artwork Bounds, Fit to Selected Art, Convert to Artboards, Export All…).
- **لوحة Navigator**: معاينة كل الـartboards والشغل، مستطيل العرض الأحمر، سحب/كليك للتنقل، زووم (− slider + و%).
- شريط الحالة: ◀ ▶ + "n / N" + قايمة الأسماء. Object › Artboards، Select › All on Active Artboard، File › Export All Artboards (SVG/PNG ملف لكل واحد)، New Document بعدد Artboards + Spacing. Align to Artboard / Smart Guides / Rulers / Fit / Place بتشتغل على الـartboard النشط (أو كلهم).
- إصلاح خطير: دوال block داخل سكريبت الأدوات (`apply`, `dupSel`, `delSel`, `render`…) كانت بتغطي دوال عامة — بلوك Swatches بقى IIFE. tests/ma.js (35 فحص).

## 6) خطة أدوات فوتوشوب (تتعمل بعد ما نخلص أدوات مسار كلها)
الهدف: الحاجات اللي بتخلي مصمم يسيب إليستريتور ويفتح فوتوشوب — تشتغل على الصور الـPlaced جوه مسار (raster) وتفضل non-destructive قد ما نقدر.
**أولوية 1 (الأكثر طلبًا):**
1. Remove Background (إزالة الخلفية) + Select Subject تقريبي + Magic Wand / Color Range على الصورة.
2. Adjustments على الصور (non-destructive): Brightness/Contrast, Levels, Curves, Hue/Saturation, Exposure, Vibrance, Color Balance, Black & White, Invert, Threshold, Posterize, Gradient Map, Photo Filter.
3. Crop Image (قص الصورة نفسها مش clipping بس) + Image Size / Resample.
4. Layer Mask على الصور: رسم ماسك بفرشاة ناعمة (أبيض/أسود) + Feather.
**أولوية 2:**
5. Retouch: Spot Healing Brush, Clone Stamp, Patch، Content-Aware Fill (تقريبي).
6. فرش raster: Brush / Eraser بحواف ناعمة، Opacity/Flow، Dodge / Burn / Sponge، Blur / Sharpen / Smudge.
7. Filters: Unsharp Mask / Sharpen، Motion Blur، Radial Blur، Add Noise / Reduce Noise، High Pass.
8. تحديدات بكسل: Marquee / Lasso / Quick Selection + Select and Mask (Feather, Smooth, Expand/Contract).
**أولوية 3:**
9. Perspective Warp / Puppet Warp / Liquify على الصور (Mockups).
10. Adjustment Layers تأثر على كل اللي تحتها + Clipping.
11. Layer Styles فوتوشوب (Bevel & Emboss, Gradient/Pattern Overlay, Satin) كـ Appearance effects.
12. Export: JPG quality / WebP / AVIF + Save for Web بمعاينة الحجم.
**إضافات من البحث (Adobe Community / 99designs / CreativePro / Creative Bloq):**
13. Mockups حقيقية: تحطيط التصميم على صورة منتج (Smart Object) + Perspective + Displacement Map + ظلال/إضاءة بالـBlend Modes — أكتر سبب بيتقال إن المصمم يروح لفوتوشوب (Illustrator Mockup مش بيقبل صور raster).
14. Grain / Noise texture overlay (طبقة رمادي 50% Overlay + Add Noise، أو Grain adjustment) لإضافة ملمس للفيكتور.
15. ظلال وإضاءة وEmboss واقعية على الصور (Shadows / Lighting / Bevel).
16. رسم رقمي بفرش بتحاكي الألوان المائية/الفحم مع حساسية ضغط القلم (Pressure).
17. Eraser غير مدمّر (بيعمل Layer Mask أوتوماتيك بدل ما يمسح البكسل).
18. Pattern Stamp لعمل textures.

## 5-غ build 220 — AI Remove Background (RMBG 1.4, in-browser)
- Object › Remove Background… (also in the object context menu). Runs ONNX Runtime Web (WebGPU, WASM fallback) from jsDelivr; model downloaded once from Hugging Face (Fast 44 MB / Quality 176 MB) and cached (Cache API), or a local .onnx file (RMBG / BiRefNet style).
- Dialog: live preview (Result / Matte / Overlay) + Smooth edge, Shift edge, Edge contrast, Feather. Apply makes a NON-destructive Opacity Mask (original pixels kept, single Undo step). Opacity-mask maker now accepts `<image>` as the mask.
- Verified headless (CPU/WASM, ~13 s on 933×1405): giraffe test photo cut cleanly; undo restores. Test: tests/rb.js (needs local copies of ort + model, see script).
- Not yet: brush to paint/erase the mask, colour decontamination, SAM click-select, LaMa fill.

## 5-ػ build 221 — Remove Background, phase 1 (AI service, commercial-safe)
- RMBG-1.4 removed (non-commercial licence). Models: Fast = Xenova/modnet (Apache-2.0, portraits), Studio = onnx-community/BiRefNet_lite-ONNX (MIT). transformers.js 3.7.6 runs inside a Blob Web Worker; nothing loads at start-up; lazy download with progress; browser cache; WebGPU -> WASM fallback; input capped at 1024 px, matte scaled to the original (cap 4096).
- Contextual bar above a selected image (Remove Background + model select), dashed busy overlay on the layer, Object menu entry kept. Interim apply = existing opacity mask (phase 2 replaces it with the dedicated mask model).
- Verified headless: Fast mode on portrait + animals (good on portraits; poor on animals as expected). Studio: could NOT be verified here (WASM fails, sandbox WebGPU is a software adapter with 8-buffer limits) -> needs testing on a real GPU. Studio on a non-WebGPU browser shows a clear error.
- tests/rb.js uses a local HTTPS mirror of huggingface.co (see /tmp/mdl/srv.js idea) because Playwright cannot stream 200 MB bodies.

## 5-ؼ build 222 — Remove Background, phase 2 (non-destructive raster mask)
- New object structure: visible result `<image data-rbo>` (Blob object URL, revoked on eviction, never big Base64) + hidden `<g data-rbh>` holding the untouched ORIGINAL image and a reference to the mask. Masks live in a version store (edits = new versions → Undo/Redo switch versions); result composited at full source resolution (cap 8192) by `RBMASK.sync()`.
- Save/Load .masar: mask embedded (`data-rbmd`) and re-registered on load. SVG export: standard `<mask>` + original image (opens as an opacity mask elsewhere).
- Layers panel: mask thumbnail beside the layer thumbnail; click selects the mask target, Shift+click disables / enables (red slash). Context bar: Mask On/Off, Remove Mask (restores original).
- Tests: rb2.js (pixels, undo/redo, export, roundtrip, remove), rb3.js (scale, paste, rectangle tool, panel thumbs).
- Next: phase 3 (mask brush, edge feather/shift, guided filter, colour decontamination), then SAM-click and mask→vector path / die-cut.

## 5-ػ build 223 — Remove Background, phase 3 (mask brush + edge controls)
- Edit Mask (context bar button or click the mask thumbnail in Layers): Mask Brush on a 60 fps overlay canvas that follows the image's exact SVG transform (zoom/pan/rotate), Hide/Reveal (X swaps), Size/Hardness/Opacity, `[` `]` resize, Space = pan, wheel = zoom, Enter/Esc = done. Each stroke / refinement = one new mask version = one Undo step (Undo/Redo inside the session reloads the working mask).
- Edge controls: Shift edge, Feather, Detail (guided filter steered by the image, snaps the matte to real edges/hair) with live preview at ≤768 px and full 2048 px working resolution on release; Remove colour fringe (foreground colour estimation) stored per mask (`data-rbdc`), applied at render time at ≤4096 px. Reset = back to the original AI mask.
- `display:none` used during editing is never left in history snapshots (tested). Save/Load keeps base mask + dc.
- Tests: rb4.js (real mouse strokes, undo/redo, sliders, Enter), rb5.js (before/after fringe crop).
- Limit: colour-fringe estimation is a simplified foreground estimate, not Photoshop's exact algorithm.

## 5-ؿ build 224 — Remove Background, phase 4 (mask → vector, Auto Die-Cut)
- Mask to Path…: marching squares (sub-pixel interpolation, saddle handling) → loops → Douglas-Peucker simplify → Catmull-Rom cubic Beziers with sharp-corner detection; compound path (evenodd) with holes; sliders Threshold / Smoothness / Simplify / Ignore specks; live preview object; option to also make a real clipping mask from a COPY of the original image (uses the existing Clipping Mask command, one Undo step).
- Auto Die-Cut Outline…: exact Euclidean distance transform → offset field → contour (round, sub-pixel), optional hole filling (single outer cut line), white sticker fill, magenta cut-line stroke, created BELOW the image; offset adjustable live.
- Access: context bar (Mask to Path / Die-Cut) and Object menu. Results are normal paths, editable with Pen / Direct Selection and Offset Path.
- Tests: rb6.js (bbox, holes, undo/redo, clip option, cancel), perf: 1400² mask traced in ~0.2 s, die-cut in ~0.45 s.

## 5-ؽ build 225 — fixes from the user's real-machine test
- Remove Background quality: the user's sunset-silhouette photo failed with MODNet (portrait-only model, reproduced). New default **Balanced = IS-Net general (Apache-2.0, 170 MB)**: verified in the browser on CPU/WASM (25 s) with a clean cut-out; Studio (BiRefNet lite) stays opt-in, needs WebGPU (WASM hits the 2 GB heap limit at its fixed 1024 input; native CPU run confirmed the model itself is excellent) and now falls back to Balanced automatically; Fast (MODNet) is labelled "portraits only". IS-Net uses its own pre-processing (its published processor type is unknown to transformers.js). WASM session options: basic graph optimisation, no mem arena.
- ✕ buttons: context bar (dismiss for the current selection; while the AI works it CANCELS the job and terminates the worker) and the Mask Brush panel.
- "Colours do not change": cause = the document was in **Outline** view (Ctrl+Y, Illustrator parity; on Windows it is also the habit for Redo). Added an always-visible "Outline view" badge with a "Preview ✕" button.
- Cursor: removed every pointing-hand / grab-hand over panels, tabs, swatches, buttons (arrow everywhere like Illustrator); the grab hand stays only for the Hand tool / Space on the canvas.
- Tests: rb7.js.

## 5-ؾ build 226 — ✕ on every dialog
- Color Picker, New Document, Document Setup, Place/Offset/etc. (`.fxm .fxb`) and the `#dlg` dialogs (Move, Rotate…) now have a ✕ in the title bar (acts like Cancel / Esc). Dialogs are capped to the window height (scroll) so the buttons are reachable on small screens (the user's Color Picker was cut off). Test: dlgx.js.

## 5-ؿ build 227 — ✕ on every menu / popup list
- A ✕ row (top-right) is injected into: menu-bar dropdowns, the canvas context menu, panel/popup menus (#pmMn), the tool flyouts (#fly…#fly5) and the dock flyout. It acts like Esc (closes; menu bar state is not left stuck). Keyboard navigation and items are untouched. Submenus close with their parent; the control-bar overflow list is excluded on purpose (it closes with » / outside click / Esc, and a header row broke its layout/test).
- Tests: mx.js, mx2.js; ovt.js stays green.

## 5-ـ build 228 — Pick Subject (SlimSAM click-to-select)
- Context bar › Pick Subject on a plain image: SlimSAM (Xenova/slimsam-77-uniform, Apache-2.0, ~40 MB, CPU/WASM, same Web Worker, lazy download with progress). The image (≤1024 px) is analysed once (~13 s on this CPU), then every click is decoded in the worker: left click = include (green), Alt+click or right-click = exclude (red); live blue overlay aligned to the image's exact SVG transform; `[` `]` switch between the 3 selections the model proposes (Auto = best score); Undo point; Enter / Apply builds the non-destructive mask (binary mask → guided filter on the real image edges → full resolution); Esc / ✕ cancels.
- Verified on the sunset silhouette: one click on the hoodie = hoodie; 3 clicks (head, body, legs) = the whole person; Apply → mask; Undo removes it.
- Test: rb8.js.

## 5-ٱ build 229 — Upscale Image (AI, in the worker)
- Object › Upscale Image… and the Upscale button on the context bar (plain images and masked images). Models (BSD-3-Clause Real-ESRGAN): General = realesr-general-x4v3 (TheGuy444/Real-ESRGAN-ONNX, 5 MB, 128 px tiles, fast, works on CPU) and Detail = RealESRGAN_x4plus (imgdesignart/realesrgan-x4-onnx, 64 MB, 64 px tiles; the repo declares no licence, upstream weights are BSD-3 → keep the credit line). ORT-web 1.20.1 (WebGPU → WASM) inside the same Web Worker; tiles with 8/6 px overlap + mirrored borders; scale 2× (downscaled from the 4× result) or 4×; Strength slider blends with the smooth upscale (default 85 %) to avoid the plastic look; alpha is kept (PNG), otherwise JPEG 93 %; cap 60 MP; progress + cancel (terminates the worker).
- Result replaces the image in place (placed size unchanged → higher effective resolution), or "Keep the original" places a copy. For masked images the hidden original is replaced and the mask re-rendered at the new resolution (RBMASK.replaceSrc). Undo restores the small original.
- Verified: 90×112 → 360×448 (CPU/WASM 4.7 s), undo/redo, cancel, keep-copy, masked image. Native comparison on a 4× down-scaled portrait: both models clearly beat bicubic (see sr_portrait.png).
- Not verified: speed/quality of Detail on large photos without a GPU (slow), WebGPU path on a real GPU.

## 5-ٲ build 229b — Upscale: faithful options after the user's real-machine feedback
- User: the Real-ESRGAN result "changes the real shape" (confirmed natively: realesr-general-x4v3 re-draws the eyes). Added **Faithful** (Swin2SR realworld x4 PSNR, Apache-2.0, 54 MB, dynamic 64 px tiles): keeps the real look (no GAN hallucination) but is **very slow on WASM** (≈6.5 s per 48×48 core tile ⇒ ~45 min / MP on CPU), so the dialog shows an estimate and warns; default is now **Natural** = General blended 60 % with the plain upscale (Strength slider 20–100). ETA shown while running.
- Text tools (Area Type / Type on a Path / vertical) reported "no text appears, caret keeps dropping, text vanishes": NOT reproduced here (Area/Vertical Area/Path/Point type, EN+AR, zoom 63 %, DPR 1.5, 1366×768, rotated/scaled/sheared frames, ellipse/star/polygon/rect, real Cairo font loaded, red/white/none frame fill) — all type, wrap and persist. Waiting for exact steps + build number from the user.

## 5-ٳ build 230 — drawing precision (user screenshot: polygon 11 sides, star 14 points)
- Cause of "shapes come out with more sides": a leftover handler changed the side/point count of the selected Polygon/Star (and the remembered default SHD) on every plain ArrowUp/ArrowDown while the tool was active (nudging with the arrows kept adding sides, up to 14). Now only Alt+Up/Down does that; during a drag the arrows still change the count (Illustrator behaviour). Test shp2.js.
- Pencil / Paintbrush / Blob Brush accuracy: fidelity tolerances tightened (Pencil 0.4/1/2/4/8 px, Brush & Blob 0.3/0.6/1.2/2.4/4.8 px) and the default moved from the middle to level 2 (Pencil 1 px, Blob 0.6 px). Slider unchanged (Accurate ↔ Smooth).
- Shaper: new "rectangle at any angle" recognition (minimum-area box of the convex hull, snapped square when w≈h) — a tilted rectangle used to be turned into an ellipse; ellipse / hexagon / pentagon / triangle / circle / line unchanged.
- Join tool: duplicate and collinear anchors left by a join are removed (clean corner: M…L corner L end).

## 5-ٴ build 231 — Area Type: free typing (no clipping, no red + marker)
- User (latest build, real machine): typed text in Area Type runs to the bottom of the shape and then disappears completely; wants to keep typing without limits and the red "+" overflow marker removed.
- areaLayout: the last frame no longer clips (GROW): when the shape is full the text keeps flowing BELOW it at the full width of the frame; nothing is hidden, so `of` stays false and the overflow marker never appears. Not applied to threaded frames (Remove Threading / linked text) or vertical area type (they still behave like Illustrator). Safety counter prevents any infinite layout loop; narrow star tips no longer produce one-letter lines below the shape.
- Test: ovf.js (rectangle + ellipse: every character rendered, persists after leaving the text). typem.js Smart Punctuation failure is the old known one.

## 5-ٵ build 232 — all type tools behave the same: typing never stops, text never disappears
- Review of every type tool (Point, Area, Path, Vertical, Vertical Area, Vertical Path; EN + AR): test typeall.js.
- Area Type (since 231) and now **Vertical Area Type** keep flowing past the frame (columns continue beyond the shape) instead of clipping.
- **Type on a Path**: text that does not fit on the path used to be hidden (and a red marker shown). It now continues in a straight line from the path's end (a separate `text[data-tpt]` tail that is rebuilt on every edit, so lengthening the path simply pulls the text back onto it); the red overflow marker is no longer drawn. An explicit end bracket still cuts the text (user's choice).
- **Vertical Type on a Path** was broken (glyphs printed on top of each other because writing-mode:vertical-rl + rotate=90 were combined with textPath): it now flows along the path like readable sideways text (top→down on a vertical path).
- typem.js "Smart Punctuation" is the old known failure.

## 7 — User's 28-item list (build 233 onward). Status log
Batch A2 (build 233): #1 Up/Down arrows add/remove sides again while Polygon/Star tool is active + the control-bar Sides/Points field; #23 every numeric field has ▲▼ steppers (hover/focus; Shift ×10; hold to repeat; fires input+change); #15 every flyout/pop-up list is clamped inside the window (tests/flyclamp.js); #20 Preferences: Light and Medium Light removed, Canvas "White" removed, Medium Dark deepened (#464646); stored light/white prefs fall back to Dark/match; #6 (interpreted) View › Trim View hides artwork outside the artboards.
Not reproducible here (waiting for exact steps from the user): #27 (shape/colour disappears), #26 (layer items disappear). Tried: Color Picker OK/Cancel RGB+CMYK, swatches fill/stroke, toolbox chips, Outline view (Ctrl+Y) — all work; the Outline badge was added in build 225.
Remaining: B1 (#2 #3 #4 #21), B2 (#7 #8 #11 #12 #13), B3 (#9 #10 #14), B4 (#24 #25 #26 #28), B5 (#5), C1 (#16), C2 (#18 #19), C3 (#17 #22).
Batch B1 (build 234): #2 Shaper now recognises stars (5..12 points, any rotation, exact point count and inner/outer ratio from the radial profile) and tilted rectangles; #3 Pencil strokes keep their original points, a control-bar **Accuracy** slider (1–5) re-fits the selected stroke any time (Undo works; a hand-edited path is never overwritten); "redraw over a selected path to reshape it" already existed and is now in the hint; #4 Join tool: scrubbing over the excess end of ONE path that crosses another trims it exactly at the crossing (it used to close the path with a Z). Tests: pcfit.js, join3.js; star detection verified with 5/6/7/8/12-point hand-drawn stars. Gradient (#21) pending.
Batch B1b (build 235-236): #21 new **Gradient panel** (Window › Gradient, Ctrl+F9): Fill/Stroke target, Linear/Radial, angle, radial aspect ratio, stops with colour / opacity / location, midpoints, click the bar to add a stop (inherits colour+opacity), drag a stop off the bar or Delete to remove, Reverse; stop opacity is real (`stop-opacity`); undo/redo covered (tests/gradp.js). #19 system fonts are now read automatically (at start-up when the browser has already granted access, otherwise on the first click/key press). Numeric stepper hide-timer race fixed.
Audited without finding a failure (basic scenarios, numerically): Shear (dialog H/V + interactive drag, exact), Reflect (drag axis, two-click axis, Shift 45°, Alt copy), Measure, Width, Artboard tool drag, Shape Builder, Blend, Draw Normal/Behind/Inside, Stroke panel (exists: weight, caps, joins, limit, align, dashes, arrowheads, profile). These need the user's concrete failing steps (#7 #8 #9 #10 #11 #12 #13 #14 #24 #25 #26 #27 #28).
Batch B2 (build 237-238): **Artboard tool control bar** was effectively invisible — the Artboard bar (Preset, Name, X/Y/W/H, Move artwork, New, Delete, Options) had been pushed into the » overflow pop-up by the generic "No Selection / X Y W H / Document Setup" group. In Artboard mode the header now shows ONLY the Artboard bar (label "Artboard"); added Show Center Mark / Cross Hairs / Video Safe Areas (per artboard, drawn in the canvas, never exported; tests/abbar.js). Selected shapes whose fill AND stroke are both None now show their path outline (Illustrator does) — the fuzz run (tests/fuzz.js, ~700 random operations over drawing, colours, panels, layers, groups, clipping, compound, pathfinder, isolation, undo/redo, zoom) found no vanishing objects except this one (a shape with no fill and no stroke is simply invisible).

## build 239
- Draw Inside: يرجع Draw Normal لوحده لما تلغي التحديد أو تحدد أكتر من عنصر بأداة مش رسم؛ علامات زوايا منقطة حوالين الشكل الهدف (زي اليستريتور)؛ رسالة لو الشكل الجديد برة الشكل الحاضن. (tests/dmin.js)
- شريط التحكم (Control bar) يفتح دايمًا فوق؛ اختيار Dock to Bottom مبقاش بيتحفظ. (tests/ctltop.js)

## build 240
- Area Type و Type on a Path: الكلام بيفضل جوه الشكل / على المسار (زي اليستريتور)، الكتابة مش بتقف، والباقي بيظهر لما تكبر الشكل. علامة + الحمرا رجعت عشان تعرف إن في كلام مستخبي. (tests/typeall.js, tests/areagrow.js؛ ovf.js اتشال لأنه كان بيختبر السلوك القديم)
- الكلام بيتقاس من جديد أول ما أي خط يخلص تحميل (خطوط جوجل، خطوط الجهاز، الخطوط المرفوعة) — ده كان سبب تداخل الحروف وخروج السطور برة المربع. (tests/fontlate.js)

## build 241
- تصحيح الرسم (Pencil / Paintbrush / Blob Brush): الخط بيتظبط قبل ما يتحول لمسار (إعادة توزيع النقط بالتساوي + تنعيم قوته على حسب مؤشر Accurate↔Smooth)، والخط اللي شبه مستقيم بيبقى مستقيم فعلًا. الإعداد الافتراضي رجع للنص (3) زي اليستريتور. (tests/straight.js, tests/pcfit.js)

## build 242
- Spiral: الإعدادات الافتراضية زي اليستريتور (Decay 80% و10 segments)؛ زيادة الـ segments بالسهم بتضيف لفات للداخل والطرف الخارجي ثابت تحت الماوس؛ الـ segments الصغيرة جدًا اللي مش بتبان مبقتش بتتراكم في النص؛ Decay أكبر من 100% بيلف للخارج صح. (tests/spiral.js)

## build 243
- Knife اتكتب من جديد على محرك الـ Pathfinder: القطع بيحافظ على المنحنيات الحقيقية (كان بيحولها لخطوط صغيرة مكسرة)، بيشتغل على الأشكال من غير لون والـ Compound paths، القطع اللي بيقف جوه الشكل مش بيقطع، والخط المعوج اللي بيعدي مرتين بيطلع 3 قطع. (tests/knife.js)
- Scissors: بعد القص، نقطتين القطع بيبانوا متحددين زي اليستريتور.

## build 244
- Magic Wand: كل شكل اتحدد بيبان لوحده بحدوده ونقطه (زي اليستريتور) بدل مربع واحد بس حوالين الكل.
- Gradient: دبل كليك على نقطة اللون (في لوحة الـ Gradient أو على الشكل بأداة الـ Gradient) بيفتح نافذة صغيرة فيها Color و Swatches والـ Opacity، وفي زرار … للـ Color Picker الكامل. السبب القديم: اللوحة بتتعاد رسمتها مع كل ضغطة فالمتصفح مكانش بيبعت dblclick. (tests/gstop.js)

## build 245
- Align: لما يكون في شكل واحد متحدد، الـ Align بيرصه على الـ Artboard تلقائيًا زي اليستريتور (كانت الزراير مطفية/رمادي). شكلين أو أكتر بيترصوا على بعض زي الأول.
- Properties: كلمة Stroke بتفتح لوحة الـ Stroke، وOpacity بتفتح الـ Transparency، وAppearance بتفتح الـ Appearance، وFill بتفتح الـ Swatches (الكلمات عليها خط تحتها). (tests/propal.js)

## build 246
- Free Transform: الشريط الصغير بتاع اليستريتور بيظهر مع الأداة: Constrain / Free Transform / Perspective Distort / Free Distort، والتشويه والمنظور بقوا يشتغلوا من غير ما تمسك Ctrl+Alt+Shift (القديم لسه شغال بالأزرار). (tests/ftw.js)
- التحديد مبقاش بيقف: لو لوحة حصل فيها خطأ وهي بتتحدث مبقتش بتوقف رسم التحديد، ولو حصل خطأ في نص سحبة الحالة بتترجع لطبيعتها.

## build 247
- Shape Builder: السحب السريع مبقاش بيفوّت مناطق (المسافة بين حركتين للماوس بتتفحص كلها)؛ الجزء المشترك اللي متسحبش عليه مبقاش بيتكرر نسختين فوق بعض (كل منطقة ملك شكل واحد)؛ خط أحمر بيتبع الماوس وانت بتسحب زي اليستريتور. (tests/sbd.js, tests/sbd0.js)

## build 248
- أداة الـ Artboard: إطار منقط أبيض وأسود حوالين الـ Artboard النشط، والاسم بقى بصيغة اليستريتور "01 - Artboard 1" وبيبقى أبيض للنشط.
- Rotate / Scale / Reflect / Shear: مبقاش في مربع مستقيم بيكبر حوالين الشكل وهو بيلف؛ الشكل نفسه هو اللي بيتحدد ونقطه بتلف معاه زي اليستريتور.

## build 249–250 (مراجعة اللوحات)
- أي لوحة بتتفتح (Stroke، Transparency، Appearance، Gradient…) عمود اللوحات بيتحرك لوحده لحد ما تبان كاملة؛ الـ Stroke كان آخره (Profile ومحاذاة الأسهم) مستخبي تحت الشاشة. (tests/dkvis.js)
- Stroke: اختيار الـ Profile مكانش بيتطبق (اللوحة كانت بتتحدث في النص وتمسح الاختيار) — اتصلح. كل الخانات اتجربت: Weight/Cap/Corner/Limit/Dashed/Arrowheads/Profile/Align. (tests/strokep.js)
- Transparency: صور مصغرة للشكل وللـ Opacity Mask جنب بعض زي اليستريتور؛ Blend/Opacity/Make Mask/Invert/Release/Undo اتجربوا. (tests/transp.js)
- Appearance: كلمة Stroke بتفتح لوحة الـ Stroke، وOpacity بتفتح الـ Transparency؛ Add New Fill/Stroke/Effect و Clear و Duplicate و Delete اتجربوا. (tests/appear.js)
- Pathfinder: الـ 10 عمليات + Undo اتجربت بالألوان والمساحات وكلها مظبوطة. (tests/pfall.js)
- Layers: الاختبارات القديمة كلها شغالة (الفشلين الباقيين في layers.js من الاختبار نفسه: كان بيضغط بأداة المستطيل).

## build 251
- التحديد بشكل اليستريتور: كل شكل متحدد بتتعلم حدوده بلون اللير، ونقطه مربعات صغيرة مليانة، وفي نقطة في نصه. الـ Magic Wand بقى بالشكل ده بالظبط من غير مربع حوالين الكل؛ والـ Selection / Lasso بيبينوا نفس الحاجة ومعاها المربع بمقابض التكبير زي اليستريتور.
- اللون هو لون اللير (الافتراضي Light Gray لأن الأزرق اتشال من الواجهة في build 208 بناءً على طلبك)؛ لو عايزه أزرق زي اليستريتور بالظبط بيتغير من Layer Options > Color.
- مراجعة شاملة: كل الاختبارات (143) اتشغلت؛ أي فشل اتقارن بنسخة build 238 وطلع قديم بنفس الشكل، مفيش حاجة باظت.

## build 252
- لون التحديد بقى ألوان اللوجو: ذهبي #F0C374 لحدود الشكل ونقطه والـ hover، وإطار رمادي غامق #3a3a3a حوالين النقط، والمربع والمقابض رمادي. لو اللير ليه لون تاني من Layer Options التحديد بياخده.

## build 253 (الدفعة 1 من النواقص)
- أرقام الكيبورد زي اليستريتور: 1..9 = شفافية 10..90%، و0 = 100% للعنصر المتحدد (مش وانت بتكتب). (tests/b1keys.js)
- Alt لو اتداس في نص سحب التحريك بيعمل نسخة (الأصل يفضل مكانه)، وUndo واحد يشيلها.
- اتراجعوا وطلعوا شغالين (الاختبارات القديمة كانت غلط واتصلحت): أداة الـ Gradient بالسحب، Rotate 90°، Smart Punctuation.

## build 254 (الدفعة 2: Effects)
- Undo بعد أي Effect (زي Zig Zag) بيرجّع المستطيل/البيضاوي Live Shape زي ما كان. السبب كان إن الضغط على Ctrl بيقلب الأداة مؤقتًا لـ Direct Selection وهي كانت بتحوّل الشكل لمسار عادي بمجرد عرض نقطه؛ دلوقتي بتعرض النقط على نسخة، والتحويل بيحصل بس لما تمسك نقطة أو ضلع فعلًا (زي اليستريتور).
- Pucker & Bloat اتكتب من جديد بطريقة اليستريتور: Bloat بيطلع وردة منفوخة، Pucker بيطلع نجمة مدببة (القديم كان بيصغّر الشكل).
- تصدير SVG: الـ defs بقت نظيفة من غير xmlns مكرر. Transform Effect وتصدير الظل طلعوا شغالين؛ الاختبارات القديمة اتصلحت (كانت بتقيس حدود الشكل الأصلي، واليستريتور نفسه بيعمل كده لما Use Preview Bounds مقفولة).

## build 255 (الدفعة 3: Layers + النوافذ)
- Layers: عدد اللايرات ("2 Layers") ظاهر تحت زي اليستريتور، والأزرار في سطر واحد. زرار الحذف بيتطفي لو اللير المختار هو آخر لير (زي اليستريتور) بدل ما يتداس ومايعملش حاجة.
- كل نوافذ الأسئلة (Delete Layer وغيرها): الـ Enter بقى بيوافق والـ Esc بيلغي فعلًا؛ قبل كده الـ Enter كان بيضيع لأن التركيز كان فاضل على الزرار اللي ورا النافذة. التركيز بقى بيروح جوه النافذة.
- اتراجعوا وطلعوا شغالين (اختبارات قديمة اتصلحت): ومضة Locate، تحديد عنصر جوه جروب من اللوحة، تأكيد حذف لير فيه رسم. حقل البحث النصي اتشال بطلبك قبل كده (العدسة بدله).

## الدفعة 4: Swatches (من غير تغيير في البرنامج)
- اتراجعت كلها على لوحة الـ Swatches الحقيقية وطلعت شغالة: دبل كليك = Swatch Options، New Swatch بيسأل على الاسم/النوع/Global، New Color Group، Swatch Libraries، Thumbnail/List views في قايمة اللوحة، الترتيب بالسحب، والـ Global Swatch بيلوّن كل الأشكال اللي مستخدماه. swprobe.js القديم كان بيفحص نافذة اللون الصغيرة مش اللوحة، واتشال (tests/swpanel.js بداله).

## build 256: لوحة Transform (Window > Transform، Shift+F8)
- نقطة المرجع (9 نقط، مشتركة مع شريط التحكم والـ Properties)، X/Y/W/H، ربط النسب، الدوران، الـ Shear، خصائص المستطيل (نصف قطر الزوايا) والمضلع/النجمة (عدد الأضلاع)، Scale Strokes & Effects، وقايمة اللوحة فيها Flip Horizontal / Vertical. الأسهم فوق/تحت بتزوّد وتنقّص (Shift ×10)، وكل تغيير ليه Undo. (tests/tfpanel.js)

## build 257: لوحة Graphic Styles (Window > Graphic Styles، Shift+F5)
- ستايلات جاهزة (Default، Drop Shadow، Black Outline، Dashed، Gold، Soft Glow). ضغطة على الستايل بتطبق اللون والحدود والشفافية والـ Effects والـ Gradient على المتحدد (بـ Undo). زرار ➕ بيحفظ شكل العنصر المتحدد كستايل جديد باسم، دبل كليك لتغيير الاسم، حذف بتأكيد، Break Link، والستايلات بتتحفظ في المتصفح. (tests/gstyles.js)

## build 258: لوحة Symbols (Window > Symbols، Shift+Ctrl+F11)
- New Symbol من المتحدد (الرسم بيتحول لنسخة Instance في نفس مكانه زي اليستريتور)، Place Symbol Instance، السحب من اللوحة للـ Artboard (النسخة بتنزل تحت الماوس)، Break Link (ترجع رسم عادي قابل للتعديل)، Redefine Symbol (كل النسخ بتتحدث وتفضل في أماكنها وحجمها)، Select All Instances، Delete Symbol (لو مستخدم بيفك النسخ الأول)، دبل كليك لتغيير الاسم. الرموز بتتحفظ في المتصفح، والنسخ بتتحفظ جوه الملف نفسه. النسخة المتحددة بيظهر لها المربع والنقطة اللي في النص بس زي اليستريتور. (tests/symbols.js)

## build 259: لوحة Brushes (Window > Brushes، F5)
- قايمة الفرش بصورة لكل فرشة (Basic، 5 pt. Round، Calligraphic، Tapered، وأي فرشة جديدة). ضغطة = تطبيق على المسار المتحدد وكمان بتختارها للـ Paintbrush. New Brush (Calligraphic أو Tapered: الحجم، الزاوية، الاستدارة، مع معاينة حية)، دبل كليك = Brush Options (كل المسارات اللي مستخدماها بتتحدث)، Duplicate، Delete (لو مستخدمة بيرجّع الخطوط Basic)، Remove Brush Stroke. الفرش الجديدة بتتحفظ في المتصفح. F5 مبقاش بيعمل Reload للصفحة. (tests/brushes.js)
- لسه مش موجود: Art Brush بصورة/رسمة على طول المسار، Scatter و Pattern brushes.

## build 260: #16 تحريك الواجهة (الجزء 1)
- اتفحص بالماوس: اللوحات (سحب التاب لبرّه = لوحة عايمة، رجوعها تاب في مجموعة أو تركيبها يمين/شمال، تغيير الحجم، الطي لأيقونات)، شريط الأدوات (يتشال ويتحرك ويرجع يتركّب يمين أو شمال، عمود أو عمودين)، شريط التحكم (فوق/تحت) — كلهم كانوا شغالين.
- الجديد: كل نوافذ الحوار (Offset Path، Swatch Options، Layer Options، Color Picker، Graphic Style/Symbol/Brush Options…) بتتسحب من عنوانها، وكل نافذة بتفتكر مكانها وتفتح فيه تاني زي اليستريتور. شريط الـ Free Transform الصغير ليه مقبض يتسحب منه ويفتكر مكانه، ونافذة لون نقطة الـ Gradient بتتسحب. Window > Workspace > Reset Essentials بيرجّع كل ده لمكانه الأصلي. (tests/movable.js)
- Workspaces: مكان شريط الأدوات (عايم/مركّب، عمود/عمودين، يمين/شمال) بقى جزء من الـ Workspace. New Workspace بيحفظه، والرجوع لـ Essentials بيرجّع الأدوات مركّبة شمال؛ قبل كده كانت الأدوات بتفضل مكانها. (tests/wscycle.js)

## build 261: #18 تغيير الاختصارات
- Edit > Keyboard Shortcuts (Ctrl+Alt+Shift+K) بقى فيه قسمين زي اليستريتور: Menu Commands (كل أوامر القوايم، ~170 أمر، متقسمة على القوايم، مع بحث) و Tools. اختصارات اليستريتور الأساسية محفوظة جوه البرنامج نفسه كأساس ومبتتغيرش؛ العميل بيغيّر براحته وتعديله بيتحفظ في المتصفح.
- اضغط على الأمر واضغط الاختصار الجديد (Ctrl / Alt / Shift). المتغير بيظهر بالذهبي. لو الاختصار مستخدم في أمر تاني بيتنقل مع رسالة تحذير؛ زرار حرف لوحده محجوز للأدوات. Clear / Default للأمر الواحد، و Reset All to Illustrator يرجّع كله. القوايم نفسها بتعرض الاختصار الجديد، والاختصار القديم بيتقفل فمبيعملش الأمر القديم. (tests/kshort.js)

## build 262: كل اختصارات اليستريتور للأدوات واللوحات
- اتفحص كل اختصار افتراضي في اليستريتور: 33 أداة موجودة كلها شغالة باختصارها، 19 لوحة كلها بتفتح باختصارها، وحوالي 90 اختصار في القوايم كلهم شغالين، وكمان X / Shift+X / D / / / F / Shift+D / , / .
- اتصلح: Ctrl+F9 (Gradient) مكانش شغال. اتضاف: F8 = New Symbol (زي اليستريتور).
- لوحات جديدة باختصاراتها: Color Guide (Shift+F3: قواعد Complementary/Analogous/Triad/Tetrad/Shades… + درجات فاتح وغامق، ضغطة تلوّن، وحفظ المجموعة في الـ Swatches)، Attributes (Ctrl+F11: Fill Rule Non-Zero/Even-Odd، Overprint، Show/Don't Show Center، URL، Note)، OpenType (Ctrl+Alt+Shift+T: Ligatures، Fractions، Ordinals، Swash، Alternates، أنواع الأرقام). (tests/ilkeys.js)
- أدوات اليستريتور اللي لسه مش موجودة في مسار أصلًا (فمفيش اختصار ليها): Perspective Grid (Shift+P)، Perspective Selection (Shift+V)، Symbol Sprayer (Shift+S)، Graph (J)، Mesh (U)، Slice (Shift+K)، Rotate View (Shift+H).

## build 263: حذف الخلفية أقوى (#22)
- موديل جديد Pro = BEN2 (رخصة MIT، 220 ميجا، بيتنزل أول مرة بس): حواف الشعر والفرو أنضف بكتير من IS-Net (اتقارن على صورة شعر كيرلي: IS-Net سايب هالة رمادي، BEN2 لأ). هو الافتراضي على أي جهاز فيه WebGPU، وعلى جهاز من غير كارت شاشة الافتراضي Balanced (Pro شغال برضه بس أبطأ).
- تمريرة تانية تلقائية: لو الموضوع واخد جزء من صورة كبيرة، الجزء ده بيتقص من الصورة الأصلية بدقتها الكاملة ويدخل الموديل تاني، والنتيجة بتتركب مع حواف ناعمة (بكسلات أكتر على كل حافة).
- تنعيم الحواف على الصورة نفسها (Guided Filter على دقة لحد 2560): الماسك بيلزق في حواف الصورة الحقيقية بدل التكبير العادي اللي كان بيطلع حواف مموّعة ومكسّرة.
- تنضيف ألوان الحواف (Decontaminate 45%) شغال افتراضي: مفيش لون سما أو حيطة في أطراف الشعر. يتغير من Edit Mask.
- أدوات مقارنة للاختبار: tests/rbcmp_tool.js و tests/rbfull_tool.js.

## build 263 (تكملة): رفع الجودة أقوى (#17)
- موديل جديد Photo = 4xNomosWebPhoto RealPLKSR (Philip Hofmann، CC BY 4.0 = مسموح تجاري مع ذكر الاسم، مكتوب في النافذة وفي models/README.md). متدرّب على صور حقيقية فيها ضوضاء وضغط JPEG/WebP وبلور. اتقارن على وش: ESRGAN الحاليين بيطلّعوا الجلد بلاستيك ويرسموا خط أبيض حوالين العين (ده "بيغيّر الملامح")؛ RealPLKSR بيحافظ على الرموش وملمس الجلد والملامح.
- اتحول لـ ONNX fp16 (15 ميجا، فرق أقل من درجة لون عن الأصل) واترفع في المستودع (models/)، والبرنامج بينزّله مرة واحدة من jsDelivr ولو فشل من GitHub مباشرة، بنسخة ثابتة برقم الـ commit.
- هو الافتراضي (Strength 90)، والموديلات القديمة لسه موجودة. اتجرب في المتصفح على صورة 90 بكسل: الملامح فضلت زي ما هي. (tests/rb9.js)
- اتجرب ومش هيتضاف: Back-Projection (بيرجّع تشوهات الـ JPEG).

## build 264: Upscale "Keep features 100%" (تلقائي)
- اختيار جديد مفتوح افتراضي في نافذة الـ Upscale: الأشكال والألوان والملامح الكبيرة بتتاخد من الصورة الأصلية نفسها، والموديل بيضيف التفاصيل الدقيقة بس، وأي تفصيلة بتبعد عن المسموح حواليها في الأصل بتتقصّ (مفيش كحل مخترع، مفيش جلد بلاستيك). بيشتغل على كل مربع وهو بيتكبر فمش بياكل ذاكرة. Photo بقى Strength 100 افتراضي.
- اتقاس على وش (256 → 1024، JPEG 85): Photo لوحده 31.35 dB، Photo + Keep features 32.10 dB (أقرب للأصل)، وبالعين اللون وشكل العين أقرب. (tests/uplock.js, tests/rb9.js)

## build 265: Symbol Sprayer Tool (Shift+S)
- بيرش نسخ من الرمز المختار في لوحة الـ Symbols حوالين الماوس وانت بتسحب؛ الرشة كلها Symbol Set واحد (جروب) بـ Undo واحد. Alt+سحب بيمسح نسخ من المجموعة المتحددة بالتدريج. [ و ] للقطر، ودبل كليك على الأداة = Symbolism Tools Options (القطر، الشدة، الكثافة، الحجم وتغييره، الدوران وتغييره). النسخ رموز حقيقية: Redefine Symbol بيحدّثها، و Ungroup بيفكها لنسخ منفصلة. (tests/sprayer.js)

## build 266: Slice Tool (Shift+K) + Slice Selection
- ارسم مستطيل = Slice، بيظهر بإطار أحمر ورقم (01، 02…) زي اليستريتور، ومبيطلعش في الطباعة ولا في تصدير الـ SVG/PNG. Shift مربع، Alt من النص. Slice Selection بيحدد ويحرك الـ Slices بس. Object > Slice: Make، Create from Selection، Divide Slice، Delete All. View > Hide/Show Slices. File > Export Slices… بيطلّع ZIP فيه PNG لكل Slice بدقة 1× لحد 4×. (tests/slices.js)

## build 267: Graph Tools (J)
- 7 أنواع زي اليستريتور: Column (J)، Stacked Column، Bar، Stacked Bar، Line، Area، Pie. اسحب مكان الرسم (أو اضغط لمقاس بالأرقام) → نافذة Graph Data (جدول: صفوف وأعمدة بأسمائها، + / − صف وعمود، Paste Data من Excel). الرسم جروب من أشكال عادية تتلوّن وتتعدل، فيه محاور وخطوط شبكة وأرقام وأسماء و Legend. Object > Graph > Type بيغيّر النوع، و Data… بيرجّع الجدول ويعيد الرسم، و Alt+دبل كليك على الرسم بيفتح الداتا. (tests/graphs.js)

## build 268: Mesh Tool (U) — Gradient Mesh
- ضغطة جوه شكل مليان = خطوط Mesh بتعدي بالنقطة والنقطة الجديدة بتاخد لون الـ Fill الحالي؛ اسحب أي نقطة تحرك الألوان؛ اختار نقطة واضغط لون من الـ Swatches/Color Picker تتلوّن؛ Alt+ضغطة على نقطة بتمسح خطوطها. الألوان بتسيح بنعومة (Catmull-Rom على الشبكة). Object > Create Gradient Mesh… (صفوف، أعمدة، Flat / To Center / To Edge، Highlight) و Release Gradient Mesh. بيترسم كصورة مقصوصة على شكل الشكل (الـ SVG مفيهوش Mesh)، والشبكة والألوان محفوظة جوه الشكل للتعديل وبتتعاد بعد Undo. (tests/mesh.js)
- الفرق عن اليستريتور: الشبكة بتبدأ على المربع اللي حوالين الشكل مش ماشية مع انحناءاته.

## build 269: Perspective Grid (Shift+P) + Perspective Selection (Shift+V)
- شبكة منظور بنقطتين هروب: حيطة شمال (أزرق)، أرضية (أخضر)، حيطة يمين (برتقالي)، خط أفق، ونقطة أصل. بأداة Perspective Grid بتسحب نقط الهروب والأفق والأصل، والأشكال اللي على الشبكة بتتعاد معاها. شريط صغير + أزرار 1/2/3/4 لاختيار السطح. View > Perspective Grid: Show/Hide (Ctrl+Shift+I)، Reset Grid، Release with Perspective.
- المستطيل/البيضاوي/المستطيل المدوّر/المضلع/النجمة لما الشبكة ظاهرة بيترسموا على السطح المختار بالمنظور. Perspective Selection بيحرك الشكل على سطحه (بيصغر ناحية نقطة الهروب)، ولو سحبت بيه شكل عادي بيتلزق على السطح المختار. الحسابات Homography حقيقية (اتجربت إن الخطوط البعيدة بتتقابل في نقطة الهروب والتحويل بيرجع لنفسه). (tests/persp.js)

## build 270: Rotate View Tool (Shift+H) — كده كل أدوات اليستريتور موجودة
- بتلف الشاشة مش الرسمة (زي ما تلف الورقة)، Shift كل 15°، المؤشر فوق يمين بيبين الزاوية وبيرجّع للصفر لو ضغطت عليه، View > Rotate View (زوايا جاهزة) و Reset Rotate View (Shift+Ctrl+1)، ودبل كليك على الأداة بيرجّع. الدوران حوالين أصل الرسمة فالتكبير عند الماوس والـ Hand والتحديد والسحب والرسم كلهم بيشتغلوا صح وهي ملفوفة (اتقاس: سحب 100px يمين = 100px على المحور الملفوف بالظبط، والنقطة تحت الماوس بتفضل ثابتة في الزووم). (tests/rotview.js)
- معروف: المساطر (Rulers) وشريط حذف الخلفية العائم مش بيلفوا مع الشاشة.

## build 271: Art / Scatter / Pattern Brushes
- New Brush بقى فيه 5 أنواع: Calligraphic، Tapered، Art، Scatter، Pattern. الـ 3 الجداد بياخدوا الرسمة المتحددة (بألوانها) وبيبقوا فرشة: Art بيشدّها على طول الخط، Scatter بيرش نسخ منها (Spacing، Size/Scatter/Rotation variation)، Pattern بيكررها بلاطات ماشية مع الانحناء. Width % للعرض، معاينة حية، "Use the selected artwork" لتغيير الرسمة، والـ Paintbrush بيرسم بيهم. المسار نفسه بيفضل قابل للتعديل وبيتعاد رسم الفرشة عليه. (tests/artbrush.js)

## build 272: شبكة الـ Mesh بتمشي مع شكل الحاجة
- الشبكة بتتبني من حدود الشكل نفسه (Coons patch من 4 جوانب الحدود) زي Create Gradient Mesh في اليستريتور: على الدايرة الشبكة بتبقى كروية، وعلى أي شكل بتلزق في حوافه، والألوان بتغطي الشكل كله. سحب النقط بيتحسب كإزاحة فوق الشبكة دي، والخطوط الجديدة بتنزل على الشكل. الـ Mesh القديمة (من غير حدود) بتفضل شغالة زي ما هي.

## build 272 (تكملة): Rotate View مع باقي الواجهة
- شريط حذف الخلفية العائم بيقف فوق الشكل حتى والشاشة ملفوفة، والزووم بالضغط بأداة الـ Zoom بيكبّر عند النقطة الصح، ومكان الكتابة (IME) بيتحسب بالدوران. المساطر بتبهت وهي ملفوفة (بتقيس الـ Artboard من غير دوران) وعليها توضيح. (tests/rotview.js)

## build 273: زراير Properties > Document بقت كلها بلون واحد
- Rulers / Grid / Snap to Grid / Snap to Point / Smart Guides / Show Guides / Lock Guides / Clear Guides كلهم بنفس الخلفية والإطار؛ اللي شغال عليه علامة ✓ ذهبي بدل ما يبقى لونه أفتح (اتجرب على الثيمين Dark و Medium Dark). (tests/proptoggles.js)

## build 274 — Properties panel with nothing selected, like Illustrator
- Document: Units dropdown (ruler units), Artboard dropdown ("01 - Artboard 1", jumps and fits), Edit Artboards button (Artboard tool).
- Rulers & Grids / Guides / Snap Options are small icon toggles with tooltips and shortcuts; the active one gets a subtle grey square (same in every theme). Added Transparency Grid and Snap to Pixel.
- Preferences: Keyboard Increment and Scale Strokes & Effects, saved to the real preferences. Scale Corners is not shown because the app has no such feature yet.
- Quick Actions: Document Setup and Preferences.
- Test: tests/proptoggles.js (16 checks).

## build 275 — Masar logo + Home in the menu bar, Home screen
- The menu bar starts like Illustrator's: the Masar logo, a Home (house) button, a divider, then File … Help. The logo left the control bar.
- Home screen (covers the workspace, menus stay usable; Esc or the Home button closes it): New file (New Document dialog), Open, Quick start presets (A4, Letter, Postcard, Common, HDV/HDTV 1080, Square post, Story, More presets), Recent files with thumbnail, time and size; × removes an entry.
- Recent files are remembered in this browser when a file is opened or saved (up to 8, 1.5 MB each); clicking one reopens it (asks to save unsaved changes first).
- window.docCreate(w,h,name,unit) creates a one-artboard document. Test: tests/home.js.

## build 276 — Home screen and New Document like Illustrator
- Home opens at startup (option "Show Home at startup" at the bottom of Home). Sidebar: New file, Open, Home, Learn, Your files, Deleted.
- Home: quick start Letter, A4, Postcard, Common, iPhone X, HDV/HDTV 1080, More presets; Recent with Sort (Last opened / Name / Size), Filter Recent Files, grid / list view, kind column.
- Your files: the full recent list. Deleted: files removed from Recent, with Restore / Delete / Delete all.
- Learn: every tool with its icon, shortcut and description, searchable; clicking a card picks the tool.
- New Document (Ctrl+N, New file, More presets): tabs Recent, Saved, Mobile, Web, Print, Film & Video, Art & Illustration with the blank document presets (sizes in Illustrator units, 2 decimals), Preset Details (name, Save Preset, width, height, units, orientation, artboards, spacing, color mode), Close / Create; double-click a preset creates it. Recent remembers created sizes; Saved keeps user presets.
- Not included (no real feature behind them yet): Bleed, Raster Effects, Preview Mode, Adobe cloud items (Shared with you, Stock templates).
- tests/lib.js turns startup Home off for the other tests; tests home, doc, file, dlgx updated.
