import React, { useState, useMemo } from 'react';
import type { SelectableFeature } from './types';
import { CheckIcon } from './components/icons';

const BASE_PRICE = 8000;

const allFeatures: SelectableFeature[] = [
  // Core Booking Engines
  { id: 'flights', title: 'حجز الطيران', description: 'نظام متكامل للبحث وحجز تذاكر الطيران المحلية والدولية.', price: 5000, category: 'محركات الحجز الأساسية' },
  { id: 'hotels', title: 'حجز الفنادق', description: 'نظام لعرض الفنادق، البحث حسب الوجهة والتواريخ، والحجز المباشر.', price: 5000, category: 'محركات الحجز الأساسية' },
  { id: 'cruises', title: 'حجز الكروز', description: 'وحدة خاصة لعرض وحجز الرحلات البحرية (النيلية والبحرية).', price: 4500, category: 'محركات الحجز الأساسية' },
  { id: 'transport', title: 'حجز الانتقالات', description: 'نظام لحجز خدمات النقل من وإلى المطار أو جولات المدينة.', price: 3000, category: 'محركات الحجز الأساسية' },

  // Specialized Tour Packages
  { id: 'umrah', title: 'رحلات الحج والعمرة', description: 'وحدة متخصصة لعرض برامج الحج والعمرة مع تفاصيل الإقامة والطيران.', price: 6000, category: 'باقات الرحلات المتخصصة' },
  { id: 'honeymoon', title: 'باقات شهر العسل', description: 'عرض برامج شهر العسل المميزة مع خيارات التخصيص.', price: 2500, category: 'باقات الرحلات المتخصصة' },
  { id: 'adventure', title: 'رحلات المغامرات', description: 'صفحات لعرض وتنظيم رحلات السفاري، الغطس، والتسلق.', price: 2000, category: 'باقات الرحلات المتخصصة' },
  { id: 'corporate', title: 'سياحة الشركات', description: 'وحدة لتنظيم رحلات ومؤتمرات الشركات والمجموعات.', price: 4000, category: 'باقات الرحلات المتخصصة' },
  { id: 'medical', title: 'السياحة العلاجية', description: 'قسم خاص لعرض وتنظيم برامج السياحة العلاجية.', price: 3500, category: 'باقات الرحلات المتخصصة' },
  
  // Client & Support Services
  { id: 'visa', title: 'المساعدة في التأشيرات', description: 'نموذج لطلب خدمة المساعدة في استخراج التأشيرات ومتابعتها.', price: 2500, category: 'خدمات العملاء والدعم' },
  { id: 'insurance', title: 'تأمين السفر', description: 'إضافة خيار شراء بوليصة تأمين السفر أثناء عملية الحجز.', price: 1500, category: 'خدمات العملاء والدعم' },
  { id: 'blog', title: 'مدونة تسويقية', description: 'نظام متكامل للمدونة والمقالات لتحسين الظهور في محركات البحث.', price: 3000, category: 'خدمات العملاء والدعم' },
  { id: 'vip', title: 'خدمات VIP', description: 'عرض خدمات كبار الشخصيات مثل الاستقبال في المطار والسيارات الفاخرة.', price: 2000, category: 'خدمات العملاء والدعم' },
];

const featureCategories = [
    'محركات الحجز الأساسية',
    'باقات الرحلات المتخصصة',
    'خدمات العملاء والدعم'
];


const FeatureCard: React.FC<{feature: SelectableFeature, isSelected: boolean, onSelect: () => void}> = ({feature, isSelected, onSelect}) => {
    return (
        <div
            onClick={onSelect}
            className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${isSelected ? 'border-blue-500 bg-blue-900/40 shadow-blue-500/30 shadow-lg' : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'}`}
        >
            {isSelected && (
                <div className="absolute top-3 left-3 bg-blue-500 text-white rounded-full p-1">
                    <CheckIcon className="w-4 h-4" />
                </div>
            )}
            <h4 className="text-lg font-bold text-white mb-1">{feature.title}</h4>
            <p className="text-sm text-gray-400 mb-3 h-10">{feature.description}</p>
            <div className="text-right text-lg font-extrabold text-cyan-400">
                {feature.price.toLocaleString('ar-EG')} جنيه
            </div>
        </div>
    );
};


function App() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['flights', 'hotels']));

  const handleToggleFeature = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectedFeatures = useMemo(() => {
    return allFeatures.filter(f => selectedIds.has(f.id)).sort((a,b) => a.price - b.price);
  }, [selectedIds]);

  const totalPrice = useMemo(() => {
    return BASE_PRICE + selectedFeatures.reduce((sum, f) => sum + f.price, 0);
  }, [selectedFeatures]);

  return (
    <div className="bg-slate-900 bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#3a1c71] min-h-screen text-white p-5 sm:p-10">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">قم ببناء موقعك السياحي</h1>
          <p className="text-xl md:text-2xl text-white/90">اختر المميزات التي تحتاجها واحصل على عرض سعر فوري وشفاف</p>
        </header>

        <main className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            {featureCategories.map(category => (
              <section key={category}>
                <h2 className="text-3xl font-bold mb-5 pb-2 border-b-2 border-white/20">{category}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {allFeatures.filter(f => f.category === category).map(feature => (
                    <FeatureCard
                      key={feature.id}
                      feature={feature}
                      isSelected={selectedIds.has(feature.id)}
                      onSelect={() => handleToggleFeature(feature.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
               <div className="p-6 border-b border-white/10">
                <h3 className="text-2xl font-bold text-center">ملخص عرض السعر</h3>
               </div>
               <div className="p-6 space-y-4">
                 <div className="flex justify-between items-center text-lg">
                   <span className="text-gray-300">السعر الأساسي للمنصة</span>
                   <span className="font-bold">{BASE_PRICE.toLocaleString('ar-EG')} جنيه</span>
                 </div>
                 
                 <div className="border-t border-white/10 pt-4">
                   <h4 className="text-gray-300 mb-3">المميزات الإضافية:</h4>
                   {selectedFeatures.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedFeatures.map(f => (
                          <li key={f.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-200">{f.title}</span>
                            <span className="font-semibold text-cyan-300">{f.price.toLocaleString('ar-EG')} جنيه</span>
                          </li>
                        ))}
                      </ul>
                   ) : (
                      <p className="text-center text-gray-400 py-4">لم تختر أي ميزات إضافية بعد</p>
                   )}
                 </div>
               </div>

                <div className="p-6 border-t-2 border-cyan-400/50 bg-black/20 rounded-b-3xl">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold">الإجمالي النهائي</span>
                        <span className="text-3xl font-extrabold text-cyan-400 tracking-tight">{totalPrice.toLocaleString('ar-EG')} جنيه</span>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1">
                        تواصل معنا لبدء المشروع
                    </button>
                </div>
            </div>
          </aside>
        </main>
        
        <footer className="text-center bg-white/5 backdrop-blur-md p-8 rounded-3xl mt-16">
          <h3 className="text-3xl font-bold mb-4">📞 للاستفسار وبدء المشروع</h3>
          <div className="text-lg space-y-2 text-white/90">
            <p>📧 البريد الإلكتروني: info@yourcompany.com</p>
            <p>📱 الهاتف: 01XXXXXXXXX</p>
          </div>
          <p className="mt-6 text-xl">⭐ نحن جاهزون لتحويل رؤيتك إلى واقع رقمي ناجح</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
