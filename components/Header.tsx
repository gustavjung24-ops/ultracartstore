 'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { getSiteInfo, type Language } from '@/lib/translations';

type NavLeaf = {
  href: string;
  label: { en: string; vi: string };
};

type NavGroup = {
  href: string;
  label: { en: string; vi: string };
  items: NavLeaf[];
};

const utilityLinks: NavLeaf[] = [
  { href: '/good-nutrition/nutrition-for-clinicians', label: { en: 'For Clinicians', vi: 'Dành cho bác sĩ' } },
  { href: '/good-nutrition/nutrition-for-clinicians/medical-students', label: { en: 'For Medical Students', vi: 'Dành cho sinh viên y' } },
  { href: '/term/scientists', label: { en: 'For Scientists', vi: 'Dành cho nhà khoa học' } },
  { href: '/about-us', label: { en: 'About Us', vi: 'Về chúng tôi' } },
  { href: '/news/blog', label: { en: 'Blog', vi: 'Blog' } },
  { href: '/ways-to-give', label: { en: 'Ways to Give', vi: 'Các cách ủng hộ' } },
  { href: '/donate', label: { en: 'Donate', vi: 'Quyên góp' } },
];

const navGroups: NavGroup[] = [
  {
    href: '/good-nutrition',
    label: { en: 'Good Nutrition', vi: 'Dinh dưỡng tốt' },
    items: [
      { href: '/good-nutrition', label: { en: 'Plant-Based Diets', vi: 'Chế độ ăn thực vật' } },
      { href: '/good-nutrition/three-reasons-go-vegan', label: { en: 'Three Reasons to Go Vegan', vi: 'Ba lý do ăn chay' } },
      { href: '/good-nutrition/plant-based-diets/recipes', label: { en: 'Recipes', vi: 'Công thức' } },
      { href: '/good-nutrition/nutrition-for-athletes', label: { en: 'Nutrition for Athletes', vi: 'Dinh dưỡng cho vận động viên' } },
      { href: '/good-nutrition/nutrition-for-kids', label: { en: 'Nutrition for Kids', vi: 'Dinh dưỡng cho trẻ em' } },
      { href: '/good-nutrition/nutrition-information', label: { en: 'Nutrition Information', vi: 'Thông tin dinh dưỡng' } },
      { href: '/good-nutrition/nutrition-information/fiber', label: { en: 'Fiber', vi: 'Chất xơ' } },
      { href: '/good-nutrition/nutrition-information/protein', label: { en: 'Protein', vi: 'Chất đạm' } },
    ],
  },
  {
    href: '/ethical-science',
    label: { en: 'Ethical Science', vi: 'Khoa học đạo đức' },
    items: [
      { href: '/ethical-science', label: { en: 'Overview', vi: 'Tổng quan' } },
      { href: '/ethical-science/ethical-education-and-training/surgery-training', label: { en: 'Surgery Training', vi: 'Đào tạo phẫu thuật' } },
      { href: '/ethical-science/animal-testing-and-alternatives/chemical-testing-reform', label: { en: 'Chemical Testing Reform', vi: 'Cải cách thử nghiệm hóa chất' } },
      { href: '/ethical-science/animal-testing-and-alternatives/nura', label: { en: 'Alternatives to Animal Use', vi: 'Giải pháp thay thế thử nghiệm động vật' } },
    ],
  },
  {
    href: '/clinical-research',
    label: { en: 'Clinical Research', vi: 'Nghiên cứu lâm sàng' },
    items: [
      { href: '/clinical-research', label: { en: 'Overview', vi: 'Tổng quan' } },
      { href: '/clinical-research/recruitment', label: { en: 'Recruitment', vi: 'Tuyển người tham gia' } },
      { href: '/t2dstudy', label: { en: 'T2D Study', vi: 'Nghiên cứu T2D' } },
      { href: '/barnard-medical-center', label: { en: 'Barnard Medical Center', vi: 'Trung tâm y khoa Barnard' } },
    ],
  },
  {
    href: '/health-topics',
    label: { en: 'Health Topics', vi: 'Chủ đề sức khỏe' },
    items: [
      { href: '/health-topics/cancer', label: { en: 'Cancer', vi: 'Ung thư' } },
      { href: '/health-topics/diabetes', label: { en: 'Diabetes', vi: 'Tiểu đường' } },
      { href: '/health-topics/high-blood-pressure', label: { en: 'High Blood Pressure', vi: 'Cao huyết áp' } },
      { href: '/health-topics/weight-loss', label: { en: 'Weight Loss', vi: 'Giảm cân' } },
      { href: '/health-topics/healthy-aging', label: { en: 'Healthy Aging', vi: 'Lão hóa khỏe mạnh' } },
      { href: '/health-topics/gut-bacteria', label: { en: 'Gut Bacteria', vi: 'Vi khuẩn đường ruột' } },
    ],
  },
  {
    href: '/about-us',
    label: { en: 'About Us', vi: 'Về chúng tôi' },
    items: [
      { href: '/about-us', label: { en: 'About PCRM', vi: 'Giới thiệu PCRM' } },
      { href: '/about-us/our-victories', label: { en: 'Our Victories', vi: 'Thành tựu của chúng tôi' } },
      { href: '/contact', label: { en: 'Contact Us', vi: 'Liên hệ' } },
      { href: '/events/mission-critical', label: { en: 'Mission Critical', vi: 'Mission Critical' } },
    ],
  },
  {
    href: '/news/blog',
    label: { en: 'News & Events', vi: 'Tin tức & Sự kiện' },
    items: [
      { href: '/news/blog', label: { en: 'All News', vi: 'Tất cả tin tức' } },
      { href: '/news/health-nutrition/plant-based-diets-reduce-risk-cancer', label: { en: 'Health & Nutrition News', vi: 'Tin sức khỏe & dinh dưỡng' } },
      { href: '/news/good-science-digest', label: { en: 'Good Science Digest', vi: 'Bản tin khoa học' } },
      { href: '/news/news-releases', label: { en: 'News Releases', vi: 'Thông cáo báo chí' } },
      { href: '/events/power-foods-diet', label: { en: 'Events', vi: 'Sự kiện' } },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') as Language | null;
    if (saved) setLanguage(saved);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
  };

  const siteInfo = getSiteInfo(language);
  const currentLabels = language === 'vi'
    ? {
        search: 'Tìm kiếm',
        donate: 'Quyên góp',
        menu: 'Menu',
        mission: 'Thúc đẩy y học dự phòng từ năm 1985',
      }
    : {
        search: 'Search',
        donate: 'Donate',
        menu: 'Menu',
        mission: 'Promoting preventive medicine since 1985',
      };

  const tLabel = (label: { en: string; vi: string }) => (language === 'vi' ? label.vi : label.en);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="bg-[#18354a] px-4 py-2 text-[11px] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="hidden items-center gap-2 text-slate-200 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f0ad4e]" />
            <span>{currentLabels.mission}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {utilityLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm border border-white/15 px-2.5 py-1 font-semibold uppercase tracking-[0.08em] text-white no-underline hover:bg-white/10"
              >
                {tLabel(item.label)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-4 no-underline hover:opacity-90">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#0f5c73] bg-[#f3f7f9] text-lg font-extrabold uppercase tracking-[0.08em] text-[#0f5c73]">
              PC
            </div>
            <div className="min-w-0">
              <div className="text-base font-extrabold uppercase tracking-[0.08em] text-[#0f2433] sm:text-lg">
                Physicians Committee
              </div>
              <div className="text-sm font-semibold text-[#007fab]">{siteInfo.name}</div>
              <div className="hidden text-xs text-slate-500 md:block">{siteInfo.description}</div>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+1-202-527-7306" className="text-sm font-semibold text-slate-700 no-underline hover:text-[#007fab]">
              202-527-7306
            </a>
            <button className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              {currentLabels.search}
            </button>
            <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
            <Link
              href="/donate"
              className="rounded-sm bg-[#f0ad4e] px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] text-slate-900 no-underline hover:bg-[#e39c36]"
            >
              {currentLabels.donate}
            </Link>
          </div>
        </div>
      </div>

      <nav className="hidden bg-[#007fab] lg:block">
        <div className="mx-auto flex max-w-7xl items-stretch justify-between px-4 md:px-6">
          {navGroups.map((group) => (
            <div key={group.href} className="group relative">
              <Link
                href={group.href}
                className="flex h-full items-center px-4 py-4 text-sm font-bold uppercase tracking-[0.05em] text-white no-underline hover:bg-[#005f87]"
              >
                {tLabel(group.label)}
              </Link>
              <div className="absolute left-0 top-full z-50 hidden min-w-[320px] border border-slate-200 bg-white p-4 shadow-xl group-hover:block">
                <div className="mb-3 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-[0.06em] text-[#007fab]">
                  {tLabel(group.label)}
                </div>
                <div className="grid gap-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-sm px-2 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 hover:text-[#007fab]"
                    >
                      {tLabel(item.label)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-200 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {mounted ? <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} /> : null}
            <Link href="/donate" className="rounded-sm bg-[#f0ad4e] px-4 py-2 text-sm font-bold text-slate-900 no-underline">
              {currentLabels.donate}
            </Link>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
            aria-label="Toggle menu"
          >
            {currentLabels.menu}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4">
          <div className="space-y-4">
            {navGroups.map((group) => (
              <div key={group.href} className="rounded-lg border border-slate-200">
                <Link
                  href={group.href}
                  className="block border-b border-slate-200 px-4 py-3 text-sm font-bold text-[#007fab] no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tLabel(group.label)}
                </Link>
                <div className="grid gap-1 p-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded px-3 py-2 text-sm text-slate-700 no-underline hover:bg-slate-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {tLabel(item.label)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 text-sm text-slate-700">
              <a href="tel:+1-202-527-7306" className="no-underline hover:text-[#007fab]">202-527-7306</a>
              <a href="mailto:info@pcrm.org" className="no-underline hover:text-[#007fab]">info@pcrm.org</a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

