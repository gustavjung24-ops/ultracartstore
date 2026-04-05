# Common vs Navigation Catalog Boundary

## Muc tieu

Tai lieu nay chot ranh gioi giua `common` toi gian va `navigation catalog` de tranh trùng lap key, tranh hardcode text trong component, va giu i18n on dinh theo tung pass.

## Ranh gioi bat buoc

| Lop | Noi dung duoc phep | Noi dung KHONG duoc phep |
|---|---|---|
| `common` | Chuoi dung chung toan site: loading, noData, readMore, search, language, submit, mainMenu | Label menu da co nghia nghiep vu (For Clinicians, Good Nutrition, Careers, Privacy Policy...) |
| `topNav` / `mainNav` / `utilityNav` / `footerLegal` | Label menu cap cao (header/footer) cho EN/VI | Href, logic render, layout behavior |
| `lib/navigation-catalog.ts` | Cau truc menu, href, key on dinh, fallback tam thoi | Noi dung page/body copy dai, slogan, article content |

## Nguon su that (Source of Truth)

1. Label menu cap cao: `public/locales/en/common.json` va `public/locales/vi/common.json`.
2. Cau truc + href + key menu chinh thuc: `lib/navigation-catalog.ts`.
3. Component chi render: `components/Header.tsx`, `components/Footer.tsx`.

## Quy tac khi them hoac sua menu

1. Tao key moi trong namespace dung (`topNavMenus.*`, `healthTopicsMenu.*`, ...), khong dat key vao `common`.
2. Neu label cap cao: phai co `localePath` tro den `topNav` / `mainNav` / `utilityNav` / `footerLegal`.
3. Neu chua co key locale cho submenu: duoc fallback tam thoi trong `lib/navigation-catalog.ts`, sau do phai bo sung locale key trong pass ke tiep.
4. EN/VI phai dong bo key parity 1-1.
5. Component khong duoc hardcode text menu song ngu trong JSX.

## Definition of Done

1. Header khong con so huu object label song ngu.
2. Footer su dung `utilityNav` va `footerLegal` de render label.
3. Tat ca menu item deu co `key` on dinh trong `lib/navigation-catalog.ts`.
4. Co crosswalk key tai `docs/pcrm-menu-crosswalk.md`.
