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

**أخطاء اتصلّحت:** polygon 5→6 أضلاع، Shift+حروف أدوات، الكيبورد العربي، Alt+حرف، F10، `=`/`_`، **الـ tooltips مش بتظهر لأدوات flyout الأشكال (RoundedRect/Polygon/Star/Flare) وأدوات Type (Area/Path/Vertical/Touch Type)** — اتربطت.

**أخطاء لسه موجودة:**
1. **Control bar X/Y ≠ Properties X/Y**: الـ control bar بيعرض الركن العلوي الأيسر (75.03) والـ Properties بيعرض المركز (155.57) لنفس الشكل. في Illustrator الاتنين بيستخدموا نقطة المرجع (Reference Point) نفسها (الافتراضي: المركز).
2. **أرقام 1–0 ما بتغيّرش الـ opacity** (Illustrator: 1=10% … 0=100%).
3. الـ control bar بيتقص من اليمين على عرض 1500px (Opacity مقطوعة) — Illustrator بيعمل overflow menu.

**لسه ما اتختبرش:** Blob Brush, Paintbrush+Brushes, Curvature, Add/Delete Anchor/Anchor Point, Shaper, Smooth/Path Eraser/Join, Knife, Eraser, Free Transform, Arc/Spiral/Grids, Flare, Touch Type/Area Type, Align, Pathfinder, Layers (drag/search), Appearance, Swatches/Color, Stroke options, Transparency, Smart Guides، Isolation Mode، Clipping Mask، Effects.

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
