'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { type Language } from '@/lib/translations';

type NavLeaf = {
  href: string;
  label: { en: string; vi: string };
};

type NavGroup = {
  href: string;
  label: { en: string; vi: string };
  items: NavLeaf[];
  columns: 2 | 3;
};

type HeaderProps = {
  showDonateButton?: boolean;
};

type UtilityGroup = {
  href: string;
  label: { en: string; vi: string };
  items: NavLeaf[];
};

const utilityGroups: UtilityGroup[] = [
  {
    href: '/good-nutrition/nutrition-for-clinicians',
    label: { en: 'For Clinicians', vi: 'Dành cho bác sĩ' },
    items: [
      { href: '/good-nutrition/nutrition-for-clinicians', label: { en: 'Nutrition for Clinicians', vi: 'Dinh dưỡng cho bác sĩ' } },
      { href: '/good-nutrition/nutrition-for-clinicians/medical-students', label: { en: 'Medical Students', vi: 'Sinh viên y' } },
      { href: '/good-nutrition/nutrition-information', label: { en: 'Nutrition Information', vi: 'Thông tin dinh dưỡng' } },
      { href: '/good-nutrition/nutrition-information/protein', label: { en: 'Protein', vi: 'Chất đạm' } },
      { href: '/good-nutrition/nutrition-information/fiber', label: { en: 'Fiber', vi: 'Chất xơ' } },
    ],
  },
  {
    href: '/good-nutrition/nutrition-for-clinicians/medical-students',
    label: { en: 'For Medical Students', vi: 'Dành cho sinh viên y' },
    items: [
      { href: '/good-nutrition/nutrition-for-clinicians/medical-students', label: { en: 'Overview', vi: 'Tổng quan' } },
      { href: '/clinical-research/recruitment', label: { en: 'Research Recruitment', vi: 'Tuyển người tham gia nghiên cứu' } },
      { href: '/events', label: { en: 'Events', vi: 'Sự kiện' } },
      { href: '/news/good-science-digest', label: { en: 'Good Science Digest', vi: 'Bản tin khoa học' } },
    ],
  },
  {
    href: '/term/scientists',
    label: { en: 'For Scientists', vi: 'Dành cho nhà khoa học' },
    items: [
      { href: '/term/scientists', label: { en: 'Overview', vi: 'Tổng quan' } },
      { href: '/ethical-science', label: { en: 'Ethical Science', vi: 'Khoa học đạo đức' } },
      { href: '/clinical-research', label: { en: 'Clinical Research', vi: 'Nghiên cứu lâm sàng' } },
      { href: '/news/innovative-science-news', label: { en: 'Innovative Science News', vi: 'Tin khoa học đổi mới' } },
    ],
  },
  {
    href: '/about-us',
    label: { en: 'About Us', vi: 'Về chúng tôi' },
    items: [
      { href: '/about-us#leadership', label: { en: 'Leadership', vi: 'Ban lãnh đạo' } },
      { href: '/about-us/our-victories', label: { en: 'Our Victories', vi: 'Thành tựu của chúng tôi' } },
      { href: '/about-us/careers', label: { en: 'Careers', vi: 'Tuyển dụng' } },
      { href: '/about-us/careers/internships', label: { en: 'Internships', vi: 'Thực tập' } },
      { href: '/events', label: { en: 'Events', vi: 'Sự kiện' } },
      { href: '/about-us/financial-report', label: { en: 'Annual & Financial Reports', vi: 'Báo cáo thường niên' } },
      { href: '/barnard-medical-center', label: { en: 'Barnard Medical Center', vi: 'Trung tâm Barnard' } },
      { href: '/contact', label: { en: 'Contact Us', vi: 'Liên hệ' } },
    ],
  },
];

const navGroups: NavGroup[] = [
  {
    href: '/good-nutrition',
    label: { en: 'Good Nutrition', vi: 'Dinh dưỡng tốt' },
    columns: 3,
    items: [
      { href: '/good-nutrition', label: { en: 'Overview', vi: 'Tổng quan' } },
      { href: '/good-nutrition/plant-based-diets', label: { en: 'Plant-Based Diets', vi: 'Chế độ ăn thực vật' } },
      { href: '/good-nutrition/three-reasons-go-vegan', label: { en: 'Three Reasons to Go Vegan', vi: 'Ba lý do ăn chay' } },
      { href: '/good-nutrition/plant-based-diets/ffl', label: { en: 'Food for Life', vi: 'Food for Life' } },
      { href: '/good-nutrition/plant-based-diets/nutrition-faq', label: { en: 'Nutrition FAQ', vi: 'Câu hỏi thường gặp' } },
      { href: '/veganstarterkit', label: { en: 'Vegan Starter Kit', vi: 'Bộ khởi đầu ăn thuần chay' } },
      { href: '/good-nutrition/plant-based-diets/recipes', label: { en: 'Recipes', vi: 'Công thức' } },
      { href: '/good-nutrition/nutrition-for-athletes', label: { en: 'Nutrition for Athletes', vi: 'Dinh dưỡng cho vận động viên' } },
      { href: '/good-nutrition/plant-based-diets/pregnancy', label: { en: 'Plant-Based Pregnancy', vi: 'Mang thai với chế độ thực vật' } },
      { href: '/good-nutrition/nutrition-for-kids', label: { en: 'Nutrition for Kids', vi: 'Dinh dưỡng cho trẻ em' } },
      { href: '/universalmeals', label: { en: 'Universal Meals', vi: 'Bữa ăn toàn dân' } },
      { href: '/good-nutrition/nutrition-information', label: { en: 'Nutrition Information', vi: 'Thông tin dinh dưỡng' } },
      { href: '/good-nutrition/nutrition-information/the-carbohydrate-advantage', label: { en: 'The Carbohydrate Advantage', vi: 'Lợi thế carbohydrate' } },
      { href: '/good-nutrition/nutrition-information/fiber', label: { en: 'Fiber', vi: 'Chất xơ' } },
      { href: '/good-nutrition/nutrition-information/protein', label: { en: 'Protein', vi: 'Chất đạm' } },
      { href: '/good-nutrition/nutrition-information/soy-and-health', label: { en: 'Soy and Health', vi: 'Đậu nành và sức khỏe' } },
      { href: '/good-nutrition/nutrition-information/lowering-cholesterol-with-a-plant-based-diet', label: { en: 'Lowering Cholesterol', vi: 'Giảm cholesterol' } },
      { href: '/good-nutrition/nutrition-information/health-concerns-about-dairy', label: { en: 'Concerns About Dairy', vi: 'Rủi ro từ sữa' } },
      { href: '/good-nutrition/nutrition-information/chicken', label: { en: 'Chicken', vi: 'Thịt gà' } },
      { href: '/good-nutrition/nutrition-information/health-concerns-with-eggs', label: { en: 'Concerns With Eggs', vi: 'Rủi ro từ trứng' } },
      { href: '/good-nutrition/nutrition-information/processed-meat', label: { en: 'Processed Meat', vi: 'Thịt chế biến sẵn' } },
      { href: '/good-nutrition/vegan-diet-environment', label: { en: 'Vegan Diet and Environment', vi: 'Ăn chay và môi trường' } },
      { href: '/good-nutrition/nutrition-for-clinicians', label: { en: 'Nutrition for Clinicians', vi: 'Dinh dưỡng cho bác sĩ' } },
      { href: '/good-nutrition/healthy-communities', label: { en: 'Healthy Communities', vi: 'Cộng đồng khỏe mạnh' } },
      { href: '/good-nutrition/nutrition-programs-policies', label: { en: 'Programs & Policies', vi: 'Chương trình & chính sách' } },
      { href: '/take-action', label: { en: 'Take Action', vi: 'Hành động ngay' } },
      { href: '/findadoctor', label: { en: 'Find a Doctor', vi: 'Tìm bác sĩ' } },
      { href: '/findadietitian', label: { en: 'Find a Dietitian', vi: 'Tìm chuyên gia dinh dưỡng' } },
    ],
  },
  {
    href: '/health-topics',
    label: { en: 'Health Topics', vi: 'Chủ đề sức khỏe' },
    columns: 3,
    items: [
      { href: '/health-topics', label: { en: 'Overview', vi: 'Tổng quan' } },
      { href: '/health-topics/alzheimers', label: { en: "Alzheimer's", vi: 'Alzheimer' } },
      { href: '/health-topics/arthritis', label: { en: 'Arthritis', vi: 'Viêm khớp' } },
      { href: '/health-topics/asthma', label: { en: 'Asthma', vi: 'Hen suyễn' } },
      { href: '/health-topics/breast-cancer', label: { en: 'Breast Cancer', vi: 'Ung thư vú' } },
      { href: '/health-topics/cancer', label: { en: 'Cancer', vi: 'Ung thư' } },
      { href: '/health-topics/colorectal-cancer', label: { en: 'Colorectal Cancer', vi: 'Ung thư đại trực tràng' } },
      { href: '/health-topics/coronavirus', label: { en: 'Coronavirus', vi: 'Coronavirus' } },
      { href: '/health-topics/diabetes', label: { en: 'Diabetes', vi: 'Tiểu đường' } },
      { href: '/health-topics/gut-bacteria', label: { en: 'Gut Bacteria', vi: 'Vi khuẩn đường ruột' } },
      { href: '/health-topics/healthy-aging', label: { en: 'Healthy Aging', vi: 'Lão hóa khỏe mạnh' } },
      { href: '/health-topics/healthy-bones', label: { en: 'Healthy Bones', vi: 'Xương khỏe mạnh' } },
      { href: '/health-topics/heart-disease', label: { en: 'Heart Disease', vi: 'Bệnh tim' } },
      { href: '/health-topics/high-blood-pressure', label: { en: 'High Blood Pressure', vi: 'Cao huyết áp' } },
      { href: '/health-topics/migraines', label: { en: 'Migraines', vi: 'Đau nửa đầu' } },
      { href: '/health-topics/ovarian-cancer', label: { en: 'Ovarian Cancer', vi: 'Ung thư buồng trứng' } },
      { href: '/health-topics/polycystic-ovarian-syndrome', label: { en: 'Polycystic Ovarian Syndrome', vi: 'Hội chứng buồng trứng đa nang' } },
      { href: '/health-topics/prostate-cancer', label: { en: 'Prostate Cancer', vi: 'Ung thư tuyến tiền liệt' } },
      { href: '/health-topics/weight-loss', label: { en: 'Weight Loss', vi: 'Giảm cân' } },
    ],
  },
  {
    href: '/ethical-science',
    label: { en: 'Ethical Science', vi: 'Khoa học đạo đức' },
    columns: 2,
    items: [
      { href: '/ethical-science', label: { en: 'Overview', vi: 'Tổng quan' } },
      { href: '/ethical-science/ethical-education-and-training/surgery-training', label: { en: 'Surgery Training', vi: 'Đào tạo phẫu thuật' } },
      { href: '/ethical-science/ethical-education-and-training/paramedic-training', label: { en: 'Paramedic Training', vi: 'Đào tạo cấp cứu' } },
      { href: '/ethical-science/animals-in-medical-research', label: { en: 'Animals in Medical Research', vi: 'Động vật trong nghiên cứu y khoa' } },
      { href: '/dogs', label: { en: 'Dogs', vi: 'Chó' } },
      { href: '/ethical-science/animals-in-medical-research/alzheimers-disease-research-without-animals', label: { en: "Alzheimer's Research Without Animals", vi: 'Nghiên cứu Alzheimer không dùng động vật' } },
      { href: '/ethical-science/ethical-education-and-training/ERA21', label: { en: 'ERA21', vi: 'ERA21' } },
      { href: '/ethical-science/animal-testing-and-alternatives', label: { en: 'Animal Testing & Alternatives', vi: 'Thử nghiệm động vật và thay thế' } },
      { href: '/ethical-science/animal-testing-and-alternatives/animal-free-antibodies', label: { en: 'Animal-Free Antibodies', vi: 'Kháng thể không dùng động vật' } },
      { href: '/ethical-science/animal-testing-and-alternatives/chemical-testing-reform', label: { en: 'Chemical Testing Reform', vi: 'Cải cách thử nghiệm hóa chất' } },
      { href: '/ethical-science/animal-testing-and-alternatives/cruelty-free-cosmetics', label: { en: 'Cruelty-Free Cosmetics', vi: 'Mỹ phẩm không thử nghiệm động vật' } },
      { href: '/ethical-science/animal-testing-and-alternatives/nura', label: { en: 'Alternatives to Animal Use', vi: 'Giải pháp thay thế thử nghiệm động vật' } },
      { href: '/ethical-science/animal-testing-and-alternatives/human-tissue-research', label: { en: 'Human Tissue Research', vi: 'Nghiên cứu mô người' } },
    ],
  },
  {
    href: '/clinical-research',
    label: { en: 'Our Research', vi: 'Nghiên cứu của chúng tôi' },
    columns: 2,
    items: [
      { href: '/clinical-research', label: { en: 'Overview', vi: 'Tổng quan' } },
      { href: '/clinical-research/recruitment', label: { en: 'Recruitment', vi: 'Tuyển người tham gia' } },
      { href: '/t2dstudy', label: { en: 'T2D Study', vi: 'Nghiên cứu T2D' } },
      { href: '/clinical-research/endometriosis', label: { en: 'Endometriosis', vi: 'Lạc nội mạc tử cung' } },
      { href: '/clinical-research/fighting-hot-flashes-with-diet', label: { en: 'Fighting Hot Flashes with Diet', vi: 'Kiểm soát bốc hỏa bằng ăn uống' } },
    ],
  },
  {
    href: '/news',
    label: { en: 'News', vi: 'Tin tức' },
    columns: 2,
    items: [
      { href: '/news', label: { en: 'Overview', vi: 'Tổng quan' } },
      { href: '/podcast', label: { en: 'Podcast', vi: 'Podcast' } },
      { href: '/news/blog', label: { en: 'All News', vi: 'Tất cả tin tức' } },
      { href: '/news/health-nutrition', label: { en: 'Health & Nutrition', vi: 'Sức khỏe & dinh dưỡng' } },
      { href: '/news/innovative-science-news', label: { en: 'Innovative Science News', vi: 'Tin khoa học đổi mới' } },
      { href: '/news/good-science-digest', label: { en: 'Good Science Digest', vi: 'Bản tin khoa học' } },
      { href: '/news/good-medicine', label: { en: 'Good Medicine', vi: 'Y học tốt' } },
      { href: '/news/media-center', label: { en: 'Media Center', vi: 'Trung tâm truyền thông' } },
      { href: '/news/news-releases', label: { en: 'News Releases', vi: 'Thông cáo báo chí' } },
      { href: '/yourbodyinbalance', label: { en: 'Your Body in Balance', vi: 'Cơ thể cân bằng' } },
    ],
  },
  {
    href: '/about-us',
    label: { en: 'About Us', vi: 'Về chúng tôi' },
    columns: 2,
    items: [
      { href: '/about-us#leadership', label: { en: 'Leadership', vi: 'Ban lãnh đạo' } },
      { href: '/about-us/our-victories', label: { en: 'Our Victories', vi: 'Thành tựu của chúng tôi' } },
      { href: '/about-us/careers', label: { en: 'Careers', vi: 'Tuyển dụng' } },
      { href: '/about-us/careers/internships', label: { en: 'Internships', vi: 'Thực tập' } },
      { href: '/events', label: { en: 'Events', vi: 'Sự kiện' } },
      { href: '/about-us/financial-report', label: { en: 'Annual & Financial Reports', vi: 'Báo cáo thường niên' } },
    ],
  },
];

export default function Header({ showDonateButton = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') as Language | null;
    if (saved) setLanguage(saved);
  }, []);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    setHeaderHeight(node.offsetHeight);

    const observer = new ResizeObserver((entries) => {
      const [entry] = entries;
      if (entry) {
        setHeaderHeight(Math.ceil(entry.contentRect.height));
      }
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.cookie = `site_lang=${lang}; path=/; max-age=31536000`;
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
    window.location.reload();
  };

  const currentLabels = language === 'vi'
    ? {
        donate: 'Quyên góp',
        menu: 'Menu',
        quickAccess: 'Truy cập nhanh',
      }
    : {
        donate: 'Donate',
        menu: 'Menu',
        quickAccess: 'Quick Access',
      };

  const tLabel = (label: { en: string; vi: string }) => (language === 'vi' ? label.vi : label.en);
  const mobileMenuGroups: Array<{ key: string; href: string; label: { en: string; vi: string }; items: NavLeaf[] }> = [
    ...utilityGroups.map((group) => ({
      key: `utility:${group.href}`,
      href: group.href,
      label: group.label,
      items: group.items,
    })),
    ...navGroups.map((group) => ({
      key: `main:${group.href}`,
      href: group.href,
      label: group.label,
      items: group.items,
    })),
  ];

  return (
    <>
    <header
      ref={headerRef}
      className="inset-x-0 top-0 z-[9999] border-b border-slate-200 bg-white shadow-sm"
      style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
    >
      <div className="hidden border-b border-[#2a5d7d] bg-[#18354a] lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2 px-4 py-2 md:px-6">
          {utilityGroups.map((group) => (
            <div key={group.href} className="group relative">
              <Link
                href={group.href}
                className="flex h-full items-center justify-center rounded-md border border-white/20 bg-white/10 px-2 py-2 text-center text-[11px] font-semibold text-white no-underline transition hover:bg-white/18"
              >
                <span className="line-clamp-1">{tLabel(group.label)}</span>
                <span className="ml-1 text-[10px]">▾</span>
              </Link>

              <div className="absolute left-0 top-full z-50 hidden min-w-[260px] rounded-md border border-slate-200 bg-white p-2 shadow-2xl lg:group-hover:block lg:group-focus-within:block">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded px-2.5 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 hover:text-[#007fab]"
                  >
                    {tLabel(item.label)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white px-4 py-2 md:px-6 md:py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <Link href="/" className="min-w-0 flex-1 no-underline hover:opacity-95">
            <Image
              src="/images/pcrm-wordmark.svg"
              alt="Physicians Committee for Responsible Medicine"
              width={423}
              height={193}
              className="h-auto w-[148px] sm:w-[260px]"
              priority
            />
          </Link>

          <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
            {mounted ? (
              <div className="inline-flex overflow-hidden rounded-md border border-slate-300 bg-white lg:hidden">
                <button
                  onClick={() => handleLanguageChange('vi')}
                  className={`px-1.5 py-1 text-[10px] font-bold transition ${
                    language === 'vi' ? 'bg-[#007fab] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  VI
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`border-l border-slate-300 px-1.5 py-1 text-[10px] font-bold transition ${
                    language === 'en' ? 'bg-[#007fab] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  EN
                </button>
              </div>
            ) : null}

            {mounted ? (
              <div className="hidden lg:block">
                <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
              </div>
            ) : null}

            {showDonateButton ? (
              <Link
                href="/donate"
                className="rounded-md bg-[#f0ad4e] px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-slate-900 no-underline transition hover:bg-[#e39c36] sm:px-4 sm:py-2 sm:text-xs"
              >
                {currentLabels.donate}
              </Link>
            ) : null}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-[#0f5c73] lg:hidden"
              aria-label={currentLabels.menu}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden bg-[#007fab] lg:block">
        <div className="mx-auto flex max-w-7xl items-stretch justify-between px-4 md:px-6">
          {navGroups.map((group, index) => {
            const alignClass = index >= navGroups.length - 2 ? 'left-auto right-0' : 'left-0';
            const panelWidthClass = group.columns === 3 ? 'w-[880px]' : 'w-[620px]';
            const gridColsClass = group.columns === 3 ? 'grid-cols-3' : 'grid-cols-2';

            return (
              <div key={group.href} className="group relative">
                <Link
                  href={group.href}
                  className="flex h-full items-center px-4 py-4 text-sm font-bold uppercase tracking-[0.05em] text-white no-underline hover:bg-[#005f87]"
                >
                  {tLabel(group.label)}
                </Link>
                <div className={`absolute ${alignClass} top-full z-50 hidden ${panelWidthClass} max-w-[94vw] border border-slate-200 bg-white p-5 shadow-2xl group-hover:block`}>
                  <div className="mb-3 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-[0.06em] text-[#007fab]">
                    {tLabel(group.label)}
                  </div>
                  <div className={`grid max-h-[68vh] ${gridColsClass} gap-x-6 gap-y-2 overflow-auto pr-1`}>
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
            );
          })}
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="max-h-[72vh] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="space-y-4">
            {mounted ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  {currentLabels.quickAccess}
                </div>
                <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
              </div>
            ) : null}

            {mobileMenuGroups.map((group) => (
              <div key={group.key} className="rounded-lg border border-slate-200">
                <button
                  onClick={() => setOpenMobileGroup((prev) => (prev === group.key ? null : group.key))}
                  className="flex w-full items-center justify-between border-b border-slate-200 px-4 py-3 text-left text-sm font-bold text-[#007fab]"
                  aria-expanded={openMobileGroup === group.key}
                >
                  <span>{tLabel(group.label)}</span>
                  <span className={`text-base transition-transform ${openMobileGroup === group.key ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {openMobileGroup === group.key ? (
                  <div className="grid gap-1 p-2">
                    <Link
                      href={group.href}
                      className="rounded px-3 py-2 text-sm font-semibold text-[#0f5c73] no-underline hover:bg-slate-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {language === 'vi' ? 'Xem mục chính' : 'Open main section'}
                    </Link>
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
                ) : null}
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
    <div aria-hidden style={{ height: headerHeight > 0 ? `${headerHeight}px` : '120px' }} />
    </>
  );
}
