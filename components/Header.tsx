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
      { href: '/good-nutrition/plant-based-diets/recipes', label: { en: 'Recipes', vi: 'Công thức' } },
      { href: '/good-nutrition/nutrition-for-athletes', label: { en: 'Nutrition for Athletes', vi: 'Dinh dưỡng cho vận động viên' } },
      { href: '/good-nutrition/plant-based-diets/pregnancy', label: { en: 'Plant-Based Pregnancy', vi: 'Mang thai với chế độ thực vật' } },
      { href: '/good-nutrition/nutrition-for-kids', label: { en: 'Nutrition for Kids', vi: 'Dinh dưỡng cho trẻ em' } },
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
      { href: '/news/blog', label: { en: 'All News', vi: 'Tất cả tin tức' } },
      { href: '/news/health-nutrition', label: { en: 'Health & Nutrition', vi: 'Sức khỏe & dinh dưỡng' } },
      { href: '/news/innovative-science-news', label: { en: 'Innovative Science News', vi: 'Tin khoa học đổi mới' } },
      { href: '/news/good-science-digest', label: { en: 'Good Science Digest', vi: 'Bản tin khoa học' } },
      { href: '/news/good-medicine', label: { en: 'Good Medicine', vi: 'Y học tốt' } },
      { href: '/news/media-center', label: { en: 'Media Center', vi: 'Trung tâm truyền thông' } },
      { href: '/news/news-releases', label: { en: 'News Releases', vi: 'Thông cáo báo chí' } },
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

export default function Header({ showDonateButton = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
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
    <header className="z-50 border-b border-slate-200 bg-white shadow-sm lg:sticky lg:top-0">
      <div className="bg-[#18354a] px-3 py-1 text-[10px] text-white sm:px-4 sm:py-1.5 sm:text-[11px]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 sm:justify-between sm:gap-3">
          <div className="hidden items-center gap-2 text-slate-200 xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f0ad4e]" />
            <span>{currentLabels.mission}</span>
          </div>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:w-auto sm:justify-end sm:gap-x-3 sm:gap-y-1.5 xl:ml-0">
            {utilityGroups.map((group) => (
              <div key={group.href} className="group relative">
                <Link
                  href={group.href}
                  className="rounded px-1 py-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-100 no-underline transition hover:text-white hover:underline hover:underline-offset-4 md:text-[11px]"
                >
                  <span>{tLabel(group.label)}</span>
                  <span className="ml-1 hidden text-[9px] align-middle lg:inline">▾</span>
                </Link>

                <div className="absolute right-0 top-full z-50 hidden min-w-[250px] rounded-md border border-slate-200 bg-white p-2 shadow-2xl lg:group-hover:block lg:group-focus-within:block">
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
            {showDonateButton ? (
              <Link
                href="/donate"
                className="rounded-sm bg-[#f0ad4e] px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] text-slate-900 no-underline hover:bg-[#e39c36]"
              >
                {currentLabels.donate}
              </Link>
            ) : null}
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

      <div className="border-t border-slate-200 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {mounted ? <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} /> : null}
            {showDonateButton ? (
              <Link href="/donate" className="rounded-sm bg-[#f0ad4e] px-4 py-2 text-sm font-bold text-slate-900 no-underline">
                {currentLabels.donate}
              </Link>
            ) : null}
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
        <div className="max-h-[72vh] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="space-y-4">
            {navGroups.map((group) => (
              <div key={group.href} className="rounded-lg border border-slate-200">
                <button
                  onClick={() => setOpenMobileGroup((prev) => (prev === group.href ? null : group.href))}
                  className="flex w-full items-center justify-between border-b border-slate-200 px-4 py-3 text-left text-sm font-bold text-[#007fab]"
                  aria-expanded={openMobileGroup === group.href}
                >
                  <span>{tLabel(group.label)}</span>
                  <span className={`text-base transition-transform ${openMobileGroup === group.href ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {openMobileGroup === group.href ? (
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
  );
}
